import {
  AntDesign,
  AntDesignIconName,
} from '@react-native-vector-icons/ant-design';
import {Entypo, EntypoIconName} from '@react-native-vector-icons/entypo';
import {
  MaterialIcons,
  MaterialIconsIconName,
} from '@react-native-vector-icons/material-icons';
import React from 'react';
type VectorIconParams = {
  iconSize: number;
  iconColor: string;
  iconType: number;
  iconName: string;
};

const VectorIcon = ({
  iconSize,
  iconColor,
  iconType,
  iconName,
}: VectorIconParams) => {
  switch (iconType) {
    case 1:
      return (
        <AntDesign
          size={iconSize}
          color={iconColor}
          name={iconName as AntDesignIconName}
        />
      );
    case 2:
      return (
        <Entypo
          size={iconSize}
          color={iconColor}
          name={iconName as EntypoIconName}
        />
      );
    case 4:
      return (
        <MaterialIcons
          size={iconSize}
          color={iconColor}
          name={iconName as MaterialIconsIconName}
        />
      );
    default:
      return <></>;
  }
};

export {VectorIcon};
