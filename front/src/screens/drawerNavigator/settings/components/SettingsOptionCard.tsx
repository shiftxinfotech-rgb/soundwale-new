import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text} from '@components';
import {VS, TS, CommonStyle, Colors} from '@theme';
import {Icons} from '@assets';
import {Scale} from '@util';

export const SettingsOptionCard = ({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.8}
    style={[
      VS.mb_20,
      CommonStyle.shadowBox,
      VS.pv_15,
      VS.ph_13,
      {borderRadius: Scale(50)},
    ]}>
    <View style={[VS.fd_row, VS.ai_center, VS.jc_space_between]}>
      <Text
        fontWeight="semiBold"
        style={[TS.fs_18, CommonStyle.textBlack, TS.lh_22]}>
        {label}
      </Text>
      <Icons.ArrowNext
        color={Colors.blueGray}
        height={Scale(15)}
        width={Scale(15)}
      />
    </View>
  </TouchableOpacity>
);
