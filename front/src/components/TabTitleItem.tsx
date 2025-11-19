import {Text} from '@components';
import {CommonStyle, TS, VS} from '@theme';
import React from 'react';
import {TouchableOpacity} from 'react-native';

type Props = {
  title: string;
  isSelected: boolean;
  onPress: () => void;
};

export function TabTitleItem({title, isSelected, onPress}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[
        VS.fd_row,
        VS.ai_center,
        VS.jc_center,
        VS.ph_20,
        VS.pv_6,
        VS.br_39,
        VS.bw_1,
        CommonStyle.bgWhite,
        CommonStyle.borderLightGray,
        isSelected && CommonStyle.bgPrimary,
        isSelected && CommonStyle.borderPrimary,
      ]}>
      <Text
        fontWeight={'quickSandSemiBold'}
        style={[
          TS.fs_15,
          TS.ta_center,
          TS.tav_center,
          TS.tt_capitalize,
          CommonStyle.textDimGray,
          CommonStyle.noFontPadding,
          isSelected && CommonStyle.textWhite,
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
