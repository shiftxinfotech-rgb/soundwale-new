import {
  AddPostCommentResponse,
  CommentListing,
  GeneralResponse,
  PostListResponse,
} from '@data';
import {baseService} from './BaseService';
import {ApiConstants} from './Constants';

export const PostServices = baseService
  .enhanceEndpoints({addTagTypes: ['Dashboard']})
  .injectEndpoints({
    overrideExisting: true,
    endpoints: builder => ({
      getDashboard: builder.query<PostListResponse, string | undefined>({
        query: data => ({
          url: `${ApiConstants.HOME_GET}?${data}`,
          method: 'GET',
        }),
      }),
      getPosts: builder.query<
        PostListResponse,
        {data: string | undefined; type: 'buyer' | 'seller'}
      >({
        query: ({data, type}) => ({
          url:
            type === 'buyer'
              ? `${ApiConstants.GET_BUYER_POSTS}?${data}`
              : `${ApiConstants.GET_SELLER_POSTS}?${data}`,
          method: 'GET',
        }),
      }),
      addDashboardPost: builder.mutation<GeneralResponse, FormData | undefined>(
        {
          query: data => ({
            url: ApiConstants.ADD_HOME_POST,
            method: 'POST',
            body: data,
          }),
        },
      ),
      addRequirementPost: builder.mutation<
        GeneralResponse,
        {data: FormData; type: 'buyer' | 'seller'}
      >({
        query: ({data, type}) => ({
          url:
            type === 'buyer'
              ? ApiConstants.ADD_BUYER_POST
              : ApiConstants.ADD_SELLER_POST,
          method: 'POST',
          body: data,
        }),
      }),
      getUserProfilePosts: builder.query<
        PostListResponse,
        {data: string | undefined}
      >({
        query: ({data}) => ({
          url: `${ApiConstants.GET_USER_PROFILE_POST}?${data}`,
          method: 'GET',
        }),
      }),
      deletePostImage: builder.mutation<GeneralResponse, {data: FormData}>({
        query: ({data}) => ({
          url: `${ApiConstants.DELETE_POST_IMAGE}`,
          method: 'POST',
          body: data,
        }),
      }),
      deleteRequirementPost: builder.mutation<
        GeneralResponse,
        {data: FormData}
      >({
        query: ({data}) => ({
          url: `${ApiConstants.DELETE_POST}`,
          method: 'POST',
          body: data,
        }),
      }),
      getPostComments: builder.query<CommentListing, string | undefined>({
        query: data => ({
          url: `${ApiConstants.GET_POST_COMMENTS}?${data}`,
          method: 'GET',
        }),
      }),
      addPostComment: builder.mutation<
        AddPostCommentResponse,
        {data: FormData}
      >({
        query: ({data}) => ({
          url: `${ApiConstants.ADD_POST_COMMENT}`,
          method: 'POST',
          body: data,
        }),
      }),
      deletePostComment: builder.mutation<GeneralResponse, {data: FormData}>({
        query: ({data}) => ({
          url: `${ApiConstants.DELETE_POST_COMMENT}`,
          method: 'POST',
          body: data,
        }),
      }),
      togglePostCommentLike: builder.mutation<
        GeneralResponse,
        FormData | undefined
      >({
        query: data => ({
          url: ApiConstants.TOGGLE_POST_COMMENT_LIKE,
          method: 'POST',
          body: data,
        }),
      }),
      togglePostLike: builder.mutation<GeneralResponse, FormData | undefined>({
        query: data => ({
          url: ApiConstants.TOGGLE_POST_LIKE,
          method: 'POST',
          body: data,
        }),
      }),
    }),
  });
export const {
  useLazyGetDashboardQuery,
  useLazyGetPostsQuery,
  useAddDashboardPostMutation,
  useAddRequirementPostMutation,
  useLazyGetUserProfilePostsQuery,
  useDeletePostImageMutation,
  useDeleteRequirementPostMutation,
  useLazyGetPostCommentsQuery,
  useAddPostCommentMutation,
  useDeletePostCommentMutation,
  useTogglePostCommentLikeMutation,
  useTogglePostLikeMutation,
} = PostServices;
