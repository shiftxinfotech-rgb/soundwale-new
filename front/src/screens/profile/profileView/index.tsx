import {Images} from '@assets';
import {
  CustomBottomSheet,
  CustomBottomSheetMethods,
  MenuProp,
  PostListItem,
  PostOptionsSheet,
  SmartEntityList,
  TabTitleItem,
} from '@components';
import {
  GeneralResponse,
  NavigationParamStack,
  PostListDatum,
  RequestTypeParam,
} from '@data';
import {
  LazyFetcher,
  usePaginatedEntityList,
  useToggleSnackBar,
  useUserId,
} from '@hooks';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  useDeleteRequirementPostMutation,
  useGetBuyerLikePostMutation,
  useGetHomeLikePostMutation,
  useGetSellerLikePostMutation,
  useLazyGetUserProfilePostsQuery,
  useTogglePostLikeMutation,
} from '@services';
import {AppStyle, CommonStyle, VS} from '@theme';
import {
  onInitiateChat,
  onSharePost,
  RequestLimit,
  transformObject,
  transformQueryParam,
} from '@util';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, ScrollView, View} from 'react-native';
import {OtherProfileHeader} from './components/OtherProfileHeader';
import {ProfileHeader} from './components/ProfileHeader';
import {Styles} from './Styles';

