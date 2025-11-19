import {Icons} from '@assets';
import {ComponentStyles, Text} from '@components';
import {CategoryBean} from '@data';
import {Colors, CommonStyle, TS, VS} from '@theme';
import {Scale} from '@util';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity, View} from 'react-native';
import ItemView from './ItemView';
import {Styles} from './Styles';

type StatusItemProps = {
  onPressItem: (item: CategoryBean) => void;
  selectedProduct: CategoryBean;
  onClose: () => void;
  productData: CategoryBean[] | undefined;
};

export default function ProductFilter({
  onPressItem,
  selectedProduct,
  onClose,
  productData,
}: StatusItemProps) {
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
          {t('product')}
        </Text>
        <TouchableOpacity
          hitSlop={{top: 20, left: 20, right: 20, bottom: 20}}
          onPress={onClose}
          activeOpacity={0.8}>
          <Icons.Close color={Colors.white} size={Scale(16)} />
        </TouchableOpacity>
      </View>
      <View style={[VS.pv_8]}>
        {productData?.map((item, index) => {
          return (
            <ItemView
              key={index}
              isSelected={selectedProduct && selectedProduct.id === item.id}
              title={item.name || ''}
              onPressItem={() => onPressItem(item)}
            />
          );
        })}
      </View>
    </View>
  );
}
