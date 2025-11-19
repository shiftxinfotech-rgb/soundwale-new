import {Colors} from '@theme';
import {hexToRgbA, Scale} from '@util';
import {StyleSheet} from 'react-native';

export const Styles = StyleSheet.create({
  supplierTypeHeader: {
    borderTopLeftRadius: Scale(10),
    borderTopRightRadius: Scale(10),
  },
  itemView: {
    height: Scale(52),
    width: '48%',
    borderColor: Colors.primary,
  },
  selectedBg: {
    backgroundColor: hexToRgbA(Colors.primary, '0.5'),
  },
  filterIcon: {
    height: Scale(45),
    width: Scale(45),
    borderRadius: Scale(100),
  },
  searchInput: {
    borderRadius: Scale(100),
    borderWidth: 0,
    color: Colors.black,
    fontWeight: '500',
    fontFamily: 'Quicksand-Medium',
  },
  directoryImage: {
    height: Scale(85),
    width: Scale(85),
    borderRadius: Scale(45),
  },
  divider: {
    height: Scale(1),
  },
  valueText: {
    width: '100%',
  },
  viewCount: {
    backgroundColor: hexToRgbA(Colors.black, '0.3'),
    height: Scale(22),
    borderRadius: Scale(50),
  },
  ratingView: {
    backgroundColor: hexToRgbA(Colors.amber, '0.14'),
    borderRadius: Scale(100),
  },
});
