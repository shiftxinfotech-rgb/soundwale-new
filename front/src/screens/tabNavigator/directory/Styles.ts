import {Scale} from '@util';
import {StyleSheet} from 'react-native';

export const Styles = StyleSheet.create({
  spaceBottom: {
    paddingBottom: Scale(100),
  },
  remainingConnect: {
    position: 'absolute',
    bottom: Scale(20),
  },
  filterIcon: {
    height: Scale(45),
    width: Scale(45),
    borderRadius: Scale(100),
  },
});
