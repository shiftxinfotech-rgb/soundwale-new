import {Icons} from '@assets';
import {Text} from '@components';
import {AppStyle, CommonStyle, TS, VS} from '@theme';
import {Scale} from '@util';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Styles} from './Styles';

type Props = {
  isSelected: boolean;
  title: string;
  onPressItem: () => void;
};

export default function ItemView({isSelected, title, onPressItem}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[AppStyle.fullWidth]}
      onPress={onPressItem}>
      <View
        style={[
          VS.fd_row,
          VS.ai_center,
          VS.jc_space_between,
          VS.ph_17,
          VS.pv_15,
        ]}>
        <Text
          fontWeight="quickSandSemiBold"
          style={[TS.fs_16, CommonStyle.textDimGray, TS.lh_20]}>
          {title}
        </Text>
        {isSelected && <Icons.Check width={Scale(17)} height={Scale(17)} />}
      </View>
      <View
        style={[AppStyle.fullWidth, CommonStyle.bgLightGray, Styles.divider]}
      />
    </TouchableOpacity>
  );
}
