import {TouchableOpacity} from 'react-native';
import React from 'react';
import {CommonStyle, TS} from '@theme';
import {DropDownListParams} from '@data';
import {VS} from '@theme';
import {ComponentStyles} from './ComponentStyles';
import {Text} from './TextView';
import {Scale} from '@util';
import {Icons} from '@assets';

type Props = {
  isLast: boolean;
  item: DropDownListParams;
  isSelected: boolean;
  onSelectItem: () => void;
};

export default function DropDownListItem({
  item,
  onSelectItem,
  isLast,
  isSelected,
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onSelectItem}
      style={[
        VS.fd_row,
        VS.ai_center,
        VS.jc_space_between,
        VS.ph_15,
        VS.pv_10,
        !isLast && ComponentStyles.optionRow,
      ]}>
      <Text
        fontWeight="quickSandMedium"
        style={[TS.fs_15, CommonStyle.textDimGray]}>
        {item.label}
      </Text>
      {isSelected && <Icons.Check width={Scale(15)} height={Scale(15)} />}
    </TouchableOpacity>
  );
}
