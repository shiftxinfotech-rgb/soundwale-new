import {Colors, VS} from '@theme';
import React from 'react';
import {
  ActivityIndicator,
  FlatListProps,
  RefreshControl,
  FlatList,
  View,
} from 'react-native';
import {NoData} from './NoData';

type Props<T> = {
  data: T[];
  isLoading: boolean;
  isFetchingMore?: boolean;
  showShimmerWhileRefetching?: boolean;
  disableShimmerOnRefetch?: boolean;
  isRefetching?: boolean;
  hasMore?: boolean;
  hasError?: boolean;
  onRefresh?: () => void;
  renderItem: ({item, index}: {item: T; index: number}) => React.ReactElement;
  renderShimmerItem: ({index}: {index: number}) => React.ReactElement;
  shimmerCount?: number;
  ListEmptyComponent?: React.ReactElement;
  errorComponent?: React.ReactElement;
  emptyComponentLabel?: string;
} & Omit<
  FlatListProps<T>,
  'data' | 'renderItem' | 'keyExtractor' | 'CellRendererComponent'
>;

function SmartShimmerFlatList<T>({
  data,
  isLoading,
  isFetchingMore = false,
  hasMore = false,
  showShimmerWhileRefetching = false,
  disableShimmerOnRefetch = false,
  isRefetching = false,
  hasError = false,
  onRefresh,
  renderItem,
  emptyComponentLabel = 'No Data Found',

  ListEmptyComponent,
  errorComponent,
  ...rest
}: Props<T>) {
  // const {height} = useWindowDimensions();

  // const defaultCount = useMemo(
  //   () => shimmerCount ?? Math.ceil(height / 80),
  //   [shimmerCount, height],
  // );

  // const shimmerData = useMemo(
  //   () => Array.from({length: defaultCount}),
  //   [defaultCount],
  // );

  const isInitialLoad = isLoading && data.length === 0;
  const showShimmer =
    isInitialLoad ||
    (!disableShimmerOnRefetch && showShimmerWhileRefetching && isRefetching);
  const listData = data;
  const itemRenderer = renderItem;
  // const listData = showShimmer ? (shimmerData as T[]) : data;
  // const itemRenderer = showShimmer
  //   ? ({index}: {index: number}) => renderShimmerItem({index})
  //   : renderItem;

  const keyExtractor = (_: T, index: number): string => {
    if (showShimmer) {
      return `shimmer-${index}`;
    }
    return `item-${index}`;
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
        extraData={listData}
        renderItem={itemRenderer}
        keyExtractor={keyExtractor}
        ListEmptyComponent={
          hasError ? (
            errorComponent ?? <></>
          ) : !showShimmer && data.length === 0 ? (
            ListEmptyComponent ?? <NoData message={emptyComponentLabel} />
          ) : (
            <></>
          )
        }
        ListFooterComponent={
          !showShimmer && isFetchingMore && hasMore ? (
            <ActivityIndicator style={VS.mv_16} />
          ) : (
            rest.ListFooterComponent ?? <></>
          )
        }
        refreshControl={
          onRefresh ? (
            <RefreshControl refreshing={false} onRefresh={onRefresh} />
          ) : undefined
        }
        scrollEnabled={!showShimmer ? rest.scrollEnabled ?? true : true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={rest.contentContainerStyle}
        onEndReachedThreshold={0.1}
        progressViewOffset={50}
        alwaysBounceVertical={false}
        {...rest}
      />
    );
  }
}

export {SmartShimmerFlatList};
