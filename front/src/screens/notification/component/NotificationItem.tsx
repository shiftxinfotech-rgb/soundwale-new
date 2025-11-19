import {Icons} from '@assets';
import {Text, ViewMore} from '@components';
import {NotificationItem} from '@data';
import {AppStyle, CommonStyle, TS, VS} from '@theme';
import {setField, width} from '@util';
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
type NotificationItemProps = {
  item: NotificationItem;
  index: number;
  onDelete: () => void;
  onPress: (item: NotificationItem) => void;
};
const ItemNotification = ({
  item,
  index,
  onDelete,
  onPress,
}: NotificationItemProps) => {
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
  const {title, body, created_at_human, read} = item;
  return (
    <GestureDetector key={index} gesture={pan}>
      <Animated.View style={[]}>
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
          style={[
            transformStyle,
            CommonStyle.bgWhite,
            VS.flex_1,
            VS.ph_15,
            VS.pt_10,
          ]}>
          <TouchableOpacity
            onPress={() => onPress(item)}
            style={[
              VS.flex_1,
              CommonStyle.shadowBox,
              VS.br_10,
              VS.jc_center,
              VS.fd_row,
              AppStyle.hideOverFlow,
            ]}>
            {read === 0 && <View style={Styles.unreadItem} />}
            <View style={[VS.flex_1, VS.ph_12, VS.pv_12]}>
              <Text
                fontWeight="semiBold"
                style={[TS.fs_15, TS.lh_26]}
                numberOfLines={1}>
                {setField(title)}
              </Text>

              <ViewMore
                textStyle={[
                  TS.fs_15,
                  TS.lh_22,
                  TS.ta_justify,
                  CommonStyle.textBlueGray,
                ]}
                child={
                  <Text
                    fontWeight="quickSandMedium"
                    style={[
                      TS.fs_15,
                      TS.lh_22,
                      TS.ta_justify,
                      CommonStyle.textBlueGray,
                    ]}>
                    {setField(body)}
                  </Text>
                }
              />
            </View>
          </TouchableOpacity>
          <Text
            fontWeight="quickSandMedium"
            style={[TS.fs_11, TS.lh_26, TS.ta_right, TS.pr_10, TS.pt_2]}
            numberOfLines={1}>
            {setField(created_at_human)}
          </Text>
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
};

export default ItemNotification;
