import * as React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';
const SVGComponent = ({color = '#54C8B9'}: {color?: string}) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <G clipPath="url(#clip0_125_30072)">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.1683 6.83145L9.24827 12.3303L0.964253 9.5686C0.386014 9.37546 -0.00354998 8.83294 -0.000222995 8.22344C0.00314777 7.61395 0.397177 7.07476 0.977648 6.88836L22.1571 0.0678197C22.6605 -0.0940207 23.2131 0.0387961 23.5871 0.412776C23.961 0.786755 24.0939 1.3393 23.932 1.84277L17.1114 23.0221C16.925 23.6026 16.3858 23.9966 15.7763 24C15.1668 24.0033 14.6243 23.6138 14.4312 23.0355L11.6561 14.7114L17.1683 6.83145Z"
        fill={color}
      />
    </G>
    <Defs>
      <ClipPath id="clip0_125_30072">
        <Rect width={24} height={24} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export {SVGComponent as Send};
