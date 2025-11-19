import {Colors} from '@theme';
import {hexToRgbA, Scale, width} from '@util';
import {Platform, StyleSheet} from 'react-native';

export const Styles = StyleSheet.create({
  absoluteTopRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: Scale(150),
    width: width,
  },
  absoluteBottom: {
    position: 'absolute',
    bottom: -100,
    right: 0,
    left: 0,
    height: Scale(290),
    width: width,
  },
  shapeImage: {
    height: Scale(93),
    width: Scale(74),
  },
  loginImage: {
    height: Scale(135),
    width: width - Scale(150),
    marginBottom: Scale(50),
  },
  spaceTop: {
    marginTop: Scale(130),
  },
  absoluteText: {
    position: 'absolute',
    bottom: -15,
    left: 0,
    right: 0,
  },
  inputStyleDefault: {
    backgroundColor: Colors.white,
    borderRadius: Scale(20),
    flex: 1,
    paddingHorizontal: 0,
    fontSize: Scale(40),
    includeFontPadding: false,
    paddingVertical: 0,
    borderColor: Colors.red,
    borderWidth: 0,
  },
  inputStyleFocused: {
    borderColor: Colors.primary,
    borderWidth: Scale(1),
    shadowColor:
      Platform.OS === 'android'
        ? hexToRgbA(Colors.dimGray, '1')
        : hexToRgbA(Colors.dimGray, '.1'),
    shadowOffset: {width: 3, height: 3},
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
    borderRadius: Scale(14),
  },
  inputError: {
    borderColor: Colors.primary,
  },
  inputContainer: {
    backgroundColor: Colors.white,
    borderRadius: Scale(14),
    height: Scale(48),
    width: Scale(48),
    marginHorizontal: Scale(4),
    borderWidth: Scale(1),
    borderColor: Colors.dimGray,
    padding: 0,
    color: Colors.dimGray,
    fontSize: Scale(22),
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpInput: {
    width: Scale(48),
    height: Scale(48),
    borderWidth: Scale(1),
    borderColor: Colors.dimGray,
    borderRadius: Scale(14),
    backgroundColor: Colors.white,
    textAlign: 'center',
    fontSize: Scale(22),
    textAlignVertical: 'center',
    marginHorizontal: Scale(4),
    color: Colors.dimGray,
    borderBottomWidth: 1,
    fontFamily: 'quickSandBold',
    fontWeight: 'bold',
  },
});
