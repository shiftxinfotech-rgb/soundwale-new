import {height, Scale, width} from '@util';
import {StyleSheet} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

export const Styles = StyleSheet.create({
  splashTopMask: {
    width: width * 0.9,
    height: Scale(160),
    alignSelf: 'flex-end',
    position: 'absolute',
    top: 0,
    right: 0,
  },
  spaceTop: {
    // paddingTop: Scale(60),
    paddingTop: getStatusBarHeight() + Scale(10),
  },
  musicWord: {
    fontSize: Scale(50),
    // lineHeight: Scale(45),
    letterSpacing: 4.2,
  },
  forWord: {
    fontSize: Scale(34),
    lineHeight: Scale(38),
    letterSpacing: 4.2,
  },
  line: {
    width: width * 0.16,
    height: Scale(1),
  },
  everyWord: {
    fontSize: Scale(29),
    lineHeight: Scale(38),
    letterSpacing: 4.2,
  },
  splashBottomImage: {
    height: height * 0.65,
    width: width,
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  gradient: {
    opacity: 0.5,
    height: height * 0.65,
    width: width + 100,
    position: 'absolute',
    top: -(height * 0.3),
    left: -50,
    right: -50,
    borderRadius: height * 0.7,
  },
  refill: {
    height: height * 0.6,
    width: Scale(60),
    borderRadius: Scale(30),
    opacity: 0.24,
  },
  rotate: {
    transform: [{rotate: '45deg'}],
    position: 'absolute',
    left: width * 0.45,
    top: -height * 0.34,
  },
  rotateTwo: {
    transform: [{rotate: '40deg'}],
    position: 'absolute',
    left: width,
    top: -height * 0.35,
  },
  headerSection: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.3,
    width: width,
    paddingBottom: Scale(20),
  },
  splashImg: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.72,
    width: width,
  },
});
