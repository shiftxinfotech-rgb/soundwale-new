import {GenericFlatList} from '@components';
import {FilterTypeParam} from '@data';
import {AppStyle, VS} from '@theme';
import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import CategoryTitle from './CategoryTitle';

type Props = {
  categoryArray: FilterTypeParam[];
  selectedItem: FilterTypeParam | null;
  onSelect: (item: FilterTypeParam) => void;
};

export default function LeftPartView({
  categoryArray,
  selectedItem,
  onSelect,
}: Props) {
  const {t} = useTranslation('generic');
  const renderCategoryItem = useCallback(
    ({item, index}: {item: FilterTypeParam; index: number}) => {
      return (
        <CategoryTitle
          key={index}
          title={t(`filterDirectory.${item.value}`, {defaultValue: item.value})}
          count={item.count}
          isSelected={selectedItem?.value === item.value}
          onPress={() => onSelect(item)}
        />
      );
    },
    [selectedItem?.value, onSelect, t],
  );

  return (
    <GenericFlatList
      data={categoryArray}
      renderItem={renderCategoryItem}
      style={[VS.flex_1, VS.mt_14]}
      contentContainerStyle={[AppStyle.flexGrow]}
      keyExtractor={(_, index) => index.toString()}
    />
  );
}
