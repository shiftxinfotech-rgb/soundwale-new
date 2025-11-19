import {Icons} from '@assets';
import {Text} from '@components';
import {CommonStyle, TS, VS} from '@theme';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Styles} from './Styles';

type Props = {
  title: string;
  count: number;
  isSelected: boolean;
  onPress: () => void;
};

export default function CategoryTitle({
  title,
  count,
  isSelected,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      style={[VS.ai_start, VS.jc_center, VS.mt_10]}
      onPress={onPress}>
      {isSelected && (
        <View style={[VS.as_end]}>
          <Icons.TopTriangle />
        </View>
      )}
      <View
        style={[
          Styles.defaultRif,
          isSelected && Styles.whiteRif,
          VS.ai_center,
          VS.jc_center,
        ]}>
        <Text
          fontWeight={'semiBold'}
          style={[
            TS.fs_16,
            isSelected ? CommonStyle.textPrimary : CommonStyle.textBlack,
          ]}>
          {`${title} ${count > 0 ? `(${count})` : ''}`}
        </Text>
      </View>
      {isSelected && (
        <View style={[VS.as_end]}>
          <Icons.BottomTriangle />
        </View>
      )}
    </TouchableOpacity>
  );
}
