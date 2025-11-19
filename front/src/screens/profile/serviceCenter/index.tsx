import {Icons} from '@assets';
import {
  CommonHeader,
  Container,
  CountryCodePicker,
  CountrySelector,
  CustomButton,
  CustomMultiDropDownList,
  InputBoxRHF,
  InputHeader,
  SelectionInputRHF,
  Text,
} from '@components';
import {
  CountryCodeMethods,
  CountryCodeParams,
  DropDownListParams,
  NavigationParamStack,
  ServiceCenterFormData,
  ServiceCenterInfo,
} from '@data';
import {yupResolver} from '@hookform/resolvers/yup';
import {useHasRole, useToggleSnackBar, useUserInfo} from '@hooks';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {nanoid} from '@reduxjs/toolkit';
import {useGetAddPostDataQuery, useUpdateJsonFieldsMutation} from '@services';
import {AppStyle, Colors, CommonStyle, TS, VS} from '@theme';
import {
  fetchCodeInformation,
  getSampleNumber,
  LatLng,
  navigate,
  normalizeApiError,
  validField,
} from '@util';
import phone from 'phone';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Controller, Resolver, useFieldArray, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Keyboard, TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller';
import * as Yup from 'yup';
import {Styles} from './styles';

// Create validation schema for service center fields
const createServiceCenterValidationSchema = (t: any) => {
  return Yup.object().shape({
    service_info: Yup.array().of(
      Yup.object().shape({
        center_name: Yup.string()
          .required(t('register:validation.name.required'))
          .min(2, t('register:validation.name.minLength')),
        company_id: Yup.array().test(
          'company-validation',
          t('register:validation.company.required'),
          function (value) {
            if (!value || value.length === 0) {
              return false;
            }
            // Check if at least one company has an id
            return value.some(company => company && company.id) || true;
          },
        ),
        location: Yup.string().required(
          t('register:validation.location.required'),
        ),
        mobile_number: Yup.string()
          .nullable()
          .transform(value => (value === '' ? null : value))
          .test('phone-validation', function (value) {
            if (!value || value.trim() === '') {
              return this.createError({
                message: t('register:validation.mobile.required'),
              });
            }
            if (!this.parent.countryCode) {
              return this.createError({
                message: t('register:validation.countryCode.required'),
              });
            }
            const {dial_code, name} = this.parent.countryCode;
            const result = phone(`${dial_code} ${value}`);
            if (!result.isValid) {
              return this.createError({
                message: t('register:validation.mobile.invalid', {
                  countryName: name,
                }),
              });
            }
            return true;
          }),
        countryCode: Yup.object().when('mobile_number', {
          is: (value: string) => value && value.trim() !== '',
          then: schema =>
            schema.required(t('register:validation.countryCode.required')),
          otherwise: schema => schema.notRequired(),
        }),
      }),
    ),
  });
};

let selectedMIndex: number | null = null;

