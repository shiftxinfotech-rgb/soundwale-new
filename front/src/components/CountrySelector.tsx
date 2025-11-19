import {CountryCodeParams} from '@data';
import {CommonStyle, TS, VS} from '@theme';
import React from 'react';
import {StyleProp, TouchableOpacity, View, ViewStyle} from 'react-native';
import {ComponentStyles} from './ComponentStyles';
import {Text} from './TextView';

type CountrySelectorParams = {
  onPressButton?: () => void;
  countryCode?: CountryCodeParams;
  isDisabled?: boolean;
  separatorStyle?: StyleProp<ViewStyle>;
};

function CountrySelector({
  onPressButton,
  countryCode,
  isDisabled = false,
  separatorStyle,
}: CountrySelectorParams) {
  return (
    <TouchableOpacity
      disabled={isDisabled}
      onPress={onPressButton}
      activeOpacity={1}>
      <View style={[VS.fd_row, VS.ai_center]}>
        <Text fontWeight="medium" style={[TS.fs_15, CommonStyle.textDimGray]}>
          {`${countryCode?.flag ?? ''} ${countryCode?.dial_code ?? ''}`}
        </Text>
        <View
          style={[
            ComponentStyles.verticalSeparator,
            CommonStyle.bgDimGray,
            VS.mh_13,
            separatorStyle,
          ]}
        />
      </View>
    </TouchableOpacity>
  );
}
export {CountrySelector};
