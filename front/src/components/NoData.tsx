import React from 'react';

import {Text} from './TextView';
import {View} from 'react-native';
import {TS, VS, AppStyle} from '@theme';
import {ProgressImage} from './ProgressImage';
import {Images} from '@assets';
import {Scale} from '@util';

type NoDataParams = {
  message?: string;
  content?: string;
};

const NoData = ({message, content}: NoDataParams) => {
  return (
    <View style={[VS.ai_center, VS.jc_center, AppStyle.flexGrow]}>
      <ProgressImage
        source={Images.noData}
        imageStyle={{width: Scale(110), height: Scale(100)}}
        containerStyle={{width: Scale(110), height: Scale(100)}}
      />
      {/* {message !== undefined && message !== '' && ( */}
      <Text
        fontWeight="bold"
        style={[TS.fs_20, TS.lh_24, TS.pt_22, TS.ta_center]}>
        {message !== '' ? message : 'No Data Found'}
      </Text>
      {/* )} */}
      {content !== undefined && content !== '' && (
        <Text
          fontWeight="quickSandMedium"
          style={[TS.fs_15, TS.lh_19, TS.pt_13, TS.ta_center]}>
          {content}
        </Text>
      )}
    </View>
  );
};
export {NoData};
