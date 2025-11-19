import {
  Container,
  CustomBottomSheet,
  CustomBottomSheetMethods,
  SmartFlatList,
} from '@components';
import {
  BackParams,
  CategoryBean,
  DirectoryBean,
  NavigationParamStack,
  RequestTypeParam,
  RoleBean,
  Selections,
} from '@data';
import {LazyFetcher, usePaginatedList, useUserInfo} from '@hooks';
import {RouteProp, useRoute} from '@react-navigation/native';
import {
  useGetCategoryQuery,
  useGetRolesQuery,
  useLazyGetDirectoryQuery,
} from '@services';
import {AppStyle, CommonStyle, VS} from '@theme';
import {navigate, RequestLimit, safeSplit, transformQueryParam} from '@util';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import TabHeader from '../components/TabHeader';
import DirectoryListItem from './components/DirectoryItem';
import LocationStatusFilter from './components/LocationStatusFilter';
import ProductFilter from './components/ProductFilter';
import SearchInput from './components/SearchInput';
import SupplierType from './components/SupplierType';

export type LocationInfo = {
  city: string;
  isCustom: boolean;
  total: number;
};

const DirectoryList = () => {
  const {selectedLocation, selectedSupplier} =
    useRoute<RouteProp<NavigationParamStack, 'DirectoryList'>>().params || {};

  const {t} = useTranslation(['directory']);
  const sheetRef = useRef<CustomBottomSheetMethods | null>(null);
  const statusRef = useRef<CustomBottomSheetMethods | null>(null);
  const userInfo = useUserInfo();

  const {data: productData} = useGetCategoryQuery(
    userInfo?.id?.toString() ?? '',
    {skip: true},
  );

  const [trigger] = useLazyGetDirectoryQuery();

  const [queryParams, setQueryParams] = useState<RequestTypeParam>({
    limit: RequestLimit,
    role_id: selectedSupplier?.id ?? '',
    latitude: selectedLocation?.latitude ?? '',
    longitude: selectedLocation?.longitude ?? '',
    state_name: selectedLocation?.state ?? '',
  });
  const [selectedProduct, setSelectedProduct] = useState<CategoryBean>({
    id: 0,
    name: 'All',
  });
  const [selectedType, setSelectedType] = useState<RoleBean>(
    selectedSupplier ?? {},
  );

  const [locationInfo, setLocationInfo] = useState<LocationInfo>({
    city: selectedLocation?.state || userInfo?.state_name || '',
    isCustom: false,
    total: 0,
  });

  const fetchBuyerPosts: LazyFetcher<DirectoryBean> = async param => {
    const formData = transformQueryParam(param);
    const result = await trigger(formData, false);
    return {
      data: result.data?.data?.data ?? [],
      meta: result.data?.data?.meta,
    };
  };

  const controller = usePaginatedList(fetchBuyerPosts, {
    extraParams: queryParams,
    debounceDelay: 300,
    refreshOnFocus: false,
  });

  const {data: rolesArray} = useGetRolesQuery();

  const onFilterSelected = useCallback(
    (filters: Selections) => {
      const updatedParams: RequestTypeParam = {...queryParams};
      const setOrRemoveIfPresent = (
        key: keyof RequestTypeParam,
        value: any,
      ) => {
        if (value !== undefined) {
          if (Array.isArray(value)) {
            updatedParams[key] = value.join(',');
          } else {
            updatedParams[key] = value;
          }
        }
      };
      setOrRemoveIfPresent('sub_category_id', filters.products?.subCategoryIds);
      setOrRemoveIfPresent('product_id', filters.products?.categoryIds);
      setOrRemoveIfPresent('model_id', filters.model);
      setOrRemoveIfPresent(
        'state_id',
        filters.location ? filters.location : userInfo?.state_id,
      );
      setOrRemoveIfPresent('company_id', filters.companies);
      setOrRemoveIfPresent('radius', filters.location_range);
      if (
        filters.location &&
        Array.isArray(filters.location) &&
        filters.location.length > 1
      ) {
        setLocationInfo({
          city: '',
          isCustom: true,
          total: filters.location.length,
        });
      }
      setQueryParams(updatedParams);
    },
    [queryParams, userInfo?.state_id],
  );

  const preSelectedFilters = useMemo(() => {
    return {
      products: {
        categoryIds: safeSplit(queryParams.product_id),
        subCategoryIds: safeSplit(queryParams.sub_category_id),
      },
      companies: safeSplit(queryParams.company_id),
      model: safeSplit(queryParams.model_id),
      location: safeSplit(queryParams.state_id),
      location_range: queryParams.radius,
    };
  }, [queryParams]);

  const itemSeparator = useCallback(() => {
    return <View style={[VS.h_1, CommonStyle.bgLightGray, VS.mv_8]} />;
  }, []);

  const renderHeaderComponent = () => {
    return (
      <>
        <SearchInput
          onPerformSearch={(query: string) => {
            setQueryParams(old => ({
              ...old,
              search: query,
            }));
          }}
          preSelectedFilters={preSelectedFilters}
          onFilterSelected={onFilterSelected}
        />
        <LocationStatusFilter
          locationInfo={locationInfo}
          totalResults={controller.meta?.total ?? 0}
          category={selectedType?.name ?? ''}
          isLoading={controller.isLoading || controller.isRefreshing}
          onPressLocation={() => {
            navigate('Location', {
              requestFrom: 'directory',
              type: 'directory',
              onGoBack: (params: BackParams) => {
                if (params.latitude && params.longitude) {
                  setQueryParams(old => ({
                    ...old,
                    latitude: params.latitude,
                    longitude: params.longitude,
                    state_id: undefined,
                  }));
                } else {
                  const allSelected = params.id === 'all';
                  setQueryParams(old => ({
                    ...old,
                    latitude: undefined,
                    longitude: undefined,
                    state_id: params.id ? String(params.id) : '',
                    state_name: allSelected
                      ? ''
                      : params.state_name?.toLowerCase(),
                  }));
                }
                if (params.id === 'all') {
                  setLocationInfo({
                    city: 'All States',
                    isCustom: true,
                    total: 0,
                  });
                } else {
                  setLocationInfo({
                    city: params.state_name || '',
                    isCustom: false,
                    total: 0,
                  });
                }
              },
            });
          }}
        />
      </>
    );
  };
  const _renderItem = useCallback(({item}: {item: DirectoryBean}) => {
    return <DirectoryListItem item={item} />;
  }, []);

  return (
    <Container>
      <TabHeader
        title={selectedType?.name ?? ''}
        isSupplier
        isBack
        onSupplier={() => {
          sheetRef?.current?.onPresent();
        }}
      />

      {renderHeaderComponent()}

      <SmartFlatList
        controller={controller}
        renderItem={_renderItem}
        showShimmerWhileRefetching={true}
        emptyComponentLabel={t('noDirectoryFound')}
        contentContainerStyle={[AppStyle.flexGrow]}
        style={[VS.flex_1, VS.mt_15]}
        ItemSeparatorComponent={itemSeparator}
      />
      <CustomBottomSheet ref={sheetRef}>
        <SupplierType
          onPressItem={(item: RoleBean) => {
            setSelectedType(item);
            setQueryParams(old => ({
              ...old,
              role_id: item.id,
            }));
            setSelectedProduct({
              id: 0,
              name: 'All',
            });
            sheetRef?.current?.onDismiss();
          }}
          selectedType={selectedType}
          supplierData={rolesArray ?? []}
          onClose={() => sheetRef?.current?.onDismiss()}
        />
      </CustomBottomSheet>
      <CustomBottomSheet ref={statusRef}>
        <ProductFilter
          onPressItem={(item: CategoryBean) => {
            setSelectedProduct(item);
            setQueryParams(old => ({
              ...old,
              product_id: item.id,
            }));
            statusRef?.current?.onDismiss();
          }}
          selectedProduct={selectedProduct}
          productData={[{id: 0, name: 'All'}, ...(productData || [])]}
          onClose={() => statusRef?.current?.onDismiss()}
        />
      </CustomBottomSheet>
    </Container>
  );
};
export default DirectoryList;
