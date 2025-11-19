import {Icons} from '@assets';
import {CustomButton, Text} from '@components';
import {CommonStyle, TS, VS} from '@theme';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import Animated from 'react-native-reanimated';
import {Styles} from '../Styles';

interface AddressSelectionViewProps {
  address: {
    title: string;
    fullAddress: string;
  };
  onConfirm: () => void;
}

const AddressSelectionView = ({
  address,
  onConfirm,
}: AddressSelectionViewProps) => {
  const {t} = useTranslation('generic');
  return (
    <Animated.View
      style={[
        VS.br_31,
        VS.ph_16,
        VS.pv_13,
        VS.flex_1,
        Styles.currentLocationContainer,
      ]}>
      <View style={[VS.fd_row, VS.ai_center, VS.mb_4, VS.gap_5]}>
        <Icons.Location />
        <Text
          fontWeight="medium"
          numberOfLines={1}
          ellipsizeMode={'tail'}
          style={[TS.fs_18, CommonStyle.textBlack, TS.lh_26]}>
          {address.title}
        </Text>
      </View>
      <Text style={[TS.fs_15, TS.lh_24, CommonStyle.textDimGray, VS.mb_7]}>
        {address.fullAddress}
      </Text>
      <CustomButton
        isLoading={false}
        buttonTitle={t('confirmLocation')}
        onPress={onConfirm}
        wrapperStyle={[VS.mt_7]}
      />
    </Animated.View>
  );
};

export default AddressSelectionView;
