import {CommonStyle, TS} from '@theme';
import {fetchStyles} from '@util';
import React from 'react';
import {
  Text as RNText,
  StyleProp,
  TextProps,
  TextStyle,
  ViewStyle,
} from 'react-native';

export type FontWeight =
  | 'light'
  | 'regular'
  | 'medium'
  | 'semiBold'
  | 'bold'
  | 'extraBold'
  | 'black'
  | 'quickSandRegular'
  | 'quickSandMedium'
  | 'quickSandSemiBold'
  | 'quickSandBold';

type TextParams = {
  style?: StyleProp<ViewStyle | TextStyle>;
  numberOfLines?: number;
  fontWeight?: FontWeight;
} & TextProps;

export const fontFamilyMapping = {
  light: 'Montserrat-Light',
  regular: 'Montserrat-Regular',
  medium: 'Montserrat-Medium',
  semiBold: 'Montserrat-SemiBold',
  bold: 'Montserrat-Bold',
  extraBold: 'Montserrat-ExtraBold',
  black: 'Montserrat-Black',
  quickSandRegular: 'Quicksand-Regular',
  quickSandMedium: 'Quicksand-Medium',
  quickSandSemiBold: 'Quicksand-SemiBold',
  quickSandBold: 'Quicksand-Bold',
};

const Text = ({
  style,
  numberOfLines,
  fontWeight = 'regular',
  ...rest
}: TextParams) => {
  const passedStyles = fetchStyles(style);
  const resolvedFontFamily: string =
    fontFamilyMapping[fontWeight] || fontFamilyMapping.regular;

  return (
    <RNText
      allowFontScaling={false}
      maxFontSizeMultiplier={1}
      ellipsizeMode={'tail'}
      style={[
        TS.fs_12,
        CommonStyle.textStyle,
        {fontFamily: resolvedFontFamily},
        passedStyles,
      ]}
      {...rest}
      numberOfLines={numberOfLines}
    />
  );
};
export {Text};
