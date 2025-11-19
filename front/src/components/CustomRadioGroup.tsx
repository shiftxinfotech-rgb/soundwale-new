import {ComponentStyles, Text} from '@components';
import {DropDownListParams} from '@data';
import {TS, VS} from '@theme';
import {fetchStyles} from '@util';
import React from 'react';
import {StyleProp, TouchableOpacity, View, ViewStyle} from 'react-native';

type OptionItemProps = {
  options: DropDownListParams[];
  value?: string;
  onChange: (value: DropDownListParams) => void;
  containerStyle?: StyleProp<ViewStyle>;
  itemContainerStyle?: StyleProp<ViewStyle>;
};

export function CustomRadioGroup({
  options,
  value,
  onChange,
  containerStyle,
  itemContainerStyle,
}: OptionItemProps) {
  const containerStyles = fetchStyles(containerStyle);
  const itemContainerStyles = fetchStyles(itemContainerStyle);
  return (
    <View style={[VS.fd_row, VS.gap_16, VS.ai_center, containerStyles]}>
      {options.map(opt => (
        <TouchableOpacity
          key={opt.value}
          onPress={() => onChange(opt)}
          style={[
            VS.fd_row,
            VS.ai_center,
            VS.jc_center,
            VS.gap_5,
            itemContainerStyles,
          ]}>
          <View
            style={[
              ComponentStyles.radioOuterContainer,
              VS.ai_center,
              VS.jc_center,
              VS.as_center,
            ]}>
            {value === opt.value && (
              <View style={ComponentStyles.radioInnerContainer} />
            )}
          </View>
          <Text
            fontWeight="quickSandMedium"
            style={[
              TS.fs_13,
              TS.lh_21,
              // value !== opt.value && CommonStyle.textDimGray,
            ]}>
            {opt.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
