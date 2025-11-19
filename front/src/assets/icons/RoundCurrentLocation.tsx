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
    <G clipPath="url(#clip0_97_7790)">
      <Path
        d="M15.5 13.0454C13.5914 13.0454 12.0455 14.5914 12.0455 16.5C12.0455 18.4086 13.5914 19.9546 15.5 19.9546C17.4087 19.9546 18.9546 18.4086 18.9546 16.5C18.9546 14.5914 17.4086 13.0454 15.5 13.0454ZM23.2209 15.6364C22.8236 12.035 19.965 9.17636 16.3636 8.77911V7H14.6364V8.77911C11.035 9.17636 8.17636 12.035 7.77911 15.6364H6V17.3636H7.77911C8.17636 20.965 11.035 23.8236 14.6364 24.2209V26H16.3636V24.2209C19.965 23.8236 22.8236 20.965 23.2209 17.3636H25V15.6364H23.2209ZM15.5 22.5455C12.1621 22.5455 9.45457 19.838 9.45457 16.5C9.45457 13.1621 12.1621 10.4546 15.5 10.4546C18.838 10.4546 21.5455 13.162 21.5455 16.5C21.5455 19.838 18.838 22.5455 15.5 22.5455Z"
        fill="white"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_97_7790">
        <Rect width={19} height={19} fill="white" transform="translate(6 7)" />
      </ClipPath>
    </Defs>
  </Svg>
);
export {SVGComponent as RoundCurrentLocation};
