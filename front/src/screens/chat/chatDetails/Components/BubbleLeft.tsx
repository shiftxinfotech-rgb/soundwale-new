import {Text} from '@components';
import {TS, VS} from '@theme';
import {setField} from '@util';
import moment from 'moment';
import React from 'react';
import {View} from 'react-native';
import {IMessage} from 'react-native-gifted-chat';
import {styles} from '../styles';

export default function BubbleLeft({message}: {message: IMessage}) {
  const {text, createdAt} = message;
  return (
    <View
      style={[
        styles.rightContainer,
        VS.as_start,
        VS.brt_10,
        VS.brr_10,
        VS.brb_10,
        VS.p_8,
        VS.mb_5,
        VS.gap_3,
      ]}>
      <Text fontWeight={'medium'} style={[TS.fs_11, TS.ta_justify]}>
        {setField(text)}
      </Text>
      <Text
        fontWeight={'light'}
        style={[TS.fs_10, TS.ta_left, styles.dateText]}>
        {moment(createdAt).local().format('hh:mm A')}
      </Text>
    </View>
  );
}
