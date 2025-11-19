import {Colors} from '@theme';
import {Scale} from '@util';
import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgComponent = ({
  color = Colors.dimGray,
  size = Scale(24),
}: {
  color?: string;
  size?: number;
}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24">
    <Path
      fill={color}
      d="M5 9a1 1 0 0 1 1.71-.71l5.29 5.3 5.29-5.3a1.004 1.004 0 1 1 1.42 1.42l-6 6a1 1 0 0 1-1.41 0l-6-6A1 1 0 0 1 5 9"
    />
  </Svg>
);
export {SvgComponent as ChevronDown};
