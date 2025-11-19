import {Icons} from '@assets';
import {CommonHeader, Container, NoData, Text} from '@components';
import {useHasRole, useToggleSnackBar} from '@hooks';
import {useIsFocused} from '@react-navigation/native';
import {useDeleteCompanyPdfMutation, useGetCompanyPdfQuery} from '@services';
import {AppStyle, Colors, CommonStyle, TS, VS} from '@theme';
import {navigate, normalizeApiError} from '@util';
import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  Alert,
  Linking,
  TouchableOpacity,
  View,
} from 'react-native';
import {Styles} from './Styles';

export default function CompanyPdf() {
  const isFocused = useIsFocused();
  const [deleteCompanyPdf, {}] = useDeleteCompanyPdfMutation();
  const {toggleMessage} = useToggleSnackBar();
  const {t} = useTranslation(['generic']);
  const hasRole = useHasRole();

  const {
    data: companyPdfData,
    isFetching,
    isLoading,
    error,
    refetch,
  } = useGetCompanyPdfQuery(undefined, {
    refetchOnFocus: true,
    skip: !isFocused,
    refetchOnMountOrArgChange: true,
  });

  const onDeletePdf = useCallback(
    async (id: number) => {
      try {
        const formdata = new FormData();

        formdata.append('id', id);
        const result = await deleteCompanyPdf(formdata).unwrap();

        const {status, message} = result;
        if (status) {
          refetch();
        } else {
          toggleMessage(message);
        }
      } catch (err: unknown) {
        const {message} = normalizeApiError(err);
        if (message) {
          toggleMessage(message);
        } else {
          toggleMessage(t('generic:serverError'));
        }
      }
    },
    [deleteCompanyPdf, refetch, t, toggleMessage],
  );

  const openPDFViewer = async (pdfUrl: string) => {
    try {
      if (!pdfUrl || pdfUrl.trim() === '') {
        Alert.alert('Error', t('pdfNotFound'));
        return;
      }
      const supported = await Linking.canOpenURL(pdfUrl);

      if (supported) {
        await Linking.openURL(pdfUrl);
      } else {
        Alert.alert(t('pdfViewerNotFound'), t('noPdfViewerInstalled'), [
          {text: t('cancel'), style: 'cancel'},
          {
            text: t('openInBrowser'),
            onPress: async () => {
              try {
                await Linking.openURL(pdfUrl);
              } catch (err) {
                Alert.alert('Error', t('failedToOpenPdfInBrowser'));
              }
            },
          },
        ]);
      }
    } catch (err) {
      Alert.alert('Error', t('failedToOpenPdf'), [
        {text: t('ok'), style: 'default'},
      ]);
    }
  };

  return (
    <Container>
      <View style={[VS.flex_1]}>
        <CommonHeader
          title={
            hasRole([
              'sound_academy',
              'dealer_supplier_distributor_importer',
              'artist',
            ])
              ? t('myProfilePdf')
              : hasRole(['manufacturer'])
              ? t('productCatalogue')
              : t('companyPdf')
          }
          withBackArrow
          withChatNotification={false}
        />

        {!error &&
        companyPdfData &&
        companyPdfData.data &&
        companyPdfData?.data?.length > 0 ? (
          <View style={[CommonStyle.bgWhite, VS.ph_10]}>
            {companyPdfData?.data.map((item: any, index: number) => (
              <View key={index} style={[VS.mb_5]}>
                <View style={[VS.fd_row, VS.gap_10]}>
                  <View
                    style={[
                      VS.br_10,
                      CommonStyle.bgWhite,
                      CommonStyle.shadowBox,
                      VS.pv_10,
                      VS.ph_15,
                      VS.mt_17,
                      VS.fd_row,
                      VS.jc_space_between,
                      AppStyle.fullWidth,
                    ]}>
                    <Text
                      fontWeight="medium"
                      style={[
                        TS.fs_14,
                        TS.tt_capitalize,
                        CommonStyle.textBlack,
                        TS.pt_5,
                        VS.flex_1,
                      ]}>
                      {item.name
                        ? item.name
                        : item.file_name
                        ? item.file_name
                        : item.image}
                    </Text>

                    {item.image_url && (
                      <TouchableOpacity
                        onPress={() => openPDFViewer(item.image_url)}
                        style={[
                          VS.pv_8,
                          VS.ph_12,
                          item.name && VS.ml_10,
                          CommonStyle.bgPrimary,
                          VS.br_8,
                          VS.ai_center,
                          VS.as_center,
                        ]}>
                        <Text
                          fontWeight="bold"
                          style={[
                            TS.fs_12,
                            CommonStyle.textWhite,
                            TS.tt_capitalize,
                          ]}>
                          {t('viewPdf')}
                        </Text>
                      </TouchableOpacity>
                    )}

                    <TouchableOpacity
                      onPress={() => onDeletePdf(item.id)}
                      style={[VS.ai_center, VS.jc_center, VS.ml_10]}>
                      <Icons.Delete color={Colors.primary} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View style={[VS.flex_1, VS.ai_center, VS.jc_center]}>
            {isFetching || isLoading ? (
              <ActivityIndicator size="large" color={Colors.primary} />
            ) : (
              <>
                <NoData message={t('noPdfFound')} />
                <TouchableOpacity
                  activeOpacity={1}
                  style={[Styles.addButtonContainer]}
                  onPress={() => navigate('AddCompanyPdf')}>
                  <Icons.CirclePlus />
                </TouchableOpacity>
              </>
            )}
          </View>
        )}

        <TouchableOpacity
          activeOpacity={1}
          style={[Styles.addButtonContainer]}
          onPress={() => navigate('AddCompanyPdf')}>
          <Icons.CirclePlus />
        </TouchableOpacity>
      </View>
    </Container>
  );
}
