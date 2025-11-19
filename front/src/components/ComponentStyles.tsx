import {Colors} from '@theme';
import {hexToRgbA, Scale, width} from '@util';
import {StyleSheet} from 'react-native';
import {fontFamilyMapping} from './TextView';

export const ComponentStyles = StyleSheet.create({
  buttonCommon: {
    height: Scale(45),
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    width: '100%',
  },
  dropDownInput: {
    width: '90%',
    height: Scale(45),
  },
  addReviewHeader: {
    borderTopLeftRadius: Scale(10),
    borderTopRightRadius: Scale(10),
  },
  reviewTextInput: {
    height: Scale(97),
    textAlignVertical: 'top',
  },
  connectView: {
    width: Scale(32),
    height: Scale(32),
    borderRadius: Scale(32),
    backgroundColor: Colors.lightBlue,
  },
  switchContainer: {
    width: Scale(36),
    height: Scale(21),
    borderRadius: Scale(10),
  },
  circleStyle: {
    width: Scale(12),
    height: Scale(12),
    borderRadius: Scale(6),
    backgroundColor: Colors.white,
  },
  absoluteTopRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: Scale(100),
    width: width * 0.8,
  },
  drawerImage: {
    width: Scale(57),
    height: Scale(57),
    borderRadius: Scale(57),
  },
  drawerMenuItem: {
    width: '65%',
  },
  modalHeader: {
    backgroundColor: Colors.primary,
    borderTopLeftRadius: Scale(20),
    borderTopRightRadius: Scale(20),
  },
  emptyBox: {width: 0, height: 0, opacity: 0},
  modalBgColor: {
    backgroundColor: hexToRgbA(Colors.black, '0.7'),
  },
  overlayBox: {
    backgroundColor: hexToRgbA(Colors.black, '0.7'),
  },
  closeIcon: {
    position: 'absolute',
    right: Scale(15),
    top: Scale(17),
  },
  modalButton: {
    width: Scale(77),
    height: Scale(35),
  },
  cancelButton: {
    width: Scale(121),
    height: Scale(35),
    backgroundColor: Colors.lightGray,
  },
  modalWrapper: {display: 'contents'},
  inputContainerStyle: {
    minHeight: Scale(50),
  },
  inputStyle: {
    fontWeight: 'medium',
    includeFontPadding: false,
    fontFamily: fontFamilyMapping.quickSandMedium,
  },
  verticalSeparator: {
    height: '100%',
    width: Scale(1),
  },
  horizontalSeparator: {
    height: Scale(1),
    width: '100%',
  },
  sheetBackdrop: {backgroundColor: hexToRgbA(Colors.black, '0.25')},
  radioOuterContainer: {
    width: Scale(16),
    height: Scale(16),
    borderRadius: Scale(8),
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  radioInnerContainer: {
    width: Scale(10),
    height: Scale(10),
    borderRadius: Scale(10),
    backgroundColor: Colors.primary,
  },
  dropDownContainer: {
    borderColor: Colors.lightGray,
    borderRadius: Scale(8),
    maxHeight: Scale(200),
    borderWidth: 1,
  },
  optionRow: {
    borderBottomWidth: 1,
    borderColor: Colors.lightGray,
  },
  separatorLine: {
    height: Scale(1),
    backgroundColor: Colors.lightGray,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -8,
    width: Scale(17),
    height: Scale(17),
    borderRadius: Scale(100),
  },
  categoryIcon: {
    width: Scale(48),
    height: Scale(40),
  },
  roleImage: {
    width: Scale(15),
    height: Scale(15),
  },
  profileContainer: {
    width: Scale(42),
    height: Scale(42),
    borderRadius: Scale(42),
    overflow: 'hidden',
  },
  replyProfileContainer: {
    width: Scale(38),
    height: Scale(38),
    borderRadius: Scale(38),
    overflow: 'hidden',
  },
  borderRadius: {borderRadius: Scale(42)},
  commonBox: {
    width: Scale(20),
    height: Scale(20),
  },
});
