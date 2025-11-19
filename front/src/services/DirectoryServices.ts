import {
  CategoryBean,
  CategoryResponse,
  DirectoryDetail,
  DirectoryDetailResponse,
  DirectoryPaginationResponse,
  GeneralResponse,
} from '@data';
import {baseService} from './BaseService';
import {ApiConstants} from './Constants';

export const DirectoryServices = baseService
  .enhanceEndpoints({
    addTagTypes: ['Directory'],
  })
  .injectEndpoints({
    overrideExisting: true,
    endpoints: builder => ({
      addDirectoryReview: builder.mutation<GeneralResponse, FormData>({
        query: data => ({
          url: ApiConstants.ADD_REVIEW,
          method: 'POST',
          body: data,
        }),
      }),
      getDirectory: builder.query<
        DirectoryPaginationResponse,
        string | undefined
      >({
        query: data => ({
          url: `${ApiConstants.GET_DIRECTORY}?${data}`,
          method: 'GET',
        }),
        providesTags: ['Directory'],
      }),

      getCategory: builder.query<CategoryBean[], string>({
        query: (user_id: string) =>
          `${ApiConstants.CATEGORY}?user_id=${user_id}`,
        transformResponse: (res: CategoryResponse): CategoryBean[] => {
          if (res) {
            const {data, status} = res || {};
            if (status) {
              return data ?? [];
            }
          }
          return [];
        },
      }),
      getDirectoryDetail: builder.query<
        DirectoryDetail | null,
        string | undefined
      >({
        query: data => ({
          url: `${ApiConstants.GET_DIRECTORY_DETAIL}?id=${data}`,
          method: 'GET',
        }),
        transformResponse: (
          res: DirectoryDetailResponse,
        ): DirectoryDetail | null => {
          if (res) {
            const {data, status} = res;
            if (status) {
              return data;
            }
          }
          return null;
        },
        providesTags: ['Directory'],
      }),
    }),
  });
export const {
  useLazyGetDirectoryQuery,
  useGetDirectoryDetailQuery,
  useAddDirectoryReviewMutation,
  useGetCategoryQuery,
} = DirectoryServices;
