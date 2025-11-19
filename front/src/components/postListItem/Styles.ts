import {Colors} from '@theme';
import {Scale} from '@util';
import {StyleSheet} from 'react-native';

export const Styles = StyleSheet.create({
  statusContainer: {
    borderRadius: Scale(100),
    width: '20%',
  },
  widthHalf: {
    width: '50%',
    aspectRatio: 1 / 1,
  },
  widthThird: {
    width: '33.33%',
    aspectRatio: 1 / 1,
  },
  horizontalPadding: {paddingHorizontal: 4},
  leftHalfSpace: {paddingLeft: 2},
  rightHalfSpace: {paddingRight: 2},
  rightSpace: {paddingRight: 4},
  bottomSpace: {paddingBottom: 4},
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: Scale(8),
  },
  messageImage: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: Colors.lightGray,
  },
  iconImage: {
    width: Scale(20),
    height: Scale(20),
  },
});
