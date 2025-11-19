import {Colors, VS} from '@theme';
import React, {useEffect, useRef} from 'react';
import {
  ActivityIndicator,
  FlatList,
  FlatListProps,
  RefreshControl,
  View,
} from 'react-native';
import {NoData} from './NoData';

type SmartEntityListController<T> = {
  data: T[];
  isLoading?: boolean;
  isRefreshing?: boolean;
  isFetchingMore?: boolean;
  hasMore?: boolean;
  refresh?: () => void;
  loadNextPage?: () => void;
  addOne?: (item: T) => void;
  updateOne?: (id: string | number, changes: Partial<T>) => void;
  removeOne?: (id: string | number) => void;
};

type SmartEntityListProps<T> = Omit<
  FlatListProps<T>,
  'data' | 'renderItem' | 'onEndReached' | 'onRefresh' | 'CellRendererComponent'
> & {
  renderItem: ({item, index}: {item: T; index: number}) => React.ReactElement;
  controller: SmartEntityListController<T>;
  scrollToTopOnRefresh?: boolean;
  shimmerCount?: number;
  ListEmptyComponent?: React.ReactElement;
  emptyComponentLabel?: string;
  showShimmerWhileRefetching?: boolean;
  disableShimmerOnRefetch?: boolean;
};

function SmartEntityList<T>({
  controller,
  renderItem,
  scrollToTopOnRefresh = true,
  ListFooterComponent,
  ListEmptyComponent,
  showShimmerWhileRefetching = false,
  disableShimmerOnRefetch = false,
  emptyComponentLabel = '',
  ...rest
}: SmartEntityListProps<T>) {
  const {
    data,
    isLoading,
    isRefreshing,
    isFetchingMore,
    hasMore,
    refresh,
    loadNextPage,
  } = controller;

  const listRef = useRef<FlatList<T>>(null);
  const prevDataLengthRef = useRef<number>(data.length);

  useEffect(() => {
    if (
      scrollToTopOnRefresh &&
      prevDataLengthRef.current > 0 &&
      data.length < prevDataLengthRef.current
    ) {
      listRef.current?.scrollToOffset({offset: 0, animated: true});
    }
    prevDataLengthRef.current = data.length;
  }, [data, scrollToTopOnRefresh]);

  const handleEndReached = () => {
    if (!isFetchingMore && hasMore) {
      loadNextPage?.();
    }
  };

  const isInitialLoad = isLoading && data.length === 0;

  const showShimmer =
    isInitialLoad ||
    (!disableShimmerOnRefetch && showShimmerWhileRefetching && isRefreshing);

  const listData = data;
  const itemRenderer = renderItem;

  const keyExtractor = (item: T, index: number): string => {
    if (showShimmer) {
      return `shimmer-${index}`;
    }
    if (typeof item === 'object' && item !== null) {
      const maybeId = (item as {id?: string | number})?.id;
      if (maybeId !== undefined) {
        return maybeId.toString();
      }
      return JSON.stringify(item) + index;
    }
    return item?.toString?.() ?? index.toString();
  };

  if (showShimmer) {
    return (
      <View style={[VS.flex_1, VS.ai_center, VS.jc_center]}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  } else {
    return (
      <FlatList
        ref={listRef}
        testID={showShimmer ? 'shimmer-list' : 'data-list'}
        data={listData}
        renderItem={itemRenderer}
        keyExtractor={keyExtractor}
        ListEmptyComponent={
          !showShimmer && data.length === 0 ? (
            ListEmptyComponent ?? <NoData message={emptyComponentLabel} />
          ) : (
            <></>
          )
        }
        ListFooterComponent={
          !showShimmer && isFetchingMore && hasMore ? (
            <View style={VS.pv_30}>
              <ActivityIndicator color={Colors.primary} />
            </View>
          ) : (
            ListFooterComponent ?? <></>
          )
        }
        refreshControl={
          refresh ? (
            <RefreshControl refreshing={!!isRefreshing} onRefresh={refresh} />
          ) : undefined
        }
        scrollEnabled={!showShimmer ? rest.scrollEnabled ?? true : true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={rest.contentContainerStyle}
        onEndReachedThreshold={0.2}
        onEndReached={handleEndReached}
        alwaysBounceVertical={false}
        onRefresh={refresh}
        refreshing={!!isRefreshing}
        progressViewOffset={50}
        {...rest}
      />
    );
  }
}

export {SmartEntityList};
