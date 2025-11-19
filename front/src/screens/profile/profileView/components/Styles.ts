import {Colors} from '@theme';
import {hexToRgbA, Scale} from '@util';
import {StyleSheet} from 'react-native';

export const Styles = StyleSheet.create({
  avatar: {
    width: Scale(64),
    height: Scale(64),
    borderRadius: Scale(32),
    borderWidth: Scale(3),
    borderColor: hexToRgbA(Colors.white, '0.4'),
    overflow: 'hidden',
  },
  avatarContainer: {
    width: Scale(58),
    height: Scale(58),
    borderRadius: Scale(32),
    overflow: 'hidden',
  },
  iconContainer: {
    width: Scale(39),
    height: Scale(39),
    borderRadius: Scale(39),
    backgroundColor: Colors.shareBackground,
  },

  upgradeBtn: {
    borderWidth: 1,
    borderColor: Colors.white,
    backgroundColor: 'transparent',
  },
  divider: {
    height: Scale(1),
    backgroundColor: Colors.lightGray,
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
  shopImageContainer: {
    width: Scale(107),
    height: Scale(94),
  },
  rolesImage: {
    width: Scale(18),
    height: Scale(18),
  },
});
