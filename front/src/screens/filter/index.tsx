import {Icons, Images} from '@assets';
import {CustomButton, Text} from '@components';
import {
  FilterType,
  FilterTypeParam,
  NavigationParamStack,
  ProductsSelection,
  Selections,
} from '@data';
import {useUserInfo} from '@hooks';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';
import {useGetFilterDataQuery} from '@services';
import {Colors, CommonStyle, TS, VS} from '@theme';
import React, {useCallback, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator, Image, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import HeaderView from './components/HeaderView';
import LeftPartView from './components/LeftPartView';
import RightPartView from './components/RightPartView';
import {filterDirectoryArray, filterHomeArray, filterTypeArray} from './Helper';
import {Styles} from './Styles';

type Props = RouteProp<NavigationParamStack, 'FilterScreen'>;

export default function FilterScreen({route}: {route: Props}) {
  const {t} = useTranslation('generic');
  const {goBack} = useNavigation<NavigationProp<NavigationParamStack>>();
  const {type, preFilters, onGoBack} = route.params || {};
  const userDetail = useUserInfo();
  const {data: filterData, isFetching} = useGetFilterDataQuery(
    `type=${type}&user_id=${userDetail?.id}`,
  );
  const [selectedItem, setSelectedItem] = useState<FilterTypeParam | null>(
    type === 'directory'
      ? filterDirectoryArray[0]
      : type === 'home'
      ? filterHomeArray[0]
      : filterTypeArray[0],
  );
  const [filterCatArray, setFilterCatArray] = useState<FilterTypeParam[]>(
    type === 'directory'
      ? filterDirectoryArray
      : type === 'home'
      ? filterHomeArray
      : filterTypeArray,
  );

  const [selections, setSelections] = useState<Selections>(
    type === 'directory'
      ? {
          products: {categoryIds: [], subCategoryIds: []},
          companies: [],
          location: [],
          model: [],
        }
      : type === 'home'
      ? {
          products: {categoryIds: [], subCategoryIds: []},
          companies: [],
          location: [],
          role: [],
        }
      : {
          products: {categoryIds: [], subCategoryIds: []},
          companies: [],
          location: [],
          role: [],
        },
  );

  const updateFilterCounts = useCallback(
    (res: Selections) => {
      setFilterCatArray(currentArray =>
        currentArray.map(item => {
          if (item.id === 'products') {
            const prodSel = res.products || {
              categoryIds: [],
              subCategoryIds: [],
            };
            const count =
              (prodSel?.categoryIds?.length ?? 0) +
              (prodSel?.subCategoryIds?.length ?? 0);
            return {...item, count};
          }
          if (item.id === 'companies') {
            const count = res.companies?.length || 0;
            return {...item, count};
          }
          if (item.id === 'model') {
            const count = res.model?.length || 0;
            return {...item, count};
          }
          if (item.id === 'location') {
            let count = 0;
            if (res.location && res.location.length > 0) {
              if (res.location.includes('all')) {
                count = (filterData?.states?.length ?? 1) - 1;
              } else {
                count = res.location.length;
              }
            }
            return {...item, count};
          }
          if (item.id === 'product_type') {
            const count = res.product_type ? 1 : 0;
            return {...item, count};
          }
          if (item.id === 'role') {
            const count = res.role?.length || 0;
            return {...item, count};
          }
          return item;
        }),
      );
    },
    [filterData?.states?.length],
  );

  useEffect(() => {
    if (preFilters) {
      setSelections(preFilters);
      updateFilterCounts(preFilters);
    }
  }, [preFilters, updateFilterCounts]);

  const resetToInitial = useCallback(() => {
    if (type === 'directory') {
      setSelections(old => ({
        ...old,
        products: {categoryIds: [], subCategoryIds: []},
        companies: [],
        location: [],
        model: [],
      }));
    } else {
      setSelections(old => ({
        ...old,
        products: {categoryIds: [], subCategoryIds: []},
        companies: [],
        location: [],
        product_type: '',
        model: [],
        role: [],
      }));
    }

    setFilterCatArray(prev =>
      prev.map(item => ({
        ...item,
        count: 0,
      })),
    );
  }, [type]);

  const filterItemByType = useCallback((item: FilterTypeParam) => {
    setSelectedItem(item);
  }, []);

  const handleSelectionChange = <T extends FilterType>(
    fType: T,
    selected: Selections[T],
  ) => {
    setSelections(prev => ({
      ...prev,
      [fType]: selected,
    }));

    setFilterCatArray(currentArray =>
      currentArray.map(item => {
        if (item.id === fType) {
          if (fType === 'product_type') {
            return item;
          }
          let count = 0;
          if (
            fType === 'products' &&
            typeof selected === 'object' &&
            selected !== null
          ) {
            const prodSel = selected as ProductsSelection;

            const categoryCount = Array.isArray(prodSel.categoryIds)
              ? prodSel.categoryIds.filter(id => id?.trim()).length
              : 0;

            const subCategoryCount = Array.isArray(prodSel.subCategoryIds)
              ? prodSel.subCategoryIds.filter(id => id?.trim()).length
              : 0;
            count = categoryCount + subCategoryCount;
          } else if (Array.isArray(selected)) {
            const selectedCount = Array.isArray(selected)
              ? selected.filter(id => id?.trim()).length
              : 0;
            if (fType === 'location') {
              if (selected.includes('all')) {
                count = (filterData?.states?.length ?? 1) - 1;
              } else {
                count = selectedCount;
              }
            } else {
              count = selectedCount;
            }
          }

          return {
            ...item,
            count,
          };
        }
        return item;
      }),
    );
  };

  return (
    <View style={[VS.flex_1, CommonStyle.mainContainer]}>
      <View style={[StyleSheet.absoluteFillObject, CommonStyle.bgPrimary]} />
      <Image source={Images.filterTopMask} style={Styles.absoluteTopRight} />
      <SafeAreaView style={[VS.flex_1]}>
        <HeaderView onResetFilter={resetToInitial} />
        <View
          style={[
            VS.mt_23,
            VS.flex_1,
            VS.fd_row,
            VS.ai_start,
            Styles.filterContainer,
          ]}>
          {isFetching ? (
            <View style={[VS.flex_1, VS.ai_center, VS.as_center]}>
              <ActivityIndicator size={'large'} color={Colors.primary} />
            </View>
          ) : (
            <>
              <View style={[Styles.leftPart]}>
                <LeftPartView
                  categoryArray={filterCatArray}
                  selectedItem={selectedItem}
                  onSelect={filterItemByType}
                />
              </View>
              <View style={[Styles.rightPart]}>
                <RightPartView
                  activeType={selectedItem?.id!}
                  filterData={filterData}
                  selections={selections}
                  onSelectionChange={handleSelectionChange}
                />
              </View>
            </>
          )}
        </View>
        <CustomButton
          buttonTitle=""
          customView={
            <View style={[VS.fd_row, VS.gap_8, VS.ai_center, VS.jc_center]}>
              <Icons.ApplyFilter />
              <Text
                fontWeight={'quickSandBold'}
                style={[TS.fs_16, CommonStyle.textWhite, TS.lh_20]}>
                {t('applyFilter')}
              </Text>
            </View>
          }
          onPress={() => {
            goBack();
            onGoBack(selections);
          }}
        />
      </SafeAreaView>
    </View>
  );
}
