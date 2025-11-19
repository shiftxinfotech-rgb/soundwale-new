import {FavPaginationResponseBean, GeneralResponse} from '@data';
import {baseService} from './BaseService';
import {ApiConstants} from './Constants';

export const WishlistServices = baseService
  .enhanceEndpoints({
    addTagTypes: ['WishListRequirements'],
  })
  .injectEndpoints({
    overrideExisting: true,
    endpoints: builder => ({
      getBuyerLikePost: builder.mutation<GeneralResponse, FormData | undefined>(
        {
          query: data => ({
            url: ApiConstants.GET_BUYER_LIKE_POST,
            method: 'POST',
            body: data,
          }),
        },
      ),
      getSellerLikePost: builder.mutation<
        GeneralResponse,
        FormData | undefined
      >({
        query: data => ({
          url: ApiConstants.GET_SELLER_LIKE_POST,
          method: 'POST',
          body: data,
        }),
      }),
      getHomeLikePost: builder.mutation<GeneralResponse, FormData | undefined>({
        query: data => ({
          url: ApiConstants.GET_HOME_LIKE_POST,
          method: 'POST',
          body: data,
        }),
      }),
      getFavPosts: builder.query<FavPaginationResponseBean, string | undefined>(
        {
          query: data => ({
            url: `${ApiConstants.GET_FAV_POSTS}?${data}`,
            method: 'GET',
          }),
          keepUnusedDataFor: 0,
        },
      ),
    }),
  });
export const {
  useGetBuyerLikePostMutation,
  useGetSellerLikePostMutation,
  useGetHomeLikePostMutation,
  useLazyGetFavPostsQuery,
} = WishlistServices;
