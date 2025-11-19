import {Text} from '@components';
import {TS, VS} from '@theme';
import {setField} from '@util';
import moment from 'moment';
import React from 'react';
import {View} from 'react-native';
import {IMessage} from 'react-native-gifted-chat';
import {styles} from '../styles';

export default function BubbleRight({message}: {message: IMessage}) {
  const {text, createdAt} = message;
  return (
    <View
      style={[
        styles.rightContainer,
        VS.as_end,
        VS.jc_end,
        VS.ai_end,
        VS.brt_10,
        VS.brr_10,
        VS.brl_10,
        VS.p_8,
        VS.gap_3,
      ]}>
      <Text fontWeight={'medium'} style={[TS.fs_11, TS.ta_justify]}>
        {setField(text)}
      </Text>
      <Text
        fontWeight={'light'}
        style={[TS.fs_10, TS.ta_right, styles.dateText]}>
        {moment(createdAt).local().format('hh:mm A')}
      </Text>
    </View>
  );
}
