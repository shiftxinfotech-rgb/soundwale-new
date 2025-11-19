import {Icons} from '@assets';
import {
  CommonHeader,
  Container,
  CustomButton,
  CustomDropDownList,
  Text,
} from '@components';
import {
  DropDownListParams,
  NavigationParamStack,
  OperatingMixerFormParam,
} from '@data';
import {useToggleSnackBar, useUserInfo} from '@hooks';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {nanoid} from '@reduxjs/toolkit';
import {
  useGetAddPostDataQuery,
  useGetModelListQuery,
  useUpdateJsonFieldsMutation,
} from '@services';
import {AppStyle, Colors, CommonStyle, TS, VS} from '@theme';
import {normalizeApiError, validField} from '@util';
import React, {useCallback, useEffect, useState} from 'react';
import {useFieldArray, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller';
import {Styles} from './Styles';

type MixerProps = {
  id?: string;
  company_id: DropDownListParams | string | number | undefined;
  model_id: DropDownListParams | string | number | undefined;
  company_name: string;
  model_name: string;
};

const OperatingMixerScreen = () => {
  const {t} = useTranslation(['generic']);
  const profileData = useUserInfo();
  const {goBack} = useNavigation<NavigationProp<NavigationParamStack>>();
  const {toggleMessage} = useToggleSnackBar();

  const [updateJsonFields, {isLoading}] = useUpdateJsonFieldsMutation();

  const {data: modelData} = useGetModelListQuery(
    profileData?.id?.toString() ?? '',
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    },
  );

  const {data: addPostData} = useGetAddPostDataQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const [dealerCompanyList, setDealerCompanyList] = useState<
    DropDownListParams[]
  >([]);

  const [modelList, setModelList] = useState<DropDownListParams[]>([]);

  const {control, handleSubmit, setValue, setError, watch} =
    useForm<OperatingMixerFormParam>({
      defaultValues: {
        product_info: [],
      },
      mode: 'onChange',
    });

  const {fields, append, remove} = useFieldArray({
    control,
    name: 'product_info',
  });

  const pInfo = watch('product_info');

  useEffect(() => {
    if (modelData && modelData?.length > 0) {
      setModelList(modelData ?? []);
    }
  }, [modelData]);

  useEffect(() => {
    if (addPostData) {
      setDealerCompanyList(addPostData?.mainCategory ?? []);
    }
  }, [addPostData]);

  const onSubmit = async (data: OperatingMixerFormParam) => {
    // Validate all fields before submission
    const hasInvalid = (data.product_info || []).some(item => {
      const isValidCompanyId =
        item.company_id?.id !== undefined &&
        item.company_id?.id !== null &&
        item.company_id?.id !== '';

      const isValidModelId =
        item.model_id?.id !== undefined &&
        item.model_id?.id !== null &&
        item.model_id?.id !== '';
      return !(isValidCompanyId && isValidModelId);
    });
    if (hasInvalid) {
      toggleMessage(t('generic:pleaseFillAllFields'));
      return;
    }
    try {
      let productInfo: MixerProps[] = [];
      data.product_info?.forEach(item => {
        const isCustomCompany =
          typeof item.company_id?.id === 'string' &&
          item.company_id.id.startsWith('cust_');
        const isCustomModel =
          typeof item.model_id?.id === 'string' &&
          item.model_id.id.startsWith('cust_');

        productInfo.push({
          company_id: isCustomCompany ? '' : item.company_id?.id ?? '',
          model_id: isCustomModel ? '' : item.model_id?.id ?? '',

          company_name: isCustomCompany
            ? item.company_id?.label ?? ''
            : item.company_id?.value ?? '',

          model_name: isCustomModel
            ? item.model_id?.label ?? ''
            : item.model_id?.value ?? '',
        });
      });
      const obj = {
        key: 'mixer_names_info',
        value: productInfo,
      };
      const formdata = new FormData();
      formdata.append('data', JSON.stringify(obj));

      console.log('formData', JSON.stringify(formdata, null, 2));

      const result = await updateJsonFields(formdata).unwrap();
      const {status, message} = result;
      toggleMessage(message);
      if (status) {
        goBack();
      }
    } catch (error: unknown) {
      const {message, errors: fieldErrors} = normalizeApiError(error);
      if (fieldErrors) {
        Object.entries(fieldErrors).forEach(([field, messages]) => {
          if (messages && messages.length > 0) {
            setError(field as keyof OperatingMixerFormParam, {
              type: 'manual',
              message: messages[0],
            });
          }
        });
      } else if (message) {
        toggleMessage(message);
      } else {
        toggleMessage(t('generic:serverError'));
      }
    }
  };

  const addNewProduct = useCallback(() => {
    const newField = {
      id: Date.now().toString(),
      company_id: {
        label: t('selectCompany'),
        value: '',
        id: '',
      } as DropDownListParams,
      company_name: '',
      model_name: '',
      model_id: {
        label: t('selectModel'),
        value: '',
        id: '',
      } as DropDownListParams,
    };
    append(newField);
  }, [append, t]);

  // Only run validation when user clicks Add More
  const handleAddMorePress = useCallback(() => {
    let hasEmpty = false;
    if (pInfo && pInfo.length > 0) {
      for (let i = 0; i < pInfo.length; i++) {
        const item = pInfo[i];
        if (
          !item.company_id ||
          !item.company_id.id ||
          item.company_id.id === '' ||
          !item.model_id ||
          !item.model_id.id ||
          item.model_id.id === ''
        ) {
          hasEmpty = true;
          break;
        }
      }
    }
    if (hasEmpty) {
      toggleMessage(t('generic:pleaseSelectAllFieldsBeforeAdding'));
      return;
    }
    addNewProduct();
  }, [pInfo, toggleMessage, t, addNewProduct]);

  const handleModelAdd = useCallback(
    (input?: string) => {
      const trimmedName = input?.trim();
      if (!trimmedName) {
        return;
      }

      const modelExits = modelList.some(company => {
        if (company.label) {
          return company.label.toLowerCase() === trimmedName.toLowerCase();
        }
        if (company.title) {
          return company.title.toLowerCase() === trimmedName.toLowerCase();
        }
        return false;
      });
      if (modelExits) {
        toggleMessage(t('modelNameAlreadyExists'));
        return;
      }

      const formattedValue: DropDownListParams = {
        label: trimmedName,
        value: trimmedName.toLowerCase().replace(/\s+/g, '_'),
        id: `cust_${nanoid(6)}`,
      };
      setModelList(old => [formattedValue, ...old]);
    },
    [modelList, t, toggleMessage],
  );

  const handleAddCompany = useCallback(
    (input?: string) => {
      const trimmedName = input?.trim();
      if (!trimmedName) {
        return;
      }

      const companyExists = dealerCompanyList.some(company => {
        if (company.label) {
          return company.label.toLowerCase() === trimmedName.toLowerCase();
        }
        if (company.title) {
          return company.title.toLowerCase() === trimmedName.toLowerCase();
        }
        return false;
      });

      if (companyExists) {
        toggleMessage(t('companyAlreadyExists'));
        return;
      }

      const formattedValue: DropDownListParams = {
        label: trimmedName,
        value: trimmedName.toLowerCase().replace(/\s+/g, '_'),
        id: `cust_${nanoid(6)}`,
      };
      setDealerCompanyList(old => [formattedValue, ...old]);
    },
    [dealerCompanyList, t, toggleMessage],
  );

  useEffect(() => {
    try {
      const {mixer_names_info} = profileData || {};
      if (validField(mixer_names_info)) {
        const array = JSON.parse(mixer_names_info || '');
        const mappedFields = array.map((item: MixerProps) => ({
          company_id: {
            label: item.company_name || t('selectCompany'),
            value: item.company_name || '',
            id: item.company_id || '',
          },
          model_id: {
            label: item.model_name || t('selectModel'),
            value: item.model_name || '',
            id: item.model_id || '',
          },
          company_name: item.company_name || '',
          model_name: item.model_name || '',
        }));
        setValue('product_info', mappedFields);
      } else {
        addNewProduct();
      }
    } catch (error) {}
  }, [addNewProduct, profileData, setValue, t]);

  return (
    <Container>
      <View style={[VS.flex_1]}>
        <CommonHeader
          title={t('operatingMixer')}
          withBackArrow
          withChatNotification={false}
        />
        <View style={[VS.ph_16, VS.pv_10, VS.flex_1]}>
          <View
            style={[VS.fd_row, VS.gap_10, VS.jc_end, VS.ai_center, VS.mb_16]}>
            <TouchableOpacity
              onPress={handleAddMorePress}
              style={[VS.ph_12, VS.pv_8, CommonStyle.bgPrimary, VS.br_8]}>
              <Text
                style={[TS.fs_14, CommonStyle.textWhite]}
                fontWeight="medium">
                {t('addMore')}
              </Text>
            </TouchableOpacity>
          </View>
          <KeyboardAwareScrollView
            alwaysBounceVertical={false}
            style={[VS.flex_1]}
            contentContainerStyle={[AppStyle.flexGrow, VS.pv_10]}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={'handled'}
            keyboardDismissMode={'interactive'}
            ScrollViewComponent={ScrollView}>
            <View style={[VS.flex_1]}>
              {fields.map((item, idx) => (
                <View
                  key={item.id}
                  style={[
                    VS.mb_10,
                    VS.ph_15,
                    VS.pv_10,
                    VS.br_10,
                    CommonStyle.shadowBox,
                    {backgroundColor: Colors.primary},
                  ]}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    hitSlop={15}
                    onPress={() => remove(idx)}
                    style={Styles.deleteIcon}>
                    <Icons.Close color={Colors.white} size={18} />
                  </TouchableOpacity>
                  <CustomDropDownList
                    key={`company-${item.id}`}
                    options={dealerCompanyList ?? []}
                    isAdd
                    isSearchable
                    onAddPress={handleAddCompany}
                    headerTitle={t('company')}
                    headerStyle={[CommonStyle.textWhite]}
                    placeholder={t('selectCompany')}
                    selected={item.company_name}
                    fieldName={`product_info.${idx}.company_id`}
                    title={t('selectCompany')}
                    displayValue={val => val.label}
                    onSelect={() => {}}
                    control={control}
                  />

                  <CustomDropDownList
                    key={`model-${item.id}`}
                    options={modelList ?? []}
                    isAdd
                    isSearchable
                    onAddPress={handleModelAdd}
                    headerTitle={t('model')}
                    headerStyle={[CommonStyle.textWhite]}
                    placeholder={t('selectModel')}
                    selected={item.model_name}
                    fieldName={`product_info.${idx}.model_id`}
                    title={t('selectModel')}
                    displayValue={val => val.label}
                    onSelect={() => {}}
                    control={control}
                  />
                </View>
              ))}
            </View>
          </KeyboardAwareScrollView>
        </View>
        <CustomButton
          buttonTitle={t('submit')}
          isLoading={isLoading}
          wrapperStyle={[VS.mb_20, VS.mh_15]}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </Container>
  );
};

export default OperatingMixerScreen;
