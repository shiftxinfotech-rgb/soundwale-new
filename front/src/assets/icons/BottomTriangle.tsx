import {Scale} from '@util';
import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgComponent = () => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={Scale(16)}
    height={Scale(10)}
    fill="none"
    viewBox="0 0 16 10">
    <Path fill="#fff" d="M16 10 0 0l16 .294z" />
  </Svg>
);
export {SvgComponent as BottomTriangle};
