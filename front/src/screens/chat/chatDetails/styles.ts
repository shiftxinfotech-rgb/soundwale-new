import {Colors} from '@theme';
import {hexToRgbA, Scale, width} from '@util';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
  },
  messageContainer: {
    minWidth: Scale(100),
    maxWidth: width * 0.75,
  },
  leftContainer: {
    backgroundColor: Colors.veryLightGray,
  },
  rightContainer: {
    backgroundColor: hexToRgbA(Colors.primary, '0.2'),
  },
  dateText: {color: Colors.dimGray, fontStyle: 'italic'},
  inputView: {
    backgroundColor: Colors.whiteSmoke,
    minHeight: Scale(50),
    paddingHorizontal: Scale(15),
  },
  inputAccessory: {height: 'auto'},
});
