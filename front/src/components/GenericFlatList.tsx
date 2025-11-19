import React from 'react';
import {FlatList, FlatListProps} from 'react-native';

function GenericFlatList<T extends {id?: string | number}>({
  data,
  renderItem,
  ...props
}: FlatListProps<T>) {
  const keyExtractor = (item: T, index: number) =>
    item?.id !== undefined && item?.id !== null
      ? item.id.toString()
      : index.toString();

  return (
    <FlatList
      data={data}
      extraData={data}
      renderItem={renderItem}
      alwaysBounceVertical={false}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      {...props}
    />
  );
}

export {GenericFlatList};
