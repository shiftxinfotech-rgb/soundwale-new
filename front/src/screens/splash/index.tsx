import {Images} from '@assets';
import {Text, VectorIcon} from '@components';
import {NavigationParamStack} from '@data';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AppStyle, Colors, CommonStyle, TS, VS} from '@theme';
import {Scale} from '@util';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Styles} from './Styles';
export default function Splash() {
  const {t} = useTranslation('splash');
  const {navigate} = useNavigation<NavigationProp<NavigationParamStack>>();
  const {top} = useSafeAreaInsets();
  useEffect(() => {
    setTimeout(() => {
      navigate('Login');
    }, 2000);
  }, [navigate]);

  return (
    <View style={[VS.flex_1]}>
      <LinearGradient
        colors={[Colors.gradientStart, Colors.gradientEnd]}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        style={[Styles.gradient]}>
        <View style={[AppStyle.fullSize]} />
      </LinearGradient>
      <View style={[Styles.rotate]}>
        <LinearGradient
          colors={[Colors.gradientStart, Colors.gradientEnd]}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}}
          style={[Styles.refill]}>
          <View style={[AppStyle.fullSize]} />
        </LinearGradient>
      </View>
      <View style={[Styles.rotateTwo]}>
        <LinearGradient
          colors={[Colors.gradientStart, Colors.gradientEnd]}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}}
          style={[Styles.refill]}>
          <View style={[AppStyle.fullSize]} />
        </LinearGradient>
      </View>
      <View
        style={[
          Styles.headerSection,
          VS.ph_20,
          VS.gap_3,
          VS.jc_center,
          {paddingTop: top},
        ]}>
        {/*  */}
        <Text
          fontWeight={'bold'}
          style={[TS.fs_22, TS.lh_34, CommonStyle.textBlack, TS.ta_center]}>
          {t('postYour')}{' '}
          <Text
            fontWeight={'bold'}
            style={[TS.fs_22, TS.lh_34, CommonStyle.textPrimary, TS.ta_center]}>
            {t('free')}
          </Text>{' '}
          {t('requirementsOn')}
        </Text>
        <View style={[VS.ai_center, VS.jc_center]}>
          <View style={[VS.fd_row, VS.ai_center, VS.jc_center, VS.gap_5]}>
            <VectorIcon
              iconName={'check'}
              iconSize={Scale(20)}
              iconColor={Colors.primary}
              iconType={1}
            />
            <Text
              fontWeight={'semiBold'}
              style={[TS.fs_12, TS.lh_20, CommonStyle.textBlack, TS.ta_center]}>
              {t('tagLineOne')}
            </Text>
          </View>
          <View style={[VS.fd_row, VS.ai_center, VS.jc_center, VS.gap_5]}>
            <VectorIcon
              iconName={'check'}
              iconSize={Scale(20)}
              iconColor={Colors.primary}
              iconType={1}
            />
            <Text
              fontWeight={'semiBold'}
              style={[TS.fs_12, TS.lh_20, CommonStyle.textBlack, TS.ta_center]}>
              {t('tagLineTwo')}
            </Text>
          </View>
          <View style={[VS.fd_row, VS.ai_center, VS.jc_center, VS.gap_5]}>
            <VectorIcon
              iconName={'check'}
              iconSize={Scale(20)}
              iconColor={Colors.primary}
              iconType={1}
            />
            <Text
              fontWeight={'semiBold'}
              style={[TS.fs_12, TS.lh_20, CommonStyle.textBlack, TS.ta_center]}>
              {t('tagLineThree')}
            </Text>
          </View>
        </View>
      </View>
      <Image
        source={Images.splashImg}
        style={[Styles.splashImg]}
        resizeMode={'contain'}
      />
    </View>
  );
}
