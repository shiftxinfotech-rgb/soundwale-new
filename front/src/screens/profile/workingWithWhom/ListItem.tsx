import {CustomButton, ProgressImage, Text} from '@components';
import {WorkingWithData} from '@data';
import {AppStyle, CommonStyle, TS, VS} from '@theme';
import {Scale, setField, validField} from '@util';
import React from 'react';
import {StyleSheet, View} from 'react-native';

type Props = {
  item: WorkingWithData;
  viewType: 'sender' | 'receiver' | 'approved';
  onUpdateRequest: (status: number) => void;
};

const ListItem = ({item, viewType, onUpdateRequest}: Props) => {
  const {register_name, user_image, user_name, role_name, register_id, status} =
    item || {};
  const name = register_id && register_id > 0 ? user_name : register_name;
  const isAccepted = status && status === 1;
  return (
    <View
      style={[
        VS.br_10,
        VS.p_6,
        VS.mh_15,
        VS.bw_1,
        VS.gap_6,
        CommonStyle.shadowBox,
        CommonStyle.borderVeryLightGray,
      ]}>
      <View style={[VS.flex_1, VS.fd_row, VS.ai_center]}>
        <View style={[styles.profileContainer, AppStyle.hideOverFlow]}>
          {validField(user_image) ? (
            <ProgressImage
              source={{uri: user_image}}
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
          {validField(role_name) ? (
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
              {setField(role_name)}
            </Text>
          ) : (
            <View style={[VS.h_24]} />
          )}
        </View>
      </View>
      {viewType === 'receiver' && !isAccepted && (
        <View
          style={[VS.fd_row, VS.ai_center, VS.jc_center, VS.gap_15, VS.ph_15]}>
          <CustomButton
            buttonTitle="Reject"
            onPress={() => onUpdateRequest(0)}
            variant="ghost"
            wrapperStyle={[VS.flex_1]}
            containerStyle={VS.h_36}
          />
          <CustomButton
            buttonTitle="Accept"
            onPress={() => onUpdateRequest(1)}
            variant="primary"
            wrapperStyle={[VS.flex_1]}
            containerStyle={VS.h_36}
          />
        </View>
      )}
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  profileContainer: {
    width: Scale(42),
    height: Scale(42),
    borderRadius: Scale(42),
    overflow: 'hidden',
  },
});
