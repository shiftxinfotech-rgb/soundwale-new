import {Icons} from '@assets';
import {
  CommonHeader,
  Container,
  CustomLoader,
  OptionsView,
  ProgressImage,
} from '@components';
import {ImageBean, NavigationParamStack} from '@data';
import ImageViewer from '@react-native-ohos/react-native-image-zoom-viewer';
import {RouteProp} from '@react-navigation/native';
import {AppStyle, Colors, CommonStyle, VS} from '@theme';
import {Scale} from '@util';
import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, Modal, TouchableOpacity, View} from 'react-native';
import {Styles} from './Styles';

const RenderLoader = () => {
  return <CustomLoader />;
};

export default function GalleryDetail({
  route,
}: {
  route: RouteProp<NavigationParamStack, 'GalleryDetail'>;
}) {
  const {t} = useTranslation('generic');
  const flatListRef = useRef<FlatList>(null);

  const [mediaArray, setMediaArray] = useState<ImageBean[]>([]);
  const [showImageModal, setShowImageModal] = useState<boolean>(false);
  const [imageModalIndex, setImageModalIndex] = useState<number>(0);

  useEffect(() => {
    if (route.params.type === 'image') {
      const images = route.params.images ?? [];
      const updatedArray = images.map(item =>
        typeof item === 'string' ? {url: item} : {...item, url: item.image_url},
      );
      console.log('updatedArray', updatedArray);
      setMediaArray(updatedArray);
    } else {
      setMediaArray([]);
    }
  }, [route.params.type, route.params.images]);

  useEffect(() => {
    if (flatListRef.current) {
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index: route.params.index,
          animated: true,
        });
      }, 100);
    }
  }, [route.params.index]);

  const renderImage = ({item, index}: {item: ImageBean; index: number}) => {
    return (
      <View style={[VS.gap_10]}>
        <TouchableOpacity
          style={[Styles.aspectImage]}
          activeOpacity={1}
          onPress={() => {
            setImageModalIndex(index);
            setShowImageModal(true);
          }}>
          <ProgressImage
            source={{uri: item.image_url ?? ''}}
            containerStyle={[AppStyle.fullSize]}
            mode="cover"
          />
        </TouchableOpacity>
        <OptionsView
          total_likes={0}
          total_comments={0}
          is_user_liked={0}
          isMyPost={false}
          onPress={key => {
            console.log('key', key);
          }}
        />
      </View>
    );
  };

  return (
    <Container>
      <CommonHeader
        title={route.params.type === 'image' ? t('photos') : t('video')}
        withBackArrow
        withChatNotification={false}
      />

      {route.params.type === 'image' ? (
        <FlatList
          data={mediaArray}
          renderItem={renderImage}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[VS.gap_10]}
        />
      ) : null}

      <Modal
        visible={showImageModal}
        transparent={true}
        onRequestClose={() => {
          setShowImageModal(false);
        }}>
        <ImageViewer
          imageUrls={mediaArray.map(item => ({
            url: item.image_url ?? '',
          }))}
          index={imageModalIndex}
          loadingRender={RenderLoader}
          enablePreload={true}
          enableImageZoom={true}
          enableSwipeDown={true}
          renderImage={({source}) => (
            <ProgressImage
              source={source}
              containerStyle={[AppStyle.fullSize]}
              mode="cover"
            />
          )}
          renderHeader={_ => (
            <TouchableOpacity
              hitSlop={15}
              onPress={() => {
                setShowImageModal(false);
              }}
              activeOpacity={0.7}
              style={[
                CommonStyle.borderWhite,
                VS.ai_center,
                VS.jc_center,
                VS.h_24,
                VS.w_24,
                VS.br_12,
                VS.bw_1,
                VS.p_4,
                VS.as_start,
                VS.ml_15,
                VS.mv_10,
              ]}>
              <Icons.Close color={Colors.white} size={Scale(12)} />
            </TouchableOpacity>
          )}
        />
      </Modal>
    </Container>
  );
}
