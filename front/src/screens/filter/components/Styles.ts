import {Colors} from '@theme';
import {hexToRgbA, Scale} from '@util';
import {StyleSheet} from 'react-native';

export const Styles = StyleSheet.create({
  clearButton: {
    backgroundColor: hexToRgbA(Colors.white, '0.2'),
    borderRadius: Scale(100),
    width: Scale(94),
    height: Scale(32),
  },
  whiteRif: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: Scale(100),
    borderBottomLeftRadius: Scale(100),
  },
  defaultRif: {
    width: '100%',
    height: Scale(50),
  },
  childCheckMark: {
    width: '100%',
  },
  checkMark: {
    width: '90%',
  },
});
