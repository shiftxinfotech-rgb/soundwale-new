import {Scale} from '@util';
import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SVGComponent = ({
  width = Scale(12),
  height = Scale(21),
  color = '#54C8B9',
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 12 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M1 1L10.5 10.5L1 20"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export {SVGComponent as ArrowNext};
