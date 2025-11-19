import {Scale} from '@util';
import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgComponent = () => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={Scale(18)}
    height={Scale(18)}
    fill="none"
    viewBox="0 0 18 18">
    <Path
      fill="#CFD8DC"
      d="M9.01 15.77c1.901 0 3.443-.427 3.443-.954s-1.542-.955-3.443-.955-3.443.428-3.443.955 1.541.954 3.443.954"
    />
    <Path
      fill="#F44336"
      fillRule="evenodd"
      d="M4.627 6.666a4.382 4.382 0 1 1 8.765 0c0 .811-.233 1.606-.67 2.289L9.01 14.749 5.297 8.956a4.24 4.24 0 0 1-.67-2.289"
      clipRule="evenodd"
    />
    <Path
      fill="#C62828"
      d="M9.381 8.48a1.85 1.85 0 1 0-.744-3.626 1.85 1.85 0 0 0 .744 3.626"
    />
  </Svg>
);
export {SvgComponent as LocationPin};
