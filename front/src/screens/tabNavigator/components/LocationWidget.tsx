import {Icons} from '@assets';
import {Text} from '@components';
import {CommonStyle, TS, VS} from '@theme';
import {validField} from '@util';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Styles} from './Styles';

type Props = {
  currentValue: string;
  onPress?: () => void;
};

export default function LocationWidget({currentValue, onPress}: Props) {
  if (!validField(currentValue)) {
    return <View style={[Styles.locationWidget, VS.bw_0]} />;
  }
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        Styles.locationWidget,
        VS.fd_row,
        VS.ai_center,
        VS.as_start,
        VS.ph_7,
        VS.pv_2,
        VS.jc_space_between,
        CommonStyle.bgWhiteSmoke,
        CommonStyle.borderLightGray,
      ]}>
      <Icons.LocationPin />
      <Text
        fontWeight="quickSandMedium"
        style={[TS.fs_13, CommonStyle.textDimGray]}>
        {currentValue}
      </Text>
      <View style={[VS.mt_5]}>
        <Icons.ChevronDown />
      </View>
    </TouchableOpacity>
  );
}
