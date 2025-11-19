import {Icons} from '@assets';
import {Text} from '@components';
import {CommonStyle, TS, VS} from '@theme';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity} from 'react-native';
import {Styles} from '../Styles';

type IProps = {
  onPress: () => void;
};

export default function UseCurrentLocationView({onPress}: IProps) {
  const {t} = useTranslation('generic');
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        Styles.currentLocationContainer,
        VS.ph_13,
        VS.gap_5,
        VS.pv_7,
        VS.fd_row,
        VS.br_9,
      ]}>
      <Icons.Location />
      <Text
        fontWeight="medium"
        numberOfLines={1}
        ellipsizeMode={'tail'}
        style={[TS.fs_14, CommonStyle.textPrimary]}>
        {t('useCurrentLocation')}
      </Text>
    </TouchableOpacity>
  );
}
