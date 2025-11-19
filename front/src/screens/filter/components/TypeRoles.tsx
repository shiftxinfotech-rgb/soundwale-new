import {CheckMarkItem, GenericFlatList} from '@components';
import {RoleBean} from '@data';
import {AppStyle, TS, VS} from '@theme';
import React, {useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import {Styles} from './Styles';

type Props = {
  roles: RoleBean[];
  preSelectedIds: (string | number)[];
  onSelect: (payload: string) => void;
};

export default function TypeRoles({roles, preSelectedIds, onSelect}: Props) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    const normalizedIds = preSelectedIds.map(String);
    setSelectedIds(normalizedIds);
  }, [preSelectedIds]);

  const toggleItem = useCallback(
    (id: string) => {
      setSelectedIds(prev => {
        let newSelected: string[];
        if (prev.includes(id)) {
          newSelected = prev.filter(v => v !== id);
        } else {
          newSelected = [...prev, id];
        }

        onSelect(newSelected.join(','));
        return newSelected;
      });
    },
    [onSelect],
  );

  const isChecked = useCallback(
    (id: string) => {
      return selectedIds.includes(id);
    },
    [selectedIds],
  );

  const renderItem = useCallback(
    ({item}: {item: RoleBean}) => {
      const id = String(item.id);
      return (
        <View style={[VS.gap_11]}>
          <CheckMarkItem
            isChecked={isChecked(id)}
            containerStyle={Styles.checkMark}
            title={item.name ?? ''}
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
        data={roles}
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
