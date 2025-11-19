import {Icons} from '@assets';
import {InputBox, Text} from '@components';
import {Colors, CommonStyle, TS, VS} from '@theme';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity, View} from 'react-native';
import {Styles} from './Styles';
type SearchCurrentLocationProps = {
  onPressCurrentLocation: () => void;
  onChangeText: (text: string) => void;
};

export default function SearchCurrentLocation({
  onPressCurrentLocation,
  onChangeText,
}: SearchCurrentLocationProps) {
  const {t} = useTranslation('generic');
  return (
    <View style={[VS.mh_15, VS.pv_5, VS.gap_20]}>
      <View style={[VS.fd_row, VS.ai_center, VS.jc_space_between]}>
        <InputBox
          placeholder={t('searchHere')}
          maxLength={60}
          returnKeyLabel={'search'}
          returnKeyType={'search'}
          textContentType={'name'}
          inputMode={'search'}
          keyboardType={'default'}
          parentStyle={[VS.flex_1]}
          onChangeText={onChangeText}
          placeholderTextColor={Colors.dimGray}
          inputStyle={[
            Styles.searchInput,
            CommonStyle.bgWhite,
            CommonStyle.shadowBox,
          ]}
          renderRightIcon={<Icons.Search />}
        />
      </View>
      <TouchableOpacity
        onPress={onPressCurrentLocation}
        activeOpacity={0.9}
        style={[
          CommonStyle.shadowBox,
          VS.pv_11,
          VS.ph_10,
          VS.fd_row,
          VS.ai_center,
          VS.gap_10,
          VS.br_10,
        ]}>
        <Icons.RoundCurrentLocation />
        <View style={[VS.gap_5]}>
          <Text fontWeight="bold" style={[TS.fs_14, TS.lh_17]}>
            {t('useCurrentLocation')}
          </Text>
          <Text
            fontWeight="medium"
            style={[TS.fs_10, TS.lh_12, TS.tt_uppercase]}>
            {t('selectCurrentLocation')}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
