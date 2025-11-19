import {Colors} from '@theme';
import {Scale} from '@util';
import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgComponent = ({
  color = Colors.primary,
  height = 21,
  width = 21,
}: {
  color?: string;
  height?: number;
  width?: number;
}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={Scale(width)}
    height={Scale(height)}
    fill="none"
    viewBox="0 0 21 21">
    <Path
      fill={color}
      d="M14.582 11.384H3.932v-1.75h10.65L9.888 4.941l1.238-1.238 6.806 6.806-6.806 6.806-1.238-1.238z"
    />
  </Svg>
);
export {SvgComponent as ArrowRight};
