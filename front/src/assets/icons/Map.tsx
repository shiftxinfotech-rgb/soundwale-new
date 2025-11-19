import {Colors} from '@theme';
import {Scale} from '@util';
import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SVGComponent = ({
  color = Colors.blueGray,
  size = Scale(13),
}: {
  color?: string;
  size?: number;
}) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 11 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M5.5 0C2.81225 0 0.625 2.20242 0.625 4.91021C0.625 8.75767 5.04175 12.7303 5.22971 12.8971C5.304 12.9636 5.40019 13.0004 5.4999 13.0005C5.59961 13.0006 5.69586 12.964 5.77029 12.8976C5.95825 12.7303 10.375 8.75767 10.375 4.91021C10.375 2.20242 8.18775 0 5.5 0ZM5.5 7.58333C4.00663 7.58333 2.79167 6.36838 2.79167 4.875C2.79167 3.38163 4.00663 2.16667 5.5 2.16667C6.99338 2.16667 8.20833 3.38163 8.20833 4.875C8.20833 6.36838 6.99338 7.58333 5.5 7.58333Z"
      fill={color}
    />
  </Svg>
);
export {SVGComponent as Map};
