import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
const [shortDimension, longDimension] =
  width < height ? [width, height] : [height, width];
const guidelineBaseWidth = 390;
const guidelineBaseHeight = 844;

const Scale = (size: number) => (shortDimension / guidelineBaseWidth) * size;
const VerticalScale = (size: number) =>
  (longDimension / guidelineBaseHeight) * size;
const ModerateScale = (size: number, factor = 0.5) =>
  size + (Scale(size) - size) * factor;

export {Scale, VerticalScale, ModerateScale, width, height};
