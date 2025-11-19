import {
  Container,
  CustomBottomSheet,
  CustomBottomSheetMethods,
  MenuProp,
  PostListItem,
  PostOptionsSheet,
  SmartEntityList,
} from '@components';
import {
  BackParams,
  PostListDatum,
  RequestTypeParam,
  Selections,
  SellersProps,
} from '@data';
import {
  LazyFetcher,
  SmartLocation,
  usePaginatedEntityList,
  useToggleSnackBar,
  useUserId,
  useUserInfo,
} from '@hooks';
import {useSmartLocationContext} from '@providers';
import {
  useDeleteRequirementPostMutation,
  useGetSellerLikePostMutation,
  useLazyGetPostsQuery,
  useTogglePostLikeMutation,
} from '@services';
import {AppStyle, Colors, CommonStyle, VS} from '@theme';
import {
  extractAddressFromCoordinates,
  onInitiateChat,
  onSharePost,
  RequestLimit,
  safeSplit,
  transformObject,
  transformQueryParam,
} from '@util';
import {debounce} from 'lodash';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator, View} from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import LocationWidget from '../components/LocationWidget';
import TabHeader from '../components/TabHeader';
import {Styles} from './Styles';

let selectedPost: PostListDatum;
export default function Sellers({navigation}: SellersProps) {
  const {t} = useTranslation(['tabNavigator']);
  const {toggleMessage} = useToggleSnackBar();
  const userInfo = useUserInfo();
  const loginId = useUserId();
  const postOptionsSheetRef = useRef<CustomBottomSheetMethods>(null);
  const lastLocRef = useRef<string>('');
  const {
    location,
    status,
    refetch: refetchLocation,
  } = useSmartLocationContext();
  const filteredApplied = useRef(false);

  const [trigger] = useLazyGetPostsQuery();
  const [toggleFavorite] = useGetSellerLikePostMutation();
  const [deletePost] = useDeleteRequirementPostMutation();
  const [toggleLike] = useTogglePostLikeMutation();

  const [query, setQuery] = useState('');
  const [queryParams, setQueryParams] = useState<RequestTypeParam>({
    limit: String(RequestLimit),
    latitude: location?.latitude ?? '',
    longitude: location?.longitude ?? '',
    state_name: location?.state ?? '',
  });
  const [currentState, setCurrentState] = useState(location?.state ?? '');
  const [postOptions, setPostOptions] = useState<MenuProp[]>([]);

  const fetchSellerPosts: LazyFetcher<PostListDatum> = async param => {
    const formData = transformQueryParam(param);
    const result = await trigger({data: formData, type: 'seller'}, false);
    if (result?.status === 'rejected') {
      throw result.error || new Error('API fetch failed');
    }
    return {
      data: result.data?.data?.data ?? [],
      meta: result.data?.data?.meta,
    };
  };

  const controller = usePaginatedEntityList<PostListDatum & {id: number}>(
    fetchSellerPosts as LazyFetcher<PostListDatum & {id: number}>,
    {
      extraParams: queryParams,
      debounceDelay: 300,
      refreshOnFocus: false,
    },
  );

  const handleLocation = useCallback(
    async (loc: SmartLocation) => {
      const res = await extractAddressFromCoordinates({
        latitude: loc.latitude,
        longitude: loc.longitude,
      });
      const newState = res?.state ?? '';
      const newQueryParams = {
        limit: String(RequestLimit),
        state_name: newState,
        latitude: res?.latitude,
        longitude: res?.longitude,
      };

      // Skip if nothing has changed
      const isSame =
        queryParams?.state_name === newQueryParams?.state_name &&
        queryParams?.latitude === newQueryParams?.latitude &&
        queryParams?.longitude === newQueryParams?.longitude;

      if (isSame) {
        return;
      }

      setCurrentState(newState);
      setQueryParams(newQueryParams);
    },
    [queryParams?.latitude, queryParams?.longitude, queryParams?.state_name],
  );

  useEffect(() => {
    if (filteredApplied.current) {
      return;
    }
    if (status === 'loading') {
      return;
    }
    if (status === 'success' && location) {
      handleLocation(location);
    } else {
      setQueryParams({
        limit: String(RequestLimit),
      });
    }
  }, [handleLocation, location, status]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', () => {
      filteredApplied.current = false;
      refetchLocation();
    });
    return unsubscribe;
  }, [navigation, refetchLocation]);

  useEffect(() => {
    if (filteredApplied.current) {
      return;
    }
    const unsubscribe = navigation.addListener('tabPress', () => {
      lastLocRef.current = '';
      if (status === 'success' && location) {
        handleLocation(location);
      } else if (status === 'fallback' || status === 'error') {
        setCurrentState(userInfo?.state_name || '');
        setQueryParams({
          limit: String(RequestLimit),
        });
      }
      setQuery('');
    });
    return unsubscribe;
  }, [navigation, userInfo?.state_name, status, location, handleLocation]);

  const preSelectedFilters = useMemo(() => {
    return {
      products: {
        categoryIds: safeSplit(queryParams.product_ids),
      },
      role: safeSplit(queryParams.role_id),
      product_type: queryParams.requirment_id
        ? queryParams.requirment_id.toString()
        : '',
      location: safeSplit(queryParams.state_id),
      companies: safeSplit(queryParams.categories_id),
    } as Selections;
  }, [queryParams]);

  const onSearch = useCallback((content: string) => {
    setQueryParams(old => ({
      ...old,
      search: content,
    }));
  }, []);

  const initiateChat = useCallback(
    async (postInfo: PostListDatum) => {
      onInitiateChat(postInfo, userInfo ?? {}, 'seller');
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
          type: 'seller',
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
    [controller, toggleMessage, toggleLike],
  );

  const togglePostFavorite = useCallback(
    async (post: PostListDatum) => {
      const {id, is_like = 0} = post;
      if (!id) {
        return;
      }
      const res = await toggleFavorite(
        transformObject({seller_id: id.toString()}),
      ).unwrap();
      if (res) {
        if (res.status) {
          controller?.updateOne(id, {
            is_like: is_like === 1 ? 0 : 1,
          });
        } else {
          toggleMessage(res.message);
        }
      }
    },
    [controller, toggleMessage, toggleFavorite],
  );

  const onPressShare = useCallback(() => {
    onSharePost('seller', selectedPost?.id?.toString() ?? '', '', {
      title: selectedPost?.product_name ?? '',
      description: selectedPost?.description ?? '',
      image: selectedPost?.images?.[0]?.image_url ?? '',
    });
  }, []);

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
    formData.append('type', 'seller');
    const res = await deletePost({data: formData}).unwrap();
    if (res) {
      if (res.status) {
        controller?.removeOne(id);
      } else {
        toggleMessage(res.message);
      }
    }
  }, [controller, toggleMessage, deletePost]);

  const onTapPostOptions = useCallback(
    (post: PostListDatum) => {
      selectedPost = post;
      const isMyPost = post.user_id?.toString() === loginId?.toString();
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
    [loginId],
  );

  const debouncedSearch = useMemo(() => debounce(onSearch, 500), [onSearch]);
  const onChangeText = (text: string) => {
    setQuery(text);
    debouncedSearch(text);
  };

  const onFilterSelected = (filters: Selections) => {
    filteredApplied.current = true;
    const updatedParams: RequestTypeParam = {...queryParams};
    const setOrRemoveIfPresent = (key: keyof RequestTypeParam, value: any) => {
      if (value !== undefined) {
        if (Array.isArray(value)) {
          updatedParams[key] = value.join(',');
        } else {
          updatedParams[key] = value;
        }
      }
    };
    setOrRemoveIfPresent('product_ids', filters.products?.categoryIds);
    setOrRemoveIfPresent('requirment_id', filters.product_type);
    setOrRemoveIfPresent('role_id', filters.role);
    setOrRemoveIfPresent(
      'state_id',
      filters.location ? filters.location : userInfo?.state_id,
    );
    if (filters.location) {
      setOrRemoveIfPresent('state_name', '');
    }
    setQueryParams(updatedParams);

    setTimeout(() => {
      filteredApplied.current = false;
    }, 1000);
  };

  const onLoadPostOptions = useCallback(
    (entity: PostListDatum, type: string) => {
      if (type === 'like') {
        togglePostLike(entity);
      } else if (type === 'favorite') {
        togglePostFavorite(entity);
      } else if (type === 'comment') {
        navigation.navigate('PostComments', {
          requestFrom: 'seller',
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
        initiateChat(entity);
      } else if (type === 'profile') {
        navigation.navigate('Profile', {
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
      } else if (type === 'media') {
        navigation.navigate('PostImages', {
          requestFrom: 'seller',
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
      navigation,
      onTapPostOptions,
      initiateChat,
      controller,
    ],
  );

  const _renderSellerItem = useCallback(
    ({item, index}: {item: PostListDatum; index: number}) => {
      return (
        <PostListItem
          key={index}
          item={item}
          onUpdateLike={onLoadPostOptions}
          onUpdateFavorite={onLoadPostOptions}
          onTapPostOptions={onLoadPostOptions}
          onTapPostComments={onLoadPostOptions}
          onViewProfile={onLoadPostOptions}
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

  if (status === 'loading') {
    return (
      <View style={[VS.flex_1, VS.jc_center, VS.ai_center]}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <Container>
      <TabHeader
        title={t('sellers')}
        titleWidget={
          <LocationWidget
            currentValue={currentState}
            onPress={() => {
              navigation.navigate('Location', {
                requestFrom: 'seller',
                type: 'seller',
                onGoBack: (params: BackParams) => {
                  filteredApplied.current = true;
                  if (params.latitude && params.longitude) {
                    setQueryParams(old => ({
                      ...old,
                      latitude: params.latitude,
                      longitude: params.longitude,
                      state_name: params.state_name,
                    }));
                  } else {
                    setQueryParams(old => ({
                      ...old,
                      latitude: undefined,
                      longitude: undefined,
                      state_id: params.id
                        ? params.id === 'all'
                          ? String(params.id)
                          : undefined
                        : undefined,
                      state_name:
                        params.id === 'all'
                          ? undefined
                          : params.state_name?.toLowerCase(),
                    }));
                  }
                  setCurrentState(params.state_name || '');
                  setTimeout(() => {
                    filteredApplied.current = false;
                  }, 1000);
                },
              });
            }}
          />
        }
      />
      <View style={[VS.flex_1, VS.gap_15]}>
        <HeaderComponent
          postTitle={'Tell buyers what you have'}
          withFilter
          searchInput={query}
          onSearch={onChangeText}
          onAddPost={() => {
            navigation.navigate('AddPostRequirement', {
              requestFrom: 'seller',
              onGoBack: () => {
                controller?.refresh();
              },
            });
          }}
          onFilterSelected={() => {
            filteredApplied.current = true;
            navigation.navigate('FilterScreen', {
              type: 'seller',
              preFilters: preSelectedFilters,
              onGoBack: onFilterSelected,
            });
          }}
        />
        <SmartEntityList
          controller={controller}
          renderItem={_renderSellerItem}
          emptyComponentLabel={t('noPostFound')}
          showShimmerWhileRefetching={true}
          ItemSeparatorComponent={itemSeparator}
          contentContainerStyle={[AppStyle.flexGrow, Styles.spaceBottom]}
          style={[VS.flex_1]}
        />
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
              navigation.navigate('AddPostRequirement', {
                requestFrom: 'seller',
                postData: selectedPost,
                onGoBack: () => {
                  controller?.refresh();
                },
              });
            } else if (key === 'delete') {
              deletePostById();
            } else if (key === 'share') {
              onPressShare();
            }
          }}
        />
      </CustomBottomSheet>
    </Container>
  );
}
