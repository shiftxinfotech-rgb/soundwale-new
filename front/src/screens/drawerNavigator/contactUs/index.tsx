import {
  CommonHeader,
  CommonModal,
  CommonModalRef,
  Container,
  CountryCodePicker,
  CountrySelector,
  CustomButton,
  InputBoxRHF,
  InputHeader,
} from '@components';
import {ContactUsFormData, CountryCodeMethods, CountryCodeParams} from '@data';
import {yupResolver} from '@hookform/resolvers/yup';
import {useToggleSnackBar, useUserInfo} from '@hooks';
import {useNavigation} from '@react-navigation/native';
import {useContactUsMutation} from '@services';
import {AppStyle, VS} from '@theme';
import {
  fetchCodeInformation,
  getSampleNumber,
  normalizeApiError,
  URL_REGEX,
  validField,
} from '@util';
import {TFunction} from 'i18next';
import phone from 'phone';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller';
import * as Yup from 'yup';
import {Styles} from './Styles';

const validationSchema = (t: TFunction<'contactUs', undefined>) =>
  Yup.object().shape({
    name: Yup.string().required(t('validation.name.required')),
    email: Yup.string()
      .required(t('validation.email.required'))
      .email(t('validation.email.invalid'))
      .matches(URL_REGEX.emailRegex, t('validation.email.invalid')),
    mobile_number: Yup.string()
      .required(t('validation.phone.required'))
      .test('phone-validation', function (value) {
        const {dial_code, name} = this.parent.country_code;
        const result = phone(`${dial_code} ${value}`);
        if (!result.isValid) {
          return this.createError({
            message: t('validation.phone.invalid', {countryName: name}),
          });
        }
        return true;
      }),
    message: Yup.string().required(t('validation.message.required')),
  });
export default function ContactUs() {
  const {t} = useTranslation(['contactUs', 'generic']);
  const {toggleMessage} = useToggleSnackBar();
  const {goBack} = useNavigation();
  const userDetail = useUserInfo();

  const modalRef = useRef<CommonModalRef>(null);
  const countrySheetRef = useRef<CountryCodeMethods | null>(null);

  const [contactUs, {isLoading}] = useContactUsMutation();

  const [countryCodeInfo, setCountryCodeInfo] = useState<
    CountryCodeParams | undefined
  >(undefined);
  const [phoneLength, setPhoneLength] = useState<number>(10);

  const {control, handleSubmit, reset, setError, setValue, trigger, watch} =
    useForm<ContactUsFormData>({
      defaultValues: {
        name: userDetail?.name ?? '',
        email: userDetail?.email ?? '',
        mobile_number: userDetail?.mobile_number ?? '',
        country_code: undefined,
        message: '',
      },
      resolver: yupResolver(validationSchema(t)),
      mode: 'onChange',
      criteriaMode: 'firstError',
      delayError: 100,
      shouldFocusError: true,
    });
  const mobile_no = watch('mobile_number');

  useEffect(() => {
    if (userDetail) {
      const cName = userDetail?.code;
      const info = fetchCodeInformation(cName);
      if (info != null) {
        setCountryCodeInfo(info);
        setValue('country_code', info);
        const pLen = getSampleNumber(info)?.length ?? 10;
        setPhoneLength(pLen);
      }
    }
  }, [setValue, userDetail]);

  const submitForm = useCallback(
    async (data: ContactUsFormData) => {
      try {
        const formData = new FormData();
        formData.append('name', data.name ?? '');
        formData.append('email', data.email ?? '');
        formData.append('message', data.message ?? '');
        formData.append('country_code', data.country_code?.dial_code ?? '');
        formData.append('mobile_number', data.mobile_number ?? '');

        const result = await contactUs(formData).unwrap();
        const {status, message} = result;
        if (status) {
          modalRef?.current?.show({
            title: 'Success!',
            content: message,
            isCancel: false,
            onClose: goBack,
          });
          reset();
          setValue('country_code', countryCodeInfo);
          const pLen = getSampleNumber(countryCodeInfo)?.length ?? 10;
          setPhoneLength(pLen);
        } else {
          toggleMessage(message);
        }
      } catch (error: unknown) {
        const {message, errors: fieldErrors} = normalizeApiError(error);
        if (fieldErrors) {
          Object.entries(fieldErrors).forEach(([field, messages]) => {
            if (messages && messages.length > 0) {
              setError(field as keyof ContactUsFormData, {
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
    },
    [
      contactUs,
      countryCodeInfo,
      goBack,
      reset,
      setError,
      setValue,
      t,
      toggleMessage,
    ],
  );

  return (
    <Container>
      <View style={[VS.flex_1]}>
        <CommonHeader title={t('contactUs')} withBackArrow />
        <View style={[VS.pv_7, VS.ph_16, VS.flex_1]}>
          <KeyboardAwareScrollView
            contentContainerStyle={[AppStyle.flexGrow]}
            showsVerticalScrollIndicator={false}
            alwaysBounceVertical={false}
            ScrollViewComponent={ScrollView}>
            <View style={[VS.gap_17]}>
              <InputBoxRHF
                fieldName="name"
                control={control}
                headerComponent={<InputHeader title={t('name')} />}
                placeholder={t('namePlaceholder')}
                autoCapitalize={'none'}
                maxLength={30}
              />
              <InputBoxRHF
                fieldName="email"
                control={control}
                headerComponent={<InputHeader title={t('emailId')} />}
                placeholder={t('emailIdPlaceholder')}
                autoCapitalize={'none'}
                inputMode={'email'}
                textContentType={'emailAddress'}
                maxLength={246}
              />
              <InputBoxRHF
                fieldName="mobile_number"
                control={control}
                headerComponent={<InputHeader title={t('phoneNo')} />}
                placeholder={t('phoneNoPlaceholder')}
                autoCapitalize={'none'}
                inputMode={'numeric'}
                inputStyle={[VS.ph_10]}
                maxLength={phoneLength}
                renderLeftIcon={
                  <Controller
                    control={control}
                    name={'country_code'}
                    render={({field: {value}}) => (
                      <CountrySelector
                        countryCode={value}
                        onPressButton={() => {
                          countrySheetRef?.current?.onPresent();
                        }}
                      />
                    )}
                  />
                }
              />
              <InputBoxRHF
                fieldName="message"
                control={control}
                headerComponent={<InputHeader title={t('message')} />}
                placeholder={t('messagePlaceholder')}
                autoCapitalize={'none'}
                multiline={true}
                maxLength={1000}
                textInputStyle={[Styles.inputView]}
              />
              <CustomButton
                buttonTitle={t('submit')}
                isLoading={isLoading}
                containerStyle={VS.mt_5}
                wrapperStyle={[VS.mb_20]}
                onPress={handleSubmit(submitForm)}
              />
            </View>
          </KeyboardAwareScrollView>
        </View>

        <CountryCodePicker
          ref={countrySheetRef}
          onSelectCountry={(info: CountryCodeParams) => {
            setValue('country_code', info);
            const pLen = getSampleNumber(info)?.length ?? 10;
            setPhoneLength(pLen);
            if (validField(mobile_no)) {
              trigger('mobile_number');
            }
          }}
        />
      </View>
      <CommonModal ref={modalRef} />
    </Container>
  );
}
