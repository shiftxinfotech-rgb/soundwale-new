import {
  CommonHeader,
  Container,
  CustomButton,
  CustomMultiDropDownList,
} from '@components';
import {
  DropDownListParams,
  NavigationParamStack,
  ProductInfoDealerSupplierFormParam,
  SelectedCompanyParams,
  SelectedProductParams,
} from '@data';
import {useHasRole, useToggleSnackBar, useUserInfo} from '@hooks';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useGetAddPostDataQuery, useUpdateJsonFieldsMutation} from '@services';
import {AppStyle, VS} from '@theme';
import {normalizeApiError, validField} from '@util';
import React, {useCallback, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller';

let catArray: DropDownListParams[] = [];

const ProductInfoDealerSupplier = () => {
  const {t} = useTranslation(['generic', 'register', 'profile']);
  const profileData = useUserInfo();
  const hasRole = useHasRole();
  const {goBack} = useNavigation<NavigationProp<NavigationParamStack>>();
  const {toggleMessage} = useToggleSnackBar();
  const [updateJson, {isLoading}] = useUpdateJsonFieldsMutation();

  const {data: addPostData} = useGetAddPostDataQuery(undefined, {
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });

  const [dealerCompanyList, setDealerCompanyList] = useState<
    DropDownListParams[]
  >([]);
  const [productList, setProductList] = useState<DropDownListParams[]>([]);

  const {control, handleSubmit, setValue, setError, watch} =
    useForm<ProductInfoDealerSupplierFormParam>({
      defaultValues: {
        companies_id: [],
        category_id: [],
        companies_name: [] as DropDownListParams[],
        categories_name: [] as DropDownListParams[],
      },
      mode: 'onChange',
    });

  const selectedCompany = watch('companies_id');
  const selectedCategory = watch('category_id');

  useEffect(() => {
    if (addPostData) {
      setProductList(addPostData?.categories ?? []);
      setDealerCompanyList(addPostData?.mainCategory ?? []);
    }
  }, [addPostData]);

  const onSubmit = async (data: ProductInfoDealerSupplierFormParam) => {
    try {
      const formdata = new FormData();
      let companyArray: SelectedCompanyParams[] = [];

      data.companies_name.forEach(element => {
        companyArray.push({
          companies_id: element?.id ?? '',
          companies_name: element?.label ?? '',
        });
      });

      let productArray: SelectedProductParams[] = [];

      data.categories_name.forEach(element => {
        productArray.push({
          category_id: element?.id ?? '',
          category_name: element?.label ?? '',
        });
      });

      const obj = {
        key: 'product_info_dealer_importer',
        value: {
          companies_id: companyArray,
          category_id: productArray,
        },
      };
      formdata.append('data', JSON.stringify(obj));
      console.log('formdata', JSON.stringify(formdata, null, 2));

      const result = await updateJson(formdata).unwrap();

      const {status, message} = result;
      if (status) {
        goBack();
        toggleMessage(message);
      } else {
        toggleMessage(message);
      }
    } catch (error: unknown) {
      const {message, errors: fieldErrors} = normalizeApiError(error);
      if (fieldErrors) {
        Object.entries(fieldErrors).forEach(([field, messages]) => {
          if (messages && messages.length > 0) {
            setError(field as keyof ProductInfoDealerSupplierFormParam, {
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

  const handleAddProduct = useCallback(
    (text?: string) => {
      const trimmedName = text?.trim();
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
        value: trimmedName,
        id: '',
      };
      setProductList(old => [formattedValue, ...old]);
    },
    [productList, t, toggleMessage],
  );

  const handleAddCompany = useCallback(
    (text?: string) => {
      const trimmedName = text?.trim();
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
        value: trimmedName,
        id: '',
      };
      setDealerCompanyList(old => [formattedValue, ...old]);
    },
    [dealerCompanyList, t, toggleMessage],
  );

  useEffect(() => {
    try {
      const {companies_info, category_info} = profileData || {};
      if (validField(companies_info)) {
        const array = JSON.parse(companies_info || '');
        if (array && array.length > 0) {
          const ids = array.map(
            (item: SelectedCompanyParams) => item.companies_id,
          );
          setValue('companies_id', ids);
          const names = array.map((item: SelectedCompanyParams) => {
            return {
              id: item.companies_id,
              label: item.companies_name,
              value: item.companies_name,
            };
          });
          setValue('companies_name', names);
        }
      }

      if (validField(category_info)) {
        const array = JSON.parse(category_info || '');
        if (array && array.length > 0) {
          const ids = array.map(
            (item: SelectedProductParams) => item.category_id,
          );
          setValue('category_id', ids);
          const names = array.map((item: SelectedProductParams) => {
            return {
              id: item.category_id,
              label: item.category_name,
              value: item.category_name,
            };
          });
          setValue('categories_name', names);
        }
      }
    } catch (error) {}
  }, [addPostData?.mainCategory, profileData, setValue]);

  return (
    <Container>
      <View style={[VS.flex_1]}>
        <CommonHeader
          title={t('productInformation')}
          withBackArrow
          withChatNotification={false}
        />
        <KeyboardAwareScrollView
          alwaysBounceVertical={false}
          contentContainerStyle={[
            AppStyle.flexGrow,
            VS.ph_16,
            VS.pv_10,
            VS.gap_10,
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'handled'}
          keyboardDismissMode={'interactive'}
          ScrollViewComponent={ScrollView}>
          <CustomMultiDropDownList
            options={dealerCompanyList ?? []}
            headerTitle={
              hasRole(['dealer_supplier_distributor_importer'])
                ? t('dealerOfCompany')
                : t('companies')
            }
            placeholder={
              hasRole(['dealer_supplier_distributor_importer'])
                ? t('selectDealerOfCompany')
                : t('selectCompanies')
            }
            fieldName="companies_name"
            title={
              hasRole(['dealer_supplier_distributor_importer'])
                ? t('enterDealerOfCompany')
                : t('enterCompanies')
            }
            allowCustomEntry={true}
            onAddPress={handleAddCompany}
            isSearchable={false}
            selected={selectedCompany}
            onSelect={() => {}}
            onCloseDropDown={(selectedCompanies: DropDownListParams[]) => {
              const companyIds = selectedCompanies.map(company =>
                String(company.id),
              );
              setValue('companies_name', selectedCompanies);
              setValue('companies_id', companyIds);
            }}
            control={control}
          />
          <CustomMultiDropDownList
            options={productList ?? []}
            headerTitle={
              hasRole(['manufacturer'])
                ? t('register:forms.whatManufacturer.label')
                : t('profile:selectProduct')
            }
            placeholder={
              hasRole(['manufacturer'])
                ? t('register:forms.whatManufacturer.placeholder')
                : t('profile:selectProduct')
            }
            fieldName="categories_name"
            title={
              hasRole(['manufacturer'])
                ? t('register:forms.whatManufacturer.enterNew')
                : t('register:forms.whatManufacturer.enterNewProduct')
            }
            allowCustomEntry={true}
            onAddPress={handleAddProduct}
            isSearchable={false}
            selected={selectedCategory}
            onSelect={(selected: DropDownListParams[]) => {
              catArray = selected;
            }}
            onCloseDropDown={() => {
              const companyIds = catArray.map(company => String(company.id));
              setValue('categories_name', catArray);
              setValue('category_id', companyIds);
            }}
            control={control}
          />
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

export default ProductInfoDealerSupplier;
