import {hexToRgbA, Scale} from '@util';
import {Platform, StyleSheet} from 'react-native';
import {initialWindowMetrics} from 'react-native-safe-area-context';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {Colors} from './ThemeConfiguration';

const {insets} = initialWindowMetrics || {};

const CommonStyle = StyleSheet.create({
  mainContainer: {backgroundColor: Colors.white},
  hitSlop: {top: 15, bottom: 15, left: 15, right: 15},
  shadowBox: {
    backgroundColor: Colors.white,
    ...Platform.select({
      ios: {
        shadowColor: hexToRgbA(Colors.black, '0.5'),
        shadowOffset: {
          width: 0.5,
          height: 0,
        },
        shadowRadius: 9,
        shadowOpacity: 0.3,
      },
      android: {
        shadowColor: hexToRgbA(Colors.black, '0.5'),
        elevation: 8,
      },
    }),
  },
  shadowBoxLight: {
    backgroundColor: Colors.white,
    ...Platform.select({
      ios: {
        shadowColor: hexToRgbA(Colors.black, '0.5'),
        shadowOffset: {
          width: 0.5,
          height: 0,
        },
        shadowRadius: 9,
        shadowOpacity: 0.3,
      },
      android: {
        shadowColor: hexToRgbA(Colors.black, '0.4'),
        elevation: 4,
      },
    }),
  },
  commonBorderSmall: {borderRadius: Scale(8)},
  commonBorderMid: {borderRadius: Scale(10)},
  commonBorderLarge: {borderRadius: Scale(15)},
  commonBorderExtraLarge: {borderRadius: Scale(20)},
  textStyle: {
    color: Colors.black,
    flexWrap: 'wrap',
    includeFontPadding: true,
    textAlignVertical: 'center',
  },
  noFontPadding: {
    includeFontPadding: false,
  },
  safeAreaSpace: {
    paddingTop: getStatusBarHeight(true),
    paddingBottom: Platform.OS === 'android' ? Scale(5) : insets?.bottom,
  },
  safeAreaSpaceTop: {
    paddingTop: getStatusBarHeight(),
  },
  safeAreaBottomSpace: {
    paddingBottom: Platform.OS === 'android' ? Scale(10) : insets?.bottom,
  },
  statusBarHeight: {
    height: getStatusBarHeight(false),
  },
  defaultHorizontalSpace: {
    paddingHorizontal: Scale(20),
  },
  textWhite: {color: Colors.white},
  bgWhite: {backgroundColor: Colors.white},
  borderWhite: {borderColor: Colors.white},
  textBlack: {color: Colors.black},
  bgBlack: {backgroundColor: Colors.black},
  borderBlack: {borderColor: Colors.black},
  textLightGray: {color: Colors.lightGray},
  bgLightGray: {backgroundColor: Colors.lightGray},
  borderLightGray: {borderColor: Colors.lightGray},
  textDimGray: {color: Colors.dimGray},
  bgDimGray: {backgroundColor: Colors.dimGray},
  borderDimGray: {borderColor: Colors.dimGray},
  textPrimary: {color: Colors.primary},
  bgPrimary: {backgroundColor: Colors.primary},
  borderPrimary: {borderColor: Colors.primary},
  textRed: {color: Colors.red},
  bgRed: {backgroundColor: Colors.red},
  bgOrange: {backgroundColor: Colors.orange},
  borderRed: {borderColor: Colors.red},
  textBlueGray: {color: Colors.blueGray},
  bgBlueGray: {backgroundColor: Colors.blueGray},
  borderBlueGray: {borderColor: Colors.blueGray},
  bgWhiteSmoke: {backgroundColor: Colors.whiteSmoke},
  borderWhiteSmoke: {borderColor: Colors.whiteSmoke},
  textWhiteSmoke: {color: Colors.whiteSmoke},
  bgVeryLightGray: {backgroundColor: Colors.veryLightGray},
  borderVeryLightGray: {borderColor: Colors.veryLightGray},
  textVeryLightGray: {color: Colors.veryLightGray},
  textDarkYellow: {color: Colors.darkYellow},
  textCancel: {color: Colors.cancelButtonText},
  bgLightPrimary: {backgroundColor: Colors.lightPrimary},
  bgPaleAqua: {backgroundColor: Colors.paleAqua},
  borderPaleAqua: {borderColor: Colors.paleAqua},
  textPaleAqua: {color: Colors.paleAqua},
  bgAmber: {backgroundColor: Colors.amber},
  textAmber: {color: Colors.amber},
  textGreen: {color: Colors.green},
  borderAmber: {borderColor: Colors.amber},
  bgBrightBlue: {backgroundColor: Colors.brightBlue},
  textBrightBlue: {color: Colors.brightBlue},
  borderBrightBlue: {borderColor: Colors.brightBlue},
  bgPaleGray: {backgroundColor: Colors.paleGray},
  borderPaleGray: {borderColor: Colors.paleGray},
  textPaleGray: {color: Colors.paleGray},
  bgStatusNew: {backgroundColor: Colors.statusNew},
  bgStatusOld: {backgroundColor: Colors.statusOld},
  bgShorts: {backgroundColor: Colors.purple},
  sponsorText: { color: Colors.sponsoredOrange },
  bgHeartBg: { backgroundColor: Colors.heartBg },
  rolesImage: {
    width: Scale(16),
    height: Scale(16),
  },
});

export {CommonStyle};
