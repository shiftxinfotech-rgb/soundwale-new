import {CommonStyle, TS, VS} from '@theme';
import {fetchStyles} from '@util';
import React from 'react';
import {StyleProp, TextStyle} from 'react-native';
import {FontWeight, Text} from './TextView';

type InputHeaderProps = {
  title: string;
  isCompulsory?: boolean;
  textStyle?: StyleProp<TextStyle>;
  textWeight?: FontWeight;
};

export function InputHeader({
  title,
  isCompulsory = false,
  textStyle,
  textWeight = 'quickSandMedium',
}: InputHeaderProps) {
  const textStyles = fetchStyles(textStyle);
  return (
    <Text
      fontWeight={textWeight}
      style={[
        TS.fs_15,
        CommonStyle.textBlack,
        TS.lh_26,
        VS.mb_5,
        TS.tt_capitalize,
        textStyles,
      ]}>
      {title}
      {isCompulsory && (
        <Text
          fontWeight={textWeight}
          style={[TS.fs_15, CommonStyle.textRed, TS.lh_26]}>
          {' *'}
        </Text>
      )}
    </Text>
  );
}
