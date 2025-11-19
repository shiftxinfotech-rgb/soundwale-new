import {Colors} from '@theme';
import {hexToRgbA, Scale, width} from '@util';
import {StyleSheet} from 'react-native';

export const Styles = StyleSheet.create({
  absoluteTopRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: Scale(200),
    width: width * 0.8,
  },
  
  otherInfo: {
    backgroundColor: Colors.white,
    width: Scale(48),
    height: Scale(48),
    borderWidth: Scale(3),
    borderColor: hexToRgbA(Colors.primary, '0.3'),
  },
  
  buttonContainer: {
    borderRadius: Scale(100),
  },
  carouselContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
  paginationContainer: {
    position: 'absolute',
    bottom: Scale(25),
    left: 0,
    right: 0,
  },
  dotStyle: {
    width: Scale(10),
    height: Scale(10),
    borderRadius: Scale(100),
    backgroundColor: Colors.white,
  },
  productImage: {
    height: Scale(95),
  },
  imageView: {
    width: '31%',
  },
  imageContainer: {
    width: width * 0.28,
    aspectRatio: 1 / 1,
    borderRadius: Scale(10),
    overflow: 'hidden',
  },
  progressView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    borderRadius: Scale(10),
    overflow: 'hidden',
  },
  userImageContainer: {
    width: Scale(49),
    height: Scale(49),
  },
  userImage: {
    borderRadius: Scale(49),
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  viewMoreButton: {
    width: Scale(115),
    height: Scale(33),
  },
  shortsVideo: {
    width: Scale(108),
    height: Scale(140),
  },
  playView: {
    position: 'absolute',

    right: 0,
    left: Scale(11),
    bottom: Scale(10),

    backgroundColor: hexToRgbA(Colors.black, '0.2'),
  },
  divider: {
    height: Scale(25),
    width: Scale(2),
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: Scale(60),
    right: Scale(10),
    backgroundColor: hexToRgbA(Colors.primary, '0.27'),
    height: Scale(78),
    width: Scale(78),
  },
  roundBorder: {
    borderRadius: Scale(50),
  },
  messageContainer: {
    height: Scale(67),
    width: Scale(67),
  },
  mapView: {
    width: '100%',
    height: Scale(200),
  },
});
