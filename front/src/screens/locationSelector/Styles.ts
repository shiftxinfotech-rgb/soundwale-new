import {Colors} from '@theme';
import {Scale} from '@util';
import {StyleSheet} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

export const Styles = StyleSheet.create({
  mapPin: {
    width: Scale(98),
    height: Scale(98),
  },
  absoluteHeader: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    zIndex: 999,
    backgroundColor: 'transparent',
  },
  spaceTop: {
    paddingTop: getStatusBarHeight() + Scale(20),
  },
  currentLocationContainer: {
    backgroundColor: Colors.white,
  },
  selectedLocationView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  locationContainer: {
    backgroundColor: Colors.white,
    borderRadius: Scale(10),
    borderWidth: 1,
    borderColor: Colors.lightGray,
    maxHeight: Scale(250),
    minHeight: Scale(100),
  },
  lineSeparator: {
    height: 1,
    backgroundColor: Colors.lightGray,
  },
});
