import {NoData, Text} from '@components';
import {DirectoryDetail} from '@data';
import {CommonStyle, TS, VS} from '@theme';
import {Scale, setField, validField} from '@util';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';

type OtherInfoTabProps = {
  info: DirectoryDetail;
};

export default function OtherInfoTab({info}: OtherInfoTabProps) {
  const {t} = useTranslation(['generic']);
  const {service_center_info} = info || {};

  const haveServiceCenter =
    validField(service_center_info) &&
    JSON.parse(service_center_info as string).length > 0;

  if (!haveServiceCenter) {
    return <NoData message={t('noInformationFound')} />;
  }

  return (
    <View style={[VS.gap_10]}>
      {haveServiceCenter && (
        <View style={[VS.gap_10]}>
          <Text fontWeight="bold" style={[TS.fs_16, TS.tt_capitalize]}>
            {t('serviceCenterInfo')}
          </Text>
          <View style={[VS.gap_10]}>
            {JSON.parse(service_center_info as string).map(
              (el: any, index: number) => (
                <View
                  key={index}
                  style={[
                    CommonStyle.shadowBoxLight,
                    VS.p_10,
                    VS.br_10,
                    VS.gap_9,
                  ]}>
                  <ServiceCenterItem
                    label={`${t('company')} : `}
                    value={el.company_name}
                  />
                  <ServiceCenterItem
                    label={`${t('location')} : `}
                    value={el.location}
                  />
                </View>
              ),
            )}
          </View>
        </View>
      )}
    </View>
  );
}

const ServiceCenterItem = ({label, value}: {label: string; value: string}) => {
  return (
    <View style={[VS.fd_row, VS.gap_10, VS.ai_center]}>
      <Text
        fontWeight="bold"
        style={[
          TS.fs_14,
          TS.tt_capitalize,
          CommonStyle.textBlack,
          {minWidth: Scale(80)},
        ]}>
        {label}
      </Text>
      <Text
        style={[
          TS.fs_12,
          TS.tt_capitalize,
          CommonStyle.textBlack,
          VS.flex_1,
          TS.ta_justify,
        ]}>
        {setField(value)}
      </Text>
    </View>
  );
};
