import {Icons} from '@assets';
import {Text} from '@components';
import {Colors, CommonStyle, TS, VS} from '@theme';
import {Scale, setField} from '@util';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity, View} from 'react-native';
import {LocationInfo} from '../DirectoryList';

type LocationStatusFilterProps = {
  locationInfo: LocationInfo;
  totalResults: number;
  category: string;
  isLoading: boolean;
  onPressLocation: () => void;
};

export default function LocationStatusFilter({
  locationInfo,
  totalResults,
  category,
  isLoading = false,
  onPressLocation,
}: LocationStatusFilterProps) {
  const {t} = useTranslation('directory');
  return (
    <View style={[VS.mh_15, VS.mt_20, VS.jc_center]}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPressLocation}
        style={[
          CommonStyle.shadowBox,
          VS.fd_row,
          VS.jc_space_between,
          VS.ai_center,
          VS.pv_13,
          VS.ph_11,
          VS.br_10,
        ]}>
        <View style={[VS.fd_row, VS.ai_center, VS.gap_11]}>
          <Icons.RoundBlueLocation />
          <View style={[VS.gap_7]}>
            <Text
              fontWeight="medium"
              style={[TS.fs_10, TS.tt_uppercase, TS.lh_12]}>
              {t('state')}
            </Text>
            <Text fontWeight="bold" style={[TS.fs_14, TS.lh_17]}>
              {locationInfo.isCustom
                ? locationInfo.total > 1
                  ? `${locationInfo.total} States`
                  : t('allCities')
                : locationInfo.city === ''
                ? t('allCities')
                : setField(locationInfo.city)}
            </Text>
          </View>
        </View>

        <Icons.ArrowNext color={Colors.blueGray} width={Scale(9)} />
      </TouchableOpacity>
      {isLoading ? (
        <></>
      ) : (
        <View style={[VS.mt_14, VS.ai_center]}>
          <Text
            fontWeight="semiBold"
            style={[TS.fs_14, CommonStyle.textPrimary, TS.lh_17]}>
            {totalResults}{' '}
            <Text
              fontWeight="medium"
              style={[TS.fs_14, TS.lh_17, TS.tt_capitalize]}>
              {locationInfo.isCustom
                ? locationInfo.total > 1
                  ? t('foundInCities', {category, total: locationInfo.total})
                  : t('foundIn', {category, city: locationInfo.city})
                : t('foundInCity', {category, city: locationInfo.city})}
            </Text>
          </Text>
        </View>
      )}
    </View>
  );
}
