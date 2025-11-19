import {CheckMarkItem, GenericFlatList} from '@components';
import {StateBean} from '@data';
import {AppStyle, TS, VS} from '@theme';
import React, {useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import {Styles} from './Styles';

type Props = {
  states: StateBean[];
  preSelectedIds: (string | number)[];
  onSelect: (payload: string) => void;
};

export default function TypeLocations({
  states,
  preSelectedIds,
  onSelect,
}: Props) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    const normalizedIds = preSelectedIds?.map(String) ?? [];
    setSelectedIds(normalizedIds);
  }, [preSelectedIds]);

  const toggleItem = useCallback(
    (id: string) => {
      setSelectedIds(prev => {
        let newSelected: string[];

        if (id === 'all') {
          const allCityIds = states
            .filter(state => state.id !== 'all')
            .map(state => String(state.id));
          const allSelected = allCityIds.every(e => prev.includes(e));

          if (allSelected) {
            newSelected = [];
          } else {
            newSelected = allCityIds;
          }
        } else {
          if (prev.includes(id)) {
            newSelected = prev.filter(v => v !== id);
          } else {
            newSelected = [...prev, id];
          }
        }

        onSelect(newSelected.join(','));
        return newSelected;
      });
    },
    [onSelect, states],
  );

  const isChecked = useCallback(
    (id: string) => {
      if (id === 'all') {
        const allCityIds = states
          .filter(state => state.id !== 'all')
          .map(state => String(state.id));
        return allCityIds.every(e => selectedIds.includes(e));
      }
      return selectedIds.includes(id);
    },
    [selectedIds, states],
  );

  const renderItem = useCallback(
    ({item}: {item: StateBean}) => {
      const id = String(item.id);
      return (
        <View style={[VS.gap_11]}>
          <CheckMarkItem
            isChecked={isChecked(id)}
            containerStyle={Styles.checkMark}
            title={item.state_name ?? ''}
            textStyle={[TS.lh_14]}
            onPress={() => toggleItem(id)}
          />
        </View>
      );
    },
    [isChecked, toggleItem],
  );

  return (
    <View style={[VS.flex_1]}>
      <GenericFlatList
        data={states}
        contentContainerStyle={[
          AppStyle.flexGrow,
          VS.gap_14,
          VS.pt_22,
          VS.ph_18,
        ]}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}
