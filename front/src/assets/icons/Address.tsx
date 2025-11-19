import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {Scale} from '@util';
const SVGComponent = () => (
  <Svg
    width={Scale(20)}
    height={Scale(22)}
    viewBox="0 0 20 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M9.98438 17.4448C10.4095 17.4448 10.8347 17.3023 11.1775 17.0174C13.2208 15.3199 17.1719 11.5498 17.1719 7.7798C17.1719 4.0354 13.9539 1 9.98438 1C6.01481 1 2.79688 4.0354 2.79688 7.7798C2.79688 11.5498 6.74793 15.3199 8.7912 17.0175C9.13409 17.3024 9.55923 17.4448 9.98438 17.4448Z"
      stroke="#54C8B9"
      strokeWidth={2}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M15.9617 16.5596C17.8069 17.0252 18.9688 17.7031 18.9688 18.4577C18.9688 19.8618 14.9463 21.0001 9.98438 21.0001C5.02244 21.0001 1 19.8618 1 18.4577C1 17.7031 2.16186 17.0252 4.00703 16.5596"
      stroke="#54C8B9"
      strokeWidth={2}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9.98438 10.3222C11.473 10.3222 12.6797 9.18387 12.6797 7.77973C12.6797 6.37559 11.473 5.2373 9.98438 5.2373C8.4958 5.2373 7.28906 6.37559 7.28906 7.77973C7.28906 9.18387 8.4958 10.3222 9.98438 10.3222Z"
      stroke="#54C8B9"
      strokeWidth={2}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export {SVGComponent as Address};
