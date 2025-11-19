import {Colors} from '@theme';
import {Scale} from '@util';
import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SVGComponent = ({
  color = Colors.primary,
  width = Scale(12),
  height = Scale(10),
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 12 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M11.2173 1.21734L4.13884 8.29583L0.921502 5.0785"
      stroke={color}
      strokeWidth={1.3}
      strokeLinecap="round"
    />
  </Svg>
);

export {SVGComponent as Check};
