import {NoData, Text} from '@components';
import {DirectoryDetail} from '@data';
import {CommonStyle, TS, VS} from '@theme';
import {Scale, setField, validField} from '@util';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';

type OperatingMixerTabProps = {
  info: DirectoryDetail;
};

export default function OperatingMixerTab({info}: OperatingMixerTabProps) {
  const {t} = useTranslation(['generic']);
  const {mixer_names_info: details} = info;

  const hasInfo =
    validField(details) && (JSON.parse(details!) || []).length > 0;
  if (!hasInfo) {
    return <NoData message={t('noInformationFound')} />;
  }
  const detailsArray = JSON.parse(details!) || [];

  return (
    <View style={[VS.gap_10]}>
      {hasInfo ? (
        <View style={[VS.gap_10, VS.flex_1]}>
          {detailsArray.map((el: any, index: number) => (
            <View
              key={index}
              style={[VS.gap_6, CommonStyle.shadowBoxLight, VS.br_10, VS.p_10]}>
              <RowItem
                label={`${t('company')} : `}
                value={el.company_name || ''}
              />
              <RowItem label={`${t('model')} : `} value={el.model_name || ''} />
            </View>
          ))}
        </View>
      ) : (
        <></>
      )}
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
