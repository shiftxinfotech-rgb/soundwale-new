import {Colors, VS} from '@theme';
import React, {useEffect, useRef} from 'react';
import {
  FlatList,
  FlatListProps,
  RefreshControl,
  View,
  ActivityIndicator,
} from 'react-native';
// import Animated, {
//   FadeIn,
//   useSharedValue,
//   withTiming,
// } from 'react-native-reanimated';
import {NoData} from './NoData';

type SmartFlatListController<T> = {
  data: T[];
  isLoading?: boolean;
  isRefreshing?: boolean;
  isFetchingMore?: boolean;
  hasMore?: boolean;
  refresh?: () => void;
  loadNextPage?: () => void;
};

type SmartFlatListProps<T> = Omit<
  FlatListProps<T>,
  'data' | 'renderItem' | 'onEndReached' | 'onRefresh' | 'CellRendererComponent'
> & {
  renderItem: ({item, index}: {item: T; index: number}) => React.ReactElement;
  // renderShimmerItem: ({index}: {index: number}) => React.ReactElement;
  controller: SmartFlatListController<T>;
  scrollToTopOnRefresh?: boolean;
  shimmerCount?: number;
  ListEmptyComponent?: React.ReactElement;
  emptyComponentLabel?: string;
  isFetchingMore?: boolean;
  showShimmerWhileRefetching?: boolean;
  disableShimmerOnRefetch?: boolean;
  hasError?: boolean;
  errorComponent?: React.ReactElement;
};

function SmartFlatList<T>({
  controller,
  renderItem,
  scrollToTopOnRefresh = true,
  ListFooterComponent,
  ListEmptyComponent,

  showShimmerWhileRefetching = false,
  disableShimmerOnRefetch = false,
  emptyComponentLabel = '',
  ...rest
}: SmartFlatListProps<T>) {
  // const {height} = useWindowDimensions();

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

  // const defaultCount = useMemo(
  //   () => shimmerCount ?? Math.ceil(height / 80),
  //   [shimmerCount, height],
  // );
  // const shimmerData = useMemo(
  //   () => Array.from({length: defaultCount}),
  //   [defaultCount],
  // );

  // const fade = useSharedValue(0);

  // useEffect(() => {
  //   if (!isLoading && fade.value === 0 && data.length > 0) {
  //     fade.value = withTiming(1, {duration: 300});
  //   }
  // }, [isLoading, data.length, fade]);

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

  // const listData = showShimmer ? (shimmerData as T[]) : data;
  // const itemRenderer = showShimmer
  //   ? ({index}: {index: number}) => renderShimmerItem({index})
  //   : renderItem;

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
        testID={showShimmer ? 'shimmer-list' : 'data-list'}
        // entering={FadeIn.duration(200)}
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
            <RefreshControl refreshing={false} onRefresh={refresh} />
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

export {SmartFlatList};
