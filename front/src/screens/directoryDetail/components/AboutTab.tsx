import {NoData, Text} from '@components';
import {DirectoryDetail} from '@data';
import {CommonStyle, TS, VS} from '@theme';
import {validField} from '@util';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';

type AboutTabProps = {
  info: DirectoryDetail;
};

export default function AboutTab({info}: AboutTabProps) {
  const {t} = useTranslation(['generic']);
  const {company_about} = info;

  const haveDescription = validField(company_about);

  if (!haveDescription) {
    return <NoData message={t('noInformationFound')} />;
  }

  return (
    <View style={[VS.gap_10, CommonStyle.shadowBoxLight, VS.br_10, VS.p_10]}>
      <Text
        fontWeight="semiBold"
        style={[
          TS.fs_13,
          TS.lh_21,
          TS.ls_0_2,
          TS.ta_justify,
          TS.tt_capitalize,
          CommonStyle.textBlack,
        ]}>
        {company_about}
      </Text>
    </View>
  );
}
