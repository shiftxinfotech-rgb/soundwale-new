import {Images} from '@assets';
import {
  CountryCodePicker,
  CountrySelector,
  CustomButton,
  InputBoxRHF,
  InputHeader,
  Text,
} from '@components';
import {
  CountryCodeMethods,
  CountryCodeParams,
  NavigationParamStack,
} from '@data';
import {yupResolver} from '@hookform/resolvers/yup';
import {useToggleSnackBar} from '@hooks';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useSendAuthOtpMutation} from '@services';
import {AppStyle, CommonStyle, TS, VS} from '@theme';
import {
  fetchDefaultCountry,
  getSampleNumber,
  normalizeApiError,
  validField,
} from '@util';
import {TFunction} from 'i18next';
import phone from 'phone';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Image, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as Yup from 'yup';
import {Styles} from './Styles';

type LoginFormData = {
  countryCode?: CountryCodeParams;
  mobile_number: string;
};

const validationSchema = (t: TFunction<'login', undefined>) =>
  Yup.object().shape({
    mobile_number: Yup.string()
      .required(t('validation.phoneNumber.required'))
      .test('phone-validation', function (value) {
        const {dial_code, name} = this.parent.countryCode || {};
        if (!value || !dial_code) {
          return true;
        }
        const result = phone(`${dial_code} ${value}`);
        if (!result.isValid) {
          return this.createError({
            message: t('validation.phoneNumber.invalid', {countryName: name}),
          });
        }

        return true;
      }),
  });

export default function Login() {
  const {t} = useTranslation(['login', 'generic']);
  const {navigate} = useNavigation<NavigationProp<NavigationParamStack>>();
  const {toggleMessage} = useToggleSnackBar();
  const [sendAuthOtp, {isLoading}] = useSendAuthOtpMutation();
  const countrySheetRef = useRef<CountryCodeMethods | null>(null);

  const [phoneLength, setPhoneLength] = useState<number>(10);

  const {control, handleSubmit, setError, setValue, trigger, watch} =
    useForm<LoginFormData>({
      defaultValues: {
        countryCode: undefined,
        mobile_number: '',
      },
      resolver: yupResolver(validationSchema(t)),
      mode: 'onChange',
      criteriaMode: 'firstError',
      delayError: 100,
      shouldFocusError: true,
    });

  const mobile_no = watch('mobile_number');

  useEffect(() => {
    const info = fetchDefaultCountry('in');
    if (info != null) {
      setValue('countryCode', info);
      const pLen = getSampleNumber(info)?.length ?? 10;
      setPhoneLength(pLen);
    }
  }, [setValue]);

  const submitForm = useCallback(
    async (data: LoginFormData) => {
      try {
        const formData = new FormData();
        formData.append('mobile_number', data.mobile_number ?? '');
        formData.append('code', data.countryCode?.dial_code ?? '');
        const result = await sendAuthOtp(formData).unwrap();
        const {status, message, otp} = result;
        if (status) {
          navigate('Verification', {
            code: data.countryCode?.dial_code ?? '',
            countryCode: data.countryCode,
            mobile_number: data.mobile_number,
            email: '',
            lastAuthCode: otp?.toString() ?? '',
          });
        } else {
          toggleMessage(message);
        }
      } catch (error: unknown) {
        console.log('error', error);
        const {message, errors: fieldErrors} = normalizeApiError(error);
        if (fieldErrors) {
          Object.entries(fieldErrors).forEach(([field, messages]) => {
            if (messages && messages.length > 0) {
              setError(field as keyof LoginFormData, {
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
    [t, setError, toggleMessage, sendAuthOtp, navigate],
  );

  return (
    <View style={[VS.flex_1, CommonStyle.mainContainer]}>
      <Image source={Images.loginBottomMask} style={Styles.absoluteBottom} />

      <KeyboardAwareScrollView
        contentContainerStyle={[VS.ph_17, AppStyle.flexGrow]}
        showsVerticalScrollIndicator={false}
        ScrollViewComponent={ScrollView}
        alwaysBounceVertical={false}>
        <Image source={Images.loginTopMask} style={Styles.absoluteTopRight} />
        <SafeAreaView edges={['top']}>
          <View style={[Styles.spaceTop]}>
            <View style={[VS.fd_row, VS.ai_end, VS.jc_center, VS.mb_20]}>
              <Image source={Images.shapeLeft} style={Styles.shapeImage} />
              <View>
                <Image source={Images.loginImage} style={Styles.loginImage} />
              </View>
              <Image source={Images.shapeRight} style={Styles.shapeImage} />
              <View style={[Styles.absoluteText]}>
                <Text
                  fontWeight={'bold'}
                  style={[
                    TS.fs_26,
                    CommonStyle.textBlack,
                    TS.tav_center,
                    TS.ta_center,
                  ]}>
                  {t('missSound')}
                </Text>
                <Text
                  fontWeight={'quickSandSemiBold'}
                  style={[
                    TS.fs_14,
                    CommonStyle.textBlueGray,
                    TS.tav_center,
                    TS.ta_center,
                    VS.pt_5,
                  ]}>
                  {t('tuneToLogin')}
                </Text>
              </View>
            </View>
            <InputBoxRHF
              fieldName="mobile_number"
              control={control}
              headerComponent={<InputHeader title={t('phoneNumber')} />}
              placeholder={t('phoneNumberPlaceholder')}
              autoCapitalize={'none'}
              inputMode={'numeric'}
              keyboardType={'phone-pad'}
              parentStyle={[VS.mt_20]}
              maxLength={phoneLength}
              inputStyle={[VS.ph_10]}
              renderLeftIcon={
                <Controller
                  control={control}
                  name={'countryCode'}
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
            <CustomButton
              isLoading={isLoading}
              buttonTitle={t('submitBtnEmail').toLocaleUpperCase()}
              onPress={handleSubmit(submitForm)}
              wrapperStyle={[VS.mt_20, VS.mb_20]}
            />
          </View>
        </SafeAreaView>
      </KeyboardAwareScrollView>
      <CountryCodePicker
        ref={countrySheetRef}
        onSelectCountry={(info: CountryCodeParams) => {
          setValue('countryCode', info);
          const pLen = getSampleNumber(info)?.length ?? 10;
          setPhoneLength(pLen);
          if (validField(mobile_no)) {
            trigger('mobile_number');
          }
        }}
      />
    </View>
  );
}
