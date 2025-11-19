import {
  CommonHeader,
  CommonModal,
  CommonModalRef,
  ComponentStyles,
  Container,
  CustomButton,
  CustomLoader,
  InputBoxRHF,
  Text,
} from '@components';
import {DeleteFormData} from '@data';
import {yupResolver} from '@hookform/resolvers/yup';
import {useToggleSnackBar, useUserInfo} from '@hooks';
import {useDeleteAccountMutation} from '@services';
import {CommonStyle, TS, VS} from '@theme';
import {
  ChatHelper,
  navigate,
  navigateAndResetComplete,
  normalizeApiError,
} from '@util';
import React, {useCallback, useRef} from 'react';
import {Resolver, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {ScrollView, View} from 'react-native';
import * as Yup from 'yup';
import {SettingsOptionCard} from './components/SettingsOptionCard';

const settingsOptions = [
  {
    label: 'Terms and Conditions',
    value: 'terms',
  },
  {
    label: 'Privacy Policy',
    value: 'privacy',
  },
  {label: 'FAQ', value: 'faq'},
  {label: 'Delete Account', value: 'deleteAccount'},
];
const validationSchema = Yup.object().shape({
  message: Yup.string()
    .required('Input is required')
    .matches(/^DELETE$/, 'Input must be DELETE'),
});

export default function Settings() {
  const {t} = useTranslation('generic');
  const modalRef = useRef<CommonModalRef>(null);
  const successModalRef = useRef<CommonModalRef>(null);
  const {toggleMessage} = useToggleSnackBar();
  const userDetail = useUserInfo();
  const [deleteAccount, {isLoading}] = useDeleteAccountMutation();

  const {control, handleSubmit, reset, setError} = useForm<DeleteFormData>({
    defaultValues: {
      message: '',
    },
    resolver: yupResolver(
      validationSchema,
    ) as unknown as Resolver<DeleteFormData>,
    mode: 'onChange',
    criteriaMode: 'firstError',
    delayError: 100,
    shouldFocusError: true,
  });

  const submitForm = useCallback(
    async (data: DeleteFormData) => {
      try {
        modalRef?.current?.hide();
        const formData = new FormData();
        formData.append('description', data.message ?? '');
        formData.append('user_id', userDetail?.id ?? '');
        const result = await deleteAccount(formData).unwrap();
        const {status, message} = result;

        if (status) {
          reset();
          await ChatHelper.deleteChat(userDetail?.id?.toString() ?? '');
          successModalRef?.current?.show({
            title: t('success'),
            content: t('requestSent'),
            isCancel: false,
            onConfirm: () => {
              navigateAndResetComplete('Login');
            },
          });
        } else {
          toggleMessage(message);
        }
      } catch (error: unknown) {
        const {message, errors: fieldErrors} = normalizeApiError(error);
        if (fieldErrors) {
          Object.entries(fieldErrors).forEach(([field, messages]) => {
            if (messages && messages.length > 0) {
              setError(field as keyof DeleteFormData, {
                type: 'manual',
                message: messages[0],
              });
            }
          });
        } else if (message) {
          toggleMessage(message);
        } else {
          toggleMessage(t('serverError'));
        }
      }
    },
    [deleteAccount, reset, setError, t, toggleMessage, userDetail?.id],
  );

  const onOptionPress = useCallback(
    (key: string) => {
      switch (key) {
        case 'terms':
          navigate('Cms', {type: 'terms'});
          break;
        case 'privacy':
          navigate('Cms', {type: 'privacy'});
          break;
        case 'deleteAccount':
          modalRef?.current?.show({
            title: t('deleteAccount'),
            content: t('areYouSure'),
            isCancel: false,
            customButton: true,
            customView: (
              <View style={[VS.ph_10, VS.pt_10]}>
                <Text
                  fontWeight="medium"
                  style={[
                    VS.as_center,
                    VS.pb_15,
                    TS.fs_13,
                    TS.ta_center,
                    TS.lh_21,
                    CommonStyle.textRed,
                  ]}>
                  {t('typeDelete')}
                </Text>
                <InputBoxRHF
                  fieldName="message"
                  control={control}
                  headerComponent={<></>}
                  placeholder={t('delete')}
                  multiline={false}
                  autoCapitalize="characters"
                />
                <View
                  style={[
                    VS.fd_row,
                    VS.mt_20,
                    VS.mb_19,
                    VS.ai_center,
                    VS.jc_center,
                  ]}>
                  <CustomButton
                    onPress={() => {
                      reset();
                      modalRef?.current?.hide();
                    }}
                    buttonTitle={t('cancel')}
                    containerStyle={ComponentStyles.cancelButton}
                    wrapperStyle={[]}
                    titleStyle={[TS.fs_14, CommonStyle.textCancel]}
                  />

                  <CustomButton
                    onPress={handleSubmit(submitForm)}
                    buttonTitle={t('delete')}
                    titleStyle={[TS.fs_14]}
                    textFontWeight="quickSandBold"
                    containerStyle={[
                      ComponentStyles.cancelButton,
                      CommonStyle.bgPrimary,
                    ]}
                    wrapperStyle={[VS.ml_15]}
                  />
                </View>
              </View>
            ),
          });
          break;
        case 'faq':
          navigate('FAQ');
          break;
        default:
          break;
      }
    },
    [control, handleSubmit, reset, submitForm, t],
  );

  return (
    <Container>
      <View style={[VS.flex_1]}>
        <CommonHeader title={t('settings')} withBackArrow />
        <ScrollView
          contentContainerStyle={[VS.ph_15, VS.pt_20]}
          showsVerticalScrollIndicator={false}>
          {settingsOptions.map(option => (
            <SettingsOptionCard
              key={option.label}
              label={option.label}
              onPress={() => onOptionPress(option.value)}
            />
          ))}
        </ScrollView>
      </View>
      <CommonModal ref={modalRef} />
      <CommonModal ref={successModalRef} />

      {isLoading && <CustomLoader />}
    </Container>
  );
}
