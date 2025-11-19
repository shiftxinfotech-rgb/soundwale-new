import {Colors, CommonStyle, TS, VS} from '@theme';
import {fetchStyles, URL_REGEX} from '@util';
import React from 'react';
import {
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {ComponentStyles} from './ComponentStyles';

type InputBoxParams = Partial<TextInputProps> & {
  headerComponent?: React.ReactNode | React.ReactNode[];
  placeholder?: string;
  parentStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  textInputStyle?: StyleProp<TextStyle>;
  renderRightIcon?: React.ReactNode | null | undefined;
  renderLeftIcon?: React.ReactNode | null | undefined;
};

const InputBox = ({
  headerComponent,
  parentStyle,
  inputStyle,
  textInputStyle,
  placeholder,
  renderLeftIcon,
  renderRightIcon,
  ...rest
}: InputBoxParams) => {
  const inputStyles = fetchStyles(inputStyle);
  const textInputStyles = fetchStyles(textInputStyle);

  const handleTextChange = (text: string) => {
    const filtered = text.replace(URL_REGEX.validInput, '');
    rest.onChangeText?.(filtered);
  };
  return (
    <View style={parentStyle}>
      {headerComponent}
      <View
        style={[
          ComponentStyles.inputContainerStyle,
          CommonStyle.borderLightGray,
          VS.fd_row,
          VS.ai_center,
          VS.br_10,
          VS.bw_1,
          VS.ph_15,
          inputStyles,
        ]}>
        {renderLeftIcon}
        <TextInput
          autoCorrect={false}
          autoCapitalize={'none'}
          underlineColorAndroid={'rgba(0,0,0,0)'}
          importantForAutofill={'noExcludeDescendants'}
          placeholder={placeholder}
          placeholderTextColor={Colors.lightGray}
          selectionColor={Colors.dimGray}
          selectionHandleColor={Colors.primary}
          style={[
            ComponentStyles.inputStyle,
            CommonStyle.textBlack,
            TS.fs_15,
            VS.flex_1,
            textInputStyles,
          ]}
          cursorColor={Colors.primary}
          allowFontScaling={false}
          returnKeyType={'done'}
          returnKeyLabel={'Done'}
          inputMode={'text'}
          keyboardType={'default'}
          onChangeText={handleTextChange}
          {...rest}
        />
        {renderRightIcon}
      </View>
    </View>
  );
};

export {InputBox};
