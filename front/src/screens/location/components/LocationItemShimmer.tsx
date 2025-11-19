import {ShimmerView} from '@components';
import {AppStyle, CommonStyle, VS} from '@theme';
import {Scale, width} from '@util';
import React from 'react';
import {View} from 'react-native';

export default function LocationItemShimmer() {
  return (
    <View style={[VS.fd_row, VS.jc_space_between, VS.ph_17, VS.pv_15]}>
      <View
        style={[VS.fd_row, VS.jc_space_between, VS.ph_17, VS.pv_15, VS.gap_5]}>
        <ShimmerView style={{width: width * 0.8, height: Scale(20)}} />
        <ShimmerView style={{width: Scale(20), height: Scale(20)}} />
      </View>
      <View style={[AppStyle.fullWidth, CommonStyle.bgLightGray, VS.h_1]} />
    </View>
  );
}
