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
  HomeProps,
  PostListDatum,
  RequestTypeParam,
  Selections,
} from '@data';
import {tokenData} from '@features';
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
  useGetHomeLikePostMutation,
  useGetUnReadCountQuery,
  useLazyGetDashboardQuery,
  useTogglePostLikeMutation,
  useUpdatePushTokenMutation,
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
import {shallowEqual, useSelector} from 'react-redux';
import HeaderComponent from '../components/HeaderComponent';
import LocationWidget from '../components/LocationWidget';
import TabHeader from '../components/TabHeader';
import {Styles} from './Styles';

let selectedPost: PostListDatum | undefined;
export default function Home({navigation}: HomeProps) {
  const {t} = useTranslation(['tabNavigator']);
  const userInfo = useUserInfo();
  const loginId = useUserId();

  const tokenInfo = useSelector(tokenData, shallowEqual);
  const [updateToken] = useUpdatePushTokenMutation();
  const {toggleMessage} = useToggleSnackBar();
  const postOptionsSheetRef = useRef<CustomBottomSheetMethods>(null);
  const lastLocRef = useRef<string>('');
  const {
    location,
    status,
    refetch: refetchLocation,
  } = useSmartLocationContext();
  const filteredApplied = useRef(false);

  useGetUnReadCountQuery(undefined, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  const [toggleFavorite] = useGetHomeLikePostMutation();
  const [deletePost] = useDeleteRequirementPostMutation();
  const [toggleLike] = useTogglePostLikeMutation();
  const [trigger] = useLazyGetDashboardQuery();

  const [query, setQuery] = useState('');
  const [queryParams, setQueryParams] = useState<RequestTypeParam>({
    limit: String(RequestLimit),
    latitude: location?.latitude ?? '',
    longitude: location?.longitude ?? '',
    state_name: location?.state ?? '',
  });
  const [currentState, setCurrentState] = useState(location?.state ?? '');
  const [postOptions, setPostOptions] = useState<MenuProp[]>([]);

  const fetchPosts: LazyFetcher<PostListDatum> = async param => {
    const formData = transformQueryParam(param);
    const result = await trigger(formData, false);
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
    [queryParams.latitude, queryParams.longitude, queryParams.state_name],
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
    if (tokenInfo !== undefined && tokenInfo !== null) {
      const {token, isPushed} = tokenInfo || {};
      if (!isPushed && token !== undefined && token !== null && token !== '') {
        const formData = new FormData();
        formData.append('fcm_token', token);
        updateToken(formData);
      }
    }
  }, [tokenInfo, updateToken]);

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
      role: safeSplit(queryParams.role_id),
      location: safeSplit(queryParams.state_id),
    } as Selections;
  }, [queryParams]);

  const initiateChat = useCallback(
    async (postInfo: PostListDatum) => {
      onInitiateChat(postInfo, userInfo ?? {}, 'home');
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
          type: 'home',
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
        transformObject({
          home_id: id.toString(),
        }),
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
    formData.append('type', 'home');
    const res = await deletePost({
      data: formData,
    }).unwrap();
    if (res) {
      if (res.status) {
        controller?.removeOne(id);
      } else {
        toggleMessage(res.message);
      }
    }
  }, [controller, toggleMessage, deletePost]);

  const onPressShare = useCallback(() => {
    onSharePost('home', selectedPost?.id?.toString() ?? '', '', {
      title: selectedPost?.product_name ?? '',
      description: selectedPost?.description ?? '',
      image: selectedPost?.images?.[0]?.thumbnails_image_url ?? '',
    });
  }, []);

  const onSearch = useCallback((content: string) => {
    setQueryParams(old => ({
      ...old,
      search: content,
    }));
  }, []);

  const debouncedSearch = useMemo(() => debounce(onSearch, 500), [onSearch]);

  const onChangeText = (text: string) => {
    setQuery(text);
    debouncedSearch(text);
  };

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
          requestFrom: 'home',
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
          requestFrom: 'home',
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
          onViewProfile={onLoadPostOptions}
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
        title={t('home')}
        titleWidget={
          <LocationWidget
            currentValue={currentState}
            onPress={() => {
              navigation.navigate('Location', {
                requestFrom: 'home',
                type: 'home',
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
          withFilter
          searchInput={query}
          onSearch={onChangeText}
          onAddPost={() => {
            navigation.navigate('AddPostRequirement', {
              requestFrom: 'home',
              onGoBack: () => {
                controller?.refresh();
              },
            });
          }}
          onFilterSelected={() => {
            filteredApplied.current = true;
            navigation.navigate('FilterScreen', {
              type: 'home',
              preFilters: preSelectedFilters,
              onGoBack: onFilterSelected,
            });
          }}
        />
        <SmartEntityList
          controller={controller}
          renderItem={_renderItem}
          showShimmerWhileRefetching={true}
          emptyComponentLabel={t('noPostFound')}
          contentContainerStyle={[AppStyle.flexGrow, Styles.spaceBottom]}
          style={[VS.flex_1]}
          ItemSeparatorComponent={itemSeparator}
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
                requestFrom: 'home',
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
