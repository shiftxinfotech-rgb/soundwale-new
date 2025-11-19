import {Icons} from '@assets';
import {ComponentStyles, Text} from '@components';
import {RoleBean} from '@data';
import {AppStyle, Colors, CommonStyle, TS, VS} from '@theme';
import {Scale} from '@util';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity, View} from 'react-native';
import {Styles} from './Styles';

type SupplierItemProps = {
  onPressItem: (item: RoleBean) => void;
  selectedType: RoleBean | undefined;
  supplierData: Array<RoleBean>;
  onClose: () => void;
};

export default function SupplierType({
  onPressItem,
  selectedType,
  supplierData,
  onClose,
}: SupplierItemProps) {
  const {t} = useTranslation('directory');
  return (
    <View>
      <View
        style={[
          VS.fd_row,
          VS.ai_center,
          VS.pv_17,
          VS.ph_21,
          VS.jc_space_between,
          CommonStyle.bgPrimary,
          ComponentStyles.modalHeader,
          Styles.supplierTypeHeader,
        ]}>
        <Text
          fontWeight="bold"
          style={[TS.fs_18, CommonStyle.textWhite, TS.lh_22]}>
          {t('supplierType')}
        </Text>
        <TouchableOpacity
          hitSlop={{top: 20, left: 20, right: 20, bottom: 20}}
          onPress={onClose}
          activeOpacity={0.8}>
          <Icons.Close color={Colors.white} size={Scale(16)} />
        </TouchableOpacity>
      </View>

      <View
        style={[
          VS.fd_row,
          VS.jc_center,
          AppStyle.flexWrap,
          VS.mv_14,
          VS.mh_13,
          VS.ai_center,
        ]}>
        {supplierData.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              activeOpacity={1}
              onPress={() => onPressItem(item)}
              style={[
                selectedType?.slug === item.slug && VS.bw_1,
                VS.p_3,
                Styles.itemView,
                VS.br_10,
                VS.mb_10,
                index % 2 === 0 && VS.mr_13,
              ]}>
              <View
                style={[
                  VS.ai_center,
                  VS.jc_center,
                  selectedType?.slug === item.slug
                    ? CommonStyle.bgPrimary
                    : Styles.selectedBg,
                  AppStyle.fullSize,
                  VS.br_10,
                ]}>
                <Text
                  fontWeight="bold"
                  style={[
                    TS.fs_16,
                    TS.ta_center,
                    TS.tav_center,
                    selectedType?.slug === item.slug
                      ? CommonStyle.textWhite
                      : CommonStyle.textBlack,
                  ]}>
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
