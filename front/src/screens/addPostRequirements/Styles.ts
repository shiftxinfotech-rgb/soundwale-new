import {Colors} from '@theme';
import {hexToRgbA, Scale} from '@util';
import {StyleSheet} from 'react-native';

export const Styles = StyleSheet.create({
  descriptionInput: {
    height: '100%',
  },
  photoImage: {
    height: Scale(18),
    width: Scale(18),
  },
  shopImageContainer: {
    width: Scale(107),
    height: Scale(94),
  },
  shopImageDelete: {
    backgroundColor: hexToRgbA(Colors.primary, '0.6'),
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: [{translateX: -Scale(14)}],
    width: Scale(28),
    height: Scale(28),
    borderTopLeftRadius: Scale(50),
    borderTopRightRadius: Scale(50),
  },
  buttonHeight: {height: Scale(35),width: Scale(60)},
});
