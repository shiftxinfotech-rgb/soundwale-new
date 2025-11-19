import {Scale, width} from '@util';
import {StyleSheet} from 'react-native';

export const Styles = StyleSheet.create({
  absoluteTopRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: Scale(100),
    width: width * 0.8,
  },
  locationWidget: {
    // width: Scale(90),
    height: Scale(30),
    borderRadius: Scale(100),
    borderWidth: 1,
  },
  searchInput: {
    borderRadius: Scale(100),
    borderWidth: 0,
    fontWeight: '500',
    fontFamily: 'Quicksand-Medium',
  },
  filterIcon: {
    height: Scale(45),
    width: Scale(45),
    borderRadius: Scale(100),
  },
  avatarContainer: {
    width: Scale(40),
    height: Scale(40),
    borderRadius: Scale(42),
    overflow: 'hidden',
  },
});
