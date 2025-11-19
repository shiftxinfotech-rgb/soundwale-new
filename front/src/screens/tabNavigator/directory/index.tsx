import {
  CategorySelectItem,
  Container,
  CustomBottomSheet,
  CustomBottomSheetMethods,
} from '@components';
import {RoleBean} from '@data';
import {useSmartLocationContext} from '@providers';
import {useGetRolesQuery} from '@services';
import {AppStyle, Colors, VS} from '@theme';
import {navigate} from '@util';
import React, {useCallback, useRef, useState} from 'react';
import {ActivityIndicator, ScrollView, View} from 'react-native';
import TabHeader from '../components/TabHeader';
import SupplierType from './components/SupplierType';
import {Styles} from './Styles';

export default function AddMemberDirectory() {
  const sheetRef = useRef<CustomBottomSheetMethods | null>(null);
  const {isLoading, isFetching, data: rolesArray} = useGetRolesQuery();
  const {location} = useSmartLocationContext();
  const [selectedType, setSelectedType] = useState<RoleBean>(
    rolesArray?.[0] ?? {},
  );

  const renderItem = useCallback(
    (role: RoleBean, index: number) => {
      return (
        <CategorySelectItem
          key={index}
          selectedIcon={role.selected_image_url ?? ''}
          icon={role.image_url ?? ''}
          title={role.name ?? ''}
          subtitle={role.description ?? ''}
          selected={selectedType?.slug === role.slug}
          onPress={() => {
            navigate('DirectoryList', {
              selectedSupplier: role,
              selectedLocation: location,
            });
            setSelectedType(role);
          }}
        />
      );
    },
    [selectedType?.slug, location],
  );

  return (
    <Container>
      <TabHeader
        title={rolesArray?.[0]?.name ?? ''}
        isSupplier
        onSupplier={() => {
          sheetRef?.current?.onPresent();
        }}
      />
      {isLoading || isFetching ? (
        <View style={[VS.flex_1, VS.jc_center, VS.ai_center]}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={[
            AppStyle.flexGrow,
            VS.ph_15,
            Styles.spaceBottom,
          ]}
          showsVerticalScrollIndicator={false}>
          {rolesArray?.map((role, index) => renderItem(role, index))}
        </ScrollView>
      )}
      <CustomBottomSheet ref={sheetRef}>
        <SupplierType
          onPressItem={(item: RoleBean) => setSelectedType(item)}
          selectedType={selectedType || rolesArray?.[0]}
          supplierData={rolesArray ?? []}
          onClose={() => sheetRef?.current?.onDismiss()}
        />
      </CustomBottomSheet>
    </Container>
  );
}
