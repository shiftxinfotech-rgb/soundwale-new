import {CustomButton, InputBoxRHF, InputHeader} from '@components';
import {WorkingWithRequestParams} from '@data';
import {yupResolver} from '@hookform/resolvers/yup';
import {useToggleSnackBar} from '@hooks';
import {useUpdateWorkingWithRequestMutation} from '@services';
import {AppStyle, VS} from '@theme';
import {normalizeApiError} from '@util';
import {TFunction} from 'i18next';
import React, {useCallback} from 'react';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller';
import * as Yup from 'yup';

const validationSchema = (
  t: TFunction<['contactUs', 'generic', 'register'], undefined>,
) =>
  Yup.object().shape({
    reject_reason: Yup.string().required(
      t('register:validation.common.required', {
        label: t('generic:rejectReason'),
      }),
    ),
  });

export default function RejectionModal({
  requestId,
  onClose,
}: {
  requestId: string;
  onClose: () => void;
}) {
  const {t} = useTranslation(['contactUs', 'generic', 'register']);
  const {toggleMessage} = useToggleSnackBar();

  const [updateWorkingWithRequest, {isLoading}] =
    useUpdateWorkingWithRequestMutation();

  const {control, handleSubmit, setError} = useForm<WorkingWithRequestParams>({
    defaultValues: {
      reject_reason: '',
    },
    resolver: yupResolver(validationSchema(t) as any),
    mode: 'onChange',
    criteriaMode: 'firstError',
    delayError: 100,
    shouldFocusError: true,
  });

  const submitForm = useCallback(
    async (data: WorkingWithRequestParams) => {
      try {
        const formData = new FormData();
        formData.append('reject_reason', data.reject_reason ?? '');
        formData.append('id', requestId);
        formData.append('status', '2');
        const result = await updateWorkingWithRequest(formData).unwrap();
        const {status, message} = result;
        if (status) {
          onClose();
        } else {
          toggleMessage(message);
        }
      } catch (error: unknown) {
        const {message, errors: fieldErrors} = normalizeApiError(error);
        if (fieldErrors) {
          Object.entries(fieldErrors).forEach(([field, messages]) => {
            if (messages && messages.length > 0) {
              setError(field as keyof WorkingWithRequestParams, {
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
    [setError, t, toggleMessage, updateWorkingWithRequest, onClose, requestId],
  );

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={[AppStyle.flexGrow, VS.p_15]}
      showsVerticalScrollIndicator={false}
      ScrollViewComponent={ScrollView}
      alwaysBounceVertical={false}>
      <View style={[VS.gap_17]}>
        <InputBoxRHF
          fieldName="reject_reason"
          control={control}
          headerComponent={<InputHeader title={t('generic:rejectReason')} />}
          placeholder={t('generic:rejectReasonPlaceholder')}
          autoCapitalize={'words'}
          maxLength={1000}
          multiline
          numberOfLines={4}
        />
        <CustomButton
          buttonTitle={t('submit')}
          isLoading={isLoading}
          containerStyle={VS.mt_5}
          onPress={handleSubmit(submitForm)}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}
