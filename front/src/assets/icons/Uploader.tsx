import {Colors} from '@theme';
import {Scale} from '@util';
import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';
const SvgComponent = () => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={Scale(18)}
    height={Scale(18)}
    fill="none"
    viewBox="0 0 18 18">
    <G clipPath="url(#a)">
      <Path
        fill={Colors.primary}
        d="M14.065 15.549h-3.862v-3.903h1.276a.4.4 0 0 0 .324-.632L9.32 7.578a.396.396 0 0 0-.644 0l-2.482 3.436a.398.398 0 0 0 .323.632h1.277v3.903H3.468C1.538 15.442 0 13.636 0 11.679c0-1.35.732-2.526 1.817-3.163q-.15-.403-.15-.857a2.49 2.49 0 0 1 3.346-2.342 4.99 4.99 0 0 1 4.52-2.866A5 5 0 0 1 14.5 6.964C16.489 7.306 18 9.15 18 11.234c0 2.23-1.736 4.16-3.935 4.315"
      />
    </G>
  </Svg>
);
export {SvgComponent as Uploader};
