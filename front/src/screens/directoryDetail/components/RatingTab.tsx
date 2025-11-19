import {NoData, Text} from '@components';
import {DirectoryDetail} from '@data';
import {CommonStyle, TS, VS} from '@theme';
import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import RatingSummary from './RatingSummary';
import ReviewItem from './ReviewItem';

type RatingTabProps = {
  info: DirectoryDetail;
};

export default function RatingTab({info}: RatingTabProps) {
  const {t} = useTranslation(['generic']);
  const {review_data, review_avg_rating} = info || {};

  const haveRating = Array.isArray(review_data) && review_data.length > 0;

  const calculateRatingBreakdown = useMemo(() => {
    if (!review_data || review_data.length === 0) {
      return {5: 0, 4: 0, 3: 0, 2: 0, 1: 0};
    }

    // Count actual ratings from review_data
    const breakdown = {5: 0, 4: 0, 3: 0, 2: 0, 1: 0};

    review_data.forEach(review => {
      const rating = review.rating;
      if (rating >= 1 && rating <= 5) {
        breakdown[rating as keyof typeof breakdown]++;
      }
    });

    return breakdown;
  }, [review_data]);

  if (!haveRating) {
    return <NoData message={t('noInformationFound')} />;
  }

  return (
    <View style={[VS.gap_10]}>
      <Text fontWeight="bold" style={[TS.fs_16, TS.tt_capitalize]}>
        {t('ratingReview')}
      </Text>
      <View style={[VS.gap_10, CommonStyle.shadowBoxLight, VS.br_10, VS.p_10]}>
        <RatingSummary
          average={Number(review_avg_rating || 0)}
          totalReviews={review_data.length ?? 0}
          breakdown={calculateRatingBreakdown}
        />
      </View>
      <View style={[VS.gap_10]}>
        <Text fontWeight="bold" style={[TS.fs_16, TS.tt_capitalize]}>
          {t('otherReviews')}
        </Text>
        <View style={[VS.gap_10]}>
          {review_data.map((reviewItem, index) => (
            <View
              key={index}
              style={[
                VS.gap_10,
                CommonStyle.shadowBoxLight,
                VS.br_10,
                VS.p_10,
              ]}>
              <ReviewItem item={reviewItem} />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
