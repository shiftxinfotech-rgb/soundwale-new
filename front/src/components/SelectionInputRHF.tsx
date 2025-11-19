import {Colors, CommonStyle, TS, VS} from '@theme';
import {fetchStyles} from '@util';
import React from 'react';
import {Control, useController} from 'react-hook-form';
import {Pressable, StyleProp, TextStyle, View, ViewStyle} from 'react-native';
import {ComponentStyles} from './ComponentStyles';
import {Text} from './TextView';

type SelectionInputRHFParams = {
  fieldName: string;
  control: Control<any>;
  headerComponent?: React.ReactNode | null;
  parentStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  placeholder?: string;
  renderRightIcon?: React.ReactNode | null;
  renderLeftIcon?: React.ReactNode | null;
  displayValue?: (value: any) => string;
  onPress?: () => void;
  showError?: boolean;
  numberOfLines?: number;
  editable?: boolean;
};

const SelectionInputRHF = ({
  fieldName,
  control,
  headerComponent,
  parentStyle,
  inputStyle,
  textStyle,
  placeholder = 'Select',
  renderLeftIcon,
  renderRightIcon,
  displayValue,
  onPress,
  numberOfLines,
  showError = true,
  editable = true,
}: SelectionInputRHFParams) => {
  const inputStyles = fetchStyles(inputStyle);
  const displayStyles = fetchStyles(textStyle);

  const {
    field,
    fieldState: {error},
  } = useController({
    control,
    name: fieldName,
  });

  const hasValue = !!field.value;
  const resolvedDisplay = hasValue
    ? displayValue?.(field.value) ?? String(field.value)
    : placeholder;

  return (
    <View style={parentStyle}>
      {headerComponent}
      <Pressable
        disabled={!editable}
        onPress={onPress}
        style={[
          ComponentStyles.inputContainerStyle,
          CommonStyle.borderLightGray,
          CommonStyle.bgWhite,
          VS.fd_row,
          VS.ai_center,
          VS.br_10,
          VS.bw_1,
          VS.ph_15,
          inputStyles,
        ]}>
        {renderLeftIcon}
        <Text
          numberOfLines={numberOfLines ?? 1}
          fontWeight="quickSandMedium"
          style={[
            ComponentStyles.inputStyle,
            TS.fs_15,
            VS.flex_1,
            VS.flex_1,
            {
              color: hasValue ? Colors.black : Colors.dimGray,
            },
            displayStyles,
          ]}>
          {resolvedDisplay}
        </Text>
        {renderRightIcon}
      </Pressable>

      {error && showError && (
        <Text style={[TS.fs_12, TS.mt_4, CommonStyle.textRed]}>
          {error.message}
        </Text>
      )}
    </View>
  );
};

export {SelectionInputRHF};
