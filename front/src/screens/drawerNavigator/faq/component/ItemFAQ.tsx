import {Icons} from '@assets';
import {Text} from '@components';
import {TopAskedArray} from '@data';
import {Colors, CommonStyle, TS, VS} from '@theme';
import {Scale, setField, width} from '@util';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import RenderHtml from 'react-native-render-html';
import {Styles} from './Styles';

type ItemProps = {
  item: TopAskedArray;
  isActive: boolean;
  onPress: () => void;
};

const ItemFAQ = ({isActive, onPress, item}: ItemProps) => {
  const {title, description} = item || {};
  return (
    <View style={[VS.mb_20, CommonStyle.shadowBox, VS.ph_14, Styles.itemView]}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        style={[
          VS.fd_row,
          VS.jc_space_between,
          VS.ai_center,
          VS.pt_15,
          VS.gap_5,
          !isActive && VS.pb_15,
        ]}>
        <Text
          ellipsizeMode={'tail'}
          fontWeight="semiBold"
          style={[TS.fs_17, VS.flex_1]}>
          {setField(title)}
        </Text>
        {isActive ? (
          <Icons.ArrowUp
            width={Scale(14)}
            height={Scale(8)}
            color={Colors.black}
          />
        ) : (
          <Icons.ArrowDown color={Colors.black} />
        )}
      </TouchableOpacity>

      {isActive ? (
        <View style={[VS.pv_10]}>
          <RenderHtml
            contentWidth={width}
            source={{html: setField(description)}}
            defaultTextProps={{
              style: [{color: Colors.blueGray, textAlign: 'justify'}, TS.lh_24],
            }}
            enableExperimentalMarginCollapsing={true}
            enableExperimentalBRCollapsing={true}
            enableExperimentalGhostLinesPrevention={true}
            enableCSSInlineProcessing={true}
            enableUserAgentStyles={true}
            ignoredDomTags={['o:p']}
          />
        </View>
      ) : null}
    </View>
  );
};

export default ItemFAQ;
