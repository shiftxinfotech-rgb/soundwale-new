import {Scale, width} from '@util';
import {StyleSheet} from 'react-native';

export const Styles = StyleSheet.create({
  absoluteTopRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: Scale(200),
    width: width * 0.8,
  },
  infoContainer: {
    overflow: 'hidden',
    borderTopRightRadius: Scale(20),
    borderTopLeftRadius: Scale(20),
  },
});
