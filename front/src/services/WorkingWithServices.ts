import {
  GeneralResponse,
  WorkingWithResponse,
  WorkingWithSearchData,
  WorkingWithSearchResponse,
} from '@data';
import {baseService} from './BaseService';
import {ApiConstants} from './Constants';
export const WorkingWithServices = baseService
  .enhanceEndpoints({})
  .injectEndpoints({
    overrideExisting: true,
    endpoints: builder => ({
      getWorkingWith: builder.query<WorkingWithResponse, string | undefined>({
        query: data => ({
          url: `${ApiConstants.GET_WORKING_WITH}?type=${data}`,
          method: 'GET',
        }),
      }),
      searchUsers: builder.query<WorkingWithSearchData[], string | undefined>({
        query: data => ({
          url: `${ApiConstants.SEARCH_USERS}?search=${data}`,
          method: 'GET',
        }),
        transformResponse: (
          response: WorkingWithSearchResponse,
        ): WorkingWithSearchData[] => {
          if (response !== undefined && response !== null) {
            const {status, data} = response || {};
            if (status) {
              return data ?? [];
            }
          }
          return [];
        },
      }),
      addWorkingWithMember: builder.mutation<GeneralResponse, FormData>({
        query: data => ({
          url: `${ApiConstants.ADD_WORKING_WITH_MEMBER}`,
          method: 'POST',
          body: data,
        }),
      }),
      updateWorkingWithRequest: builder.mutation<GeneralResponse, FormData>({
        query: data => ({
          url: `${ApiConstants.UPDATE_WORKING_WITH_REQUEST}`,
          method: 'POST',
          body: data,
        }),
      }),
    }),
  });

export const {
  useLazyGetWorkingWithQuery,
  useLazySearchUsersQuery,
  useAddWorkingWithMemberMutation,
  useUpdateWorkingWithRequestMutation,
} = WorkingWithServices;
