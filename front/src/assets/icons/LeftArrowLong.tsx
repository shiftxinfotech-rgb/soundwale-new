import {Scale} from '@util';
import * as React from 'react';
import Svg, {ClipPath, Defs, G, Path} from 'react-native-svg';
const SvgComponent = () => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={Scale(26)}
    height={Scale(26)}
    fill="none"
    viewBox="0 0 26 26">
    <G clipPath="url(#a)">
      <Path
        fill="#fff"
        d="M24.818 14.182H4.035l3.892 3.891a1.182 1.182 0 1 1-1.672 1.672l-5.909-5.91a1.18 1.18 0 0 1 0-1.67l5.91-5.91a1.18 1.18 0 0 1 1.67 0c.462.462.462 1.21 0 1.672l-3.891 3.891h20.783a1.182 1.182 0 0 1 0 2.364"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 26h26V0H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export {SvgComponent as LeftArrowLong};
