import {Colors, VS} from '@theme';
import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {ComponentStyles} from './ComponentStyles';
export const CustomLoader = () => {
  return (
    <View
      style={[
        StyleSheet.absoluteFillObject,
        ComponentStyles.sheetBackdrop,
        VS.flex_1,
        VS.ai_center,
        VS.jc_center,
      ]}>
      <ActivityIndicator size={'large'} color={Colors.primary} />
    </View>
  );
};
