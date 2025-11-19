import {Colors} from '@theme';
import {Scale} from '@util';
import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';
const SvgComponent = ({color = Colors.dimGray}: {color?: string}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={Scale(21)}
    height={Scale(21)}
    fill="none"
    viewBox="0 0 21 21">
    <G clipPath="url(#a)">
      <Path
        fill={color}
        d="M20.33 19.128 15.33 13.93a8.45 8.45 0 0 0 1.99-5.451C17.32 3.804 13.516 0 8.84 0 4.166 0 .363 3.804.363 8.479s3.803 8.479 8.478 8.479c1.756 0 3.428-.53 4.858-1.535l5.036 5.238c.21.218.494.339.797.339a1.108 1.108 0 0 0 .797-1.872M8.84 2.212a6.274 6.274 0 0 1 6.267 6.267 6.274 6.274 0 0 1-6.267 6.267 6.274 6.274 0 0 1-6.266-6.267A6.274 6.274 0 0 1 8.84 2.212"
      />
    </G>
  </Svg>
);
export {SvgComponent as Search};
