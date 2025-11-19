import {Colors} from '@theme';
import {Scale} from '@util';
import {StyleSheet} from 'react-native';

export const Styles = StyleSheet.create({
  searchInput: {
    borderRadius: Scale(100),
    borderWidth: 0,
    backgroundColor: Colors.white,
    color: Colors.black,
    fontFamily: 'Quicksand-Medium',
    fontWeight: '500',
  },
  spaceBottom: {
    paddingBottom: Scale(100),
  },
  bottomBanner: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
  descriptionInput: {
    height: Scale(70),
    textAlignVertical: 'top',
  },
});
