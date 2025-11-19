import {Icons} from '@assets';
import {Text} from '@components';
import {AppStyle, CommonStyle, TS, VS} from '@theme';
import React from 'react';
import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

type CheckMarkItemProps = {
  isChecked: boolean;
  title: string;
  onPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export function CheckMarkItem({
  isChecked,
  title,
  onPress,
  containerStyle,
  textStyle,
}: CheckMarkItemProps) {
  return (
    <TouchableOpacity
      style={[VS.fd_row, VS.ai_center, VS.gap_8, containerStyle]}
      activeOpacity={0.7}
      hitSlop={8}
      onPress={onPress}>
      <View style={[VS.mt_2]}>
        <Icons.CheckMark isChecked={isChecked} />
      </View>
      <Text
        fontWeight={'quickSandSemiBold'}
        numberOfLines={2}
        style={[
          CommonStyle.textBlack,
          TS.fs_14,
          VS.flex_1,
          AppStyle.flexWrap,
          textStyle,
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
