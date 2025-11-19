import {Icons} from '@assets';
import {ProgressImage, VectorIcon} from '@components';
import {AppStyle, Colors, CommonStyle, VS} from '@theme';
import {Scale} from '@util';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Styles} from './Styles';

interface ProfileAvatarProps {
  imageUri?: string;
  onPressCamera: () => void;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  imageUri,
  onPressCamera,
}) => {
  return (
    <TouchableOpacity
      style={[VS.ai_center, VS.as_center]}
      activeOpacity={1}
      onPress={onPressCamera}>
      <View style={[Styles.profileContainer, VS.ai_center, VS.jc_center]}>
        <View style={[Styles.profileImg, AppStyle.hideOverFlow]}>
          <ProgressImage
            source={{uri: imageUri}}
            containerStyle={[AppStyle.fullSize, VS.ai_center, VS.jc_center]}
            mode={'cover'}
            fallbackComponent={
              <VectorIcon
                iconColor={Colors.primary}
                iconName="error"
                iconSize={Scale(30)}
                iconType={4}
              />
            }
          />
        </View>
        <View style={Styles.transparentLayer} />
        <TouchableOpacity
          onPress={onPressCamera}
          activeOpacity={1}
          style={[
            Styles.cameraView,
            CommonStyle.shadowBox,
            VS.ai_center,
            VS.jc_center,
          ]}>
          <View style={[Styles.cameraIcon, VS.ai_center, VS.jc_center]}>
            <Icons.Camera />
          </View>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ProfileAvatar;
