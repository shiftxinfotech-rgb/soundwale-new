import {Colors, CommonStyle, TS, VS} from '@theme';
import {fetchStyles, URL_REGEX} from '@util';
import React from 'react';
import {Control, useController} from 'react-hook-form';
import {
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {ComponentStyles} from './ComponentStyles';
import {Text} from './TextView';

type InputBoxFormikParams = Partial<TextInputProps> & {
  fieldName: string;
  control: Control<any>;
  headerComponent?: React.ReactNode | null | undefined;
  parentStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  textInputStyle?: StyleProp<TextStyle>;
  placeholder?: string;
  renderRightIcon?: React.ReactNode | null | undefined;
  renderLeftIcon?: React.ReactNode | null | undefined;
  sanitizeInput?: (text: string) => string;
  inputRef?: React.RefObject<TextInput>;
  onSubmitEditing?: () => void;
  autoCapitalize?: string;
};

const globalSanitizers: Record<string, (text: string) => string> = {
  name: text => text.replace(/[^A-Za-z ]/g, '').replace(/\s+/g, ' '),
};

const InputBoxRHF = ({
  fieldName,
  control,
  headerComponent,
  parentStyle,
  inputStyle,
  textInputStyle,
  placeholder,
  renderLeftIcon,
  renderRightIcon,
  sanitizeInput,
  keyboardType,
  autoCapitalize,
  ...rest
}: InputBoxFormikParams) => {
  const inputStyles = fetchStyles(inputStyle);
  const textInputStyles = fetchStyles(textInputStyle);
  const {
    field,
    fieldState: {error},
  } = useController({
    control,
    name: fieldName,
  });

  const resolveSanitizer =
    sanitizeInput || globalSanitizers[fieldName] || ((text: string) => text);

  const handleTextChange = (text: string) => {
    const filtered = text.replace(URL_REGEX.validInput, '');
    field.onChange(resolveSanitizer(filtered));
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
          VS.ph_13,
          inputStyles,
        ]}>
        {renderLeftIcon}
        <TextInput
          ref={rest.inputRef}
          autoCorrect={false}
          autoCapitalize={autoCapitalize ?? 'none'}
          textAlignVertical="center"
          underlineColorAndroid={'rgba(68, 21, 21, 0)'}
          importantForAutofill={'noExcludeDescendants'}
          placeholder={placeholder}
          placeholderTextColor={Colors.dimGray}
          selectionColor={Colors.dimGray}
          selectionHandleColor={Colors.primary}
          style={[
            ComponentStyles.inputStyle,
            CommonStyle.textBlack,
            TS.fs_15,
            VS.flex_1,
            textInputStyles,
          ]}
          returnKeyType={rest.returnKeyType ?? 'done'}
          returnKeyLabel={rest.returnKeyLabel ?? 'Done'}
          cursorColor={Colors.primary}
          keyboardType={keyboardType ?? 'default'}
          value={field.value}
          onChangeText={handleTextChange}
          onBlur={field.onBlur}
          multiline={rest.multiline ?? false}
          onSubmitEditing={() => {
            if (rest.onSubmitEditing) {
              rest.onSubmitEditing();
            }
          }}
          {...rest}
        />
        {renderRightIcon}
      </View>
      {error && (
        <Text style={[TS.fs_12, TS.mt_4, CommonStyle.textRed]}>
          {error.message}
        </Text>
      )}
    </View>
  );
};

export {InputBoxRHF};
