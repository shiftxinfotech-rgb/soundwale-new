import {Icons} from '@assets';
import {Text} from '@components';
import {CommonStyle, TS, VS} from '@theme';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';

const PickerComponent = ({
  icon,
  title,
  subtitle,
  onPress,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        VS.fd_row,
        VS.ai_center,
        VS.jc_space_between,
        VS.gap_10,
        VS.bw_1,
        VS.br_8,
        VS.p_8,
        CommonStyle.shadowBox,
        CommonStyle.borderLightGray,
      ]}>
      <View
        style={[
          CommonStyle.bgVeryLightGray,
          VS.br_30,
          VS.h_35,
          VS.w_35,
          VS.ai_center,
          VS.jc_center,
        ]}>
        {icon}
      </View>
      <View style={[VS.flex_1, VS.ai_start, VS.jc_center]}>
        <Text fontWeight="semiBold" style={[TS.fs_14, CommonStyle.textBlack]}>
          {title}
        </Text>
        <Text style={[TS.fs_12, CommonStyle.textDimGray]}>{subtitle}</Text>
      </View>
      <View
        style={[
          CommonStyle.bgVeryLightGray,
          VS.br_30,
          VS.h_35,
          VS.w_35,
          VS.ai_center,
          VS.jc_center,
        ]}>
        <Icons.ArrowNext />
      </View>
    </TouchableOpacity>
  );
};

export default PickerComponent;
