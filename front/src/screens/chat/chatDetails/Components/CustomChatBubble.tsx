import {ProgressImage} from '@components';
import {useUserId} from '@hooks';
import {AppStyle, VS} from '@theme';
import {isValidImageUrl, validField} from '@util';
import React from 'react';
import {View} from 'react-native';
import {BubbleProps, IMessage} from 'react-native-gifted-chat';
import BubbleLeft from './BubbleLeft';
import BubbleRight from './BubbleRight';

export default function CustomChatBubble({
  currentMessage,
}: BubbleProps<IMessage>) {
  const userId = useUserId();

  if (currentMessage.user._id.toString() === userId?.toString()) {
    return (
      <View style={[VS.as_end, VS.pr_5, VS.mb_5, AppStyle.fullWidth]}>
        <BubbleRight message={currentMessage} />
      </View>
    );
  }
  return (
    <View
      style={[
        VS.as_start,
        VS.pl_5,
        VS.mb_5,
        AppStyle.fullWidth,
        VS.fd_row,
        VS.gap_5,
      ]}>
      {validField(currentMessage.user.avatar as string) &&
        isValidImageUrl(currentMessage.user.avatar as string) && (
          <ProgressImage
            source={{uri: currentMessage.user.avatar as string}}
            containerStyle={[VS.h_32, VS.w_32, VS.br_36, AppStyle.hideOverFlow]}
          />
        )}

      <BubbleLeft message={currentMessage} />
    </View>
  );
}
