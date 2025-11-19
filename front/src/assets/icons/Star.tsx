import {Colors} from '@theme';
import {Scale} from '@util';
import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';
const SvgComponent = ({
  size = 15,
  color = Colors.amber,
}: {
  size?: number;
  color?: string;
}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={Scale(size)}
    height={Scale(size)}
    fill="none"
    viewBox="0 0 15 15">
    <G clipPath="url(#a)">
      <Path
        fill={color}
        d="M14.96 5.46a.8.8 0 0 0-.685-.547l-4.33-.393L8.233.512a.798.798 0 0 0-1.466.001L5.055 4.52l-4.33.393a.797.797 0 0 0-.453 1.395l3.273 2.87-.965 4.25a.797.797 0 0 0 1.186.862L7.5 12.058l3.733 2.232a.794.794 0 0 0 1.155-.403.8.8 0 0 0 .032-.459l-.965-4.25 3.272-2.87a.8.8 0 0 0 .234-.847"
      />
    </G>
  </Svg>
);
export {SvgComponent as Star};
