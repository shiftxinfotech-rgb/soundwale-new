import {Icons} from '@assets';
import {CheckMarkItem} from '@components';
import {Category} from '@data';
import {AppStyle, TS, VS} from '@theme';
import React, {useEffect, useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {Styles} from './Styles';

type Props = {
  categories: Category[];
  preSelectedCategoryIds: (string | number)[];
  preSelectedSubCategoryIds: (string | number)[];
  onSelect: (payload: {categoryId: string; subCategoryId: string}) => void;
};

export default function TypeProducts({
  categories,
  preSelectedCategoryIds,
  preSelectedSubCategoryIds,
  onSelect,
}: Props) {
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const [selectedSubcategoryIds, setSelectedSubcategoryIds] = useState<
    string[]
  >([]);
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);

  useEffect(() => {
    const normalizedCatIds = preSelectedCategoryIds.map(String);
    const normalizedSubIds = preSelectedSubCategoryIds.map(String);

    setSelectedCategoryIds(normalizedCatIds);
    setSelectedSubcategoryIds(normalizedSubIds);

    const expanded: number[] = [];

    categories.forEach(category => {
      const catId = String(category.id);
      const subIds = category.sub_category?.map(s => String(s.id)) ?? [];

      const hasSelectedSub = subIds.some(id => normalizedSubIds.includes(id));
      const isSelectedNoSub =
        subIds.length === 0 && normalizedCatIds.includes(catId);

      if (hasSelectedSub || isSelectedNoSub) {
        if (category.id != null) {
          expanded.push(category.id);
        }
      }
    });

    setExpandedCategories(expanded);
  }, [preSelectedCategoryIds, preSelectedSubCategoryIds, categories]);

  const fireOnSelect = (subIds: string[], catIds: string[]) => {
    setSelectedSubcategoryIds(subIds);
    setSelectedCategoryIds(catIds);
    onSelect({
      categoryId: catIds.join(','),
      subCategoryId: subIds.join(','),
    });
  };

  const toggleItem = (subId: string, parentCatId: string) => {
    let newSubIds = [...selectedSubcategoryIds];
    if (newSubIds.includes(subId)) {
      newSubIds = newSubIds.filter(id => id !== subId);
    } else {
      newSubIds.push(subId);
    }

    const updatedCategoryIds = categories
      .filter(cat =>
        cat.sub_category?.some(sub => newSubIds.includes(String(sub.id))),
      )
      .map(cat => String(cat.id));

    fireOnSelect(newSubIds, [
      ...new Set([
        ...selectedCategoryIds.filter(id => !id || id !== parentCatId),
        ...updatedCategoryIds,
      ]),
    ]);
  };

  const toggleCategory = (category: Category) => {
    const catId = String(category.id);

    if (category.sub_category?.length) {
      const subIds = category.sub_category.map(s => String(s.id));
      const allSelected = subIds.every(id =>
        selectedSubcategoryIds.includes(id),
      );

      const newSubIds = allSelected
        ? selectedSubcategoryIds.filter(id => !subIds.includes(id))
        : [...new Set([...selectedSubcategoryIds, ...subIds])];

      const newCatIds = categories
        .filter(cat =>
          cat.sub_category?.some(sub => newSubIds.includes(String(sub.id))),
        )
        .map(cat => String(cat.id));

      fireOnSelect(newSubIds, newCatIds);
    } else {
      const isSelected = selectedCategoryIds.includes(catId);
      const newCatIds = isSelected
        ? selectedCategoryIds.filter(id => id !== catId)
        : [...selectedCategoryIds, catId];

      fireOnSelect(selectedSubcategoryIds, newCatIds);
    }
  };

  const isCategoryChecked = (category: Category) => {
    const catId = String(category.id);

    if (category.sub_category?.length) {
      const subIds = category.sub_category.map(s => String(s.id));
      return (
        subIds.length > 0 &&
        subIds.every(id => selectedSubcategoryIds.includes(id))
      );
    } else {
      return selectedCategoryIds.includes(catId);
    }
  };

  const toggleExpand = (categoryId?: number) => {
    if (!categoryId) {
      return;
    }
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId],
    );
  };

  return (
    <View style={[VS.flex_1]}>
      <ScrollView
        style={[VS.flex_1]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          AppStyle.flexGrow,
          VS.gap_14,
          VS.pt_22,
          VS.ph_18,
        ]}>
        {categories.map(category => {
          const isExpanded = expandedCategories.includes(category.id ?? -1);
          return (
            <View style={[VS.gap_11]} key={category.id}>
              <View style={[VS.fd_row, VS.ai_center]}>
                <CheckMarkItem
                  isChecked={isCategoryChecked(category)}
                  containerStyle={Styles.checkMark}
                  title={category.name ?? ''}
                  textStyle={[TS.lh_14]}
                  onPress={() => toggleCategory(category)}
                />
                {category.sub_category?.length ? (
                  <TouchableOpacity onPress={() => toggleExpand(category.id)}>
                    <Icons.ArrowDown />
                  </TouchableOpacity>
                ) : null}
              </View>

              {isExpanded && category.sub_category?.length ? (
                <View
                  style={[
                    VS.gap_10,
                    VS.fd_row,
                    VS.ai_center,
                    VS.jc_space_between,
                    AppStyle.flexWrap,
                  ]}>
                  {category.sub_category?.map(option => {
                    const id = String(option.id);
                    return (
                      <CheckMarkItem
                        key={option.id}
                        isChecked={selectedSubcategoryIds.includes(id)}
                        title={option.name ?? ''}
                        containerStyle={[
                          Styles.childCheckMark,
                          VS.ai_start,
                          VS.pl_22,
                        ]}
                        onPress={() => toggleItem(id, String(category.id))}
                      />
                    );
                  })}
                </View>
              ) : null}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
