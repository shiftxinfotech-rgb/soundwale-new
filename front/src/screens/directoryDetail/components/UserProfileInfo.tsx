import {Icons} from '@assets';
import {ProgressImage, Text} from '@components';
import {DirectoryDetail} from '@data';
import {useUserInfo} from '@hooks';
import {Colors, CommonStyle, TS, VS} from '@theme';
import {
  getUserLocation,
  openDirectoryWhatsApp,
  openEmail,
  openLocation,
  openPhoneCall,
  Scale,
  setField,
  validField,
} from '@util';
import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import SocialButton from './SocialButton';
import {Styles} from './Styles';

const UserProfileInfo = ({info}: {info: DirectoryDetail}) => {
  const {t} = useTranslation(['generic', 'register']);
  const currentUser = useUserInfo();
  const {
    image_url,
    name,
    personal_name,
    review_avg_rating,
    review_count,
    country_name,
    state_name,
    city_name,
    mobile_number,
    marketing_mobile_number,
    marketing_person_name,
    email,
    location,
    roles,
    gst_number,
  } = info || {};

  const slugs = useMemo(
    () => roles?.map(role => String(role.slug).toLowerCase()) || [],
    [roles],
  );
  const isExist = (names: string[]) => {
    return names.some(el => slugs.includes(el));
  };

  const showMarketing = isExist([
    'manufacturer',
    'dealer_supplier_distributor_importer',
    'sound_automation',
  ]);

  return (
    <View style={[VS.gap_10]}>
      <View style={[VS.fd_row, VS.gap_10]}>
        <ProgressImage
          source={{uri: image_url}}
          containerStyle={[Styles.profileContainerImage]}
          imageStyle={[Styles.profileImage]}
          mode="cover"
        />
        <View style={[VS.flex_1, VS.jc_center, VS.mt_5, VS.gap_5]}>
          <Text fontWeight="bold" style={[TS.fs_19]}>
            {setField(name)}
          </Text>
          <Text fontWeight="medium" style={[TS.fs_15]}>
            {setField(personal_name)}
          </Text>
          {review_avg_rating && review_avg_rating > 0 && (
            <View style={[VS.fd_row, VS.mr_7]}>
              <View
                style={[
                  Styles.ratingView,
                  VS.fd_row,
                  VS.ph_9,
                  VS.ai_center,
                  VS.gap_5,
                  VS.jc_center,
                  VS.pv_3,
                ]}>
                <Icons.Star />
                <Text
                  fontWeight="quickSandSemiBold"
                  style={[CommonStyle.textAmber, TS.fs_13, TS.lh_16]}>
                  {`${review_avg_rating.toFixed(1)} (${review_count})`}
                </Text>
              </View>
            </View>
          )}
          {validField(city_name) &&
            validField(state_name) &&
            validField(country_name) && (
              <View style={[VS.fd_row, VS.ai_start, VS.ai_center, VS.gap_8]}>
                <Icons.Map size={Scale(15)} />
                <Text
                  fontWeight="medium"
                  numberOfLines={3}
                  style={[TS.fs_14, CommonStyle.textBlueGray]}>
                  {getUserLocation(city_name, state_name, country_name)}
                </Text>
              </View>
            )}
        </View>
      </View>
      <View style={[VS.fd_row, VS.gap_5, VS.ai_center, VS.jc_center]}>
        <SocialButton
          icon={
            <Icons.CallNow
              color={Colors.primary}
              width={Scale(20)}
              height={Scale(20)}
            />
          }
          label={t('call')}
          onPress={() => {
            const haveMNumber = validField(marketing_mobile_number);
            showMarketing && haveMNumber
              ? openPhoneCall(marketing_mobile_number ?? '')
              : openPhoneCall(mobile_number ?? '');
          }}
        />
        <SocialButton
          icon={<Icons.WhatsAppLine color={Colors.primary} size={Scale(23)} />}
          label={t('whatsapp')}
          onPress={() => {
            openDirectoryWhatsApp(info, currentUser!, showMarketing);
          }}
        />

        {validField(email) && (
          <SocialButton
            icon={<Icons.Email color={Colors.primary} size={Scale(23)} />}
            label={t('email')}
            onPress={() => openEmail(email ?? '')}
          />
        )}

        {validField(location) ? (
          <SocialButton
            icon={<Icons.Address />}
            label={t('location')}
            onPress={() => openLocation(location ?? '')}
          />
        ) : null}
      </View>
      {validField(gst_number) && (
        <Text
          fontWeight={'semiBold'}
          style={[
            TS.fs_12,
            TS.tt_uppercase,
            VS.flex_1,
            CommonStyle.textPrimary,
          ]}>
          {t('register:forms.gst.label')} :{' '}
          <Text fontWeight={'semiBold'} style={[TS.fs_12]}>
            {gst_number}
          </Text>
        </Text>
      )}

      {showMarketing ? (
        <>
          {validField(marketing_person_name) && (
            <Text
              fontWeight={'semiBold'}
              style={[
                TS.fs_12,
                TS.tt_uppercase,
                VS.flex_1,
                CommonStyle.textPrimary,
              ]}>
              {t('register:forms.manufacturer.marketingName')} :{' '}
              <Text fontWeight={'semiBold'} style={[TS.fs_12]}>
                {marketing_person_name}
              </Text>
            </Text>
          )}
        </>
      ) : null}
    </View>
  );
};

export default UserProfileInfo;
