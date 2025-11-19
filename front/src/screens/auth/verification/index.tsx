import {Images} from '@assets';
import {CustomButton, Text} from '@components';
import {NavigationParamStack} from '@data';
import {useCountdownTimer, useToggleSnackBar} from '@hooks';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useSendAuthOtpMutation, useVerifyAuthOtpMutation} from '@services';
import {AppStyle, Colors, CommonStyle, TS, VS} from '@theme';

import {
  ChatHelper,
  formatSeconds,
  maskString,
  navigateAndResetComplete,
  normalizeApiError,
  validField,
} from '@util';
import React, {useCallback, useEffect, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller';
import OTPTextInput from 'react-native-otp-textinput';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Styles} from './Styles';

let lastAuthCodeVal: string | undefined;
let inputAuthCodeVal: string | undefined;
export default function Verification() {
  const {t} = useTranslation(['verification', 'generic']);
  const {toggleMessage} = useToggleSnackBar();
  const otpRef = useRef<OTPTextInput>(null);
  const {navigate, addListener} =
    useNavigation<NavigationProp<NavigationParamStack>>();
  const {params} = useRoute<RouteProp<NavigationParamStack, 'Verification'>>();
  const {seconds, startTimer, stopTimer, restartTimer} = useCountdownTimer(60);

  const [sendAuthOtp] = useSendAuthOtpMutation();
  const [verifyAuthOtp, {isLoading: isVerifyLoading}] =
    useVerifyAuthOtpMutation();

  useEffect(() => {
    const listener = addListener('focus', () => {
      lastAuthCodeVal = params.lastAuthCode;
      startTimer();
      otpRef.current?.onInputFocus(0);
    });
    return () => listener();
  }, [addListener, params.lastAuthCode, startTimer]);

  const resendCode = useCallback(async () => {
    otpRef.current?.clear();
    try {
      const formData = new FormData();
      formData.append('mobile_number', params.mobile_number);
      formData.append('code', params.code);
      const result = await sendAuthOtp(formData).unwrap();
      const {status, message, otp} = result;
      if (status) {
        lastAuthCodeVal = otp?.toString() ?? '';
        restartTimer();
      } else {
        toggleMessage(message);
      }
    } catch (error: unknown) {
      const {message} = normalizeApiError(error);
      if (message) {
        toggleMessage(message);
      } else {
        toggleMessage(t('generic:serverError'));
      }
    }
  }, [
    params.code,
    params.mobile_number,
    restartTimer,
    sendAuthOtp,
    t,
    toggleMessage,
  ]);

  const submitForm = useCallback(async () => {
    try {
      if (!validField(inputAuthCodeVal)) {
        toggleMessage(t('invalidCode'));
        return;
      }
      if (inputAuthCodeVal!.length < 6) {
        toggleMessage(t('shortCode'));
        return;
      }
      if (lastAuthCodeVal !== inputAuthCodeVal) {
        toggleMessage(t('codeMismatch'));
        return;
      }

      const formData = new FormData();
      formData.append('mobile_number', params.mobile_number);
      formData.append('code', params.code);
      formData.append('otp', inputAuthCodeVal);
      const result = await verifyAuthOtp(formData).unwrap();

      const {status, message, user} = result;
      if (status) {
        if (!user) {
          stopTimer();
          navigate('RegisterForm', params);
        } else {
          await ChatHelper.customLoginWithToken(
            user.firebase_custom_token ?? '',
          );
          await ChatHelper.createUserProfile(user);
          navigateAndResetComplete('DrawerNavigator');
        }
      } else {
        toggleMessage(message);
      }
    } catch (error: unknown) {
      const {message} = normalizeApiError(error);
      if (message) {
        toggleMessage(message);
      } else {
        toggleMessage(t('generic:serverError'));
      }
    }
  }, [navigate, params, stopTimer, t, toggleMessage, verifyAuthOtp]);

  return (
    <View style={[VS.flex_1, CommonStyle.mainContainer]}>
      <Image source={Images.loginBottomMask} style={Styles.absoluteBottom} />
      <KeyboardAwareScrollView
        contentContainerStyle={[AppStyle.flexGrow]}
        showsVerticalScrollIndicator={false}
        ScrollViewComponent={ScrollView}
        alwaysBounceVertical={false}>
        <Image source={Images.loginTopMask} style={Styles.absoluteTopRight} />

        <SafeAreaView style={[VS.flex_1]}>
          <View style={[Styles.spaceTop, VS.flex_1]}>
            <View style={[VS.fd_row, VS.ai_end, VS.jc_center]}>
              <Image source={Images.shapeLeft} style={Styles.shapeImage} />
              <View>
                <Image
                  source={Images.verificationImage}
                  style={Styles.loginImage}
                />
              </View>
              <Image source={Images.shapeRight} style={Styles.shapeImage} />
            </View>
            <View style={[VS.ph_15, VS.pt_5]}>
              <Text
                fontWeight={'bold'}
                style={[
                  TS.fs_26,
                  CommonStyle.textBlack,
                  TS.tav_center,
                  TS.ta_center,
                ]}>
                {t('enterVerificationCode')}
              </Text>
              <Text
                fontWeight={'quickSandSemiBold'}
                style={[
                  TS.fs_14,
                  CommonStyle.textBlueGray,
                  TS.tav_center,
                  TS.ta_center,
                  VS.as_center,
                  VS.pt_5,
                  VS.pb_10,
                  VS.ph_18,
                ]}>
                {t('enterVerificationCodePlaceholder')}
              </Text>
              <Text
                fontWeight={'bold'}
                style={[
                  TS.fs_17,
                  TS.lh_26,
                  CommonStyle.textBlack,
                  TS.tav_center,
                  TS.ta_center,
                ]}>
                {params.code} {maskString(params.mobile_number)}
              </Text>
              <View style={[VS.mb_10, VS.mt_14]}>
                <OTPTextInput
                  ref={otpRef}
                  containerStyle={Styles.otpContainer}
                  textInputStyle={Styles.otpInput}
                  inputCount={6}
                  handleTextChange={code => {
                    inputAuthCodeVal = code;
                  }}
                  keyboardType="phone-pad"
                  autoFocus={true}
                  tintColor={Colors.primary}
                  offTintColor={Colors.dimGray}
                />
              </View>
              {seconds > 0 ? (
                <Text
                  fontWeight={'medium'}
                  style={[
                    TS.fs_15,
                    TS.lh_26,
                    CommonStyle.textBlack,
                    TS.tav_center,
                    TS.ta_center,
                  ]}>
                  {t('authExpireIn', {duration: formatSeconds(seconds)})}
                </Text>
              ) : (
                <Text
                  fontWeight={'medium'}
                  style={[
                    TS.fs_15,
                    CommonStyle.textBlack,
                    TS.tav_center,
                    TS.ta_center,
                  ]}>
                  {t('notReceived')}{' '}
                  <Text
                    onPress={resendCode}
                    fontWeight={'semiBold'}
                    style={[
                      TS.fs_15,
                      CommonStyle.textPrimary,
                      TS.tav_center,
                      TS.ta_center,
                    ]}>
                    {t('resendCode')}
                  </Text>
                </Text>
              )}
              <CustomButton
                isLoading={isVerifyLoading}
                buttonTitle={t('submit').toLocaleUpperCase()}
                onPress={submitForm}
                wrapperStyle={[VS.mt_15, VS.mb_14]}
              />
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    </View>
  );
}
