import {Icons} from '@assets';
import {Text} from '@components';
import {CommonStyle, TS, VS} from '@theme';
import {moveBack} from '@util';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity, View} from 'react-native';
import {Styles} from './Styles';

type Props = {
  onResetFilter: () => void;
};

export default function HeaderView({onResetFilter}: Props) {
  const {t} = useTranslation('generic');
  return (
    <View
      style={[VS.fd_row, VS.ai_center, VS.jc_space_between, VS.ph_17, VS.mt_4]}>
      <View style={[VS.fd_row, VS.ai_center, VS.gap_10, VS.jc_center]}>
        <TouchableOpacity activeOpacity={1} onPress={() => moveBack()}>
          <Icons.LeftArrowLong />
        </TouchableOpacity>

        <Text
          fontWeight={'quickSandSemiBold'}
          style={[CommonStyle.textWhite, TS.fs_20, TS.lh_24]}>
          {t('filter')}
        </Text>
      </View>

      <TouchableOpacity
        onPress={onResetFilter}
        activeOpacity={1}
        style={[Styles.clearButton, VS.ai_center, VS.jc_center, VS.fd_row]}>
        <Text
          fontWeight={'quickSandSemiBold'}
          style={[CommonStyle.textWhite, TS.fs_16]}>
          {t('clearAll')}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
