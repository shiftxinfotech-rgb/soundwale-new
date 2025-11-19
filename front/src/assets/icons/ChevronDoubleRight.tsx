import {Colors} from '@theme';
import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgComponent = () => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={17}
    fill="none"
    viewBox="0 0 17 17">
    <Path
      fill={Colors.black}
      d="M8.5 13.459a.708.708 0 0 1-.503-1.212L11.751 8.5 7.997 4.753a.708.708 0 0 1 .999-.999l4.25 4.25a.71.71 0 0 1 0 1l-4.25 4.25a.7.7 0 0 1-.496.205"
    />
    <Path
      fill={Colors.black}
      d="M4.25 13.458a.708.708 0 0 1-.503-1.21L7.501 8.5 3.747 4.753a.711.711 0 0 1 1.006-1.006l4.25 4.25a.71.71 0 0 1 0 .999l-4.25 4.25a.7.7 0 0 1-.503.212"
    />
  </Svg>
);
export {SvgComponent as ChevronDoubleRight};
