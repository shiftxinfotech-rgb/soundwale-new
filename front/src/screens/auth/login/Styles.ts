import {Scale, width} from '@util';
import {StyleSheet} from 'react-native';

export const Styles = StyleSheet.create({
  absoluteTopRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: Scale(150),
    width: width,
  },
  absoluteBottom: {
    position: 'absolute',
    bottom: -50,
    right: 0,
    left: 0,
    height: Scale(290),
    width: width,
  },
  shapeImage: {
    height: Scale(93),
    width: Scale(74),
  },
  loginImage: {
    height: Scale(200),
    width: width - Scale(150),
    marginBottom: Scale(50),
  },
  spaceTop: {
    marginTop: Scale(100),
  },
  absoluteText: {
    position: 'absolute',
    bottom: -35,
    left: 0,
    right: 0,
  },
});
