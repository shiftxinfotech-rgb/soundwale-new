import {Icons} from '@assets';
import {ShimmerView} from '@components';
import {AppStyle, Colors, CommonStyle, VS} from '@theme';
import {Scale, width} from '@util';
import React from 'react';
import {StyleSheet, View} from 'react-native';

export function ListPlaceholder() {
  return (
    <View
      style={[
        VS.br_10,
        VS.mh_15,
        VS.mt_10,
        CommonStyle.bgLightPrimary,
        AppStyle.hideOverFlow,
        {borderWidth: 1, borderColor: Colors.veryLightGray},
      ]}>
      <View
        style={[VS.pt_11, VS.ph_15, VS.pb_10, CommonStyle.shadowBox, VS.br_12]}>
        <View style={[VS.flex_1]}>
          <View style={[VS.fd_row, VS.ai_center, VS.jc_space_between]}>
            <ShimmerView style={{height: Scale(20), width: width * 0.4}} />
            <View style={[Styles.statusContainer, VS.ph_15, VS.pv_3]}>
              <ShimmerView style={{height: Scale(20), width: width * 0.2}} />
            </View>
          </View>
          <View style={[VS.fd_row, VS.ai_center, VS.gap_5, VS.mt_5]}>
            <ShimmerView style={{height: Scale(20), width: width * 0.2}} />
            <Icons.ChevronDoubleRight />
            <ShimmerView style={{height: Scale(20), width: width * 0.2}} />
          </View>
          <View style={[VS.fd_row, VS.jc_space_between, VS.mt_5]}>
            <View style={[VS.flex_1]}>
              <ShimmerView style={{height: Scale(20), width: width * 0.4}} />
              <View style={[VS.mv_5]} />
              <ShimmerView style={{height: Scale(20), width: width * 0.4}} />
            </View>

            <View
              style={[
                VS.ai_center,
                VS.jc_center,
                VS.gap_3,
                {bottom: Scale(15)},
              ]}>
              <ShimmerView style={{height: Scale(20), width: width * 0.2}} />
              <ShimmerView style={{height: Scale(20), width: width * 0.3}} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
const Styles = StyleSheet.create({
  statusContainer: {
    borderRadius: Scale(100),
    width: '20%',
  },
});
