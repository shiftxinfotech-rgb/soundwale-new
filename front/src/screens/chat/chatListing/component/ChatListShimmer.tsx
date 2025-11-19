import {ShimmerView} from '@components';
import {CommonStyle, VS} from '@theme';
import {Scale, width} from '@util';
import React from 'react';
import {View} from 'react-native';

export default function ChatListShimmer() {
  return (
    <View
      style={[
        VS.flex_1,
        CommonStyle.shadowBox,
        VS.ph_12,
        VS.pv_12,
        VS.mh_15,
        VS.mb_20,
        VS.jc_center,
      ]}>
      <ShimmerView width={width * 0.8} height={Scale(20)} />
      <View style={[VS.mt_5]}>
        <ShimmerView width={width * 0.8} height={Scale(20)} />
      </View>
    </View>
  );
}
