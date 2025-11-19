import React from 'react';
import {View} from 'react-native';

import {ShimmerView} from '@components';
import {CommonStyle, VS} from '@theme';
import {Scale, width} from '@util';
import {Styles} from './Styles';

const ItemFAQShimmer = () => {
  return (
    <View style={[VS.mb_20, CommonStyle.shadowBox, VS.ph_14, Styles.itemView]}>
      <View
        style={[
          VS.fd_row,
          VS.jc_space_between,
          VS.ai_center,
          VS.pv_15,
          VS.gap_5,
        ]}>
        <ShimmerView width={width * 0.75} height={Scale(20)} />
        <ShimmerView width={Scale(20)} height={Scale(20)} />
      </View>

      <View style={[VS.pb_20, VS.gap_2]}>
        <ShimmerView width={width * 0.85} height={Scale(20)} />
        <ShimmerView width={width * 0.85} height={Scale(20)} />
        <ShimmerView width={width * 0.85} height={Scale(20)} />
      </View>
    </View>
  );
};

export default ItemFAQShimmer;
