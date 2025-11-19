import { Icons } from '@assets';
import {
  CommonHeader,
  Container,
  CustomButton,
  CustomDropDownList,
  InputBoxRHF,
  InputHeader,
  Text,
} from '@components';
import {
  AddPartInfoFormParam,
  DropDownListParams,
  NavigationParamStack,
} from '@data';
import { yupResolver } from '@hookform/resolvers/yup';
import { useToggleSnackBar, useUserInfo } from '@hooks';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { nanoid } from '@reduxjs/toolkit';
import {
  useGetAddPostDataQuery,
  useGetPartsListQuery,
  useUpdateJsonFieldsMutation,
} from '@services';
import { AppStyle, Colors, CommonStyle, TS, VS } from '@theme';
import { normalizeApiError, Scale, validField } from '@util';
import React, { useCallback, useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import * as Yup from 'yup';
import { Styles } from './Styles';

type ProductInfoPros = {
  id?: string;
  parts_id: DropDownListParams | string | number | undefined;
  company_id: DropDownListParams | string | number | undefined;
  company_name: string;
  parts_name: string;
  details: string;
};

const AddPartInfo = () => {
  const {t} = useTranslation(['generic', 'profile', 'register']);
  const profileData = useUserInfo();
  const {goBack} = useNavigation<NavigationProp<NavigationParamStack>>();
  const {toggleMessage} = useToggleSnackBar();

  const [updateJsonFields, {isLoading}] = useUpdateJsonFieldsMutation();

  const validationSchema = Yup.object().shape({
    spare_part_info: Yup.array().of(
      Yup.object().shape({
        parts_id: Yup.object().test(
          'parts-required',
          t('generic:productRequired'),
          function (value: any) {
            return value && (value.id || value.value);
          },
        ),
        company_id: Yup.object().test(
          'company-required',
          t('generic:companyRequired'),
          function (value: any) {
            return value && (value.id || value.value);
          },
        ),
        details: Yup.string().required(
          t('generic:isRequired', {
            field: t('register:forms.partDetails.label'),
          }),
        ),
      }),
    ),
  });

  const {data: partsArray} = useGetPartsListQuery(undefined, {
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });

  const {data: addPostData} = useGetAddPostDataQuery(undefined, {
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });

  const [dealerCompanyList, setDealerCompanyList] = useState<
    DropDownListParams[]
  >([]);
  const [partsList, setPartsList] = useState<DropDownListParams[]>([]);
  const {control, handleSubmit, setValue, setError, watch} =
    useForm<AddPartInfoFormParam>({
      defaultValues: {
        spare_part_info: [],
      },
      mode: 'onChange',
      resolver: yupResolver(validationSchema as any),
      criteriaMode: 'firstError',
      delayError: 100,
      shouldFocusError: true,
    });

  const {fields, append, remove} = useFieldArray({
    control,
    name: 'spare_part_info',
  });

  const sparePartInfo = watch('spare_part_info');

  const onSubmit = async (data: AddPartInfoFormParam) => {
    // Validate all fields before submission
    const hasInvalid = (data.spare_part_info || []).some(item => {
      const isValidPartsId =
        item.parts_id?.id !== undefined &&
        item.parts_id?.id !== null &&
        item.parts_id?.id !== '';

      const isValidCompanyId =
        item.company_id?.id !== undefined &&
        item.company_id?.id !== null &&
        item.company_id?.id !== '';

      const isValidDetails = item.details && item.details.trim() !== '';

      return !(isValidPartsId && isValidCompanyId && isValidDetails);
    });

    if (hasInvalid) {
      toggleMessage(t('generic:pleaseFillAllFields'));
      return;
    }

    try {
      let productInfo: ProductInfoPros[] = [];

      data.spare_part_info?.forEach(item => {
        const isCustomProduct =
          typeof item.parts_id?.id === 'string' &&
          item.parts_id.id.startsWith('c_');
        const isCustomCompany =
          typeof item.company_id?.id === 'string' &&
          item.company_id.id.startsWith('c_');

        productInfo.push({
          parts_id: isCustomProduct ? '' : item.parts_id?.id ?? '',
          parts_name: isCustomProduct
            ? item.parts_id?.label ?? ''
            : item.parts_id?.id
            ? item.parts_id?.label ?? ''
            : item.parts_id?.label ?? '',
          company_id: isCustomCompany ? '' : item.company_id?.id ?? '',
          company_name: isCustomCompany
            ? item.company_id?.label ?? ''
            : item.company_id?.id
            ? item.company_id?.label ?? ''
            : item.company_id?.label ?? '',
          details: item.details ?? '',
        });
      });

      const obj = {
        key: 'spare_part_info',
        value: productInfo.length > 0 ? productInfo : '',
      };
      const formdata = new FormData();
      formdata.append('data', JSON.stringify(obj));
      console.log('formdata', JSON.stringify(formdata, null, 2));

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
            setError(field as keyof AddPartInfoFormParam, {
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
      parts_id: {
        label: t('register:forms.parts.placeholder'),
        value: '',
        id: '',
      } as DropDownListParams,
      parts_name: '',
      company_id: {
        label: t('register:forms.company.placeholder'),
        value: '',
        id: '',
      } as DropDownListParams,
      company_name: '',
      details: '',
    };
    append(newField);
  }, [append, t]);

  // Only run validation when user clicks Add More
  const handleAddMorePress = useCallback(() => {
    let hasEmpty = false;

    if (sparePartInfo && sparePartInfo.length > 0) {
      for (let i = 0; i < sparePartInfo.length; i++) {
        const item = sparePartInfo[i];
        if (
          !item.parts_id ||
          !item.parts_id.id ||
          item.parts_id.id === '' ||
          !item.company_id ||
          !item.company_id.id ||
          item.company_id.id === '' ||
          !item.details ||
          item.details.trim() === ''
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
  }, [sparePartInfo, toggleMessage, t, addNewProduct]);

  const handleAddProduct = useCallback(
    (text?: string) => {
      const trimmedName = text?.trim();
      if (!trimmedName) {
        return;
      }

      const companyExists = partsList.some(company => {
        if (company.label) {
          return company.label?.toLowerCase() === trimmedName.toLowerCase();
        }
        if (company.title) {
          return company.title?.toLowerCase() === trimmedName.toLowerCase();
        }
        return false;
      });

      if (companyExists) {
        toggleMessage(t('partNameAlreadyExists'));
        return;
      }

      const formattedValue: DropDownListParams = {
        label: trimmedName,
        value: trimmedName.toLowerCase().replace(/\s+/g, '_'),
        id: `c_${nanoid(6)}`,
      };
      setPartsList(old => [formattedValue, ...old]);
    },
    [partsList, t, toggleMessage],
  );

  const handleAddCompany = useCallback(
    (text?: string) => {
      const trimmedName = text?.trim();
      if (!trimmedName) {
        return;
      }

      const companyExists = dealerCompanyList.some(company => {
        if (company.label) {
          return company.label?.toLowerCase() === trimmedName.toLowerCase();
        }
        if (company.title) {
          return company.title?.toLowerCase() === trimmedName.toLowerCase();
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
        id: `c_${nanoid(6)}`,
      };
      setDealerCompanyList(old => [formattedValue, ...old]);
    },
    [dealerCompanyList, t, toggleMessage],
  );

  useEffect(() => {
    if (addPostData) {
      setDealerCompanyList(addPostData?.mainCategory ?? []);
    }
  }, [addPostData]);

  useEffect(() => {
    if (partsArray) {
      setPartsList(partsArray ?? []);
    }
  }, [partsArray]);

  useEffect(() => {
    try {
      console.log('profileData', profileData);
      const {spare_part_info} = profileData || {};
      console.log('spare_part_info', spare_part_info);
      if (spare_part_info && validField(spare_part_info)) {
        const array = JSON.parse(spare_part_info);
        const mappedFields = array.map(
          (item: ProductInfoPros, idx: number) => ({
            id: item.id || Date.now().toString() + idx,
            parts_id: {
              label: item.parts_name || t('register:forms.parts.placeholder'),
              value: item.parts_id || '',
              id: item.parts_id || '',
            },
            company_id: {
              label:
                item.company_name || t('register:forms.company.placeholder'),
              value: item.company_id || '',
              id: item.company_id || '',
            },
            company_name: item.company_name || '',
            parts_name: item.parts_name || '',
            details: item.details || '',
          }),
        );
        setValue('spare_part_info', mappedFields);
      } else {
        addNewProduct();
      }
    } catch (error) {}
  }, [addNewProduct, profileData, setValue, t]);

  return (
    <Container>
      <View style={[VS.flex_1]}>
        <CommonHeader
          title={t('profile:addInfo')}
          withBackArrow
          withChatNotification={false}
        />
        <KeyboardAwareScrollView
          alwaysBounceVertical={false}
          contentContainerStyle={[AppStyle.flexGrow, VS.ph_16, VS.pv_10]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'handled'}
          keyboardDismissMode={'interactive'}
          ScrollViewComponent={ScrollView}>
          <View style={[VS.flex_1]}>
            <View
              style={[
                VS.fd_row,
                VS.gap_10,
                VS.jc_space_between,
                VS.ai_center,
                VS.mb_16,
              ]}>
              <Text style={[TS.fs_15, VS.mb_8]} fontWeight="quickSandMedium">
                {t('profile:addPartInfo')}
              </Text>
              <TouchableOpacity
                onPress={handleAddMorePress}
                style={[VS.ph_12, VS.pv_8, CommonStyle.bgPrimary, VS.br_8]}>
                <Text
                  style={[TS.fs_14, CommonStyle.textWhite]}
                  fontWeight="medium">
                  {t('register:addMore')}
                </Text>
              </TouchableOpacity>
            </View>

            {fields.map((item, idx) => {
              return (
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
                    key={`parts-${item.id}`}
                    control={control}
                    fieldName={`spare_part_info.${idx}.parts_id`}
                    options={partsList ?? []}
                    isAdd
                    onAddPress={handleAddProduct}
                    selected={item.parts_name.toString()}
                    headerTitle={t('register:forms.parts.label')}
                    headerStyle={[CommonStyle.textWhite]}
                    placeholder={t('register:forms.parts.placeholder')}
                    isSearchable
                    title={t('register:forms.parts.placeholder')}
                    displayValue={val => val.label}
                    onSelect={() => {}}
                  />
                  <CustomDropDownList
                    key={`company-${item.id}`}
                    fieldName={`spare_part_info.${idx}.company_id`}
                    control={control}
                    options={dealerCompanyList ?? []}
                    isAdd
                    onAddPress={handleAddCompany}
                    selected={item.company_name}
                    headerTitle={t('register:forms.company.label')}
                    headerStyle={[CommonStyle.textWhite]}
                    placeholder={t('register:forms.company.placeholder')}
                    isSearchable
                    title={t('register:forms.company.placeholder')}
                    displayValue={val => val.label}
                    onSelect={() => {}}
                  />
                  <InputBoxRHF
                    placeholder={t('register:forms.partDetails.placeholder')}
                    fieldName={`spare_part_info.${idx}.details`}
                    headerComponent={
                      <InputHeader
                        title={t('register:forms.partDetails.label')}
                        textWeight="quickSandMedium"
                        textStyle={[CommonStyle.textWhite]}
                      />
                    }
                    control={control}
                    inputStyle={[CommonStyle.bgWhite]}
                    textInputStyle={{height: Scale(82)}}
                    parentStyle={[VS.mb_10]}
                    multiline={true}
                    numberOfLines={4}
                  />
                </View>
              );
            })}
          </View>
        </KeyboardAwareScrollView>
        <CustomButton
          buttonTitle={t('profile:save')}
          isLoading={isLoading}
          wrapperStyle={[VS.mv_20, VS.mh_15]}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </Container>
  );
};

export default AddPartInfo;
