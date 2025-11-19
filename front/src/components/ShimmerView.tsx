import {AppStyle, VS} from '@theme';
import React, {PureComponent} from 'react';
import {Animated, Platform, StyleProp, View, ViewStyle} from 'react-native';
import {LinearGradient} from 'react-native-linear-gradient';
import {ComponentStyles} from './ComponentStyles';

type ShimmerViewParams = {
  delay?: number;
  duration?: number;
  isInteraction?: boolean;
  width?: number;
  height?: number;
  shimmerColors?: string[];
  isReversed?: boolean;
  stopAutoRun?: boolean;
  visible?: boolean;
  location?: number[];
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  shimmerStyle?: StyleProp<ViewStyle>;
  shimmerWidthPercent?: number;
  children?: React.ReactNode;
};

class ShimmerView extends PureComponent<ShimmerViewParams> {
  state = {
    beginShimmerPosition: new Animated.Value(-1),
  };

  getAnimated = () => {
    const {delay, duration, isInteraction} = this.props;
    return Animated.loop(
      Animated.timing(this.state.beginShimmerPosition, {
        toValue: 1,
        delay,
        duration,
        useNativeDriver: Platform.OS !== 'web',
        isInteraction,
      }),
    );
  };
  animatedValue = this.getAnimated();

  render() {
    return (
      <BasedPlaceholder
        {...this.props}
        animatedValue={this.animatedValue}
        beginShimmerPosition={this.state.beginShimmerPosition}
      />
    );
  }
}

export const BasedPlaceholder: React.FC<{
  width?: number;
  height?: number;
  shimmerColors?: string[];
  isReversed?: boolean;
  stopAutoRun?: boolean;
  visible?: boolean;
  location?: number[];
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  shimmerStyle?: StyleProp<ViewStyle>;
  animatedValue: Animated.CompositeAnimation;
  beginShimmerPosition: Animated.Value;
  shimmerWidthPercent?: number;
  children?: React.ReactNode;
}> = ({
  width = 200,
  height = 15,
  shimmerColors = ['#ebebeb', '#c5c5c5', '#ebebeb'],
  visible,
  location = [0.3, 0.5, 0.7],
  style,
  contentStyle,
  shimmerStyle,
  shimmerWidthPercent = 1,
  children,
}) => {
  return (
    <View
      style={[
        !visible && {height, width},
        AppStyle.hideOverFlow,
        !visible && shimmerStyle,
        style,
      ]}>
      <View
        style={[!visible && ComponentStyles.emptyBox, visible && contentStyle]}>
        {children}
      </View>
      {!visible && (
        <View style={[VS.flex_1, {backgroundColor: shimmerColors[0]}]}>
          <LinearGradient
            colors={shimmerColors}
            style={[VS.flex_1, {width: width * shimmerWidthPercent}]}
            start={{
              x: -1,
              y: 0.5,
            }}
            end={{
              x: 2,
              y: 0.5,
            }}
            locations={location}
          />
        </View>
      )}
    </View>
  );
};

export {ShimmerView};
