import {Icons, Images} from '@assets';
import {
  AddReview,
  CustomBottomSheet,
  CustomBottomSheetMethods,
  ProgressImage,
  Text,
} from '@components';
import {NavigationParamStack} from '@data';
import {useUserInfo} from '@hooks';
import {RouteProp} from '@react-navigation/native';
import {useGetDirectoryDetailQuery} from '@services';
import {AppStyle, Colors, CommonStyle, TS, VS} from '@theme';
import {navigate, validField} from '@util';
import React, {useMemo, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  Alert,
  Linking,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import AboutTab from './components/AboutTab';
import ChildTabs from './components/ChildTabs';
import CompanyInfoTab from './components/CompanyInfoTab';
import {HeaderView} from './components/HeaderView';
import ManufacturingProductTab from './components/ManufacturingProductTab';
import OperatingMixerTab from './components/OperatingMixerTab';
import OtherInfoTab from './components/OtherInfoTab';
import ProductInfoTab from './components/ProductInfoTab';
import RatingTab from './components/RatingTab';
import ServiceCenterTab from './components/ServiceCenterTab';
import SoundInventoryTab from './components/SoundInventoryTab';
import SparePartInfoTab from './components/SparePartInfoTab';
import UserProfileInfo from './components/UserProfileInfo';
import WorkingWithTab from './components/WorkingWithTab';
import {Styles} from './Styles';

export default function DirectoryDetail({
  route,
}: {
  route: RouteProp<NavigationParamStack, 'DirectoryDetail'>;
}) {
  const {t} = useTranslation(['generic', 'register']);
  const {id} = route.params;
  const currentUser = useUserInfo();
  const {
    isLoading,
    isFetching,
    data: directoryInfo,
    refetch,
  } = useGetDirectoryDetailQuery(id.toString(), {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const sheetRef = useRef<CustomBottomSheetMethods | null>(null);
  const [_catalogueSlice, _setCatalogueSlice] = useState<number>(3);
  const [selectedRating, setSelectedRating] = useState<number>(-1);
  const [activeIndex, setActiveIndex] = useState('About');

  const haveReviewed = useMemo(() => {
    if (
      directoryInfo?.review_data?.some(
        review => review.user_id === currentUser?.id,
      )
    ) {
      return true;
    }
    return false;
  }, [directoryInfo?.review_data, currentUser?.id]);

  const openPDFViewer = async (pdfUrl: string) => {
    try {
      if (!pdfUrl || pdfUrl.trim() === '') {
        Alert.alert('Error', t('pdfNotFound'));
        return;
      }
      const supported = await Linking.canOpenURL(pdfUrl);

      if (supported) {
        await Linking.openURL(pdfUrl);
      } else {
        Alert.alert(t('pdfViewerNotFound'), t('noPdfViewerInstalled'), [
          {text: t('cancel'), style: 'cancel'},
          {
            text: t('openInBrowser'),
            onPress: async () => {
              try {
                await Linking.openURL(pdfUrl);
              } catch (err) {
                Alert.alert('Error', t('failedToOpenPdfInBrowser'));
              }
            },
          },
        ]);
      }
    } catch (err) {
      Alert.alert('Error', t('failedToOpenPdf'), [
        {text: t('ok'), style: 'default'},
      ]);
    }
  };

  return (
    <View style={[VS.flex_1, CommonStyle.bgWhite]}>
      {isFetching || isLoading ? (
        <View style={[VS.flex_1, VS.ai_center, VS.jc_center]}>
          <ActivityIndicator size={'large'} color={Colors.primary} />
        </View>
      ) : directoryInfo ? (
        <View style={[VS.flex_1, VS.gap_10]}>
          <HeaderView info={directoryInfo} />
          <ScrollView
            style={[VS.flex_1]}
            showsVerticalScrollIndicator={false}
            alwaysBounceVertical={false}
            contentContainerStyle={[AppStyle.flexGrow, VS.pb_20]}>
            <View style={[VS.ph_16, VS.gap_10]}>
              <View
                style={[
                  Styles.carouselContainer,
                  AppStyle.hideOverFlow,
                  VS.br_10,
                ]}>
                {validField(directoryInfo.visiting_card_image) ? (
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      navigate('GalleryDetail', {
                        images: [directoryInfo.visiting_card_image_url],
                        type: 'image',
                        index: 0,
                      });
                    }}
                    style={[
                      Styles.carouselContainer,
                      AppStyle.hideOverFlow,
                      CommonStyle.bgLightGray,
                    ]}>
                    <ProgressImage
                      source={{uri: directoryInfo.visiting_card_image_url}}
                      containerStyle={[AppStyle.fullSize]}
                      mode={'cover'}
                    />
                  </TouchableOpacity>
                ) : (
                  <View
                    style={[
                      Styles.carouselContainer,
                      AppStyle.hideOverFlow,
                      CommonStyle.bgLightGray,
                    ]}>
                    <ProgressImage
                      source={Images.noImage}
                      containerStyle={[AppStyle.fullSize]}
                      mode={'contain'}
                    />
                  </View>
                )}
              </View>
              <UserProfileInfo info={directoryInfo} />
              <TouchableOpacity
                disabled={haveReviewed}
                onPress={() => {
                  sheetRef?.current?.onPresent();
                }}
                activeOpacity={1}
                style={[VS.fd_row, VS.ai_center]}>
                <Text
                  fontWeight={'semiBold'}
                  style={[TS.fs_12, TS.tt_uppercase, VS.pv_14, VS.flex_1]}>
                  {t('rateCompany')}
                </Text>
                <View style={[VS.ai_center, VS.jc_center, VS.fd_row, VS.gap_5]}>
                  {Array(5)
                    .fill(0)
                    .map((__, index) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          activeOpacity={1}
                          disabled={haveReviewed}
                          onPress={() => {
                            sheetRef?.current?.onPresent();
                          }}>
                          <Icons.Star size={23} color={Colors.dimGray} />
                        </TouchableOpacity>
                      );
                    })}
                </View>
              </TouchableOpacity>
            </View>
            <ChildTabs info={directoryInfo} onPressTab={setActiveIndex} />

            <View style={[VS.ph_16]}>
              {activeIndex === 'About' && <AboutTab info={directoryInfo} />}
              {activeIndex === 'Other Info' && (
                <OtherInfoTab info={directoryInfo} />
              )}
              {activeIndex === 'Rating & Review' && (
                <RatingTab info={directoryInfo} />
              )}
              {activeIndex === 'Product Info' && (
                <ProductInfoTab info={directoryInfo} />
              )}
              {activeIndex === 'Service Center' && (
                <ServiceCenterTab info={directoryInfo} />
              )}
              {activeIndex === 'Company Info' && (
                <CompanyInfoTab
                  info={directoryInfo}
                  openPDFViewer={openPDFViewer}
                />
              )}
              {activeIndex === 'Sound Inventory' && (
                <SoundInventoryTab info={directoryInfo} />
              )}
              {activeIndex === 'Working With' && (
                <WorkingWithTab info={directoryInfo} />
              )}

              {activeIndex === 'Operating Mixer' && (
                <OperatingMixerTab info={directoryInfo} />
              )}
              {activeIndex === 'Spare Part' && (
                <SparePartInfoTab info={directoryInfo} />
              )}
              {activeIndex === 'Manufacturer Product' && (
                <ManufacturingProductTab info={directoryInfo} />
              )}
            </View>
          </ScrollView>
        </View>
      ) : null}

      <CustomBottomSheet ref={sheetRef}>
        <AddReview
          onClose={() => sheetRef?.current?.onDismiss()}
          selectedRating={selectedRating}
          onSelectedRating={setSelectedRating}
          review_type="directory"
          userName={directoryInfo?.name ?? ''}
          relevant_id={directoryInfo?.id?.toString() ?? ''}
          onSuccessCallback={() => {
            sheetRef?.current?.onDismiss();
            refetch();
          }}
        />
      </CustomBottomSheet>
    </View>
  );
}
