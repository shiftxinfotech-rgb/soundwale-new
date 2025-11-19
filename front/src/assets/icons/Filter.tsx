import {Scale} from '@util';
import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgComponent = () => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={Scale(22)}
    height={Scale(22)}
    fill="none"
    viewBox="0 0 22 22">
    <Path
      fill="#fff"
      d="M15.583 4.583a2.75 2.75 0 1 1 5.5 0 2.75 2.75 0 0 1-5.5 0M1.833 5.5h11a.916.916 0 0 0 0-1.833h-11a.917.917 0 1 0 0 1.833m5.5 2.75a2.75 2.75 0 0 0-2.585 1.833H1.833a.917.917 0 1 0 0 1.834h2.915A2.75 2.75 0 1 0 7.333 8.25m12.834 1.833h-7.334a.917.917 0 1 0 0 1.834h7.334a.917.917 0 0 0 0-1.834m-11 6.417H1.833a.917.917 0 0 0 0 1.833h7.334a.917.917 0 0 0 0-1.833m11 0h-2.915a2.75 2.75 0 1 0 0 1.833h2.915a.917.917 0 0 0 0-1.833"
    />
  </Svg>
);
export {SvgComponent as Filter};
