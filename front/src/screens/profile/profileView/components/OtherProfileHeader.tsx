import {Icons} from '@assets';
import {ProgressImage, Text, VectorIcon} from '@components';
import {OtherProfileUserInfo} from '@data';
import {AppStyle, Colors, CommonStyle, TS, VS} from '@theme';
import {moveBack, Scale, setField} from '@util';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity, View} from 'react-native';
import {Styles} from './Styles';

export const OtherProfileHeader = ({
  userInfo,
}: {
  userInfo: OtherProfileUserInfo;
}) => {
  const {t} = useTranslation(['profile']);
  const {name, role, image_url} = userInfo || {};

  return (
    <View style={[VS.ph_17, VS.mt_4]}>
      <View style={[VS.fd_row, VS.ai_center, VS.jc_space_between]}>
        <View style={[VS.fd_row, VS.ai_center, VS.gap_10]}>
          <TouchableOpacity activeOpacity={1} onPress={moveBack}>
            <Icons.ArrowBack color={Colors.white} />
          </TouchableOpacity>
          <Text
            fontWeight="semiBold"
            style={[TS.fs_20, TS.lh_24, CommonStyle.textWhite]}>
            {t('profile')}
          </Text>
        </View>
      </View>
      <View style={[VS.fd_row, VS.mt_25, VS.ai_center]}>
        <View
          style={[
            Styles.avatar,
            VS.ai_center,
            VS.jc_center,
            AppStyle.hideOverFlow,
          ]}>
          <ProgressImage
            source={{uri: image_url}}
            containerStyle={[Styles.avatarContainer, AppStyle.hideOverFlow]}
            mode="cover"
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
        <View style={[VS.flex_1, VS.pl_10]}>
          <Text
            fontWeight="bold"
            style={[TS.fs_20, TS.lh_24, CommonStyle.textWhite]}>
            {setField(name)}
          </Text>
          <Text
            fontWeight="bold"
            style={[TS.fs_16, TS.lh_24, CommonStyle.textWhite]}>
            {setField(role)}
          </Text>
        </View>
      </View>
    </View>
  );
};
