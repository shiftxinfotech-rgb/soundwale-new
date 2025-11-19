import {NoData, Text, VectorIcon} from '@components';
import {DirectoryDetail} from '@data';
import {Colors, CommonStyle, TS, VS} from '@theme';
import {
  createOpenLink,
  openPhoneCall,
  Scale,
  setField,
  validField,
} from '@util';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity, View} from 'react-native';

type ServiceCenterTabProps = {
  info: DirectoryDetail;
};

const DealerServiceCenter = ({
  serviceCenterInfo,
  t,
}: {
  serviceCenterInfo: string;
  t: any;
}) => {
  const serviceCenters = JSON.parse(serviceCenterInfo);

  return (
    <>
      <Text fontWeight="bold" style={[TS.fs_16, TS.tt_capitalize]}>
        {t('serviceCenter')}
      </Text>
      <View style={[VS.gap_10]}>
        {serviceCenters.map((el: any, index: number) => (
          <View
            key={index}
            style={[CommonStyle.shadowBoxLight, VS.p_10, VS.br_10, VS.gap_9]}>
            <ServiceCenterItem
              label={`${t('centerName')} : `}
              value={el.center_name}
              onPress={() => {}}
            />
            <ServiceCenterItem
              label={`${t('company')} : `}
              value={el.company_name}
              onPress={() => {}}
            />
            <ServiceCenterItem
              label={`${t('location')} : `}
              value={el.location}
              icon={
                <VectorIcon
                  iconColor={Colors.black}
                  iconSize={Scale(25)}
                  iconName="location-pin"
                  iconType={2}
                />
              }
              onPress={() => {
                try {
                  createOpenLink({
                    travelType: 'public_transport',
                    end: el.location,
                    latitude: parseFloat(el.latitude ?? '0'),
                    longitude: parseFloat(el.longitude ?? '0'),
                  });
                } catch (error) {}
              }}
            />
            <ServiceCenterItem
              label={`${t('phone')} : `}
              value={`${el.code} ${el.mobile_number}`}
              icon={
                <VectorIcon
                  iconColor={Colors.black}
                  iconSize={Scale(25)}
                  iconName="phone"
                  iconType={2}
                />
              }
              onPress={() => {
                openPhoneCall(`${el.code} ${el.mobile_number}`);
              }}
            />
          </View>
        ))}
      </View>
    </>
  );
};

const ServiceCenterItem = ({
  label,
  value,
  onPress,
  icon,
}: {
  label: string;
  value: string;
  onPress: () => void;
  icon?: React.ReactNode;
}) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={1}
    style={[VS.fd_row, VS.gap_10, VS.ai_center]}>
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
    {icon}
  </TouchableOpacity>
);

export default function ServiceCenterTab({info}: ServiceCenterTabProps) {
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
      <DealerServiceCenter
        serviceCenterInfo={service_center_info as string}
        t={t}
      />
    </View>
  );
}
