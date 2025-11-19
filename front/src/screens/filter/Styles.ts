import {Colors} from '@theme';
import {hexToRgbA, Scale, width} from '@util';
import {StyleSheet} from 'react-native';

export const Styles = StyleSheet.create({
  absoluteTopRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: Scale(170),
    width: width * 0.8,
  },
  leftPart: {
    width: width * 0.45,
    backgroundColor: hexToRgbA(Colors.primary, '0.1'),
  },
  rightPart: {
    width: width * 0.55,
  },
  filterContainer: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: Scale(37),
    borderTopRightRadius: Scale(37),
    marginTop: Scale(30),
  },
});
