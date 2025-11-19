import {Scale} from '@util';
import {StyleSheet} from 'react-native';

export const Styles = StyleSheet.create({
  spaceBottom: {
    paddingBottom: Scale(100),
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: Scale(100),
    right: Scale(11),
  },
});
