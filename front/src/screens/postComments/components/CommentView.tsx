import {Icons} from '@assets';
import {ComponentStyles, ProgressImage, Text} from '@components';
import {CommentDatum} from '@data';
import {useUserId} from '@hooks';
import {AppStyle, CommonStyle, TS, VS} from '@theme';
import {isValidImageUrl, setField} from '@util';
import React from 'react';
import {View} from 'react-native';

export default function CommentView({
  item,
  parentId,
  level,
  onPress,
}: {
  item: CommentDatum;
  level: number;
  parentId: number | null | undefined;
  onPress: (
    key: string,
    item: CommentDatum,
    parentId: number | null | undefined,
    level: number,
  ) => void;
}) {
  const loginId = useUserId();
  const {user_name, message, user_image, user_id, like_count, is_like} = item;
  const isMyComment = user_id?.toString() === loginId?.toString();
  const isReplies = level > 0;
  return (
    <View
      style={[VS.fd_row, VS.gap_10, VS.ph_15, VS.pv_10, isReplies && VS.ml_20]}>
      <View
        style={[
          isReplies
            ? ComponentStyles.replyProfileContainer
            : ComponentStyles.profileContainer,
          AppStyle.hideOverFlow,
          CommonStyle.bgPaleAqua,
          VS.p_4,
        ]}>
        {isValidImageUrl(user_image) && (
          <ProgressImage
            source={{uri: user_image}}
            containerStyle={[
              AppStyle.fullSize,
              AppStyle.hideOverFlow,
              ComponentStyles.borderRadius,
            ]}
          />
        )}
      </View>
      <View style={[VS.flex_1]}>
        <Text
          numberOfLines={1}
          fontWeight="bold"
          style={[isReplies ? TS.fs_16 : TS.fs_18, TS.tt_capitalize]}>
          {setField(user_name)}
        </Text>
        <Text
          style={[isReplies ? TS.fs_12 : TS.fs_14, CommonStyle.textBlueGray]}>
          {setField(message)}
        </Text>
        <View style={[VS.fd_row, VS.ai_center, VS.gap_5, VS.jc_space_between]}>
          <View style={[VS.fd_row, VS.ai_center, VS.gap_15]}>
            <Text
              style={[TS.fs_12, CommonStyle.textBlueGray]}
              onPress={() => onPress('like', item, parentId, level)}>
              {is_like === 1 ? 'Liked' : 'Like'}
            </Text>
            {!isReplies && (
              <Text
                onPress={() => onPress('reply', item, parentId, level)}
                style={[TS.fs_12, CommonStyle.textBlueGray]}>
                Reply
              </Text>
            )}
            {isMyComment && (
              <>
                <Text
                  style={[TS.fs_12, CommonStyle.textBlueGray]}
                  onPress={() => onPress('edit', item, parentId, level)}>
                  Edit
                </Text>
                <Text
                  style={[TS.fs_12, CommonStyle.textBlueGray]}
                  onPress={() => onPress('delete', item, parentId, level)}>
                  Delete
                </Text>
              </>
            )}
          </View>
          <View style={[VS.fd_row, VS.ai_center, VS.gap_5]}>
            <Text
              fontWeight={'quickSandMedium'}
              style={[TS.fs_14, CommonStyle.textDimGray]}>
              {like_count}
            </Text>
            {is_like === 1 ? <Icons.IcLikeFilled /> : <Icons.IcLike />}
          </View>
        </View>
      </View>
    </View>
  );
}
