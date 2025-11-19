import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {useWindowDimensions} from 'react-native';
import {Scale} from '@util';
import {Colors} from '@theme';

const NavBar = () => {
  const {width} = useWindowDimensions();
  const height = Scale(80);

  const pathData = `
    M0 0
    H${width * 0.35}
    C${width * 0.4} 0, ${width * 0.4} 40, ${width * 0.5} 40
    C${width * 0.6} 40, ${width * 0.6} 0, ${width * 0.65} 0
    H${width}
    V${height}
    H0
    Z
  `;

  return (
    <Svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none">
      <Path d={pathData} fill={Colors.gainsboro} fillOpacity={1} />
    </Svg>
  );
};

export {NavBar};
