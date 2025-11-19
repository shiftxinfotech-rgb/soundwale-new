import {GeneralResponse, CompanyPdfResponse} from '@data';
import {baseService} from './BaseService';
import {ApiConstants} from './Constants';
export const CompanyPdfServices = baseService.injectEndpoints({
  overrideExisting: true,
  endpoints: builder => ({
    addCompanyPdf: builder.mutation<GeneralResponse, FormData>({
      query: data => ({
        url: ApiConstants.ADD_COMPANY_PDF,
        method: 'POST',
        body: data,
      }),
    }),
    deleteCompanyPdf: builder.mutation<GeneralResponse, FormData>({
      query: data => ({
        url: ApiConstants.DELETE_COMPANY_PDF,
        method: 'POST',
        body: data,
      }),
    }),

    getCompanyPdf: builder.query<CompanyPdfResponse, undefined>({
      query: () => ({
        url: ApiConstants.GET_COMPANY_PDF,
        method: 'GET',
      }),
      extraOptions: {timeout: 1000}, // 5 seconds timeout
    }),
  }),
});

export const {
  useGetCompanyPdfQuery,
  useAddCompanyPdfMutation,
  useDeleteCompanyPdfMutation,
} = CompanyPdfServices;