const ServiceCenter = () => {
  const {t} = useTranslation(['generic', 'profile', 'register']);
  const profileData = useUserInfo();
  const hasRole = useHasRole();
  const {toggleMessage} = useToggleSnackBar();
  const locationPickerRef = useRef<boolean>(false);
  const countrySheetRef = useRef<CountryCodeMethods | null>(null);

  const {goBack} = useNavigation<NavigationProp<NavigationParamStack>>();
  const [editProfile, {isLoading}] = useUpdateJsonFieldsMutation();

  const {data: addPostData} = useGetAddPostDataQuery(undefined, {
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });

  const [dealerCompanyList, setDealerCompanyList] = useState<
    DropDownListParams[]
  >([]);
  const [selectedCompanies, setSelectedCompanies] = useState<string[][]>([]);

  // Create validation schema
  const validationSchema = createServiceCenterValidationSchema(t);

  const {control, handleSubmit, setValue, setError, trigger, getValues} =
    useForm<ServiceCenterFormData>({
      defaultValues: {
        service_info: [],
      },
      resolver: yupResolver(
        validationSchema,
      ) as unknown as Resolver<ServiceCenterFormData>,
      mode: 'onChange',
    });

  const {
    fields: serviceCenterInfo,
    append,
    remove,
    update,
  } = useFieldArray({
    control,
    name: 'service_info',
  });

  // Function to validate all existing service center fields
  const validateAllExistingFields = useCallback(async () => {
    if (serviceCenterInfo.length === 0) {
      return true;
    }
    const validationPromises = serviceCenterInfo.map((__, index) =>
      trigger(`service_info.${index}`),
    );

    const results = await Promise.all(validationPromises);
    return results.every(result => result);
  }, [serviceCenterInfo, trigger]);

  const addServiceInfo = useCallback(() => {
    const {code_sort} = profileData ?? {};
    const cCode = fetchCodeInformation(code_sort);
    const newField = {
      id: Date.now().toString(),
      company_id: [],
      company_name: [],
      center_name: '',
      location: '',
      latitude: 0,
      longitude: 0,
      mobile_number: '',
      countryCode: cCode,
    };

    append(newField);
  }, [append, profileData]);

  // Function to handle "Add More" button press with validation
  const handleAddMore = useCallback(async () => {
    // Validate all existing fields before adding new one
    const isValid = await validateAllExistingFields();

    if (!isValid) {
      toggleMessage(t('generic:pleaseFillAllFields'));
      return;
    }

    addServiceInfo();
  }, [validateAllExistingFields, toggleMessage, t, addServiceInfo]);

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

      const cId = nanoid(6);
      const formattedValue: DropDownListParams = {
        label: trimmedName,
        value: trimmedName,
        id: `c_${cId}`,
      };
      setDealerCompanyList(old => [formattedValue, ...old]);
    },
    [dealerCompanyList, toggleMessage, t],
  );

  const updateOtherMobileField = useCallback(
    (value: any) => {
      let index = selectedMIndex!;
      setValue(`service_info.${index}.countryCode`, value);
      trigger(`service_info.${index}.countryCode`);
      trigger(`service_info.${index}.mobile_number`);
    },
    [setValue, trigger],
  );

  const onSubmit = async (data: ServiceCenterFormData) => {
    try {
      // Validate all fields before submission
      const isValid = await trigger();
      if (!isValid) {
        toggleMessage(t('generic:pleaseFillAllFields'));
        return;
      }

      const serviceInfoPayload = data.service_info.map(item => {
        return {
          company_id: item.company_id
            .map(c =>
              c.id ? (c.id.toString().startsWith('c_') ? '0' : c.id) : '0',
            )
            .toString(),
          company_name: item.company_id.map(c => c.label ?? '').toString(),
          location: item.location ?? '',
          latitude: item.latitude,
          longitude: item.longitude,
          center_name: item.center_name ?? '',
          mobile_number: item.mobile_number ?? '',
          code_sort: validField(item.mobile_number)
            ? item.countryCode?.code ?? ''
            : '',
          code: validField(item.mobile_number)
            ? item.countryCode?.dial_code ?? ''
            : '',
        };
      });
      const formdata = new FormData();
      const obj = {
        key: 'service_center_info',
        value: serviceInfoPayload,
      };
      formdata.append('data', JSON.stringify(obj));

      console.log('formdata', JSON.stringify(formdata, null, 2));

      const result = await editProfile(formdata).unwrap();
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
            setError(field as keyof ServiceCenterFormData, {
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

  useEffect(() => {
    if (addPostData) {
      setDealerCompanyList(addPostData?.mainCategory ?? []);
    }
  }, [addPostData]);

  useEffect(() => {
    if (validField(profileData?.service_center_info)) {
      let jArray = JSON.parse(profileData?.service_center_info ?? '');

      const formattedServiceInfo = jArray.map((item: any) => {
        const companyIds = item?.company_id.split(',');
        const companyNames = item.company_name.split(',');
        const companies = companyIds.map((id: unknown, idx: number) => ({
          id,
          label: companyNames[idx] || '',
          value: id,
        }));

        const cCode = fetchCodeInformation(item.code_sort);
        return {
          company_id: companies,
          company_name: companyNames,
          location: item.location,
          latitude: item.latitude,
          longitude: item.longitude,
          center_name: item.center_name,
          mobile_number: item.mobile_number,
          countryCode: cCode,
        };
      });
      setValue('service_info', formattedServiceInfo);
      setSelectedCompanies(
        formattedServiceInfo.map((info: ServiceCenterInfo) =>
          info.company_id.map((company: DropDownListParams) => company.id),
        ),
      );
    } else {
      addServiceInfo();
    }
  }, [addServiceInfo, profileData, setValue]);

  return (
    <Container>
      <View style={[VS.flex_1]}>
        <CommonHeader
          title={t('register:forms.serviceCenter.label')}
          withBackArrow
          withChatNotification={false}
        />
        <View style={[VS.flex_1, VS.ph_16, VS.pv_10]}>
          <View
            style={[
              VS.fd_row,
              VS.gap_10,
              VS.jc_space_between,
              VS.ai_center,
              VS.mb_16,
            ]}>
            <Text style={[TS.fs_15, VS.mb_8]} fontWeight="quickSandMedium">
              {t('register:forms.serviceCenter.label')}
            </Text>
            <TouchableOpacity
              onPress={handleAddMore}
              style={[VS.ph_12, VS.pv_8, CommonStyle.bgPrimary, VS.br_8]}>
              <Text
                style={[TS.fs_14, CommonStyle.textWhite]}
                fontWeight="medium">
                {t('register:addMore')}
              </Text>
            </TouchableOpacity>
          </View>
          <KeyboardAwareScrollView
            alwaysBounceVertical={false}
            style={[VS.flex_1]}
            contentContainerStyle={[AppStyle.flexGrow]}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={'handled'}
            keyboardDismissMode={'interactive'}
            ScrollViewComponent={ScrollView}>
            <View style={[VS.flex_1]}>
              {serviceCenterInfo &&
                serviceCenterInfo.length > 0 &&
                serviceCenterInfo.map((field, idx) => (
                  <View
                    key={field.id}
                    style={[
                      {backgroundColor: Colors.primary},
                      VS.mb_20,
                      VS.ph_15,
                      VS.pv_10,
                      VS.br_10,
                    ]}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      hitSlop={15}
                      onPress={() => remove(idx)}
                      style={Styles.deleteIcon}>
                      <Icons.Close color={Colors.white} size={18} />
                    </TouchableOpacity>
                    <InputBoxRHF
                      fieldName={`service_info.${idx}.center_name`}
                      control={control}
                      autoCapitalize={'words'}
                      inputStyle={[VS.ph_6, CommonStyle.bgWhite]}
                      headerComponent={
                        <InputHeader
                          title={
                            hasRole(['service_center'])
                              ? t('register:forms.repairing_shop.label')
                              : t('register:forms.name.label')
                          }
                          textWeight="quickSandMedium"
                          textStyle={[CommonStyle.textWhite]}
                        />
                      }
                      placeholder={t('register:forms.name.placeholder')}
                      onBlur={() => {
                        trigger(`service_info.${idx}.center_name`);
                      }}
                    />
                    <CustomMultiDropDownList
                      key={`company-${field.id}`}
                      options={dealerCompanyList ?? []}
                      allowCustomEntry
                      isMultiSelect={false}
                      onAddPress={handleAddCompany}
                      mainContainerStyle={[VS.mb_0]}
                      headerTitle={t('register:forms.company.label')}
                      headerStyle={[CommonStyle.textWhite]}
                      placeholder={t('register:forms.company.placeholder')}
                      isSearchable
                      selected={selectedCompanies[idx] || []}
                      fieldName={`service_info.${idx}.company_id`}
                      title={t('register:forms.company.placeholder')}
                      onSelect={selected => {
                        const companyIdsForService = selected.map(
                          (company: DropDownListParams) => String(company.id),
                        );
                        setSelectedCompanies(prev => {
                          const updated = [...prev];
                          updated[idx] = companyIdsForService;
                          return updated;
                        });
                        setValue(`service_info.${idx}.company_id`, selected);
                        setValue(
                          `service_info.${idx}.company_name`,
                          selected.map(c => c.label ?? ''),
                        );
                        // Trigger validation after setting company
                        trigger(`service_info.${idx}.company_id`);
                      }}
                      control={control}
                    />
                    <InputBoxRHF
                      fieldName={`service_info.${idx}.mobile_number`}
                      control={control}
                      inputStyle={[VS.ph_6, CommonStyle.bgWhite]}
                      headerComponent={
                        <InputHeader
                          title={t('register:forms.mobile.label')}
                          textWeight="quickSandMedium"
                          textStyle={[CommonStyle.textWhite]}
                        />
                      }
                      placeholder={t('register:forms.mobile.placeholder')}
                      keyboardType="phone-pad"
                      inputMode="numeric"
                      maxLength={
                        getSampleNumber(field.countryCode)?.length ?? 10
                      }
                      onBlur={() => {
                        trigger(`service_info.${idx}.mobile_number`);
                        trigger(`service_info.${idx}.countryCode`);
                      }}
                      renderLeftIcon={
                        <Controller
                          control={control}
                          name={`service_info.${idx}.countryCode`}
                          render={({field: {value}}) => (
                            <CountrySelector
                              countryCode={value}
                              separatorStyle={[VS.mh_6]}
                              onPressButton={() => {
                                Keyboard.dismiss();
                                selectedMIndex = idx;
                                countrySheetRef?.current?.onPresent();
                              }}
                            />
                          )}
                        />
                      }
                    />
                    <SelectionInputRHF
                      key={`location-${field.id}`}
                      fieldName={`service_info.${idx}.location`}
                      control={control}
                      inputStyle={[AppStyle.fullWidth, CommonStyle.bgWhite]}
                      placeholder={t('register:forms.location.placeholder')}
                      headerComponent={
                        <InputHeader
                          title={t('register:forms.location.label')}
                          textStyle={[CommonStyle.textWhite]}
                        />
                      }
                      onPress={() => {
                        locationPickerRef.current = true;
                        navigate('LocationSelector', {
                          onGoBack: (locationData: {
                            coordinates: LatLng;
                            address: {
                              fullAddress: string;
                            };
                          }) => {
                            const current = getValues(`service_info.${idx}`);
                            const updated = {
                              ...current,
                              location: locationData.address.fullAddress,
                              latitude: locationData.coordinates.latitude,
                              longitude: locationData.coordinates.longitude,
                            };
                            update(idx, updated);
                            // Trigger validation after location is set
                            setTimeout(() => {
                              trigger(`service_info.${idx}.location`);
                              locationPickerRef.current = false;
                            }, 100);
                          },
                        });
                      }}
                      renderRightIcon={<Icons.Location />}
                    />
                  </View>
                ))}
            </View>
          </KeyboardAwareScrollView>
        </View>
        <CustomButton
          buttonTitle={t('profile:save')}
          isLoading={isLoading}
          wrapperStyle={[VS.mv_20, VS.mh_15]}
          onPress={handleSubmit(onSubmit)}
        />
      </View>

      <CountryCodePicker
        ref={countrySheetRef}
        onSelectCountry={(info: CountryCodeParams) => {
          if (selectedMIndex !== null) {
            updateOtherMobileField(info);
          }
        }}
      />
    </Container>
  );
};

export default ServiceCenter;
