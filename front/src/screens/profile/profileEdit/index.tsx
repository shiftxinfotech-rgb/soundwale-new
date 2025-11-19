import {Icons} from '@assets';
import {
  CommonHeader,
  Container,
  CountryCodePicker,
  CountrySelector,
  CustomBottomSheet,
  CustomBottomSheetMethods,
  CustomButton,
  CustomDropDownList,
  CustomMultiDropDownList,
  CustomRadioGroup,
  InputBoxRHF,
  InputHeader,
  ProgressImage,
  SelectionInput,
  SelectionInputRHF,
  Text,
  UploadMedia,
} from '@components';
import {
  CountryCodeMethods,
  CountryCodeParams,
  DropDownListParams,
  EditProfileFormParam,
  LocationParam,
  NavigationParamStack,
  SelectedProductParams,
} from '@data';
import {yupResolver} from '@hookform/resolvers/yup';
import {useHasRole, useToggleSnackBar, useUserInfo, useUserRoles} from '@hooks';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {nanoid} from '@reduxjs/toolkit';
import {
  useEditPersonalProfileMutation,
  useGetAddPostDataQuery,
  useGetCountriesQuery,
  useLazyGetCitiesQuery,
  useLazyGetStatesQuery,
} from '@services';
import {AppStyle, TS, VS} from '@theme';
import {
  ChatHelper,
  fetchCodeInformation,
  genderArray,
  getSampleNumber,
  isValidImageUrl,
  navigate,
  normalizeApiError,
  URL_REGEX,
  validField,
} from '@util';
import {phone} from 'phone';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Controller, Resolver, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Keyboard, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller';
import * as Yup from 'yup';
import ProfileAvatar from './components/ProfileAvatar';
import {Styles} from './Styles';

let selectedCountryCodeType = '';
let selectedImageType = '';

