import {
  CommonHeader,
  Container,
  CustomBottomSheet,
  CustomBottomSheetMethods,
  MenuProp,
  PostListItem,
  PostOptionsSheet,
  SmartEntityList,
} from '@components';
import {
  FavTypes,
  GeneralResponse,
  NavigationParamStack,
  PostListDatum,
  RequestTypeParam,
} from '@data';
import {
  LazyFetcher,
  usePaginatedEntityList,
  useToggleSnackBar,
  useUserInfo,
} from '@hooks';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  useGetBuyerLikePostMutation,
  useGetHomeLikePostMutation,
  useGetSellerLikePostMutation,
  useLazyGetFavPostsQuery,
  useTogglePostLikeMutation,
} from '@services';
import {AppStyle, VS} from '@theme';
import {
  onInitiateChat,
  onSharePost,
  RequestLimit,
  transformObject,
  transformQueryParam,
} from '@util';
import React, {useCallback, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import Category from './components/Category';

let selectedPost: PostListDatum | undefined;
export default function Favorite() {
  const {t} = useTranslation(['generic']);
  const {toggleMessage} = useToggleSnackBar();
  const userInfo = useUserInfo();
  const postOptionsSheetRef = useRef<CustomBottomSheetMethods>(null);

  const {navigate} = useNavigation<NavigationProp<NavigationParamStack>>();

  const [trigger] = useLazyGetFavPostsQuery();
  const [toggleHomeFavorite] = useGetHomeLikePostMutation();
  const [toggleBuyerFavorite] = useGetBuyerLikePostMutation();
  const [toggleSellerFavorite] = useGetSellerLikePostMutation();
  const [toggleLike] = useTogglePostLikeMutation();

  const [queryParams, setQueryParams] = useState<RequestTypeParam>({
    limit: String(RequestLimit),
    type: 'home',
  });
  const [postOptions, setPostOptions] = useState<MenuProp[]>([]);

  const fetchFavoritePosts: LazyFetcher<PostListDatum> = async param => {
    const formData = transformQueryParam(param);
    const result = await trigger(formData, false);
    if (result?.status === 'rejected') {
      throw result.error || new Error('API fetch failed');
    }
    const responseData = result.data?.data?.data ?? [];
    const meta = result.data?.data?.meta;
    return {
      data: responseData,
      meta,
    };
  };

  const controller = usePaginatedEntityList<PostListDatum & {id: number}>(
    fetchFavoritePosts as LazyFetcher<PostListDatum & {id: number}>,
    {
      extraParams: queryParams,
      debounceDelay: 300,
      refreshOnFocus: true,
    },
  );

  const initiateChat = useCallback(
    async (postInfo: PostListDatum, productType: string) => {
      onInitiateChat(postInfo, userInfo ?? {}, productType);
    },
    [userInfo],
  );

  const togglePostLike = useCallback(
    async (post: PostListDatum) => {
      const {id, is_user_liked = 0, total_likes = 0} = post;
      if (!id) {
        return;
      }
      const res = await toggleLike(
        transformObject({
          type_id: id?.toString() ?? '',
          type: queryParams.type as 'home' | 'buyer' | 'seller',
        }),
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
    [controller, toggleMessage, toggleLike, queryParams.type],
  );

  const togglePostFavorite = useCallback(
    async (post: PostListDatum) => {
      const {id} = post;
      if (!id) {
        return;
      }
      let res: GeneralResponse | undefined;
      if (queryParams.type === 'home') {
        res = await toggleHomeFavorite(
          transformObject({home_id: id.toString()}),
        ).unwrap();
      } else if (queryParams.type === 'buyer') {
        res = await toggleBuyerFavorite(
          transformObject({buyer_id: id.toString()}),
        ).unwrap();
      } else if (queryParams.type === 'seller') {
        res = await toggleSellerFavorite(
          transformObject({seller_id: id.toString()}),
        ).unwrap();
      }
      if (res) {
        if (res.status) {
          controller?.removeOne(id);
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

  const onPressShare = useCallback(() => {
    onSharePost(
      queryParams.type as 'home' | 'buyer' | 'seller',
      selectedPost?.id?.toString() ?? '',
      '',
      {
        title: selectedPost?.product_name ?? '',
        description: selectedPost?.description ?? '',
        image: selectedPost?.images?.[0]?.image_url ?? '',
      },
    );
  }, [queryParams.type]);

  const onSelectCategory = useCallback(async (id: FavTypes) => {
    setQueryParams({
      limit: String(RequestLimit),
      type: id,
    });
  }, []);

  const onTapPostOptions = useCallback((post: PostListDatum) => {
    selectedPost = post;
    setPostOptions([
      {key: 'share', title: 'Share Post', iconType: 3, iconName: 'share'},
    ]);
    postOptionsSheetRef.current?.onPresent();
  }, []);

  const onLoadPostOptions = useCallback(
    (entity: PostListDatum, type: string) => {
      if (type === 'like') {
        togglePostLike(entity);
      } else if (type === 'favorite') {
        togglePostFavorite(entity);
      } else if (type === 'comment') {
        navigate('PostComments', {
          requestFrom: queryParams.type as 'home' | 'buyer' | 'seller',
          postId: entity.id ?? 0,
          isImagePost: false,
          controller: controller,
          onGoBack: () => {
            controller?.refresh();
          },
        });
      } else if (type === 'chat') {
        initiateChat(entity, queryParams.type as 'home' | 'buyer' | 'seller');
      } else if (type === 'profile') {
        navigate('Profile', {
          userId: entity.user_id ?? 0,
          userInfo: {
            id: entity.user_id ?? 0,
            name: entity.user_name ?? '',
            role: entity.user_role_name ?? '',
            image_url: entity.user_image ?? '',
            mobile_number: entity.user_mobile_number ?? '',
          },
          onReturnBack: () => {
            controller?.refresh();
          },
        });
      } else if (type === 'options') {
        onTapPostOptions(entity);
      } else if (type === 'media') {
        navigate('PostImages', {
          requestFrom: queryParams.type as 'home' | 'buyer' | 'seller',
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
      controller,
      initiateChat,
      navigate,
      queryParams.type,
      togglePostFavorite,
      togglePostLike,
      onTapPostOptions,
    ],
  );

  const _renderItem = useCallback(
    ({item, index}: {item: PostListDatum; index: number}) => {
      return (
        <PostListItem
          key={index}
          item={item}
          onUpdateLike={onLoadPostOptions}
          onUpdateFavorite={onLoadPostOptions}
          onTapPostComments={onLoadPostOptions}
          onTapPostOptions={onLoadPostOptions}
          onViewProfile={onLoadPostOptions}
          onTapPostChat={onLoadPostOptions}
          onTapMedia={onLoadPostOptions}
        />
      );
    },
    [onLoadPostOptions],
  );

  return (
    <Container>
      <CommonHeader
        withBackArrow
        title="Favorite / Wishlist"
        withChatNotification={false}
      />
      <Category
        onPress={onSelectCategory}
        selectedCategory={queryParams.type as FavTypes}
      />
      <SmartEntityList
        controller={controller}
        renderItem={_renderItem}
        showShimmerWhileRefetching={true}
        emptyComponentLabel={t('noDataFound')}
        contentContainerStyle={[VS.gap_15, AppStyle.flexGrow]}
        style={[VS.flex_1, VS.mt_20]}
      />

      <CustomBottomSheet ref={postOptionsSheetRef}>
        <PostOptionsSheet
          menus={postOptions}
          onBackPress={() => {
            postOptionsSheetRef.current?.onDismiss();
          }}
          onPress={(key: string) => {
            postOptionsSheetRef.current?.onDismiss();
            if (key === 'share') {
              onPressShare();
            }
          }}
        />
      </CustomBottomSheet>
    </Container>
  );
}
