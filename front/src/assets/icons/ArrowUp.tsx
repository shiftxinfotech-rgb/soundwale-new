import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {Scale} from '@util';
const SVGComponent = ({
  width = Scale(18),
  height = Scale(10),
  color = '#4D4D4D',
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 18 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M0.999998 9L9 1L17 9"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export {SVGComponent as ArrowUp};
