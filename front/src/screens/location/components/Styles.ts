import {Colors} from '@theme';
import {Scale} from '@util';
import {StyleSheet} from 'react-native';

export const Styles = StyleSheet.create({
  searchInput: {
    borderRadius: Scale(100),
    borderWidth: 0,
    color: Colors.black,
    fontWeight: '500',
    fontFamily: 'Quicksand-Medium',
  },
});
