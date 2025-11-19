import {CommonHeader, Container, SmartShimmerFlatList} from '@components';
import {TopAskedArray} from '@data';
import {useTopAskedQuery} from '@services';
import {AppStyle, VS} from '@theme';
import React, {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import ItemFAQ from './component/ItemFAQ';
import ItemFAQShimmer from './component/ItemFAQShimmer';

export default function FAQ() {
  const {t} = useTranslation('cms');
  const {
    isFetching,
    isLoading,
    data: topAskedData,
    refetch,
  } = useTopAskedQuery(undefined, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const [activeIndex, setActiveIndex] = useState<number>(0);

  const _renderItem = useCallback(
    ({item, index}: {item: TopAskedArray; index: number}) => {
      const isActive = index === activeIndex;
      return (
        <ItemFAQ
          key={index}
          item={item}
          isActive={isActive}
          onPress={() => {
            if (isActive) {
              setActiveIndex(-1);
            } else {
              setActiveIndex(index);
            }
          }}
        />
      );
    },
    [activeIndex],
  );

  const onRefresh = useCallback(() => {
    setActiveIndex(-1);
    refetch();
  }, [refetch]);

  const _renderItemShimmer = useCallback(({index}: {index: number}) => {
    return <ItemFAQShimmer key={index} />;
  }, []);

  return (
    <Container>
      <View style={[VS.flex_1]}>
        <CommonHeader title={t('faq')} withBackArrow />

        <SmartShimmerFlatList
          data={topAskedData ?? []}
          isLoading={isLoading || isFetching}
          renderItem={_renderItem}
          renderShimmerItem={_renderItemShimmer}
          onRefresh={onRefresh}
          isRefetching={false}
          contentContainerStyle={[VS.ph_15, VS.pv_30, AppStyle.flexGrow]}
          extraData={topAskedData}
          emptyComponentLabel={t('noFaqAvailable')}
        />
      </View>
    </Container>
  );
}
