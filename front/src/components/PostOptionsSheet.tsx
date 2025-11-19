import {Icons} from '@assets';
import {CommonHeader, Text, VectorIcon} from '@components';
import {Colors, CommonStyle, TS, VS} from '@theme';
import {Scale} from '@util';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';

export type MenuProp = {
  key: string;
  title: string;
  iconType?: number;
  iconName?: string;
};

type Props = {
  menus: MenuProp[];
  onPress: (key: string) => void;
  onBackPress: () => void;
};

const PostOptionsSheet = ({onPress, onBackPress, menus}: Props) => {
  return (
    <View style={[VS.flex_1, VS.gap_5, VS.pb_20]}>
      <CommonHeader
        title=""
        withBackArrow
        withChatNotification={false}
        onPressBack={onBackPress}
      />
      <View style={[VS.ph_15, VS.mb_10, VS.gap_10]}>
        {menus?.map((el, li) => {
          const {iconType, iconName, title} = el;
          return (
            <TouchableOpacity
              key={li}
              onPress={() => onPress(el.key)}
              activeOpacity={0.8}
              style={[
                CommonStyle.shadowBox,
                VS.p_10,
                {borderRadius: Scale(50)},
              ]}>
              <View style={[VS.fd_row, VS.ai_center, VS.jc_space_between]}>
                <View style={[VS.fd_row, VS.ai_center, VS.gap_10, VS.flex_1]}>
                  <VectorIcon
                    iconSize={24}
                    iconColor={Colors.black}
                    iconType={iconType || 3}
                    iconName={iconName || ''}
                  />
                  <Text
                    fontWeight="semiBold"
                    style={[TS.fs_18, CommonStyle.textBlack, TS.lh_22]}>
                    {title}
                  </Text>
                </View>
                <Icons.ArrowNext
                  color={Colors.blueGray}
                  height={Scale(15)}
                  width={Scale(15)}
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export {PostOptionsSheet};
