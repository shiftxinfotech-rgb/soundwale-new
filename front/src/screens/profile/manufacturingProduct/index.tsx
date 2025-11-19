import {Icons} from '@assets';
import {
  CommonHeader,
  Container,
  CustomButton,
  CustomDropDownList,
  Text,
} from '@components';
import {
  AddProductRentalFormParams,
  DropDownListParams,
  ManufacturingProductFormParam,
  NavigationParamStack,
} from '@data';
import {useToggleSnackBar, useUserInfo} from '@hooks';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {nanoid} from '@reduxjs/toolkit';
import {useGetAddPostDataQuery, useUpdateJsonFieldsMutation} from '@services';
import {AppStyle, Colors, CommonStyle, TS, VS} from '@theme';
import {normalizeApiError, validField} from '@util';
import React, {useCallback, useEffect, useState} from 'react';
import {useFieldArray, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller';
import {Styles} from './Styles';

type ProductInfoPros = {
  id?: string;
  product_id: DropDownListParams | string | number | undefined;
  product_name: string;
};

const ManufacturingProduct = () => {
  const {t} = useTranslation(['generic']);
  const profileData = useUserInfo();
  const {goBack} = useNavigation<NavigationProp<NavigationParamStack>>();
  const {toggleMessage} = useToggleSnackBar();

  const [updateJson, {isLoading}] = useUpdateJsonFieldsMutation();

  const {data: addPostData} = useGetAddPostDataQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const [productList, setProductList] = useState<DropDownListParams[]>([]);

  const {control, handleSubmit, setValue, setError, watch} =
    useForm<ManufacturingProductFormParam>({
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
    if (addPostData) {
      setProductList(addPostData?.categories ?? []);
    }
  }, [addPostData]);

  const onSubmit = async (data: ManufacturingProductFormParam) => {
    // Validate all fields before submission
    const hasInvalid = (data.product_info || []).some(item => {
      const isValidProductId =
        item.product_id?.id !== undefined &&
        item.product_id?.id !== null &&
        item.product_id?.id !== '';
      return !isValidProductId;
    });
    if (hasInvalid) {
      toggleMessage(t('generic:pleaseFillAllFields'));
      return;
    }
    try {
      let productInfo: ProductInfoPros[] = [];
      const formdata = new FormData();

      data.product_info?.forEach(item => {
        const isCustomProduct =
          typeof item.product_id?.id === 'string' &&
          item.product_id.id.startsWith('cust_');

        productInfo.push({
          product_id: isCustomProduct ? '' : item.product_id?.id ?? '',
          product_name: isCustomProduct
            ? item.product_id?.label ?? ''
            : item.product_id?.value ?? '',
        });
      });

      const obj = {
        key: 'manufacturing_product_info',
        value: productInfo.length > 0 ? productInfo : '',
      };

      formdata.append('data', JSON.stringify(obj));

      console.log('formData', JSON.stringify(formdata, null, 2));

      const result = await updateJson(formdata).unwrap();
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
            setError(field as keyof AddProductRentalFormParams, {
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
      product_id: {
        label: t('selectProduct'),
        value: '',
        id: '',
      } as DropDownListParams,
      product_name: '',
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
          !item.product_id ||
          !item.product_id.id ||
          item.product_id.id === ''
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

  const handleAddProduct = useCallback(
    (input?: string) => {
      const trimmedName = input?.trim();
      if (!trimmedName) {
        return;
      }

      const companyExists = productList.some(company => {
        if (company.label) {
          return company.label.toLowerCase() === trimmedName.toLowerCase();
        }
        if (company.title) {
          return company.title.toLowerCase() === trimmedName.toLowerCase();
        }
        return false;
      });

      if (companyExists) {
        toggleMessage(t('productNameAlreadyExists'));
        return;
      }

      const formattedValue: DropDownListParams = {
        label: trimmedName,
        value: trimmedName.toLowerCase().replace(/\s+/g, '_'),
        id: `cust_${nanoid(6)}`,
      };
      setProductList(old => [formattedValue, ...old]);
    },
    [productList, t, toggleMessage],
  );

  useEffect(() => {
    try {
      const {manufacturing_product_info} = profileData || {};
      if (
        manufacturing_product_info &&
        validField(manufacturing_product_info)
      ) {
        const array = JSON.parse(manufacturing_product_info);
        const mappedFields = array.map((item: ProductInfoPros) => ({
          id: item.id || nanoid(6),
          product_id: {
            label: item.product_name || t('selectProduct'),
            value: item.product_name || '',
            id: item.product_id || '',
          },
          product_name: item.product_name || '',
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
          title={t('addProduct')}
          withBackArrow
          withChatNotification={false}
        />
        <View style={[VS.ph_16, VS.pv_10, VS.flex_1]}>
          <View
            style={[
              VS.fd_row,
              VS.gap_10,
              VS.jc_space_between,
              VS.ai_center,
              VS.mb_16,
            ]}>
            <Text style={[TS.fs_15, VS.mb_8]} fontWeight="quickSandMedium">
              {t('productInformation')}
            </Text>
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
                    key={`product-${item.id}`}
                    options={productList ?? []}
                    isAdd
                    isSearchable
                    onAddPress={handleAddProduct}
                    headerTitle={t('product')}
                    headerStyle={[CommonStyle.textWhite]}
                    placeholder={t('selectProduct')}
                    selected={item.product_name}
                    fieldName={`product_info.${idx}.product_id`}
                    title={t('selectProduct')}
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

export default ManufacturingProduct;
