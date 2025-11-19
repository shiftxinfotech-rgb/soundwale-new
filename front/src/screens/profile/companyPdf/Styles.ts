import {Colors} from '@theme';
import {hexToRgbA, Scale} from '@util';
import {StyleSheet} from 'react-native';

export const Styles = StyleSheet.create({
  videoUploadContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderStyle: 'dashed',
    borderCurve: 'circular',
    borderRadius: Scale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    height: Scale(100),
  },
  imageView: {
    width: '31%',
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: Scale(20),
    right: Scale(11),
  },
  shortsVideo: {
    width: Scale(108),
    height: Scale(140),
  },
  playView: {
    position: 'absolute',

    right: 0,
    left: Scale(11),
    bottom: Scale(10),

    backgroundColor: hexToRgbA(Colors.black, '0.2'),
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
});
