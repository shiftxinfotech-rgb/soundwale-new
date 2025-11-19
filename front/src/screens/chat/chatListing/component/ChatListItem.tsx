import {Icons} from '@assets';
import {ProgressImage, Text} from '@components';
import {ChatPreview} from '@data';
import {AppStyle, CommonStyle, TS, VS} from '@theme';
import {setField, width} from '@util';
import moment from 'moment';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {Styles} from './Styles';

const SWIPE_THRESHOLD = width * 0.14;
const TOUCH_SLOP = 5;

type ChatListProps = {
  index: number;
  item: ChatPreview;
  onPress: () => void;
  onDelete: () => void;
};
const ItemChatList = ({index, item, onPress, onDelete}: ChatListProps) => {
  const swipeTranslateX = useSharedValue(0);
  const pressed = useSharedValue(false);
  const prevX = useSharedValue(0);
  const tempVal = useSharedValue(0);
  const initialScrollX = useSharedValue(0);

  const pan = Gesture.Pan()
    .manualActivation(true)
    .onBegin(event => {
      pressed.value = true;
      initialScrollX.value = event.absoluteX;
    })
    .onTouchesMove((event, state) => {
      const displacementX = Math.abs(
        initialScrollX.value - event.changedTouches[0].absoluteX,
      );
      if (displacementX > TOUCH_SLOP) {
        state.activate();
      }
    })
    .onChange(event => {
      const isSwipingLeft = prevX.value
        ? prevX.value >= event.translationX
        : true;

      if (swipeTranslateX.value >= 0 && !isSwipingLeft) {
        swipeTranslateX.value = withSpring(0);
        return;
      }

      if (-swipeTranslateX.value > SWIPE_THRESHOLD && isSwipingLeft) {
        const temp =
          (event.translationX + event.translationX) * 0.005 +
          swipeTranslateX.value;
        swipeTranslateX.value = withTiming(temp, {duration: 0});
        tempVal.value = temp;
      } else if (tempVal.value) {
        swipeTranslateX.value =
          swipeTranslateX.value - (prevX.value - event.translationX);
      } else {
        swipeTranslateX.value = event.translationX + event.translationX;
      }
      prevX.value = event.translationX;
    })
    .onFinalize(event => {
      if (-event.translationX < SWIPE_THRESHOLD / 2) {
        swipeTranslateX.value = withTiming(0, {
          duration: 300,
          easing: Easing.quad,
        });
      } else {
        swipeTranslateX.value = withTiming(-SWIPE_THRESHOLD, {
          duration: 300,
          easing: Easing.quad,
        });
      }
      pressed.value = false;
    });

  const transformStyle = useAnimatedStyle(() => ({
    transform: [{translateX: swipeTranslateX.value}],
  }));

  const opacityStyle = useAnimatedStyle(() => ({
    opacity: swipeTranslateX.value < -width * 0.7 ? 0 : 1,
  }));

  const {userInfo, lastMessageTime, lastMessage, isUnread, unreadCount} =
    item || {};
  const {receiver} = userInfo || {};

  return (
    <GestureDetector key={index} gesture={pan}>
      <Animated.View>
        <Animated.View
          style={[
            VS.as_end,
            VS.ai_center,
            VS.jc_center,
            VS.as_center,
            Styles.iconContainer,
            VS.mt_10,
            VS.br_10,
            opacityStyle,
          ]}>
          <View style={[VS.flex_1, VS.ai_center, VS.jc_center]}>
            <TouchableOpacity
              onPress={() => {
                onDelete();
              }}
              style={VS.mv_10}>
              <Icons.Trash />
            </TouchableOpacity>
          </View>
        </Animated.View>
        <Animated.View
          style={[transformStyle, CommonStyle.bgWhite, VS.flex_1, VS.pt_10]}>
          <TouchableOpacity
            activeOpacity={0.9}
            hitSlop={10}
            onPress={onPress}
            style={[
              VS.flex_1,
              VS.mh_15,
              CommonStyle.shadowBox,
              VS.br_10,
              VS.mb_15,
            ]}>
            <View
              style={[
                VS.flex_1,
                VS.fd_row,
                VS.gap_10,
                VS.br_10,
                VS.ai_center,
                AppStyle.hideOverFlow,
                !isUnread && VS.pl_10,
              ]}>
              {isUnread && (
                <View style={[Styles.unreadItem, VS.brt_10, VS.brl_10]} />
              )}
              <ProgressImage
                source={{uri: receiver.avatar}}
                containerStyle={[
                  VS.w_32,
                  VS.h_32,
                  VS.br_32,
                  AppStyle.hideOverFlow,
                ]}
              />
              <View style={[VS.flex_1, VS.pv_5]}>
                <Text
                  fontWeight="semiBold"
                  style={[TS.fs_15, TS.lh_26]}
                  numberOfLines={1}>
                  {setField(receiver.name)}
                </Text>
                <Text
                  fontWeight="quickSandMedium"
                  style={[TS.fs_15, TS.lh_22, CommonStyle.textBlueGray]}
                  numberOfLines={2}>
                  {setField(lastMessage)}
                </Text>
              </View>
              <View
                style={[
                  VS.as_end,
                  VS.jc_space_between,
                  VS.pv_2,
                  VS.pr_10,
                  VS.gap_5,
                  VS.ai_end,
                ]}>
                {unreadCount > 0 ? (
                  <Text
                    fontWeight="semiBold"
                    style={[
                      TS.fs_12,
                      TS.ta_center,
                      TS.tav_center,
                      CommonStyle.textWhite,
                      CommonStyle.bgPrimary,
                      VS.br_30,
                      VS.h_26,
                      VS.w_26,
                    ]}
                    numberOfLines={1}>
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </Text>
                ) : null}
                <Text
                  fontWeight="quickSandMedium"
                  style={[
                    TS.fs_11,
                    TS.lh_26,
                    TS.ta_right,
                    CommonStyle.textBlueGray,
                  ]}
                  numberOfLines={1}>
                  {moment(lastMessageTime).local().format('DD MMM yyyy')}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
};

export default ItemChatList;
