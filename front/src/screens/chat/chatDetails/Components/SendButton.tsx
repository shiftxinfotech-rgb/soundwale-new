import {Icons} from '@assets';
import {VS} from '@theme';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {IMessage, SendProps} from 'react-native-gifted-chat';

export default function SendButton({text, onSend}: SendProps<IMessage>) {
  if ((text?.trim()?.length ?? 0) > 0) {
    return (
      <TouchableOpacity
        style={[VS.h_34, VS.w_34, VS.pr_15, VS.pt_10]}
        onPress={() => onSend?.({text}, true)}
        activeOpacity={0.9}>
        <Icons.Send />
      </TouchableOpacity>
    );
  }
  return null;
}