let selectedPost: PostListDatum | undefined;
export default function ProfileScreen() {
  const {t} = useTranslation(['tabNavigator']);
  const loginID = useUserId();
  const {toggleMessage} = useToggleSnackBar();
  const postOptionsSheetRef = useRef<CustomBottomSheetMethods>(null);

  const {addListener, navigate} =
    useNavigation<NavigationProp<NavigationParamStack>>();

  const {userId, userInfo, onReturnBack} =
    useRoute<RouteProp<NavigationParamStack, 'Profile'>>().params;

  const [trigger] = useLazyGetUserProfilePostsQuery();
  const [toggleHomeFavorite] = useGetHomeLikePostMutation();
  const [toggleBuyerFavorite] = useGetBuyerLikePostMutation();
  const [toggleSellerFavorite] = useGetSellerLikePostMutation();
  const [deletePost] = useDeleteRequirementPostMutation();
  const [toggleLike] = useTogglePostLikeMutation();

  const [currentTab, setCurrentTab] = useState<'home' | 'seller' | 'buyer'>(
    'home',
  );

  const [queryParams, setQueryParams] = useState<RequestTypeParam>({
    limit: String(RequestLimit),
    user_id: String(userId),
    type: currentTab,
  });
  const [postOptions, setPostOptions] = useState<MenuProp[]>([]);

  const fetchPosts: LazyFetcher<PostListDatum> = async param => {
    const formData = transformQueryParam(param);
    const result = await trigger({data: formData}, false);

    if (result?.status === 'rejected') {
      throw result.error || new Error('API fetch failed');
    }
    return {
      data: result.data?.data?.data ?? [],
      meta: result.data?.data?.meta,
    };
  };

  const controller = usePaginatedEntityList<PostListDatum & {id: number}>(
    fetchPosts as LazyFetcher<PostListDatum & {id: number}>,
    {
      extraParams: queryParams,
      debounceDelay: 300,
      refreshOnFocus: true,
    },
  );

  useEffect(() => {
    const unsubscribe = addListener('beforeRemove', () => {
      onReturnBack?.();
    });
    return unsubscribe;
  }, [addListener, onReturnBack]);

  const initiateChat = useCallback(
    async (postInfo: PostListDatum, productType: string) => {
      onInitiateChat(postInfo, userInfo ?? {}, productType);
    },
    [userInfo],
  );

  const onTapPostOptions = useCallback(
    (post: PostListDatum) => {
      selectedPost = post;
      const isMyPost = post.user_id?.toString() === loginID?.toString();
      if (isMyPost) {
        setPostOptions([
          {key: 'edit', title: 'Edit Post', iconType: 1, iconName: 'edit'},
          {
            key: 'delete',
            title: 'Delete Post',
            iconType: 4,
            iconName: 'delete',
          },
          {key: 'share', title: 'Share Post', iconType: 3, iconName: 'share'},
        ]);
      } else {
        setPostOptions([
          {key: 'share', title: 'Share Post', iconType: 3, iconName: 'share'},
        ]);
      }
      postOptionsSheetRef.current?.onPresent();
    },
    [loginID],
  );

  const togglePostLike = useCallback(
    async (post: PostListDatum) => {
      const {id, is_user_liked = 0, total_likes = 0} = post;
      if (!id) {
        return;
      }
      const pId = id.toString();
      const res = await toggleLike(
        transformObject({type_id: pId, type: currentTab}),
      ).unwrap();
      if (res) {
        if (res.status) {
          controller?.updateOne(id, {
            is_user_liked: is_user_liked === 1 ? 0 : 1,
            total_likes:
              is_user_liked === 0 ? total_likes + 1 : total_likes - 1,
          });
        } else {
          toggleMessage(res.message);
        }
      }
    },
    [controller, toggleMessage, toggleLike, currentTab],
  );

  const togglePostFavorite = useCallback(
    async (postId: number | undefined, is_like: number) => {
      if (!postId) {
        return;
      }
      let res: GeneralResponse | undefined;
      const pId = postId.toString();
      if (queryParams.type === 'home') {
        res = await toggleHomeFavorite(
          transformObject({home_id: pId}),
        ).unwrap();
      } else if (queryParams.type === 'buyer') {
        res = await toggleBuyerFavorite(
          transformObject({buyer_id: pId}),
        ).unwrap();
      } else if (queryParams.type === 'seller') {
        res = await toggleSellerFavorite(
          transformObject({seller_id: pId}),
        ).unwrap();
      }
      if (res) {
        if (res.status) {
          controller?.updateOne(postId, {
            is_like: is_like === 1 ? 0 : 1,
          });
        } else {
          toggleMessage(res.message);
        }
      }
    },
    [
      controller,
      queryParams.type,
      toggleBuyerFavorite,
      toggleHomeFavorite,
      toggleMessage,
      toggleSellerFavorite,
    ],
  );

  const deletePostById = useCallback(async () => {
    if (!selectedPost) {
      return;
    }
    const {id} = selectedPost;
    if (!id) {
      return;
    }
    const formData = new FormData();
    formData.append('id', id.toString());
    formData.append('type', currentTab);
    const res = await deletePost({data: formData}).unwrap();
    if (res) {
      if (res.status) {
        controller?.removeOne(id);
      } else {
        toggleMessage(res.message);
      }
    }
  }, [controller, toggleMessage, deletePost, currentTab]);

  const onLoadPostOptions = useCallback(
    (entity: PostListDatum, type: string) => {
      if (type === 'like') {
        togglePostLike(entity);
      } else if (type === 'favorite') {
        togglePostFavorite(entity.id, entity.is_like ?? 0);
      } else if (type === 'comment') {
        navigate('PostComments', {
          requestFrom: currentTab,
          postId: entity.id ?? 0,
          isImagePost: false,
          controller: controller,
          onGoBack: () => {
            controller?.refresh();
          },
        });
      } else if (type === 'options') {
        onTapPostOptions(entity);
      } else if (type === 'chat') {
        initiateChat(entity, currentTab);
      } else if (type === 'media') {
        navigate('PostImages', {
          requestFrom: currentTab,
          postData: entity,
          isMyPost: entity.isMyPost ?? false,
          controller: controller,
          onGoBack: () => {
            controller?.refresh();
          },
        });
      }
    },
    [
      togglePostLike,
      togglePostFavorite,
      navigate,
      currentTab,
      onTapPostOptions,
      initiateChat,
      controller,
    ],
  );

  const onPressShare = useCallback(() => {
    onSharePost(currentTab, selectedPost?.id?.toString() ?? '', '', {
      title: selectedPost?.product_name ?? '',
      description: selectedPost?.description ?? '',
      image: selectedPost?.images?.[0]?.image_url ?? '',
    });
  }, [currentTab]);

  const _renderItem = useCallback(
    ({item}: {item: PostListDatum}) => {
      return (
        <PostListItem
          item={item}
          onUpdateLike={onLoadPostOptions}
          onUpdateFavorite={onLoadPostOptions}
          onTapPostOptions={onLoadPostOptions}
          onTapPostComments={onLoadPostOptions}
          onTapPostChat={onLoadPostOptions}
          onTapMedia={onLoadPostOptions}
        />
      );
    },
    [onLoadPostOptions],
  );

  const itemSeparator = useCallback(() => {
    return <View style={[VS.h_1, CommonStyle.bgLightGray, VS.mv_15]} />;
  }, []);

  return (
    <View style={[VS.flex_1, CommonStyle.bgPrimary]}>
      <Image source={Images.filterTopMask} style={Styles.absoluteTopRight} />
      <View style={[CommonStyle.safeAreaSpaceTop, AppStyle.flexGrow]}>
        {loginID?.toString() === userId?.toString() ? (
          <ProfileHeader />
        ) : (
          <OtherProfileHeader userInfo={userInfo} />
        )}
        <View
          style={[
            Styles.infoContainer,
            CommonStyle.bgWhite,
            VS.flex_1,
            VS.mt_13,
            VS.pv_21,
            VS.gap_15,
          ]}>
          <View style={[VS.fd_row, VS.ph_5]}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={[VS.flex_1]}
              contentContainerStyle={[VS.gap_10, VS.flex_1]}>
              {[
                {title: 'Home', id: 'home'},
                {title: 'Buyer', id: 'buyer'},
                {title: 'Seller', id: 'seller'},
              ].map((item, index) => {
                return (
                  <View key={index} style={[VS.flex_1]}>
                    <TabTitleItem
                      title={item.title}
                      isSelected={currentTab === item.id}
                      onPress={() => {
                        setCurrentTab(item.id as 'home' | 'buyer' | 'seller');
                        setQueryParams({
                          ...queryParams,
                          type: item.id,
                        });
                      }}
                    />
                  </View>
                );
              })}
            </ScrollView>
          </View>
          <SmartEntityList
            controller={controller}
            renderItem={_renderItem}
            showShimmerWhileRefetching={true}
            emptyComponentLabel={t('noPostFound')}
            contentContainerStyle={[AppStyle.flexGrow]}
            style={[VS.flex_1]}
            ItemSeparatorComponent={itemSeparator}
          />
        </View>
      </View>

      <CustomBottomSheet ref={postOptionsSheetRef}>
        <PostOptionsSheet
          menus={postOptions}
          onBackPress={() => {
            postOptionsSheetRef.current?.onDismiss();
          }}
          onPress={(key: string) => {
            postOptionsSheetRef.current?.onDismiss();
            if (key === 'edit') {
              navigate('AddPostRequirement', {
                requestFrom: currentTab,
                postData: selectedPost,
              });
            } else if (key === 'delete') {
              deletePostById();
            } else if (key === 'share') {
              onPressShare();
            }
          }}
        />
      </CustomBottomSheet>
    </View>
  );
}
