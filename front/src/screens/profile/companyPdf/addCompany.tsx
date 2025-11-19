import {Icons} from '@assets';
import {
  CommonHeader,
  CommonModal,
  CommonModalRef,
  Container,
  CustomButton,
  InputBoxRHF,
  InputHeader,
  Text,
} from '@components';
import {NavigationParamStack} from '@data';
import {yupResolver} from '@hookform/resolvers/yup';
import {useHasRole, useToggleSnackBar} from '@hooks';
import {pick, types} from '@react-native-documents/picker';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';
import {useAddCompanyPdfMutation} from '@services';
import {AppStyle, Colors, CommonStyle, TS, VS} from '@theme';
import {hexToRgbA, normalizeApiError} from '@util';
import React, {useCallback, useRef, useState} from 'react';
import {Resolver, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Yup from 'yup';
import {Styles} from './Styles';

type AddCompanyPdfRouteProp = RouteProp<NavigationParamStack, 'AddCompanyPdf'>;

type InputFormParam = {
  company_names_pdf: string;
  company_names: string;
};

const AddCompanyPdfScreen: React.FC<{route: AddCompanyPdfRouteProp}> = () => {
  const {toggleMessage} = useToggleSnackBar();
  const {t} = useTranslation(['generic', 'register']);
  const modalRef = useRef<CommonModalRef>(null);
  const {goBack} = useNavigation<NavigationProp<NavigationParamStack>>();
  const hasRole = useHasRole();

  const [addCompanyPdf, {isLoading}] = useAddCompanyPdfMutation();
  const [selectedPdf, setSelectedPdf] = useState<{
    uri: string;
    name: string;
  } | null>(null);

  const validationSchema = Yup.object().shape({
    company_names_pdf: Yup.string()
      .required(t('pdfFileRequired'))
      .test('is-pdf', t('onlyPdfAllowed'), value =>
        value ? value.toLowerCase().endsWith('.pdf') : false,
      ),
    company_names: Yup.string().required(t('companyNameRequired')),
  });

  const {
    handleSubmit,
    setValue,
    setError,
    reset,
    control,
    clearErrors,
    formState: {errors},
  } = useForm<InputFormParam>({
    defaultValues: {
      company_names_pdf: '',
      company_names: '',
    },
    mode: 'onChange',
    resolver: yupResolver(
      validationSchema,
    ) as unknown as Resolver<InputFormParam>,
    criteriaMode: 'firstError',
    delayError: 100,
    shouldFocusError: true,
  });

  const pickDocument = async () => {
    try {
      const [result] = await pick({
        type: [types.pdf],
        copyTo: 'cachesDirectory',
        maxSize: 10 * 1024 * 1024,
      });
      if (!result.type?.includes('pdf')) {
        toggleMessage(t('pleaseSelectPdf'));
        return;
      }
      clearErrors('company_names_pdf');
      setSelectedPdf({uri: result?.uri, name: result.name ?? ''});
      setValue('company_names_pdf', result.name ?? '');
    } catch (err: unknown) {
      toggleMessage(t('errorWhilePickingDocument'));
    }
  };

  const onSubmit = useCallback(
    async (data: InputFormParam) => {
      try {
        const formdata = new FormData();

        if (selectedPdf) {
          formdata.append('company_names_pdf[]', {
            uri: selectedPdf.uri,
            name: selectedPdf.name,
            type: 'application/pdf',
          });
        }
        formdata.append('company_names[]', data.company_names ?? '');

        const result = await addCompanyPdf(formdata).unwrap();

        const {status, message} = result;
        if (status) {
          modalRef?.current?.show({
            title: t('success'),
            content: message,
            isCancel: false,
            onClose: goBack,
          });
          reset();
          setSelectedPdf(null);
          setValue('company_names_pdf', '');
          setValue('company_names', '');
        } else {
          toggleMessage(message);
        }
      } catch (error: unknown) {
        const {message, errors: fieldErrors} = normalizeApiError(error);
        if (fieldErrors) {
          Object.entries(fieldErrors).forEach(([field, messages]) => {
            if (messages && messages.length > 0) {
              setError(field as keyof InputFormParam, {
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
      addCompanyPdf,
      goBack,
      reset,
      selectedPdf,
      setError,
      setValue,
      t,
      toggleMessage,
    ],
  );

  return (
    <Container>
      <View style={[VS.flex_1]}>
        <CommonHeader title={t('uploadPdf')} withBackArrow />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[VS.ph_15, VS.gap_10, VS.mt_15]}>
            <InputBoxRHF
              fieldName={'company_names'}
              control={control}
              headerComponent={
                <InputHeader
                  title={
                    hasRole([
                      'sound_academy',
                      'manufacturer',
                      'dealer_supplier_distributor_importer',
                      'artist',
                    ])
                      ? t('name')
                      : t('register:forms.manufacturer.placeholder')
                  }
                  textWeight="quickSandMedium"
                />
              }
              placeholder={
                hasRole([
                  'sound_academy',
                  'manufacturer',
                  'dealer_supplier_distributor_importer',
                  'artist',
                ])
                  ? t('enterName')
                  : t('register:forms.manufacturer.placeholder')
              }
              parentStyle={[VS.mb_12, VS.flex_1]}
            />
            {/* )} */}
            <TouchableOpacity
              style={[Styles.videoUploadContainer]}
              activeOpacity={1}
              onPress={pickDocument}>
              <LinearGradient
                colors={[
                  Colors.white,
                  Colors.white,
                  hexToRgbA(Colors.gradientStart, '0.3'),
                  hexToRgbA(Colors.gradientEnd, '0.3'),
                ]}
                locations={[0, 0.65, 0.9, 1]}
                start={{x: 0.6, y: 1}}
                end={{x: 1, y: 0}}
                style={[VS.br_12, AppStyle.fullWidth]}>
                <View
                  style={[
                    VS.ai_center,
                    VS.as_center,
                    VS.jc_center,
                    VS.gap_16,
                    VS.pv_36,
                  ]}>
                  <Icons.UploadVideo />
                  <View
                    style={[
                      VS.gap_10,
                      VS.ai_center,
                      VS.as_center,
                      VS.jc_center,
                    ]}>
                    <Text
                      fontWeight={'bold'}
                      style={[TS.fs_21, CommonStyle.textBlack]}>
                      {t('selectPdf')}
                    </Text>
                    <Text
                      fontWeight={'medium'}
                      style={[TS.fs_14, CommonStyle.textBlack]}>
                      {t('supportedFormats')}{' '}
                      <Text style={[TS.fs_14, CommonStyle.textPrimary]}>
                        {t('pdf')}
                      </Text>
                    </Text>
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>

            {errors.company_names_pdf &&
              errors.company_names_pdf?.message !== '' && (
                <Text style={[TS.fs_12, CommonStyle.textRed]}>
                  {errors?.company_names_pdf?.message}
                </Text>
              )}

            {selectedPdf && (
              <View>
                <Text style={[TS.fs_15]}>{selectedPdf.name ?? ''}</Text>
              </View>
            )}
            <CustomButton
              buttonTitle={t('submit')}
              isLoading={isLoading}
              containerStyle={[VS.mt_10]}
              onPress={handleSubmit(onSubmit)}
            />
          </View>
        </ScrollView>
      </View>
      <CommonModal ref={modalRef} />
    </Container>
  );
};

export default AddCompanyPdfScreen;
