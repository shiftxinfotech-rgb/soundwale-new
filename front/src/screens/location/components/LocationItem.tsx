import {Icons} from '@assets';
import {Text} from '@components';
import {AppStyle, CommonStyle, TS, VS} from '@theme';
import {Scale} from '@util';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
type LocationItemProps = {
  onPressItem: () => void;
  item: string;
  selectedLocation: boolean;
};

export default function LocationItem({
  onPressItem,
  item,
  selectedLocation,
}: LocationItemProps) {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[AppStyle.fullWidth]}
      onPress={() => onPressItem()}>
      <View style={[VS.fd_row, VS.jc_space_between, VS.ph_17, VS.pv_15]}>
        <Text
          fontWeight="quickSandSemiBold"
          style={[TS.fs_16, CommonStyle.textDimGray, TS.lh_20]}>
          {item}
        </Text>
        {selectedLocation && (
          <Icons.Check width={Scale(17)} height={Scale(17)} />
        )}
      </View>

      <View style={[AppStyle.fullWidth, CommonStyle.bgLightGray, VS.h_1]} />
    </TouchableOpacity>
  );
}
