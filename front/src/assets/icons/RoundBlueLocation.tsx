import {Scale} from '@util';
import * as React from 'react';
import Svg, {Circle, G, Path, Defs, ClipPath, Rect} from 'react-native-svg';
const SVGComponent = () => (
  <Svg
    width={Scale(32)}
    height={Scale(32)}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <Circle cx={16} cy={16} r={16} fill="#0076FF" />
    <G clipPath="url(#clip0_96_5585)">
      <Path
        d="M15.5 7C11.5718 7 8.375 10.2189 8.375 14.1765C8.375 19.7997 14.8303 25.6058 15.105 25.8496C15.2135 25.9468 15.3541 26.0006 15.4998 26.0007C15.6456 26.0009 15.7863 25.9474 15.895 25.8504C16.1697 25.6058 22.625 19.7997 22.625 14.1765C22.625 10.2189 19.4283 7 15.5 7ZM15.5 18.0833C13.3174 18.0833 11.5417 16.3076 11.5417 14.125C11.5417 11.9424 13.3174 10.1667 15.5 10.1667C17.6826 10.1667 19.4583 11.9424 19.4583 14.125C19.4583 16.3076 17.6826 18.0833 15.5 18.0833Z"
        fill="white"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_96_5585">
        <Rect width={19} height={19} fill="white" transform="translate(6 7)" />
      </ClipPath>
    </Defs>
  </Svg>
);
export {SVGComponent as RoundBlueLocation};
