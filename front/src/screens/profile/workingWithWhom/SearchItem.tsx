import {ProgressImage, Text} from '@components';
import {WorkingWithSearchData} from '@data';
import {AppStyle, CommonStyle, TS, VS} from '@theme';
import {Scale, setField, validField} from '@util';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

type Props = {
  item: WorkingWithSearchData;
  onPress: () => void;
};

const SearchItem = ({item, onPress}: Props) => {
  const {name, personal_name, image_url} = item || {};
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      hitSlop={8}
      style={[
        VS.br_10,
        VS.p_6,
        VS.bw_1,
        VS.fd_row,
        VS.ai_center,
        CommonStyle.shadowBox,
        CommonStyle.borderVeryLightGray,
      ]}>
      <View style={[styles.profileContainer, AppStyle.hideOverFlow]}>
        {validField(image_url) ? (
          <ProgressImage
            source={{uri: image_url}}
            mode="cover"
            containerStyle={[AppStyle.fullSize]}
          />
        ) : (
          <View style={[AppStyle.fullSize, CommonStyle.bgLightGray]} />
        )}
      </View>

      <View style={[VS.flex_1, VS.ph_10, VS.gap_6]}>
        <Text
          fontWeight={'semiBold'}
          style={[
            TS.fs_16,
            TS.ta_left,
            TS.tav_center,
            TS.tt_capitalize,
            CommonStyle.textBlack,
          ]}>
          {setField(name)}
        </Text>
        {validField(personal_name) ? (
          <Text
            fontWeight={'medium'}
            numberOfLines={1}
            style={[
              TS.fs_13,
              TS.ta_left,
              TS.tav_center,
              TS.tt_capitalize,
              CommonStyle.textDimGray,
            ]}>
            {setField(personal_name)}
          </Text>
        ) : (
          <View style={[VS.h_24]} />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default SearchItem;

const styles = StyleSheet.create({
  profileContainer: {
    width: Scale(42),
    height: Scale(42),
    borderRadius: Scale(42),
  },
});
