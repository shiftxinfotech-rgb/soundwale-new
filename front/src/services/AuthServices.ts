import {
  ContactUsResponse,
  DeleteAccountResponse,
  EditProfileResponse,
  GeneralResponse,
  GetProfileResponse,
  SendAuthCodeResponse,
  VerifyAuthCodeResponse,
} from '@data';
import {RootState} from '@features';
import {baseService} from './BaseService';
import {ApiConstants} from './Constants';
export const AuthServices = baseService
  .enhanceEndpoints({
    addTagTypes: ['Profile'],
  })
  .injectEndpoints({
    overrideExisting: true,
    endpoints: builder => ({
      sendAuthOtp: builder.mutation<SendAuthCodeResponse, FormData>({
        query: data => ({
          url: ApiConstants.SEND_AUTH_OTP,
          method: 'POST',
          body: data,
        }),
      }),
      verifyAuthOtp: builder.mutation<VerifyAuthCodeResponse, FormData>({
        query: data => ({
          url: ApiConstants.VERIFY_AUTH_OTP,
          method: 'POST',
          body: data,
        }),
      }),
      logout: builder.mutation<GeneralResponse, undefined | void>({
        query: () => ({
          url: ApiConstants.LOGOUT,
          method: 'POST',
        }),
      }),
      registerUser: builder.mutation<VerifyAuthCodeResponse, FormData>({
        query: data => ({
          url: ApiConstants.REGISTER,
          method: 'POST',
          body: data,
        }),
      }),
      getProfile: builder.query<GetProfileResponse, string | undefined>({
        queryFn: async (uId, _queryApi, _extraOptions, fetchWithBQ) => {
          try {
            const rootState = _queryApi.getState() as RootState;
            const {authSlice} = rootState || {};
            const {authData} = authSlice || {};
            const {id} = authData || {};
            const userId = uId || id;
            const response = await fetchWithBQ({
              url: `${ApiConstants.GET_PROFILE}?user_id=${userId}`,
              method: 'GET',
            });

            if (response.error) {
              return {error: response.error};
            } else {
              return {data: response.data as GetProfileResponse};
            }
          } catch (error) {
            return {
              error: {status: 'CUSTOM_ERROR', error: (error as Error).message},
            };
          }
        },
        providesTags: ['Profile'],
      }),
      editPersonalProfile: builder.mutation<EditProfileResponse, FormData>({
        query: data => ({
          url: ApiConstants.EDIT_PERSONAL_PROFILE,
          method: 'POST',
          body: data,
        }),
      }),
      updateJsonFields: builder.mutation<GeneralResponse, FormData>({
        query: data => ({
          url: ApiConstants.UPDATE_JSON_FIELDS,
          method: 'POST',
          body: data,
        }),
        invalidatesTags: ['Profile'],
      }),
      contactUs: builder.mutation<ContactUsResponse, FormData>({
        query: formData => ({
          url: ApiConstants.CONTACT_US,
          method: 'POST',
          body: formData,
        }),
      }),
      deleteAccount: builder.mutation<DeleteAccountResponse, FormData>({
        query: (formData: FormData) => ({
          url: ApiConstants.DELETE_ACCOUNT,
          method: 'POST',
          body: formData,
        }),
      }),
    }),
  });

export const {
  useRegisterUserMutation,
  useVerifyAuthOtpMutation,
  useLogoutMutation,
  useSendAuthOtpMutation,
  useLazyGetProfileQuery,
  useEditPersonalProfileMutation,
  useContactUsMutation,
  useDeleteAccountMutation,
  useUpdateJsonFieldsMutation,
} = AuthServices;
