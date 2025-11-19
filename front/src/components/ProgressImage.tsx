import {AppStyle, Colors, VS} from '@theme';
import {Scale} from '@util';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ColorValue,
  ImageRequireSource,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import FastImage, {ResizeMode, Source} from 'react-native-fast-image';

// const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);

type ProgressImageParams = {
  source: Source | ImageRequireSource;
  containerStyle: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<any>;
  mode?: ResizeMode;
  tintColor?: ColorValue;
  fallbackComponent?: React.ReactNode;
};

const ProgressImage = ({
  source,
  containerStyle,
  imageStyle,
  mode,
  tintColor = undefined,
  fallbackComponent,
}: ProgressImageParams) => {
  const [imageSource, setImageSource] = useState<Source | ImageRequireSource>();
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(
    typeof source === 'object' && source !== null && 'uri' in source,
  );

  useEffect(() => {
    setHasError(false);
    if (
      source &&
      typeof source === 'object' &&
      !Array.isArray(source) &&
      'uri' in source &&
      typeof source.uri === 'string' &&
      source.uri.trim() !== ''
    ) {
      setImageSource({
        ...source,
        priority: FastImage.priority.high,
      });
    } else if (typeof source === 'number') {
      setImageSource(source);
      setLoading(false);
    } else {
      setHasError(true);
    }
  }, [source]);

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    if (fallbackComponent) {
      setHasError(true);
    }
  };

  return (
    <View style={containerStyle}>
      {loading && !hasError && (
        <ActivityIndicator
          size={Scale(20)}
          color={Colors.primary}
          style={[StyleSheet.absoluteFill, VS.ai_center, VS.as_center]}
        />
      )}

      {!hasError ? (
        <FastImage
          source={imageSource}
          style={[AppStyle.fullSize, imageStyle]}
          resizeMode={mode || FastImage.resizeMode.cover}
          tintColor={tintColor}
          onLoad={handleLoad}
          onError={handleError}
        />
      ) : (
        fallbackComponent
      )}
    </View>
  );
};

export {ProgressImage};
