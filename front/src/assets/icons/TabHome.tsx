import {Colors} from '@theme';
import {Scale} from '@util';
import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgComponent = ({color = Colors.primary}: {color?: string}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={Scale(25)}
    height={Scale(24)}
    fill="none"
    viewBox="0 0 25 24">
    <Path
      fill={color}
      d="M23 20.144v-8.406a2.44 2.44 0 0 0-.83-1.834l-8.06-7.076a2.44 2.44 0 0 0-3.22 0L2.83 9.904A2.44 2.44 0 0 0 2 11.738v8.406a2.44 2.44 0 0 0 2.44 2.441h3.29a2.44 2.44 0 0 0 2.441-2.44v-3.19c0-.673.546-1.22 1.22-1.22h2.073c.674 0 1.22.547 1.22 1.22v3.19a2.44 2.44 0 0 0 2.441 2.44h3.434A2.44 2.44 0 0 0 23 20.145"
    />
  </Svg>
);
export {SvgComponent as TabHome};
