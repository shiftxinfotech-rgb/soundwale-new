import {Scale} from '@util';
import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SVGComponent = () => (
  <Svg
    width={Scale(17)}
    height={Scale(17)}
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M14.875 8.5C14.875 4.98047 12.0195 2.125 8.5 2.125C4.98047 2.125 2.125 4.98047 2.125 8.5C2.125 12.0195 4.98047 14.875 8.5 14.875C12.0195 14.875 14.875 12.0195 14.875 8.5Z"
      stroke="#54C8B9"
      strokeWidth={1.5}
      strokeMiterlimit={10}
    />
    <Path
      d="M11.6875 5.84375L7.225 11.1562L5.3125 9.03125"
      stroke="#54C8B9"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export {SVGComponent as RoundCheck};
