import {Scale} from '@util';
import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgComponent = () => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={Scale(26)}
    height={Scale(26)}
    fill="none"
    viewBox="0 0 26 26">
    <Path
      fill="#000"
      d="M21.667 8.667H4.333a1.083 1.083 0 0 1 0-2.167h17.334a1.083 1.083 0 0 1 0 2.167M18.417 13a1.084 1.084 0 0 0-1.084-1.083h-13a1.083 1.083 0 1 0 0 2.166h13A1.08 1.08 0 0 0 18.417 13m-4.334 5.417A1.08 1.08 0 0 0 13 17.333H4.333a1.083 1.083 0 1 0 0 2.167H13a1.084 1.084 0 0 0 1.083-1.083"
    />
  </Svg>
);
export {SvgComponent as Hamburger};
