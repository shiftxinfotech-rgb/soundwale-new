import {Icons} from '@assets';
import {CommonStyle, TS, VS} from '@theme';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text} from '../TextView';

type IProps = {
  total_likes: number;
  total_comments: number;
  is_user_liked: number;
  isMyPost: boolean;
  onPress: (key: string) => void;
};

const OptionsView = ({
  total_likes,
  total_comments,
  is_user_liked,
  isMyPost,
  onPress,
}: IProps) => {
  return (
    <>
      <View
        style={[
          VS.fd_row,
          VS.ai_center,
          VS.jc_space_between,
          VS.gap_15,
          VS.ph_15,
        ]}>
        <View style={[VS.fd_row, VS.ai_center, VS.gap_5]}>
          <Icons.TotalLikes />
          <Text
            fontWeight={'quickSandMedium'}
            style={[TS.fs_14, CommonStyle.textDimGray]}>
            {total_likes} likes
          </Text>
        </View>
        <View style={[VS.fd_row, VS.ai_center, VS.gap_5]}>
          <Text
            fontWeight={'quickSandMedium'}
            style={[TS.fs_14, CommonStyle.textDimGray]}>
            {total_comments} comments
          </Text>
        </View>
      </View>

      <View
        style={[
          VS.fd_row,
          VS.ai_center,
          VS.jc_space_between,
          VS.gap_5,
          VS.ph_10,
        ]}>
        <IconWithText
          icon={is_user_liked === 1 ? <Icons.IcLikeFilled /> : <Icons.IcLike />}
          text="Like"
          onPress={() => onPress?.('like')}
        />
        <IconWithText
          icon={<Icons.IcComment />}
          text="Comment"
          onPress={() => onPress?.('comment')}
        />
        <IconWithText
          icon={<Icons.IcWhatsApp />}
          text="Whatsapp"
          onPress={() => onPress?.('whatsapp')}
        />
        <IconWithText
          icon={<Icons.IcPhoneCall />}
          text="Call"
          onPress={() => onPress?.('call')}
        />
        {isMyPost ? null : (
          <IconWithText
            icon={<Icons.IcMessage />}
            text="Message"
            onPress={() => onPress?.('chat')}
          />
        )}
      </View>
    </>
  );
};

const IconWithText = ({
  icon,
  text,
  onPress,
}: {
  icon: React.ReactNode;
  text: string;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      hitSlop={8}
      style={[VS.fd_row, VS.ai_center, VS.gap_3]}
      onPress={onPress}>
      {icon}
      <Text
        fontWeight={'quickSandMedium'}
        style={[TS.fs_12, CommonStyle.textDimGray]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export {OptionsView};
