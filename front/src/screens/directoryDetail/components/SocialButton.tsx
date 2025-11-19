import {Text} from '@components';
import {TS, VS} from '@theme';
import {Scale} from '@util';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Styles} from '../Styles';

type SocialButtonProps = {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
};

export default function SocialButton({
  icon,
  label,
  onPress,
}: SocialButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[VS.ai_center, VS.jc_center, VS.gap_8, {minWidth: Scale(80)}]}>
      <View style={[VS.br_10, Styles.otherInfo, VS.ai_center, VS.jc_center]}>
        {icon}
      </View>
      <Text fontWeight="medium" style={[TS.fs_14]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
