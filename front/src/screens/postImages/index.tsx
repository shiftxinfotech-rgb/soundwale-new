import {Icons} from '@assets';
import {
  CommonHeader,
  Container,
  CustomLoader,
  OptionsView,
  ProgressImage,
} from '@components';
import {ImageBean, NavigationParamStack, PostListDatum} from '@data';
import {useToggleSnackBar, useUserInfo} from '@hooks';
import ImageViewer from '@react-native-ohos/react-native-image-zoom-viewer';
import {
  NavigationProp,
  RouteProp,
  StackActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useTogglePostLikeMutation} from '@services';
import {AppStyle, Colors, CommonStyle, VS} from '@theme';
import {
  onInitiateChat,
  openCommonWhatsApp,
  openPhoneCall,
  Scale,
  transformObject,
} from '@util';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, Modal, TouchableOpacity, View} from 'react-native';
import {Styles} from './Styles';

const RenderLoader = () => {
  return <CustomLoader />;
};

export default function PostImages() {
  const {requestFrom, postData, isMyPost, controller, onGoBack} =
    useRoute<RouteProp<NavigationParamStack, 'PostImages'>>().params || {};
  const navigation = useNavigation<NavigationProp<NavigationParamStack>>();
  const {t} = useTranslation('generic');
  const {toggleMessage} = useToggleSnackBar();
  const userInfo = useUserInfo();

  const [toggleLike] = useTogglePostLikeMutation();
  const postRef = useRef<PostListDatum>(null);
  const mediaImgRef = useRef<ImageBean[]>([]);

  const [mediaArray, setMediaArray] = useState<ImageBean[]>([]);
  const [showImageModal, setShowImageModal] = useState<boolean>(false);
  const [imageModalIndex, setImageModalIndex] = useState<number>(0);

  useEffect(() => {
    if (!postData) {
      return;
    }
    postRef.current = postData;
    const images = postData?.images ?? [];
    const updatedArray = images.map(item =>
      typeof item === 'string' ? {url: item} : {...item, url: item.image_url},
    );
    setMediaArray(updatedArray);
    mediaImgRef.current = updatedArray;
  }, [postData]);

  const togglePostLike = useCallback(
    async (post: ImageBean) => {
      try {
        const {id, is_like = 0, total_likes = 0} = post;
        if (!id) {
          return;
        }
        const res = await toggleLike(
          transformObject({
            type_id: id?.toString() ?? '',
            type: requestFrom ?? '',
            is_image: 1,
          }),
        ).unwrap();
        if (res) {
          if (res.status) {
            setMediaArray(prevMediaArray => {
              const updatedMediaArray = prevMediaArray.map(item => {
                if (item.id === id) {
                  return {
                    ...item,
                    is_like: is_like === 1 ? 0 : 1,
                    total_likes:
                      is_like === 0 ? total_likes + 1 : total_likes - 1,
                  };
                }
                return item;
              });
              mediaImgRef.current = updatedMediaArray;
              controller?.updateOne(postRef.current?.id ?? 0, {
                images: updatedMediaArray,
              });
              return updatedMediaArray;
            });
          } else {
            toggleMessage(res.message);
          }
        }
      } catch (error) {
        toggleMessage(t('somethingWrong'));
      }
    },
    [toggleLike, requestFrom, controller, toggleMessage, t],
  );

  const commonTap = (type: 'whatsapp' | 'call') => {
    const {
      user_role_slug,
      user_marketing_mobile_number,
      user_name,
      user_marketing_code,
      user_mobile_number,
      user_code,
    } = postRef.current ?? {};
    if (
      [
        'manufacturer',
        'dealer_supplier_distributor_importer',
        'sound_automation',
      ].includes(user_role_slug ?? '')
    ) {
      if (type === 'call') {
        openPhoneCall(user_marketing_mobile_number ?? '');
      } else {
        openCommonWhatsApp(
          user_name ?? '',
          user_marketing_code ?? '',
          user_marketing_mobile_number ?? '',
        );
      }
    } else {
      if (type === 'call') {
        openPhoneCall(user_mobile_number ?? '');
      } else {
        openCommonWhatsApp(
          user_name ?? '',
          user_code ?? '',
          user_mobile_number ?? '',
        );
      }
    }
  };

  const onLoadPostOptions = useCallback(
    (entity: ImageBean, type: string) => {
      if (type === 'like') {
        togglePostLike(entity);
      } else if (type === 'comment') {
        navigation.dispatch(
          StackActions.replace('PostComments', {
            requestFrom: requestFrom ?? '',
            postId: entity.id ?? 0,
            isImagePost: true,
            onGoBack,
            controller: controller,
          }),
        );
      } else if (type === 'whatsapp') {
        commonTap('whatsapp');
      } else if (type === 'call') {
        commonTap('call');
      } else if (type === 'chat') {
        if (!postRef.current) {
          return;
        }
        onInitiateChat(postRef.current, userInfo ?? {}, requestFrom ?? '');
      }
    },
    [togglePostLike, navigation, requestFrom, onGoBack, userInfo, controller],
  );

  const renderImage = ({item, index}: {item: ImageBean; index: number}) => {
    const imageUrl = item.thumbnails_image_url || item.image_url;
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
            source={{uri: imageUrl ?? ''}}
            containerStyle={[AppStyle.fullSize]}
            mode={'contain'}
          />
        </TouchableOpacity>
        <OptionsView
          total_likes={item.total_likes ?? 0}
          total_comments={item.total_comments ?? 0}
          is_user_liked={item.is_like ?? 0}
          isMyPost={isMyPost ?? false}
          onPress={key => {
            onLoadPostOptions(item, key);
          }}
        />
      </View>
    );
  };

  return (
    <Container>
      <CommonHeader
        title={t('photos')}
        withBackArrow
        withChatNotification={false}
      />

      <FlatList
        data={mediaArray}
        renderItem={renderImage}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[VS.gap_10]}
      />

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