const EditProfile = () => {
  const {t} = useTranslation(['profile', 'generic', 'register']);
  const profileData = useUserInfo();
  const rolesList = useUserRoles();

  const {goBack} = useNavigation<NavigationProp<NavigationParamStack>>();
  const {toggleMessage} = useToggleSnackBar();
  const hasRole = useHasRole();

  const locationPickerRef = useRef<boolean>(false);
  const countrySheetRef = useRef<CountryCodeMethods | null>(null);
  const sheetRef = useRef<CustomBottomSheetMethods | null>(null);

  const {data: addPostData} = useGetAddPostDataQuery(undefined, {
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });

  const {data: countryList} = useGetCountriesQuery();
  const [getStates, {data: stateList}] = useLazyGetStatesQuery();
  const [getCities, {data: cityList}] = useLazyGetCitiesQuery();
  const [editProfile, {isLoading}] = useEditPersonalProfileMutation();

  const [rolesArray, setRolesArray] = useState<DropDownListParams[]>([]);
  const [whatManufacturing, setWhatManufacturing] = useState<
    DropDownListParams[]
  >([]);

  const nameLabel = useMemo(() => {
    return hasRole([
      'rental_company',
      'manufacturer',
      'dealer_supplier_distributor_importer',
      'sound_automation',
      'recording_studio',
      'helper',
      'event_management',
      'artist',
      'other',
    ])
      ? t('register:forms.business.label')
      : hasRole(['sound_engineer', 'dj_operator'])
      ? t('register:forms.sound_operator.label')
      : hasRole(['sound_academy'])
      ? t('register:forms.sound_education.label')
      : hasRole(['repairing_shop_spare_parts'])
      ? t('register:forms.service_center.label')
      : hasRole(['service_center'])
      ? t('register:forms.repairing_shop.label')
      : t('register:forms.common.label');
  }, [hasRole, t]);

  const validationSchema = Yup.object().shape({
    personal_name: Yup.string()
      .required(
        t('register:validation.common.required', {
          label: t('register:forms.name.label'),
        }),
      )
      .min(
        2,
        t('register:validation.common.minLength', {
          label: t('register:forms.name.label'),
          length: 2,
        }),
      ),
    name: Yup.string()
      .required(
        t('register:validation.common.required', {
          label: nameLabel,
        }),
      )
      .min(
        2,
        t('register:validation.common.minLength', {
          label: nameLabel,
          length: 2,
        }),
      ),
    email: Yup.string()
      .required(t('register:validation.email.required'))
      .email(t('register:validation.email.invalid'))
      .matches(URL_REGEX.emailRegex, t('register:validation.email.invalid')),
    country: Yup.object().required(t('register:validation.country.required')),
    state: Yup.object().required(t('register:validation.state.required')),
    city: Yup.object().required(t('register:validation.city.required')),
    village: Yup.string().required(t('register:validation.village.required')),
    gst_number: Yup.string().test('gst-validation', function (value) {
      if (!value || value.trim() === '') {
        return true;
      }
      const formattedValue = value.toUpperCase();

      if (!URL_REGEX.gst.test(formattedValue)) {
        return this.createError({
          message: t?.('register:validation.gst.invalid'),
        });
      }
      return true;
    }),
    marketing_person_name: hasRole([
      'manufacturer',
      'dealer_supplier_distributor_importer',
      'sound_automation',
    ])
      ? Yup.string()
          .required(
            t('register:validation.common.required', {
              label: t('register:forms.manufacturer.marketingName'),
            }),
          )
          .min(
            2,
            t('register:validation.common.minLength', {
              label: t('register:forms.manufacturer.marketingName'),
              length: 2,
            }),
          )
      : Yup.string().notRequired(),
    marketing_mobile_number: hasRole([
      'manufacturer',
      'dealer_supplier_distributor_importer',
      'sound_automation',
    ])
      ? Yup.string()
          .required(t('register:validation.mobile.required'))
          .transform(value => (value === '' ? null : value))
          .test('phone-validation', function (value) {
            if (!value) {
              return true;
            }
            const cCode = this.parent.marketing_country_code;
            if (!cCode) {
              return true;
            }
            const {dial_code, name} = cCode;
            const result = phone(`${dial_code} ${value}`);
            if (!result.isValid) {
              return this.createError({
                message: t('register:validation.mobile.invalid', {
                  countryName: name,
                }),
              });
            }
            return true;
          })
      : Yup.string().notRequired(),
  });

  const {
    control,
    handleSubmit,
    setValue,
    trigger,
    getValues,
    reset,
    setError,
    clearErrors,
    watch,
  } = useForm<EditProfileFormParam>({
    defaultValues: {
      image: profileData?.image_url ?? '',
      name: profileData?.name ?? '',
      personal_name: profileData?.personal_name ?? '',
      email: profileData?.email ?? '',
      country_code: undefined,
      mobile_number: profileData?.mobile_number ?? '',
      visiting_card_image: '',
      role: undefined,
      location: undefined,
      country: undefined,
      state: undefined,
      city: undefined,
      village: profileData?.village ?? '',
      gst_number: profileData?.gst_number ?? '',
      company_about: profileData?.company_about ?? '',
      gender: profileData?.gender === 'male' ? genderArray[1] : genderArray[0],
      // manufacturer,dealer_supplier_distributor_importer,sound_automation
      marketing_person_name: profileData?.marketing_person_name ?? '',
      marketing_mobile_number: profileData?.marketing_mobile_number ?? '',
      marketing_country_code: undefined,
      product_ids: [],
    },
    resolver: yupResolver(
      validationSchema,
    ) as unknown as Resolver<EditProfileFormParam>,
    mode: 'onChange',
  });
  const marketingPhone = watch('marketing_country_code');
  const selectedManufacturing = watch('product_ids');

  const mLen = useMemo(() => {
    return marketingPhone
      ? getSampleNumber(marketingPhone as CountryCodeParams)?.length ?? 10
      : 10;
  }, [marketingPhone]);

  useEffect(() => {
    if (addPostData) {
      setWhatManufacturing(addPostData?.categories ?? []);
    }
  }, [addPostData]);

  useEffect(() => {
    if (rolesList) {
      let roles: DropDownListParams[] = [];
      rolesList.forEach(element => {
        roles?.push({
          label: element.name ?? '',
          value: element.slug ?? '',
          id: element.id ?? '',
        });
      });

      if (profileData?.roles?.[0]) {
        const initial = profileData?.roles?.[0];
        const fetched = roles.find(role => role.id === initial.id);
        if (fetched) {
          setValue('role', fetched);
        }
      }
      setRolesArray(roles);
    }
  }, [rolesList, profileData?.roles, setValue]);

  useEffect(() => {
    if (!locationPickerRef.current) {
      if (profileData) {
        const cName = profileData?.code_sort ?? 'in';
        const info = fetchCodeInformation(cName);
        if (info != null) {
          setValue('country_code', info);
        }
        const mName = profileData?.marketing_code_sort ?? 'in';
        const mInfo = fetchCodeInformation(mName);
        if (mInfo != null) {
          setValue('marketing_country_code', mInfo);
        }

        if (validField(profileData?.visiting_card_image)) {
          setValue(
            'visiting_card_image',
            profileData?.visiting_card_image_url ?? '',
          );
        }

        if (profileData?.country_id && profileData?.country_name) {
          setValue('country', {
            id: profileData?.country_id,
            label: profileData?.country_name,
            value: profileData?.country_name,
          });
          getStates(Number(profileData.country_id!), false);
        }
        if (profileData?.state_id && profileData?.state_name) {
          setValue('state', {
            id: profileData?.state_id,
            label: profileData?.state_name,
            value: profileData?.state_name,
          });
          getCities(Number(profileData.state_id!), false);
        }
        if (profileData?.city_id && profileData?.city_name) {
          setValue('city', {
            id: profileData?.city_id,
            label: profileData?.city_name,
            value: profileData?.city_name,
          });
        }

        if (profileData?.product_ids) {
          if (validField(profileData?.product_ids)) {
            const productIds = JSON.parse(profileData?.product_ids);
            const mappedFields = productIds.map(
              (el: SelectedProductParams) => ({
                id: el.category_id,
                label: el.category_name,
                value: el.category_name,
              }),
            );
            setValue('product_ids', mappedFields);
          }
        }

        let locationObj: LocationParam = {
          coordinates: {
            latitude: profileData?.latitude ?? 0,
            longitude: profileData?.longitude ?? 0,
          },
          address: {
            fullAddress: profileData?.location ?? '',
            country: '',
            state: '',
            city: '',
            postalCode: '',
          },
        };
        setValue('location', locationObj);
      }
    }
  }, [getCities, getStates, profileData, setValue]);

  const handleCamera = () => {
    selectedImageType = 'image';
    sheetRef?.current?.onPresent();
  };

  const handleAddManufacturerProduct = useCallback(
    (text?: string) => {
      const trimmedName = text?.trim();
      if (!trimmedName) {
        return;
      }

      const exist = whatManufacturing.some(company => {
        if (company.label) {
          return company.label.toLowerCase() === trimmedName.toLowerCase();
        }
        if (company.title) {
          return company.title.toLowerCase() === trimmedName.toLowerCase();
        }
        return false;
      });

      if (exist) {
        toggleMessage(
          t('register:validation.common.alreadyExists', {
            label: t('register:productName'),
          }),
        );
        return;
      }

      const formattedValue: DropDownListParams = {
        label: trimmedName,
        value: trimmedName.toLowerCase().replace(/\s+/g, '_'),
        id: `c_${nanoid(5)}`,
      };
      setWhatManufacturing(old => [formattedValue, ...old]);
      setValue('product_ids', [formattedValue, ...selectedManufacturing]);
    },
    [selectedManufacturing, setValue, t, toggleMessage, whatManufacturing],
  );

  const onSubmit = async (data: EditProfileFormParam) => {
    try {
      const formdata = new FormData();
      if (!isValidImageUrl(data.image)) {
        const filePath = data.image;
        if (filePath) {
          const name = filePath.split('/').pop() ?? 'image.jpg';
          const ext = name.split('.').pop()?.toLowerCase() || 'jpg';
          const type = `image/${ext}`;
          formdata.append('image', {
            uri: filePath,
            name,
            type,
          });
        }
      }
      formdata.append('name', data.name ?? '');
      formdata.append('personal_name', data?.personal_name ?? '');
      formdata.append('mobile_number', data.mobile_number ?? '');
      formdata.append('code', data.country_code?.dial_code ?? '');
      formdata.append('code_sort', data.country_code?.code ?? '');
      formdata.append('email', data.email ?? '');

      if (!isValidImageUrl(data.visiting_card_image)) {
        const filePath = data.visiting_card_image;
        if (filePath) {
          const name = filePath.split('/').pop() ?? 'visitingCard.jpg';
          const ext = name.split('.').pop()?.toLowerCase() || 'jpg';
          const type = `image/${ext}`;
          formdata.append('visiting_card_image', {
            uri: filePath,
            name,
            type,
          });
        }
      }
      formdata.append('country_id', data.country?.id ?? '');
      formdata.append('state_id', data.state?.id ?? '');
      formdata.append('city_id', data.city?.id ?? '');
      formdata.append('village', data?.village ?? '');
      formdata.append('location', data?.location.address.fullAddress ?? '');
      formdata.append(
        'latitude',
        data.location?.coordinates?.latitude.toString() ?? '',
      );
      formdata.append(
        'longitude',
        data.location?.coordinates?.longitude.toString() ?? '',
      );
      formdata.append('gst_number', data.gst_number ?? '');
      formdata.append('company_about', data.company_about ?? '');

      if (
        hasRole([
          'sound_engineer',
          'dj_operator',
          'recording_studio',
          'helper',
          'event_management',
          'artist',
          'other',
        ])
      ) {
        formdata.append('gender', data?.gender.value ?? '');
      }

      if (
        hasRole([
          'manufacturer',
          'dealer_supplier_distributor_importer',
          'sound_automation',
        ])
      ) {
        formdata.append(
          'marketing_person_name',
          data.marketing_person_name ?? '',
        );
        formdata.append(
          'marketing_mobile_number',
          data.marketing_mobile_number ?? '',
        );
        formdata.append(
          'marketing_code',
          data.marketing_country_code?.dial_code ?? '',
        );
        formdata.append(
          'marketing_code_sort',
          data.marketing_country_code?.code ?? '',
        );
      }
      if (hasRole(['manufacturer'])) {
        let productArray: SelectedProductParams[] = [];
        data.product_ids.forEach(item => {
          productArray.push({
            category_id: item.id
              ? item.id.toString().startsWith('c_')
                ? '0'
                : item.id
              : '0',
            category_name: item.label ?? '',
          });
        });
        formdata.append('product_ids', JSON.stringify(productArray));
      }

      locationPickerRef.current = true;
      const result = await editProfile(formdata).unwrap();

      const {status, message, user} = result;
      toggleMessage(message);
      if (status) {
        if (user) {
          await ChatHelper.createUserProfile(user);
        }
        setTimeout(() => {
          goBack();
          locationPickerRef.current = false;
        }, 500);
      }
    } catch (error: unknown) {
      const {message, errors: fieldErrors} = normalizeApiError(error);
      if (fieldErrors) {
        Object.entries(fieldErrors).forEach(([field, messages]) => {
          if (messages && messages.length > 0) {
            setError(field as keyof EditProfileFormParam, {
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

  return (
    <Container>
      <CommonHeader
        title={t('editProfile')}
        withBackArrow
        withChatNotification={false}
      />
      <KeyboardAwareScrollView
        contentContainerStyle={[
          AppStyle.flexGrow,
          VS.ph_16,
          VS.pv_10,
          VS.gap_10,
        ]}
        showsVerticalScrollIndicator={false}
        ScrollViewComponent={ScrollView}
        alwaysBounceVertical={false}>
        <Controller
          name={'image'}
          control={control}
          render={({field: {value}}) => (
            <ProfileAvatar imageUri={value} onPressCamera={handleCamera} />
          )}
        />
        {hasRole([
          'sound_engineer',
          'dj_operator',
          'recording_studio',
          'helper',
          'event_management',
          'artist',
          'other',
        ]) && (
          <>
            <Text
              style={[TS.fs_15, TS.tt_capitalize]}
              fontWeight="quickSandMedium">
              {t('register:gender')}
            </Text>
            <Controller
              control={control}
              name="gender"
              render={({field: {value, onChange}}) => (
                <CustomRadioGroup
                  options={t('register:forms.genderOptions', {
                    returnObjects: true,
                  })}
                  value={value?.value}
                  onChange={onChange}
                />
              )}
            />
          </>
        )}
        <InputBoxRHF
          fieldName="name"
          autoCapitalize={'words'}
          control={control}
          headerComponent={<InputHeader title={nameLabel} />}
          placeholder={
            hasRole([
              'rental_company',
              'manufacturer',
              'dealer_supplier_distributor_importer',
              'sound_automation',
              'recording_studio',
              'helper',
              'event_management',
              'artist',
              'other',
            ])
              ? t('register:forms.business.placeholder')
              : hasRole(['sound_engineer', 'dj_operator'])
              ? t('register:forms.sound_operator.placeholder')
              : hasRole(['sound_academy'])
              ? t('register:forms.sound_education.placeholder')
              : hasRole(['repairing_shop_spare_parts'])
              ? t('register:forms.service_center.placeholder')
              : hasRole(['service_center'])
              ? t('register:forms.repairing_shop.placeholder')
              : t('register:forms.common.placeholder')
          }
        />
        <InputBoxRHF
          fieldName="personal_name"
          autoCapitalize={'words'}
          control={control}
          headerComponent={
            <InputHeader
              title={
                hasRole([
                  'manufacturer',
                  'dealer_supplier_distributor_importer',
                  'sound_automation',
                ])
                  ? t('register:forms.manufacturer.mdName')
                  : t('register:forms.common.label')
              }
              textWeight="quickSandMedium"
            />
          }
          placeholder={
            hasRole([
              'manufacturer',
              'dealer_supplier_distributor_importer',
              'sound_automation',
            ])
              ? t('register:forms.manufacturer.mdNamePlaceholder')
              : t('register:forms.common.placeholder')
          }
        />

        <InputBoxRHF
          fieldName="mobile_number"
          control={control}
          editable={false}
          headerComponent={
            <InputHeader
              title={
                hasRole([
                  'manufacturer',
                  'dealer_supplier_distributor_importer',
                  'sound_automation',
                ])
                  ? t('register:forms.manufacturer.mdNumber')
                  : t('register:forms.mobile.label')
              }
            />
          }
          placeholder={
            hasRole([
              'manufacturer',
              'dealer_supplier_distributor_importer',
              'sound_automation',
            ])
              ? t('register:forms.manufacturer.mdNumberPlaceholder')
              : t('register:forms.mobile.placeholder')
          }
          keyboardType="phone-pad"
          inputMode="numeric"
          renderLeftIcon={
            <Controller
              control={control}
              name={'country_code'}
              render={({field: {value}}) => (
                <CountrySelector
                  countryCode={value}
                  separatorStyle={[VS.mh_6]}
                  onPressButton={() => {}}
                />
              )}
            />
          }
        />

        {hasRole([
          'manufacturer',
          'dealer_supplier_distributor_importer',
          'sound_automation',
        ]) && (
          <>
            <InputBoxRHF
              fieldName="marketing_person_name"
              autoCapitalize={'words'}
              control={control}
              headerComponent={
                <InputHeader
                  title={t('register:forms.manufacturer.marketingName')}
                />
              }
              placeholder={t(
                'register:forms.manufacturer.marketingNamePlaceholder',
              )}
            />
            <InputBoxRHF
              fieldName="marketing_mobile_number"
              control={control}
              headerComponent={
                <InputHeader
                  title={t('register:forms.manufacturer.marketingNumber')}
                />
              }
              placeholder={t(
                'register:forms.manufacturer.marketingNumberPlaceholder',
              )}
              keyboardType="phone-pad"
              inputMode="numeric"
              maxLength={mLen}
              renderLeftIcon={
                <Controller
                  control={control}
                  name={'marketing_country_code'}
                  render={({field: {value}}) => (
                    <CountrySelector
                      countryCode={value}
                      separatorStyle={[VS.mh_6]}
                      onPressButton={() => {
                        selectedCountryCodeType = 'marketing_country_code';
                        countrySheetRef?.current?.onPresent();
                      }}
                    />
                  )}
                />
              }
            />
          </>
        )}

        <InputBoxRHF
          fieldName="email"
          control={control}
          headerComponent={
            <InputHeader
              title={
                hasRole([
                  'manufacturer',
                  'dealer_supplier_distributor_importer',
                  'sound_automation',
                ])
                  ? t('register:forms.manufacturer.marketingEmail')
                  : t('register:forms.email.label')
              }
            />
          }
          placeholder={
            hasRole([
              'manufacturer',
              'dealer_supplier_distributor_importer',
              'sound_automation',
            ])
              ? t('register:forms.manufacturer.marketingEmailPlaceholder')
              : t('register:forms.email.placeholder')
          }
          keyboardType="email-address"
        />

        {hasRole(['manufacturer']) && (
          <CustomMultiDropDownList
            options={whatManufacturing ?? []}
            headerTitle={t('register:forms.whatManufacturer.label')}
            placeholder={t('register:forms.whatManufacturer.placeholder')}
            fieldName="product_ids"
            control={control}
            title={t('register:forms.whatManufacturer.enterNew')}
            allowCustomEntry={true}
            onAddPress={handleAddManufacturerProduct}
            isSearchable={false}
            selected={
              selectedManufacturing?.map(item => item.id?.toString() ?? '') ??
              []
            }
            onSelect={(_: DropDownListParams[]) => {}}
            onCloseDropDown={(values: DropDownListParams[]) => {
              setValue('product_ids', values);
            }}
          />
        )}

        <Controller
          control={control}
          name="visiting_card_image"
          render={({field: {value}}) => (
            <>
              <SelectionInput
                headerComponent={
                  <InputHeader
                    title={t('register:forms.visitingCard.label')}
                    textWeight="quickSandMedium"
                  />
                }
                placeholder={t('register:forms.visitingCard.placeholder')}
                onPress={() => {
                  Keyboard.dismiss();
                  selectedImageType = 'visiting_card_image';
                  sheetRef?.current?.onPresent();
                }}
                renderRightIcon={<Icons.Uploader />}
              />
              {validField(value) ? (
                <View style={[Styles.shopImageContainer, VS.mb_10]}>
                  <ProgressImage
                    source={{
                      uri: value,
                    }}
                    imageStyle={[VS.br_15]}
                    containerStyle={[Styles.shopImageContainer]}
                  />
                </View>
              ) : (
                <></>
              )}
            </>
          )}
        />

        <CustomDropDownList
          fieldName="role"
          control={control}
          editable={false}
          options={rolesArray ?? []}
          isSearchable
          headerTitle={t('register:forms.businessType.label')}
          placeholder={t('register:forms.businessType.placeholder')}
          title={t('register:forms.businessType.placeholder')}
          displayValue={val => val.label}
        />

        <SelectionInputRHF
          fieldName="location"
          control={control}
          displayValue={(value: LocationParam) => value.address.fullAddress}
          headerComponent={
            <InputHeader
              title={t('register:forms.location.label')}
              textWeight="quickSandMedium"
            />
          }
          onPress={() => {
            clearErrors('location');
            locationPickerRef.current = true;
            navigate('LocationSelector', {
              onGoBack: (locationData: LocationParam) => {
                requestAnimationFrame(() => {
                  setValue('location', locationData);
                });
                setTimeout(() => {
                  locationPickerRef.current = false;
                }, 1000);
              },
            });
          }}
          renderRightIcon={<Icons.Location />}
          placeholder={t('register:forms.location.placeholder')}
        />

        <View style={[VS.fd_row, VS.ai_start, VS.gap_10]}>
          <View style={[VS.flex_1]}>
            <CustomDropDownList
              fieldName="country"
              control={control}
              options={countryList ?? []}
              headerTitle={t('register:forms.country.label')}
              placeholder={t('register:forms.country.placeholder')}
              isSearchable
              displayValue={val => val.label}
              title={t('register:forms.country.placeholder')}
              onSelect={val => {
                const values = getValues();
                reset({
                  ...values,
                  state: undefined,
                  city: undefined,
                });
                getStates(Number(val.id!), false);
              }}
            />
          </View>
          <View style={[VS.flex_1]}>
            <CustomDropDownList
              fieldName="state"
              control={control}
              options={stateList ?? []}
              displayValue={val => val.label}
              isSearchable
              headerTitle={t('register:forms.state.label')}
              placeholder={t('register:forms.state.placeholder')}
              title={t('register:forms.state.placeholder')}
              onSelect={val => {
                const values = getValues();
                reset({
                  ...values,
                  city: undefined,
                });
                getCities(Number(val.id!), false);
              }}
            />
          </View>
        </View>

        <View style={[VS.fd_row, VS.ai_start, VS.flex_1, VS.gap_10]}>
          <View style={[VS.flex_1]}>
            <CustomDropDownList
              fieldName="city"
              control={control}
              options={cityList ?? []}
              headerTitle={t('register:forms.city.label')}
              displayValue={val => val.label}
              placeholder={t('register:forms.city.placeholder')}
              isSearchable
              title={t('register:forms.city.placeholder')}
            />
          </View>
          <InputBoxRHF
            fieldName="village"
            control={control}
            headerComponent={
              <InputHeader title={t('register:forms.village.label')} />
            }
            placeholder={t('register:forms.village.placeholder')}
            autoCapitalize="words"
            parentStyle={[VS.flex_1]}
          />
        </View>

        {!hasRole(['repairing_shop_spare_parts', 'service_center']) && (
          <InputBoxRHF
            fieldName="gst_number"
            control={control}
            maxLength={16}
            headerComponent={
              <InputHeader
                title={t('register:forms.gst.label')}
                textWeight="quickSandMedium"
                textStyle={[TS.tt_uppercase]}
              />
            }
            placeholder={t('register:forms.gst.placeholder')}
            autoCapitalize={'characters'}
            inputMode={'text'}
            keyboardType={'default'}
          />
        )}

        <InputBoxRHF
          fieldName="company_about"
          control={control}
          headerComponent={
            <InputHeader title={t('register:forms.aboutUs.label')} />
          }
          placeholder={t('register:forms.aboutUs.placeholder')}
          multiline={true}
          maxLength={5000}
          numberOfLines={4}
          textInputStyle={[Styles.descriptionInput, VS.pt_15]}
        />

        <CustomButton
          buttonTitle={t('save')}
          onPress={handleSubmit(onSubmit)}
          isLoading={isLoading}
          wrapperStyle={VS.mb_20}
        />
      </KeyboardAwareScrollView>

      <CountryCodePicker
        ref={countrySheetRef}
        onSelectCountry={(info: CountryCodeParams) => {
          if (selectedCountryCodeType === 'marketing_country_code') {
            setValue('marketing_country_code', info);
            trigger('marketing_country_code');
          }
        }}
      />

      <CustomBottomSheet ref={sheetRef}>
        <UploadMedia
          croppingOptions={
            selectedImageType === 'visiting_card_image'
              ? {
                  cropperCircleOverlay: false,
                  freeStyleCropEnabled: true,
                  mediaType: 'photo',
                }
              : {
                  cropperCircleOverlay: true,
                  freeStyleCropEnabled: false,
                  mediaType: 'photo',
                }
          }
          onSelectMedia={result => {
            if (selectedImageType === 'visiting_card_image') {
              if (result !== null) {
                setValue('visiting_card_image', result.path ?? '');
                trigger('visiting_card_image');
              }
            } else {
              if (result !== null) {
                setValue('image', result.path ?? '');
              }
            }
          }}
          onCloseAction={() => sheetRef?.current?.onDismiss()}
        />
      </CustomBottomSheet>
    </Container>
  );
};

export default EditProfile;
