import {CommonStyle, TS, VS} from '@theme';

import React from 'react';
import {View} from 'react-native';
import {Text} from './TextView';

type NoInternetConnectionProps = {};

export function NoInternetConnection({}: NoInternetConnectionProps) {
  return (
    <View style={[VS.flex_1, VS.ai_center, VS.jc_center]}>
      <Text fontWeight="bold" style={[TS.fs_14, CommonStyle.textRed]}>
        No Internet Connection
      </Text>
    </View>
  );
}
