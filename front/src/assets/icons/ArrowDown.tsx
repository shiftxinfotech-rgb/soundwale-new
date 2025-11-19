import {Colors} from '@theme';
import {Scale} from '@util';
import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SVGComponent = ({
  color = Colors.dimGray,
  width = Scale(14),
  height = Scale(8),
}: {
  color?: string;
  width?: number;
  height?: number;
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 16 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M1.75 0.999999L8.25 7.5L14.75 1"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export {SVGComponent as ArrowDown};
