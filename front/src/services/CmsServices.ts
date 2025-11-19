import {CmsResponse, TopAskedArray, TopAskedResponse} from '@data';
import {baseService} from './BaseService';
import {ApiConstants} from './Constants';

export const CmsServices = baseService
  .enhanceEndpoints({
    addTagTypes: ['cms'],
  })
  .injectEndpoints({
    overrideExisting: true,
    endpoints: builder => ({
      getTerms: builder.query<CmsResponse, undefined | void>({
        query: () => ApiConstants.GET_TERMS,
      }),
      getPrivacy: builder.query<CmsResponse, undefined | void>({
        query: () => ApiConstants.GET_PRIVACY,
      }),
      topAsked: builder.query<TopAskedArray[], undefined | void>({
        query: () => ApiConstants.GET_FAQ,
        transformResponse: (response: TopAskedResponse, _, __) => {
          if (response !== undefined && response !== null) {
            const {status, data} = response || {};
            if (status) {
              return data ?? [];
            }
          }
          return [];
        },
      }),
    }),
  });
export const {useGetTermsQuery, useGetPrivacyQuery, useTopAskedQuery} =
  CmsServices;
