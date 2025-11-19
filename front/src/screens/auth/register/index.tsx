import {Icons} from '@assets';
import {
  CommonHeader,
  CountrySelector,
  CustomButton,
  CustomDropDownList,
  InputBox,
  InputBoxRHF,
  InputHeader,
  SelectionInputRHF,
} from '@components';
import {
  DropDownListParams,
  ExtractedAddress,
  LocationParam,
  NavigationParamStack,
  RegisterForm,
} from '@data';
import {tokenData} from '@features';
import {yupResolver} from '@hookform/resolvers/yup';
import {useToggleSnackBar} from '@hooks';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useGetRolesQuery, useRegisterUserMutation} from '@services';
import {AppStyle, Colors, CommonStyle, VS} from '@theme';
import {
  ChatHelper,
  navigate,
  navigateAndResetComplete,
  normalizeApiError,
} from '@util';
import React, {useEffect, useRef, useState} from 'react';
import {Resolver, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller';
import {shallowEqual, useSelector} from 'react-redux';
import * as Yup from 'yup';

let extractedLocation: ExtractedAddress | undefined;

const RegisterPage = () => {
  const {t} = useTranslation(['register', 'generic']);
  const {toggleMessage} = useToggleSnackBar();
  const locationPickerRef = useRef<boolean>(false);

  const {params} = useRoute<RouteProp<NavigationParamStack, 'RegisterForm'>>();

  const tokenInfo = useSelector(tokenData, shallowEqual);
  const {
    data: rolesList,
    isFetching,
    isLoading,
  } = useGetRolesQuery(undefined, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const [registerUser, {isLoading: isSubmitting}] = useRegisterUserMutation();

  const [rolesArray, setRolesArray] = useState<DropDownListParams[]>([]);

  const validationSchema = Yup.object().shape({
    personal_name: Yup.string()
      .required(
        t('validation.common.required', {
          label: t('forms.name.label'),
        }),
      )
      .min(
        2,
        t('validation.common.minLength', {
          label: t('forms.name.label'),
          length: 2,
        }),
      ),
    name: Yup.string()
      .required(
        t('validation.common.required', {label: t('forms.business.label')}),
      )
      .min(
        2,
        t('validation.common.minLength', {
          label: t('forms.business.label'),
          length: 2,
        }),
      ),

    role_id: Yup.object<DropDownListParams>().required(
      t('validation.common.required', {label: t('forms.businessType.label')}),
    ),
    location: Yup.object<LocationParam>().required(
      t('validation.location.required'),
    ),
  });

  const {control, handleSubmit, setValue, setError, clearErrors} =
    useForm<RegisterForm>({
      defaultValues: {
        role_id: undefined,
        name: '',
        personal_name: '',
        location: undefined,
      },
      resolver: yupResolver(
        validationSchema,
      ) as unknown as Resolver<RegisterForm>,
      mode: 'onChange',
      criteriaMode: 'firstError',
      delayError: 100,
      shouldFocusError: true,
    });

  useEffect(() => {
    if (rolesList) {
      let roles: DropDownListParams[] = [];
      rolesList.forEach(element => {
        roles?.push({
          label: element.name ?? '',
          value: element.name ?? '',
          id: element.id ?? '',
        });
      });
      setRolesArray(roles);
    }
  }, [rolesList]);

  const onFormSubmit = async (data: RegisterForm) => {
    try {
      const formdata = new FormData();
      const {token} = tokenInfo || {};
      const {coordinates, address} = data.location ?? {};
      const {countryCode, mobile_number} = params || {};

      formdata.append('name', data.name ?? '');
      formdata.append('personal_name', data?.personal_name ?? '');
      formdata.append('role_id', data.role_id.id ?? '');
      formdata.append('fcm_token', token);
      formdata.append('mobile_number', mobile_number ?? '');
      formdata.append('code_sort', countryCode?.code ?? '');
      formdata.append('code', countryCode?.dial_code ?? '');
      formdata.append('location', address?.fullAddress ?? '');
      formdata.append('latitude', coordinates.latitude ?? '');
      formdata.append('longitude', coordinates.longitude ?? '');

      if (extractedLocation) {
        formdata.append('country_name', extractedLocation.country ?? '');
        formdata.append('state_name', extractedLocation.state ?? '');
        formdata.append('city_name', extractedLocation.city ?? '');
      }

      console.log('Form data', formdata);

      const result = await registerUser(formdata).unwrap();
      const {status, message, user} = result;
      if (status) {
        if (user) {
          await ChatHelper.customLoginWithToken(
            user.firebase_custom_token ?? '',
          );
          await ChatHelper.createUserProfile(user);
        }
        navigateAndResetComplete('DrawerNavigator');
      } else {
        toggleMessage(message);
      }
    } catch (error: unknown) {
      const {message, errors: fieldErrors} = normalizeApiError(error);
      if (fieldErrors) {
        Object.entries(fieldErrors).forEach(([field, messages]) => {
          if (messages && messages.length > 0) {
            setError(field as keyof RegisterForm, {
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
    <View style={[VS.flex_1, CommonStyle.bgWhite]}>
      <CommonHeader
        title={t('addMember')}
        withBackArrow
        isMultiLine
        withChatNotification={false}
      />
      {isFetching || isLoading ? (
        <View style={[VS.flex_1, VS.ai_center, VS.jc_center]}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : (
        <KeyboardAwareScrollView
          contentContainerStyle={[AppStyle.flexGrow, VS.gap_16, VS.ph_16]}
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
          ScrollViewComponent={ScrollView}
          keyboardShouldPersistTaps={'handled'}
          keyboardDismissMode={'interactive'}>
          <InputBoxRHF
            fieldName="personal_name"
            control={control}
            autoCapitalize={'words'}
            headerComponent={
              <InputHeader
                title={t('forms.name.label')}
                textWeight="quickSandMedium"
              />
            }
            placeholder={t('forms.name.placeholder')}
          />
          <InputBoxRHF
            fieldName="name"
            autoCapitalize={'words'}
            control={control}
            headerComponent={
              <InputHeader
                title={t('forms.business.label')}
                textWeight="quickSandMedium"
              />
            }
            placeholder={t('forms.business.placeholder')}
          />
          <CustomDropDownList
            control={control}
            options={rolesArray ?? []}
            isSearchable
            headerTitle={t('forms.businessType.label')}
            placeholder={t('forms.businessType.placeholder')}
            fieldName="role_id"
            title={t('forms.businessType.placeholder')}
            displayValue={val => val.label}
          />

          <InputBox
            value={params?.mobile_number ?? ''}
            editable={false}
            headerComponent={
              <InputHeader
                title={t('forms.mobile.label')}
                textWeight="quickSandMedium"
              />
            }
            keyboardType="phone-pad"
            inputMode="numeric"
            placeholder={t('forms.mobile.placeholder')}
            renderLeftIcon={
              <CountrySelector
                countryCode={params.countryCode}
                isDisabled={true}
              />
            }
          />

          <SelectionInputRHF
            fieldName="location"
            control={control}
            displayValue={(value: LocationParam) => value.address.fullAddress}
            headerComponent={
              <InputHeader
                title={t('forms.location.label')}
                textWeight="quickSandMedium"
              />
            }
            onPress={() => {
              clearErrors('location');
              locationPickerRef.current = true;
              navigate('LocationSelector', {
                onGoBack: (locationData: LocationParam) => {
                  extractedLocation = locationData.address;
                  requestAnimationFrame(() => {
                    setValue('location', locationData);
                    locationPickerRef.current = false;
                  });
                },
              });
            }}
            renderRightIcon={<Icons.Location />}
            placeholder={t('forms.location.placeholder')}
          />
          <CustomButton
            isLoading={isSubmitting}
            buttonTitle={t('submit')}
            onPress={handleSubmit(onFormSubmit)}
            wrapperStyle={[VS.mv_10, VS.mh_16]}
          />
        </KeyboardAwareScrollView>
      )}
    </View>
  );
};

export default RegisterPage;
