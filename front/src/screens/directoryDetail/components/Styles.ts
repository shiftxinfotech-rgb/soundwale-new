import {Colors} from '@theme';
import {hexToRgbA, Scale} from '@util';
import {StyleSheet} from 'react-native';
import {BAR_MAX_WIDTH} from './RatingSummary';
export const Styles = StyleSheet.create({
  actionButtons: {
    backgroundColor: hexToRgbA(Colors.aquaMarine, '0.44'),
    borderRadius: Scale(100),
    width: Scale(39),
    height: Scale(39),
  },
  profileContainer: {
    width: Scale(65),
    height: Scale(65),
    borderRadius: Scale(65),
  },
  directoryImage: {
    height: Scale(60),
    width: Scale(60),
  },
  addReviewHeader: {
    borderTopLeftRadius: Scale(10),
    borderTopRightRadius: Scale(10),
  },
  iconContainer: {
    width: Scale(39),
    height: Scale(39),
    borderRadius: Scale(39),
    backgroundColor: Colors.primary,
  },

  profileView: {
    width: Scale(60),
    height: Scale(60),
    borderRadius: Scale(65),
  },
  ratingContainer: {
    backgroundColor: hexToRgbA(Colors.white, '0.14'),
    borderRadius: Scale(100),
  },
  verifiedButton: {
    backgroundColor: hexToRgbA(Colors.aquaMarine, '0.44'),
    borderRadius: Scale(100),
    width: Scale(56),
    height: Scale(56),
  },
  sellingImage: {
    width: Scale(98),
    height: Scale(87),
  },
  barTrack: {
    height: Scale(10),
    width: BAR_MAX_WIDTH,
    backgroundColor: Colors.silverGray,
    overflow: 'hidden',
    borderRadius: Scale(10),
  },
  barFill: {
    height: Scale(10),
    backgroundColor: Colors.amber,
    borderRadius: Scale(10),
  },
  userImage: {
    width: Scale(48),
    height: Scale(48),
    borderRadius: Scale(100),
  },
  profileImage: {
    width: Scale(68),
    height: Scale(68),
    borderRadius: Scale(100),
  },
  profileContainerImage: {
    width: Scale(68),
    height: Scale(68),
    borderRadius: Scale(100),
    borderWidth: 1,
    borderColor: '#D9D9D9',
  },
  ratingView: {
    backgroundColor: hexToRgbA(Colors.amber, '0.14'),
    borderRadius: Scale(100),
  },
  workingWithImage: {
    width: Scale(48),
    height: Scale(48),
    borderRadius: Scale(48),
  },
});
