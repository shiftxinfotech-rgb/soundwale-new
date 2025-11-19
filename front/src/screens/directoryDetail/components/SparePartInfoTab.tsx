import {NoData, Text} from '@components';
import {DirectoryDetail} from '@data';
import {CommonStyle, TS, VS} from '@theme';
import {Scale, setField, validField} from '@util';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';

type SparePartInfoTabProps = {
  info: DirectoryDetail;
};

export default function SparePartInfoTab({info}: SparePartInfoTabProps) {
  const {t} = useTranslation(['generic']);
  const {spare_part_info} = info;
  const hasInfo = validField(spare_part_info);
  if (!hasInfo) {
    return <NoData message={t('noInformationFound')} />;
  }

  const spareParts = hasInfo ? JSON.parse(spare_part_info!) : [];

  if (spareParts.length === 0) {
    return <NoData message={t('noInformationFound')} />;
  }

  return (
    <View style={[VS.gap_10]}>
      {spareParts?.map((el: any, index: number) => (
        <View
          key={index}
          style={[VS.gap_6, CommonStyle.shadowBoxLight, VS.br_10, VS.p_10]}>
          <RowItem label={`${t('partName')} : `} value={el.parts_name || ''} />
          <RowItem label={`${t('company')} : `} value={el.company_name || ''} />
          <RowItem label={`${t('partDetail')} : `} value={el.details || ''} />
        </View>
      ))}
    </View>
  );
}

const RowItem = ({label, value}: {label: string; value: string}) => {
  return (
    <View style={[VS.fd_row, VS.gap_10, VS.ai_center, VS.flex_1]}>
      <Text
        fontWeight="bold"
        style={[
          TS.fs_16,
          TS.tt_capitalize,
          CommonStyle.textBlack,
          {minWidth: Scale(90)},
        ]}>
        {label}
      </Text>
      <View style={[VS.flex_1]}>
        <Text style={[TS.fs_14, TS.tt_capitalize, CommonStyle.textBlack]}>
          {setField(value)}
        </Text>
      </View>
    </View>
  );
};
