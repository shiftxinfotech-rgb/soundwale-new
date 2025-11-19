import {Colors} from '@theme';
import {Scale} from '@util';

import {StyleSheet} from 'react-native';

export const Styles = StyleSheet.create({
  iconContainer: {
    right: Scale(15),
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    alignItems: 'center',
    alignSelf: 'center',
    width: Scale(38),
    backgroundColor: Colors.lightRed,
    height: Scale(60),
  },
  unreadItem: {
    width: 2,
    height: '100%',
    backgroundColor: Colors.primary,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 1,
    width: Scale(8),
    height: Scale(8),
    borderRadius: Scale(8),
  },
});
