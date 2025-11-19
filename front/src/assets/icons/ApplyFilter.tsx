import {Scale} from '@util';
import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath, Rect} from 'react-native-svg';
const SVGComponent = () => (
  <Svg
    width={Scale(18)}
    height={Scale(18)}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <G clipPath="url(#clip0_94_1069)">
      <Path
        d="M6.89064 9.56236V17.4724C6.89064 17.8965 7.36367 18.1424 7.71049 17.9112L10.8745 15.8018C10.9467 15.7537 11.006 15.6884 11.0469 15.6119C11.0879 15.5353 11.1093 15.4499 11.1094 15.3631V9.56236H6.89064ZM16.91 0H1.08997C0.798485 0 0.562622 0.235863 0.562622 0.527344V2.10934H17.4374V0.527344C17.4373 0.235863 17.2015 0 16.91 0ZM0.87161 3.16403L6.14494 8.50767H11.855L17.1284 3.16403H0.87161Z"
        fill="white"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_94_1069">
        <Rect width={18} height={18} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export {SVGComponent as ApplyFilter};
