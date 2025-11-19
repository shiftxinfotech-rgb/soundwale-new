import {Icons} from '@assets';
import {
  CommonHeader,
  Container,
  CustomLoader,
  InputBox,
  SmartEntityList,
  Text,
} from '@components';
import {CommentDatum, NavigationParamStack} from '@data';
import {LazyFetcher, usePaginatedEntityList, useToggleSnackBar} from '@hooks';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  useAddPostCommentMutation,
  useDeletePostCommentMutation,
  useLazyGetPostCommentsQuery,
  useTogglePostCommentLikeMutation,
} from '@services';
import {AppStyle, Colors, CommonStyle, TS, VS} from '@theme';
import {transformObject, transformQueryParam, validField} from '@util';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Keyboard, TouchableOpacity, View} from 'react-native';
import {KeyboardAvoidingView} from 'react-native-keyboard-controller';
import CommentItem from './components/CommentItem';

let selectedComment: CommentDatum | null = null;
export default function PostComments() {
  const {t} = useTranslation(['generic']);
  const {toggleMessage} = useToggleSnackBar();

  const parentId = useRef<null | number | undefined>(undefined);

  const {
    postId,
    requestFrom,
    onGoBack,
    isImagePost,
    controller: listController,
  } = useRoute<RouteProp<NavigationParamStack, 'PostComments'>>().params || {};

  const [trigger] = useLazyGetPostCommentsQuery();
  const [addPostComment, {isLoading: adding}] = useAddPostCommentMutation();
  const [deletePostComment, {isLoading: deleting}] =
    useDeletePostCommentMutation();
  const [togglePostCommentLike, {isLoading: toggling}] =
    useTogglePostCommentLikeMutation();

  const {addListener} = useNavigation<NavigationProp<NavigationParamStack>>();

  const fetchFavoritePosts: LazyFetcher<CommentDatum> = async param => {
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

  const controller = usePaginatedEntityList<CommentDatum & {id: number}>(
    fetchFavoritePosts as LazyFetcher<CommentDatum & {id: number}>,
    {
      extraParams: {
        type: requestFrom,
        type_id: postId ?? '',
        is_image: isImagePost ? '1' : '0',
      },
      debounceDelay: 300,
      refreshOnFocus: false,
      sortComparer: (a, b) => {
        const aTime = (a as any).created_at
          ? new Date((a as any).created_at).getTime()
          : Number(a.id);
        const bTime = (b as any).created_at
          ? new Date((b as any).created_at).getTime()
          : Number(b.id);
        return bTime - aTime;
      },
    },
  );

  const [comment, setComment] = useState('');
  const [replyComment, setReplyComment] = useState<CommentDatum | null>(null);

  useEffect(() => {
    const unsubscribe = addListener('beforeRemove', () => {
      if (isImagePost) {
        onGoBack?.();
      }
    });
    return unsubscribe;
  }, [addListener, isImagePost, onGoBack]);

  const toggleLike = useCallback(
    async (post: CommentDatum) => {
      try {
        const {id, is_like = 0, like_count = 0} = post;
        if (!id) {
          return;
        }
        const res = await togglePostCommentLike(
          transformObject({
            type_id: id.toString(),
            type: requestFrom ?? '',
            is_image: isImagePost ? '1' : '0',
          }),
        ).unwrap();
        if (res) {
          if (res.status) {
            if (String(parentId.current) === String(id)) {
              controller?.updateOne(id, {
                is_like: is_like === 1 ? 0 : 1,
                like_count: is_like === 0 ? like_count + 1 : like_count - 1,
              });
            } else {
              controller?.updateNestedOne(
                id,
                {
                  is_like: is_like === 1 ? 0 : 1,
                  like_count: is_like === 0 ? like_count + 1 : like_count - 1,
                },
                'replies',
              );
            }
          } else {
            toggleMessage(res.message);
          }
        }
      } catch (error) {
        toggleMessage(t('somethingWrong'));
      } finally {
        parentId.current = undefined;
      }
    },
    [
      controller,
      toggleMessage,
      togglePostCommentLike,
      requestFrom,
      isImagePost,
      t,
    ],
  );

  const deleteComment = useCallback(
    async (id: number) => {
      try {
        const formData = new FormData();
        formData.append('type_id', id.toString());
        formData.append('type', requestFrom ?? '');
        formData.append('is_image', isImagePost ? '1' : '0');
        const result = await deletePostComment({data: formData}).unwrap();
        const {status, message} = result;
        if (status) {
          if (String(parentId.current) === String(id)) {
            controller.removeOne(id);
          } else {
            controller.removeNestedOne(id, 'replies');
          }
          if (!isImagePost) {
            const item = listController?.getOne(postId ?? 0);
            const pastCount = item?.total_comments ?? 0;
            listController?.updateOne(postId ?? 0, {
              total_comments: pastCount - 1,
            });
          }
        } else {
          toggleMessage(message);
        }
      } catch (error) {
        toggleMessage(t('somethingWrong'));
      } finally {
        parentId.current = undefined;
      }
    },
    [
      requestFrom,
      isImagePost,
      deletePostComment,
      listController,
      postId,
      controller,
      toggleMessage,
      t,
    ],
  );

  const onPress = useCallback(
    async (key: string, item: CommentDatum, pId: number | null | undefined) => {
      if (!item.id) {
        return;
      }
      const {id} = item;
      if (!id) {
        return;
      }
      parentId.current = pId;
      if (key === 'edit') {
        selectedComment = item;
        setComment(item.message ?? '');
      } else if (key === 'reply') {
        setReplyComment(item);
      } else if (key === 'delete') {
        await deleteComment(id);
      } else if (key === 'like') {
        await toggleLike(item);
      }
    },
    [deleteComment, toggleLike],
  );

  const handleSendComment = useCallback(async () => {
    try {
      const formData = new FormData();

      if (String(parentId.current) !== String(selectedComment?.id)) {
        formData.append('parent_id', parentId.current?.toString() ?? '');
      }
      formData.append('type', requestFrom ?? '');
      formData.append('type_id', postId?.toString() ?? '');
      formData.append('message', comment);
      if (selectedComment) {
        formData.append('id', selectedComment.id?.toString() ?? '');
      }
      formData.append('is_image', isImagePost ? '1' : '0');
      const result = await addPostComment({data: formData}).unwrap();
      const {status, message, data} = result;
      let processed = false;
      if (status) {
        if (selectedComment) {
          if (parentId.current) {
            processed = true;
            controller.updateOne(parentId.current, data?.[0] ?? {});
          }
        } else {
          processed = true;
          const ci = data?.[0] ?? {};
          if (parentId.current) {
            controller.updateOne(parentId.current, ci);
          } else {
            controller.addOne(ci as CommentDatum & {id: number});
            if (!isImagePost) {
              const item = listController?.getOne(postId ?? 0);
              const pastCount = item?.total_comments ?? 0;
              listController?.updateOne(postId ?? 0, {
                total_comments: pastCount + 1,
              });
            }
          }
        }
        if (!processed) {
          controller.refresh();
        }
        setComment('');
        setReplyComment(null);
      } else {
        toggleMessage(message);
      }
    } catch (error) {
      toggleMessage(t('somethingWrong'));
    } finally {
      selectedComment = null;
      parentId.current = undefined;
      Keyboard.dismiss();
    }
  }, [
    requestFrom,
    postId,
    comment,
    isImagePost,
    addPostComment,
    controller,
    listController,
    toggleMessage,
    t,
  ]);

  const _renderItem = useCallback(
    ({item, index}: {item: CommentDatum; index: number}) => {
      return (
        <CommentItem
          key={index}
          comment={item}
          onPress={(
            key: string,
            el: CommentDatum,
            pId: number | null | undefined,
          ) => onPress(key, el, pId)}
        />
      );
    },
    [onPress],
  );

  return (
    <Container>
      <CommonHeader
        withBackArrow
        title="Comments"
        withChatNotification={false}
      />
      <KeyboardAvoidingView behavior="padding" style={[VS.flex_1]}>
        <SmartEntityList
          controller={controller}
          renderItem={_renderItem}
          showShimmerWhileRefetching={true}
          emptyComponentLabel={t('noDataFound')}
          contentContainerStyle={[AppStyle.flexGrow]}
          style={[VS.flex_1, VS.mt_20]}
        />
        <InputBox
          placeholder={t('enterComment')}
          value={comment}
          onChangeText={setComment}
          parentStyle={[
            VS.mh_15,
            CommonStyle.borderLightGray,
            VS.br_10,
            VS.bw_1,
          ]}
          inputStyle={[CommonStyle.textBlack, VS.bw_0]}
          renderRightIcon={
            <TouchableOpacity onPress={handleSendComment}>
              <Icons.Send
                color={validField(comment) ? Colors.primary : Colors.dimGray}
              />
            </TouchableOpacity>
          }
          headerComponent={
            <>
              {replyComment ? (
                <View
                  style={[
                    VS.ph_10,
                    VS.pv_10,
                    VS.bwb_1,
                    CommonStyle.borderLightGray,
                    VS.fd_row,
                    VS.ai_start,
                  ]}>
                  <View style={[VS.flex_1, VS.gap_2]}>
                    <Text style={[TS.fs_11, CommonStyle.textBlueGray]}>
                      Reply On:
                    </Text>
                    <Text style={[TS.fs_12, CommonStyle.textBlack]}>
                      {replyComment.message}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      selectedComment = null;
                      setComment('');
                      setReplyComment(null);
                      parentId.current = undefined;
                    }}>
                    <Icons.Close color={Colors.dimGray} />
                  </TouchableOpacity>
                </View>
              ) : null}
            </>
          }
        />
      </KeyboardAvoidingView>

      {(deleting || adding || toggling) && <CustomLoader />}
    </Container>
  );
}
