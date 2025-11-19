import {StyleSheet} from 'react-native';

const AppStyle = StyleSheet.create({
  flexGrow: {flexGrow: 1},
  flexHalf: {flex: 1 / 2},
  hideOverFlow: {
    overflow: 'hidden',
  },
  fullSize: {
    height: '100%',
    width: '100%',
  },
  fullWidth: {
    width: '100%',
  },
  fullHeight: {
    height: '100%',
  },
  flexWrap: {
    flexWrap: 'wrap',
  },
  flexShrink: {
    flexShrink: 1,
  },
});

export {AppStyle};
