import {Colors, CommonStyle, TS, VS} from '@theme';
import {fetchStyles} from '@util';
import React from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {ComponentStyles} from './ComponentStyles';
import {FontWeight, Text} from './TextView';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'custom';

type CustomButtonParams = {
  containerStyle?: StyleProp<ViewStyle>;
  wrapperStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  buttonTitle: string;
  customView?: React.ReactNode;
  isLoading?: boolean;
  variant?: ButtonVariant;
  disabled?: boolean;
  textFontWeight?: FontWeight;
  onPress: () => void;
  // Custom variant specific props
  customBackgroundColor?: string;
  customTextColor?: string;
};

const CustomButton = ({
  buttonTitle,
  wrapperStyle,
  containerStyle,
  titleStyle,
  onPress,
  textFontWeight,
  isLoading,
  customView,
  variant = 'primary',
  disabled = false,
  customBackgroundColor,
  customTextColor,
}: CustomButtonParams) => {
  const wrapperStyles = fetchStyles(wrapperStyle);

  const getButtonStyle = () => {
    switch (variant) {
      case 'primary':
        return CommonStyle.bgPrimary;
      case 'secondary':
        return CommonStyle.bgLightGray;
      case 'ghost':
        return CommonStyle.bgWhite;
      case 'custom':
        return customBackgroundColor
          ? {backgroundColor: customBackgroundColor}
          : CommonStyle.bgWhite;
      default:
        return CommonStyle.bgPrimary;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'primary':
        return CommonStyle.textWhite;
      case 'secondary':
        return CommonStyle.textLightGray;
      case 'ghost':
        return CommonStyle.textPrimary;
      case 'custom':
        return customTextColor
          ? {color: customTextColor}
          : CommonStyle.textBlack;
      default:
        return CommonStyle.textWhite;
    }
  };

  return (
    <View style={[VS.ai_center, VS.jc_center, wrapperStyles]}>
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        activeOpacity={1}
        style={[
          VS.br_33,
          ComponentStyles.buttonCommon,
          getButtonStyle(),
          containerStyle,
        ]}>
        {isLoading ? (
          <ActivityIndicator
            size={'small'}
            color={
              variant === 'primary'
                ? Colors.white
                : variant === 'secondary'
                ? Colors.lightGray
                : variant === 'ghost'
                ? Colors.primary
                : customTextColor || Colors.black
            }
          />
        ) : (
          customView ?? (
            <Text
              fontWeight={textFontWeight ?? 'quickSandBold'}
              style={StyleSheet.flatten([
                TS.fs_16,
                CommonStyle.noFontPadding,
                getTextStyle(),
                titleStyle,
              ])}>
              {buttonTitle}
            </Text>
          )
        )}
      </TouchableOpacity>
    </View>
  );
};

export {CustomButton};
