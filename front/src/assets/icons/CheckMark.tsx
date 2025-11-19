import {Colors} from '@theme';
import {Scale} from '@util';
import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgComponent = ({isChecked = false}: {isChecked: boolean}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={Scale(22)}
    height={Scale(22)}
    fill="none"
    viewBox="0 0 22 22">
    <Path
      fill={isChecked ? Colors.primary : '#Fff'}
      stroke={Colors.primary}
      d="M.5 5A4.5 4.5 0 0 1 5 .5h12A4.5 4.5 0 0 1 21.5 5v12a4.5 4.5 0 0 1-4.5 4.5H5A4.5 4.5 0 0 1 .5 17z"
    />
    <Path
      fill={'#fff'}
      fillRule="evenodd"
      d="m8.577 13.807 7.048-7.048a.536.536 0 0 1 .754 0l.68.68a.54.54 0 0 1 0 .754l-7.047 7.048a.536.536 0 0 1-.754 0l-.68-.68a.534.534 0 0 1 0-.754"
      clipRule="evenodd"
    />
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="m6.376 9.51 4.293 4.294a.537.537 0 0 1 0 .755l-.68.68a.54.54 0 0 1-.755 0l-4.293-4.293a.537.537 0 0 1 0-.755l.68-.68a.535.535 0 0 1 .755 0"
      clipRule="evenodd"
    />
  </Svg>
);
export {SvgComponent as CheckMark};
