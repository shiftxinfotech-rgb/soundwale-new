import {Colors} from '@theme';
import {Scale} from '@util';
import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgComponent = ({
  size = 16,
  color = Colors.white,
}: {
  size?: number;
  color?: string;
}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={Scale(size)}
    height={Scale(size)}
    fill="none"
    viewBox="0 0 16 11">
    <Path
      fill={color}
      d="M7.875 2.688v.027c1.695 0 3.063 1.367 3.063 3.035a3.057 3.057 0 0 1-3.063 3.063A3.057 3.057 0 0 1 4.813 5.75c0-.3.054-.574.136-.848.192.137.465.192.739.192.82 0 1.53-.684 1.53-1.532-.027-.246-.081-.519-.218-.738.273-.082.574-.11.875-.136m7.766 2.68q.082.163.082.41a.9.9 0 0 1-.082.382C14.164 9.06 11.21 11 7.875 11 4.512 11 1.559 9.059.082 6.16A.9.9 0 0 1 0 5.75c0-.137.027-.273.082-.383C1.559 2.47 4.512.5 7.875.5c3.336 0 6.29 1.969 7.766 4.867m-7.766 4.32c2.68 0 5.168-1.504 6.48-3.938-1.312-2.434-3.8-3.937-6.48-3.937-2.707 0-5.195 1.503-6.508 3.937C2.68 8.184 5.168 9.688 7.875 9.688"
    />
  </Svg>
);
export {SvgComponent as Eye};
