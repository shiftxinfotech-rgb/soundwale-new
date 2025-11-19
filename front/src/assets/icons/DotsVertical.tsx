import * as React from 'react';
import Svg, {Circle} from 'react-native-svg';
const SvgComponent = () => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={21}
    height={20}
    fill="none"
    viewBox="0 0 21 20">
    <Circle cx={10.5} cy={2} r={2} fill="#030303" />
    <Circle cx={10.5} cy={10} r={2} fill="#030303" />
    <Circle cx={10.5} cy={18} r={2} fill="#030303" />
  </Svg>
);
export {SvgComponent as DotsVertical};
