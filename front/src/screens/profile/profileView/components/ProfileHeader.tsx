import {Icons} from '@assets';
import {ComponentStyles, ProgressImage, Text, VectorIcon} from '@components';
import {unReadCount} from '@features';
import {useUserInfo} from '@hooks';
import {AppStyle, Colors, CommonStyle, TS, VS} from '@theme';
import {moveBack, navigate, Scale, setField, validField} from '@util';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity, View} from 'react-native';
import {shallowEqual, useSelector} from 'react-redux';
import {Styles} from './Styles';

export const ProfileHeader = () => {
  const {t} = useTranslation(['profile']);
  const profileData = useUserInfo();

  const {count} = useSelector(unReadCount, shallowEqual);
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
        <TouchableOpacity
          accessibilityLabel={'Notification'}
          testID="notification-btn"
          onPress={() => navigate('Notification')}
          hitSlop={10}>
          <Icons.NotificationBell color={Colors.white} />
          {count > 0 && (
            <View
              style={[
                ComponentStyles.badge,
                CommonStyle.bgOrange,
                VS.ai_center,
                VS.as_center,
                VS.jc_center,
              ]}>
              <Text
                fontWeight="medium"
                style={[TS.fs_11, CommonStyle.textWhite]}>
                {count}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      <View style={[VS.fd_row, VS.mt_25]}>
        <View
          style={[
            Styles.avatar,
            VS.ai_center,
            VS.jc_center,
            AppStyle.hideOverFlow,
          ]}>
          <ProgressImage
            source={{uri: profileData?.image_url}}
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
            {setField(profileData?.name)}
          </Text>

          <Text
            fontWeight="medium"
            numberOfLines={2}
            style={[TS.fs_16, TS.lh_20, CommonStyle.textWhite, TS.pt_5]}>
            {setField(profileData?.personal_name)}
          </Text>

          <View style={[VS.mt_6, VS.gap_3]}>
            {validField(profileData?.email) && (
              <View style={[VS.fd_row, VS.ai_center, VS.gap_8]}>
                <Icons.Email color={Colors.white} size={Scale(15)} />
                <Text
                  style={[TS.fs_14, CommonStyle.textWhite, VS.flex_1]}
                  fontWeight="medium">
                  {setField(profileData?.email)}
                </Text>
              </View>
            )}
            <View style={[VS.fd_row, VS.ai_center, VS.gap_8]}>
              <Icons.CallNow
                color={Colors.white}
                width={Scale(15)}
                height={Scale(15)}
              />
              {profileData?.mobile_number && (
                <Icons.WhatsAppLine color={Colors.white} size={Scale(13)} />
              )}
              <Text
                style={[TS.fs_14, CommonStyle.textWhite, VS.pr_2]}
                fontWeight="medium">
                {setField(profileData?.code)}{' '}
                {setField(profileData?.mobile_number)}
              </Text>
            </View>
            <View style={[VS.fd_row, VS.ai_center, VS.gap_8]}>
              {validField(profileData?.country_name) &&
                setField(profileData?.state_name) &&
                setField(profileData?.state_name) && (
                  <>
                    <Icons.Map color={Colors.white} size={Scale(15)} />
                    <Text
                      style={[TS.fs_14, CommonStyle.textWhite, VS.flex_1]}
                      fontWeight="medium">
                      {setField(profileData?.city_name)},{' '}
                      {setField(profileData?.state_name)},{' '}
                      {setField(profileData?.country_name)}
                    </Text>
                  </>
                )}
            </View>
            <View style={[VS.gap_10, VS.mt_3]}>
              {profileData?.roles?.map((item, index) => {
                return (
                  <View key={index} style={[VS.fd_row, VS.ai_center, VS.gap_7]}>
                    {validField(item?.selected_image_url) && (
                      <ProgressImage
                        source={{uri: item?.selected_image_url}}
                        containerStyle={Styles.rolesImage}
                        fallbackComponent={
                          <VectorIcon
                            iconColor={Colors.primary}
                            iconName="error"
                            iconSize={Scale(30)}
                            iconType={4}
                          />
                        }
                      />
                    )}
                    <Text
                      fontWeight="medium"
                      style={[
                        TS.fs_14,
                        TS.lh_17,
                        CommonStyle.textWhite,
                        VS.flex_1,
                      ]}>
                      {setField(item?.name)}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
        <View style={[VS.fd_row, VS.gap_10, VS.mt_7]}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigate('EditProfile')}
            style={[Styles.iconContainer, VS.ai_center, VS.jc_center]}>
            <Icons.Pencil />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
