import {
  GeneralResponse,
  NotificationDeleteRequest,
  NotificationResponse,
  NotificationUnReadResponse,
} from '@data';
import {baseService} from './BaseService';
import {ApiConstants} from './Constants';

export const NotificationServices = baseService
  .enhanceEndpoints({
    addTagTypes: ['NotificationListing'],
  })
  .injectEndpoints({
    overrideExisting: true,
    endpoints: builder => ({
      updatePushToken: builder.mutation<GeneralResponse, FormData>({
        query: (fromData: FormData) => ({
          url: ApiConstants.UPDATE_PUSH_TOKEN,
          method: 'POST',
          body: fromData,
        }),
      }),
      getNotifications: builder.query<NotificationResponse, undefined | void>({
        query: () => ({
          url: `${ApiConstants.GET_NOTIFICATION}`,
          method: 'GET',
        }),

        transformResponse: (response: NotificationResponse, _, __) => {
          if (response !== undefined && response !== null) {
            const {status} = response || {};
            if (status) {
              return response;
            }
          }
          return response;
        },
        providesTags: ['NotificationListing'],
        keepUnusedDataFor: 0,
      }),
      markAllNotificationAsRead: builder.query<GeneralResponse, undefined>({
        query: () => ({
          url: `${ApiConstants.MARK_ALL_READ}`,
          method: 'GET',
        }),

        transformResponse: (response: GeneralResponse, _, __) => {
          if (response !== undefined && response !== null) {
            const {status} = response || {};
            if (status) {
              return response;
            }
          }
          return response;
        },
        providesTags: ['NotificationListing'],
        keepUnusedDataFor: 0,
      }),
      markIndividualRead: builder.mutation<GeneralResponse, {id: string}>({
        query: data => ({
          url: `${ApiConstants.MARK_INDIVIDUAL_READ}`,
          method: 'POST',
          body: data,
        }),

        transformResponse: (response: GeneralResponse, _, __) => {
          if (response !== undefined && response !== null) {
            const {status} = response || {};
            if (status) {
              return response;
            }
          }
          return response;
        },
      }),

      getUnReadCount: builder.query<NotificationUnReadResponse, undefined>({
        query: () => ({
          url: ApiConstants.UNREAD_COUNT,
          method: 'GET',
        }),
      }),

      deleteNotification: builder.mutation<
        GeneralResponse,
        NotificationDeleteRequest
      >({
        query: (formData: NotificationDeleteRequest) => ({
          url: ApiConstants.DELETE_NOTIFICATION,
          method: 'POST',
          body: formData,
        }),
        invalidatesTags: (__, error) => (error ? [] : ['NotificationListing']),
      }),
      sendChatNotification: builder.query<GeneralResponse, FormData>({
        query: formData => ({
          url: ApiConstants.SEND_CHAT_NOTIFICATIONS,
          method: 'POST',
          body: formData,
        }),
      }),
    }),
  });
export const {
  useLazyGetNotificationsQuery,
  useDeleteNotificationMutation,
  useLazyMarkAllNotificationAsReadQuery,
  useUpdatePushTokenMutation,
  useGetUnReadCountQuery,
  useLazyGetUnReadCountQuery,
  useMarkIndividualReadMutation,
  useLazySendChatNotificationQuery,
} = NotificationServices;
