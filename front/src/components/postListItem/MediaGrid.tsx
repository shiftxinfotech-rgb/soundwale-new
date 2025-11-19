import {ImageBean} from '@data';
import {AppStyle, CommonStyle, TS, VS} from '@theme';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {ProgressImage} from '../ProgressImage';
import {Text} from '../TextView';
import {Styles} from './Styles';

export default function MediaGrid({
  displayImages,
  onSelectMedia,
  totalCount,
}: {
  displayImages: ImageBean[];
  onSelectMedia: (index: number) => void;
  totalCount: number;
}) {
  const getGridStyle = (index: number, total: number) => {
    let widthStyle = {};
    let spacingStyle = {};
    let bottomStyle = {};

    if (total === 1) {
      widthStyle = {width: '100%'};
    } else if (total === 2) {
      widthStyle = {width: '50%'};
      spacingStyle = index === 0 ? Styles.rightHalfSpace : Styles.leftHalfSpace;
    } else if (total === 3) {
      widthStyle = {width: '33.33%'};
      spacingStyle = index === 1 ? Styles.horizontalPadding : {};
    } else if (total === 4) {
      widthStyle = {width: '50%'};
      spacingStyle = index % 2 === 0 ? Styles.rightHalfSpace : {};
      bottomStyle = index < 2 ? Styles.bottomSpace : {};
    } else {
      // 5 or more
      const pattern = [2, 3];
      let sum = 0;
      let rowSize = 0;
      let rowIndex = 0;

      while (sum <= index) {
        rowSize = pattern[rowIndex % pattern.length];
        sum += rowSize;
        rowIndex++;
      }

      const rowStartIndex = sum - rowSize;
      const positionInRow = index - rowStartIndex;
      const isLastRow = sum >= total;

      widthStyle = rowSize === 2 ? {width: '50%'} : {width: '33.33%'};

      // spacing
      if (rowSize === 2) {
        spacingStyle =
          positionInRow === 0 ? Styles.rightHalfSpace : Styles.leftHalfSpace;
      }
      if (rowSize === 3 && positionInRow === 1) {
        spacingStyle = Styles.horizontalPadding;
      }

      if (!isLastRow) {
        bottomStyle = Styles.bottomSpace;
      }
    }

    return [
      {...widthStyle, aspectRatio: 1}, // <--- enforce square
      spacingStyle,
      bottomStyle,
    ];
  };

  const renderImageGrid = () => {
    const haveMoreImages = totalCount - displayImages.length > 0;
    return displayImages.map((el, li) => {
      const isLastItem = li + 1 === displayImages.length;
      const gridStyle = getGridStyle(li, displayImages.length);
      const imageUrl = el.thumbnails_image_url || el.image_url;
      return (
        <View key={li} style={[gridStyle]}>
          <TouchableOpacity
            activeOpacity={1}
            style={[AppStyle.fullSize]}
            onPress={() => onSelectMedia(li)}>
            <ProgressImage
              source={{uri: imageUrl}}
              containerStyle={[AppStyle.fullSize]}
              mode={'cover'}
            />
          </TouchableOpacity>
          {isLastItem && haveMoreImages ? (
            <View style={[Styles.overlay, VS.ai_center, VS.jc_center]}>
              <Text
                fontWeight={'semiBold'}
                style={[TS.ta_left, TS.fs_26, CommonStyle.textWhite]}>
                {`+${totalCount - displayImages.length}`}
              </Text>
            </View>
          ) : null}
        </View>
      );
    });
  };

  return (
    <View>
      {totalCount === 1 ? (
        <TouchableOpacity activeOpacity={1} onPress={() => onSelectMedia(0)}>
          <ProgressImage
            source={{uri: displayImages[0].image_url}}
            containerStyle={[Styles.messageImage]}
          />
        </TouchableOpacity>
      ) : (
        <View
          style={[
            VS.fd_row,
            VS.fw_wrap,
            VS.ai_center,
            VS.jc_center,
            AppStyle.hideOverFlow,
          ]}>
          {renderImageGrid()}
        </View>
      )}
    </View>
  );
}
