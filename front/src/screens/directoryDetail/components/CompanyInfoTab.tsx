import {NoData, Text} from '@components';
import {DirectoryDetail} from '@data';
import {AppStyle, CommonStyle, TS, VS} from '@theme';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity, View} from 'react-native';

type CompanyInfoTabProps = {
  info: DirectoryDetail;
  openPDFViewer: (pdfUrl: string) => void;
};

export default function CompanyInfoTab({
  info,
  openPDFViewer,
}: CompanyInfoTabProps) {
  const {t} = useTranslation(['generic']);
  const {company_pdf_data: details} = info;
  const hasInfo = Array.isArray(details) && details.length > 0;

  if (!hasInfo) {
    return <NoData message={t('noInformationFound')} />;
  }

  return (
    <View style={[VS.gap_10]}>
      {details.map((item: any, index: number) => (
        <View
          key={index}
          style={[
            CommonStyle.bgWhite,
            CommonStyle.shadowBox,
            VS.br_10,
            VS.p_10,
            VS.fd_row,
            VS.gap_10,
            VS.jc_space_between,
            VS.ai_center,
            AppStyle.fullWidth,
          ]}>
          <Text
            fontWeight="medium"
            style={[
              TS.fs_14,
              TS.tt_capitalize,
              CommonStyle.textBlack,
              VS.flex_1,
            ]}>
            {item.name}
          </Text>

          {item.image_url && (
            <TouchableOpacity
              onPress={() => openPDFViewer(item.image_url)}
              style={[
                VS.pv_8,
                VS.ph_10,
                VS.br_8,
                VS.ai_center,
                CommonStyle.bgPrimary,
              ]}>
              <Text
                fontWeight="bold"
                style={[TS.fs_12, CommonStyle.textWhite, TS.tt_capitalize]}>
                {t('viewPdf')}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
    </View>
  );
}
