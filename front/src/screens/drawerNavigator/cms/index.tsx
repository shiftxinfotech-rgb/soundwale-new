import {CommonHeader, Container, NoData} from '@components';
import {NavigationParamStack} from '@data';
import {RouteProp} from '@react-navigation/native';

import {useGetPrivacyQuery, useGetTermsQuery} from '@services';
import {AppStyle, Colors, VS} from '@theme';
import {Scale, width} from '@util';
import React, {useCallback, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import RenderHtml from 'react-native-render-html';
import {Styles} from './Styles';

type CMSRouteProp = RouteProp<NavigationParamStack, 'Cms'>;

const CMS: React.FC<{route: CMSRouteProp}> = ({route}) => {
  const {t} = useTranslation('cms');
  const type = (route?.params && route.params?.type) ?? '';

  const [cmsContent, setCmsContent] = useState('');
  const [loadingData, setLoadingData] = useState(false);

  const {
    isLoading: fetchPrivacy,
    data: privacyData,
    refetch: refetchPrivacy,
  } = useGetPrivacyQuery(undefined, {
    skip: type === 'terms',
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  const {
    isLoading: fetchTerms,
    data: termsData,
    refetch: refetchTerms,
  } = useGetTermsQuery(undefined, {
    skip: type === 'privacy',
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    const status = fetchPrivacy || fetchTerms;
    setLoadingData(status);
  }, [fetchPrivacy, fetchTerms]);

  useEffect(() => {
    setCmsContent('');
    if (
      privacyData !== undefined &&
      privacyData !== null &&
      privacyData.data !== null &&
      privacyData.data !== undefined &&
      privacyData.data.description !== null
    ) {
      let privacyContent = privacyData.data.description ?? '';
      setCmsContent(privacyContent);
    } else if (
      termsData !== undefined &&
      termsData !== null &&
      termsData.data !== null &&
      termsData.data !== undefined &&
      termsData.data.description !== null
    ) {
      let termsContent = termsData.data.description ?? '';
      setCmsContent(termsContent);
    }
  }, [privacyData, termsData]);

  const onRefresh = useCallback(async () => {
    try {
      if (type === 'terms') {
        await refetchTerms();
      } else {
        await refetchPrivacy();
      }
    } catch (err) {}
  }, [type, refetchPrivacy, refetchTerms]);

  return (
    <Container>
      <View style={[VS.flex_1]}>
        <CommonHeader
          withBackArrow
          title={type === 'terms' ? t('termsCondition') : t('privacyPolicy')}
        />

        {loadingData ? (
          <View style={[VS.flex_1, VS.ai_center, VS.jc_center]}>
            <ActivityIndicator size={Scale(30)} color={Colors.primary} />
          </View>
        ) : cmsContent !== '' ? (
          <View style={[VS.ph_15, VS.flex_1, VS.pb_10]}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={loadingData}
                  onRefresh={onRefresh}
                />
              }
              contentContainerStyle={[AppStyle.flexGrow]}>
              <RenderHtml
                contentWidth={width}
                enableExperimentalMarginCollapsing={true}
                enableExperimentalBRCollapsing={true}
                enableExperimentalGhostLinesPrevention={true}
                enableCSSInlineProcessing={true}
                enableUserAgentStyles={true}
                ignoredDomTags={['o:p']}
                source={{html: cmsContent}}
                defaultTextProps={{style: Styles.htmlText}}
              />
            </ScrollView>
          </View>
        ) : (
          <NoData
            message={
              type === 'terms'
                ? t('noTermsConditionAvailable')
                : t('noPrivacyPolicyAvailable')
            }
          />
        )}
      </View>
    </Container>
  );
};
export default CMS;
