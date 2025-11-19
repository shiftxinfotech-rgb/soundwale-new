import {Colors} from '@theme';
import {hexToRgbA, Scale} from '@util';
import {StyleSheet} from 'react-native';

export const Styles = StyleSheet.create({
  profileContainer: {
    width: Scale(120),
    height: Scale(120),
    borderRadius: Scale(120),
    backgroundColor: hexToRgbA(Colors.primary, '0.3'),
  },
  profileImg: {
    width: Scale(110),
    height: Scale(110),
    borderRadius: Scale(110),
  },
  transparentLayer: {
    position: 'absolute',
    width: Scale(110),
    height: Scale(110),
    borderRadius: Scale(110),
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  cameraView: {
    width: Scale(42),
    height: Scale(42),
    borderRadius: Scale(42),
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: Colors.white,
  },
  cameraIcon: {
    width: Scale(37),
    height: Scale(37),
    borderRadius: Scale(37),
    backgroundColor: Colors.primary,
  },
});
