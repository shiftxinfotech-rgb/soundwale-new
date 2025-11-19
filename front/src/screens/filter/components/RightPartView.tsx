import {FilterData, FilterType, Selections} from '@data';
import {VS} from '@theme';
import React from 'react';
import {View} from 'react-native';
import TypeCompanies from './TypeCompanies';
import TypeLocations from './TypeLocations';
import TypeModel from './TypeModel';
import TypeProducts from './TypeProducts';
import TypeRequirement from './TypeRequirement';
import TypeRoles from './TypeRoles';

type Props = {
  activeType: FilterType;
  filterData: FilterData | undefined;
  selections: Selections;
  onSelectionChange: <T extends FilterType>(
    type: T,
    selected: Selections[T],
  ) => void;
};

export default function RightPartView({
  activeType,
  filterData,
  selections,
  onSelectionChange,
}: Props) {
  if (activeType === 'products') {
    return (
      <View style={[VS.flex_1]}>
        <TypeProducts
          preSelectedCategoryIds={selections?.products?.categoryIds ?? []}
          preSelectedSubCategoryIds={selections?.products?.subCategoryIds ?? []}
          categories={filterData?.category ?? []}
          onSelect={({categoryId, subCategoryId}) => {
            onSelectionChange('products', {
              categoryIds: categoryId
                .split(',')
                .map(id => id.trim())
                .filter(id => id.length > 0),
              subCategoryIds: subCategoryId
                .split(',')
                .map(id => id.trim())
                .filter(id => id.length > 0),
            });
          }}
        />
      </View>
    );
  }

  if (activeType === 'companies') {
    return (
      <View style={[VS.flex_1]}>
        <TypeCompanies
          preSelectedIds={selections.companies}
          companies={filterData?.main_category ?? []}
          onSelect={payload =>
            onSelectionChange(
              'companies',
              payload
                .split(',')
                .map(id => id.trim())
                .filter(id => id.length > 0),
            )
          }
        />
      </View>
    );
  }

  if (activeType === 'model') {
    return (
      <View style={[VS.flex_1]}>
        <TypeModel
          preSelectedIds={selections.model ?? []}
          model={filterData?.model ?? []}
          onSelect={payload =>
            onSelectionChange(
              'model',
              payload
                .split(',')
                .map(id => id.trim())
                .filter(id => id.length > 0),
            )
          }
        />
      </View>
    );
  }
  if (activeType === 'location') {
    return (
      <View style={[VS.flex_1]}>
        <TypeLocations
          preSelectedIds={selections.location}
          states={filterData?.states ?? []}
          onSelect={payload => {
            onSelectionChange(
              'location',
              payload
                .split(',')
                .map(id => id.trim())
                .filter(id => id.length > 0),
            );
          }}
        />
      </View>
    );
  }
  if (activeType === 'role') {
    return (
      <View style={[VS.flex_1]}>
        <TypeRoles
          preSelectedIds={selections.role ?? []}
          roles={filterData?.roles ?? []}
          onSelect={payload =>
            onSelectionChange(
              'role',
              payload
                .split(',')
                .map(id => id.trim())
                .filter(id => id.length > 0),
            )
          }
        />
      </View>
    );
  }
  if (activeType === 'product_type') {
    return (
      <View style={[VS.flex_1]}>
        <TypeRequirement
          preSelectedId={selections.product_type ?? ''}
          requirements={filterData?.requirement_type ?? []}
          onSelect={payload => {
            onSelectionChange('product_type', payload.value?.toString() ?? '');
          }}
        />
      </View>
    );
  }
  return <View style={[VS.flex_1]} />;
}
