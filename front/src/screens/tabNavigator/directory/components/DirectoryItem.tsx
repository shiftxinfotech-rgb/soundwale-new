import {Icons} from '@assets';
import {ProgressImage, Text} from '@components';
import {DirectoryBean, NavigationParamStack} from '@data';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AppStyle, CommonStyle, TS, VS} from '@theme';
import {isValidImageUrl, setField, validField} from '@util';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Styles} from './Styles';

type DirectoryProps = {
  item: DirectoryBean;
};

export default function DirectoryListItem({item}: DirectoryProps) {
  const {navigate} = useNavigation<NavigationProp<NavigationParamStack>>();
  const {
    country_name,
    state_name,
    city_name,
    view_counter,
    review_avg_rating,
    review_count,
    name,
    personal_name,
    image_url,
    id,
  } = item || {};

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        navigate('DirectoryDetail', {id: id});
      }}
      style={[VS.mh_10, AppStyle.hideOverFlow]}>
      <View style={[VS.br_12, VS.fd_row]}>
        <View
          style={[
            VS.ai_center,
            VS.jc_center,
            Styles.directoryImage,
            AppStyle.hideOverFlow,
          ]}>
          {isValidImageUrl(image_url) && (
            <ProgressImage
              source={{uri: image_url}}
              mode="cover"
              containerStyle={[AppStyle.fullSize]}
            />
          )}
        </View>

        <View style={[VS.flex_1, VS.gap_5, VS.pv_5, VS.pl_10]}>
          <View style={[VS.fd_row, VS.ai_start, VS.jc_space_between]}>
            <View style={[VS.gap_5, VS.flex_1]}>
              {validField(name) ? (
                <Text
                  fontWeight="bold"
                  numberOfLines={1}
                  style={[TS.fs_15, TS.tt_capitalize, TS.lh_18]}>
                  {setField(name)}
                </Text>
              ) : null}
              {validField(personal_name) ? (
                <Text
                  fontWeight="medium"
                  numberOfLines={1}
                  style={[TS.fs_12, TS.tt_capitalize, TS.lh_18]}>
                  {setField(personal_name)}
                </Text>
              ) : null}
            </View>

            {view_counter > 0 && (
              <View
                style={[
                  Styles.viewCount,
                  VS.fd_row,
                  VS.ph_7,
                  VS.ai_center,
                  VS.gap_5,
                  VS.mr_7,
                ]}>
                <Icons.Eye />
                <Text
                  fontWeight="semiBold"
                  style={[TS.lh_17, CommonStyle.textWhite]}>
                  {setField(view_counter.toString() ?? '')}
                </Text>
              </View>
            )}
          </View>
          <View style={[VS.fd_row, VS.ai_center, VS.gap_4, AppStyle.flexWrap]}>
            <Icons.Map />
            <Text
              fontWeight="medium"
              numberOfLines={2}
              style={[TS.fs_12, CommonStyle.textBlueGray, VS.flex_1]}>
              {`${setField(city_name)}, ${setField(state_name)}, ${setField(
                country_name,
              )}`}
            </Text>
          </View>
          <View style={[VS.fd_row, VS.jc_space_between, VS.gap_5, VS.mr_7]}>
            {review_avg_rating > 0 && (
              <View
                style={[
                  Styles.ratingView,
                  VS.fd_row,
                  VS.ph_9,
                  VS.ai_center,
                  VS.gap_5,
                  VS.jc_center,
                  VS.pv_3,
                ]}>
                <Icons.Star />
                <Text
                  fontWeight="quickSandSemiBold"
                  style={[CommonStyle.textAmber, TS.fs_13, TS.lh_16]}>
                  {`${parseInt(review_avg_rating, 10).toFixed(
                    1,
                  )} (${review_count})`}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
