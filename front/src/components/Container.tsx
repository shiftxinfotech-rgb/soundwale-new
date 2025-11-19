import {Images} from '@assets';
import {CommonStyle, VS} from '@theme';
import React, {ReactNode} from 'react';
import {Image, View} from 'react-native';
import {ComponentStyles} from './ComponentStyles';

interface ContainerProps {
  children: ReactNode;
}

const Container = ({children}: ContainerProps) => {
  return (
    <View style={[VS.flex_1, CommonStyle.mainContainer]}>
      <Image
        source={Images.registerTopMask}
        style={ComponentStyles.absoluteTopRight}
      />
      <View style={[VS.flex_1]}>{children}</View>
    </View>
  );
};
export {Container};
