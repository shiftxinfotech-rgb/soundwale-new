import {NoData, Text} from '@components';
import {DirectoryDetail} from '@data';
import {AppStyle, CommonStyle, TS, VS} from '@theme';
import {setField, validField} from '@util';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';

type TabProps = {
  info: DirectoryDetail;
};

export default function ManufacturingProductTab({info}: TabProps) {
  const {t} = useTranslation(['generic']);
  const {manufacturing_product_info: details} = info;
  const hasInfo = validField(details) && JSON.parse(details!).length > 0;

  if (!hasInfo) {
    return <NoData message={t('noInformationFound')} />;
  }

  const detailsArray = JSON.parse(details!) || [];

  return (
    <View style={[VS.gap_10]}>
      {detailsArray.map((item: any, index: number) => (
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
            {setField(item.product_name)}
          </Text>
        </View>
      ))}
    </View>
  );
}
