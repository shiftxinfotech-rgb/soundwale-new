import {Icons} from '@assets';
import {Text} from '@components';
import {Colors, TS, VS} from '@theme';
import {Scale, width} from '@util';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {Styles} from './Styles';

interface RatingSummaryProps {
  average: number;
  totalReviews: number;
  breakdown: {[key: number]: number};
}

const MAX_STARS = 5;
export const BAR_MAX_WIDTH = width - 80;

const RatingSummary: React.FC<RatingSummaryProps> = ({
  average,
  totalReviews,
  breakdown,
}) => {
  const {t} = useTranslation(['generic']);

  return (
    <View style={[VS.gap_10]}>
      <View style={[VS.fd_row, VS.ai_center, VS.gap_10]}>
        <Text fontWeight="bold" style={[TS.fs_35, TS.lh_35]}>
          {average.toFixed(1)}
        </Text>
        <View style={[VS.fd_row, VS.ai_center, VS.gap_5]}>
          {Array.from({length: MAX_STARS}).map((_, i) => (
            <Icons.Star
              key={i}
              size={23}
              color={i < Math.round(average) ? Colors.amber : Colors.silverGray}
            />
          ))}
        </View>
      </View>
      <Text fontWeight="regular" style={[TS.fs_15, {color: Colors.blueGray}]}>
        {t('avgRating', {totalReviews})}
      </Text>
      <View>
        {Object.keys(breakdown)
          .sort((a, b) => Number(b) - Number(a))
          .map((star, idx) => {
            const count = breakdown[Number(star)];
            // Calculate percentage of total reviews (100% = totalReviews)
            const percent = totalReviews > 0 ? count / totalReviews : 0;
            return (
              <View key={idx} style={[VS.fd_row, VS.ai_center, VS.gap_7]}>
                <Text
                  fontWeight="medium"
                  style={[
                    TS.fs_16,
                    TS.ta_center,
                    TS.tav_center,
                    {width: Scale(15)},
                  ]}>
                  {star}
                </Text>
                <View style={[Styles.barTrack]}>
                  <View
                    style={[Styles.barFill, {width: percent * BAR_MAX_WIDTH}]}
                  />
                </View>
              </View>
            );
          })}
      </View>
    </View>
  );
};

export default RatingSummary;
