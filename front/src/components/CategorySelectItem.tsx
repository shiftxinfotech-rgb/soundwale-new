import {Icons} from '@assets';
import {ComponentStyles, ProgressImage, Text} from '@components';
import {Colors, CommonStyle, TS, VS} from '@theme';
import {hexToRgbA, Scale} from '@util';
import React from 'react';
import {StyleProp, TouchableOpacity, View, ViewStyle} from 'react-native';

export function CategorySelectItem({
  icon,
  title,
  subtitle,
  selected,
  onPress,
  selectedIcon,
  style,
}: {
  icon: string;
  title: string;
  subtitle: string;
  selected: boolean;
  selectedIcon: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <TouchableOpacity
      style={[
        VS.fd_row,
        VS.ai_center,
        VS.p_10,
        VS.mb_15,
        VS.gap_16,
        VS.jc_center,
        {backgroundColor: hexToRgbA(Colors.lightGray, '0.5')},
        CommonStyle.commonBorderLarge,
        selected && [
          CommonStyle.shadowBox,
          CommonStyle.bgPrimary,
          {shadowColor: 'rgba(0,0,0,0.08)', shadowOpacity: 0.08},
        ],
        style,
      ]}
      activeOpacity={0.9}
      onPress={onPress}>
      <ProgressImage
        source={{uri: selected ? selectedIcon : icon}}
        mode="contain"
        containerStyle={[ComponentStyles.categoryIcon]}
      />
      <View style={[VS.flex_1]}>
        <Text
          fontWeight="bold"
          style={[
            TS.fs_16,
            selected ? CommonStyle.textWhite : CommonStyle.textBlack,
          ]}>
          {title}
        </Text>
        {subtitle && (
          <Text
            fontWeight="quickSandSemiBold"
            style={[
              TS.fs_11,
              selected ? CommonStyle.textWhite : CommonStyle.textBlack,
            ]}>
            {subtitle}
          </Text>
        )}
      </View>
      {selected && (
        <Icons.Check
          color={Colors.white}
          width={Scale(17)}
          height={Scale(17)}
        />
      )}
    </TouchableOpacity>
  );
}
