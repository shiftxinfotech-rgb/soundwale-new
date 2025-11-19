import {Icons} from '@assets';
import {Colors, CommonStyle, TS, VS} from '@theme';
import React from 'react';
import {View} from 'react-native';

import {ProgressImage, Text} from '@components';
import {ReviewBean} from '@data';
import {formatDate, setField} from '@util';
import {Styles} from './Styles';
const MAX_STARS = 5;
export type ReviewProps = {
  item: ReviewBean;
};
export default function ReviewItem({item}: ReviewProps) {
  const {user_name, rating, created_at, message, roles, user_profile_url} =
    item;
  return (
    <View style={[VS.gap_10]}>
      <View style={[VS.fd_row, VS.ai_center, VS.jc_space_between]}>
        <View style={[VS.fd_row, VS.ai_center, VS.flex_1, VS.gap_10]}>
          <ProgressImage
            source={{uri: user_profile_url}}
            containerStyle={Styles.userImage}
            imageStyle={Styles.userImage}
          />
          <View style={[VS.flex_1, VS.gap_6]}>
            <Text
              fontWeight="semiBold"
              style={[TS.fs_15, TS.lh_18, CommonStyle.textBlack]}>
              {setField(user_name)}
            </Text>
            {roles && roles.length > 0 && (
              <Text
                fontWeight="medium"
                style={[TS.fs_14, TS.lh_17, CommonStyle.textBlueGray]}>
                {setField(roles[0]?.name)}
              </Text>
            )}
          </View>
        </View>
        <View style={[VS.gap_5]}>
          <View style={[VS.fd_row, VS.ai_center, VS.gap_2]}>
            {Array.from({length: MAX_STARS}).map((_, i) => (
              <Icons.Star
                key={i}
                size={13}
                color={
                  i < Math.round(rating) ? Colors.amber : Colors.silverGray
                }
              />
            ))}
          </View>
          <Text
            fontWeight="medium"
            style={[TS.fs_11, CommonStyle.textBlueGray, VS.as_end]}>
            {formatDate(created_at)}
          </Text>
        </View>
      </View>
      {message && (
        <Text
          fontWeight="medium"
          style={[TS.fs_14, CommonStyle.textBlack, TS.lh_17]}>
          {setField(message)}
        </Text>
      )}
    </View>
  );
}
