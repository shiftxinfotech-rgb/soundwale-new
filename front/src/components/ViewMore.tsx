import {CommonStyle, TS} from '@theme';
import React from 'react';
import {StyleProp, TextStyle} from 'react-native';
import ViewMoreText from 'react-native-view-more-text';
import {Text} from './TextView';

type Props = {
  child: React.ReactNode;
  textStyle?: StyleProp<TextStyle>;
  numberOfLines?: number;
};

export function ViewMore({child, textStyle, numberOfLines = 2}: Props) {
  return (
    <ViewMoreText
      numberOfLines={numberOfLines}
      renderViewLess={handleClose => {
        return (
          <Text
            onPress={handleClose}
            fontWeight={'semiBold'}
            style={[
              TS.fs_15,
              TS.lh_22,
              TS.ta_justify,
              TS.td_underline,
              CommonStyle.textPrimary,
            ]}>
            View Less
          </Text>
        );
      }}
      renderViewMore={handleOpen => {
        return (
          <Text
            fontWeight={'semiBold'}
            style={[
              TS.fs_15,
              TS.lh_22,
              TS.ta_justify,
              TS.td_underline,
              CommonStyle.textPrimary,
            ]}
            onPress={handleOpen}>
            View More
          </Text>
        );
      }}
      textStyle={textStyle}>
      {child}
    </ViewMoreText>
  );
}
