import {Icons} from '@assets';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {Colors, CommonStyle, TS, VS} from '@theme';
import {hexToRgbA, Scale} from '@util';
import React from 'react';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import {initialWindowMetrics} from 'react-native-safe-area-context';
import {Text} from './TextView';

const {insets} = initialWindowMetrics || {};

type TabIcons = {
  [key: number]: Element;
};

export function CustomTabBar({
  navigation,
  state: {index: selectedTab, routes},
  descriptors,
}: BottomTabBarProps) {
  const renderTabIcon = (tabIndex: number, isFocused: boolean): any => {
    let tabIcons: TabIcons = {
      0: <Icons.TabHome color={isFocused ? Colors.primary : Colors.blueGray} />,
      1: (
        <Icons.TabBuyers color={isFocused ? Colors.primary : Colors.blueGray} />
      ),
      2: (
        <Icons.TabSellers
          color={isFocused ? Colors.primary : Colors.blueGray}
        />
      ),
      3: (
        <Icons.TabDirectory
          color={isFocused ? Colors.primary : Colors.blueGray}
        />
      ),
    };
    return tabIcons[tabIndex];
  };

  return (
    <View style={[styles.container]}>
      <View style={[styles.svgContainer, {opacity: 0}]}>
        <Icons.NavBar />
      </View>
      <View style={VS.flex_1} />

      <View
        style={[
          VS.fd_row,
          VS.ai_center,
          VS.as_center,
          VS.jc_center,
          styles.tabContainer,
          {backgroundColor: Colors.white},
        ]}>
        {routes.map((el, ei) => {
          const isFocused = selectedTab === ei;
          const {options} = descriptors[el.key];
          const label = (
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : el.name
          ) as string;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: el.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(el.name);
            }
          };

          return (
            <TouchableOpacity
              key={ei}
              onPress={onPress}
              style={[
                VS.flex_1,
                VS.ai_center,
                VS.jc_center,
                VS.gap_8,
                VS.mt_5,
              ]}>
              <View style={[VS.jc_center, VS.ai_center, VS.h_24, VS.w_24]}>
                {renderTabIcon(ei, isFocused)}
              </View>
              {el.name !== 'Shorts' ? (
                <Text
                  fontWeight={'quickSandSemiBold'}
                  style={[
                    TS.fs_13,
                    TS.ls_1_0,
                    TS.ta_center,
                    TS.tav_center,
                    isFocused
                      ? CommonStyle.textPrimary
                      : CommonStyle.textBlueGray,
                  ]}>
                  {label}
                </Text>
              ) : null}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height:
      Platform.OS === 'ios' ? Scale(65) + (insets?.bottom ?? 0) : Scale(73),
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.white,
  },
  tabContainer: {
    height: '100%',
    width: '100%',
    zIndex: 1,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
  },
  svgContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  circleOne: {
    height: Scale(55),
    width: Scale(55),
    borderRadius: Scale(27.5),
    backgroundColor: hexToRgbA(Colors.primary, '1'),
    // position: 'absolute',
    bottom: Scale(0),
  },
  circleTwo: {
    height: Scale(65),
    width: Scale(65),
    borderRadius: Scale(32.5),
    backgroundColor: hexToRgbA(Colors.primary, '0.4'),
  },
  circleThree: {
    height: Scale(60),
    width: Scale(60),
    borderRadius: Scale(30),
    backgroundColor: Colors.primary,
  },
});
