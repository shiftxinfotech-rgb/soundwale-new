import {
  logoutCurrentUser,
  RootState,
  setIsTokenPushed,
  setPushCount,
} from '@features';
import {
  BaseQueryApi,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import {navigateAndResetComplete} from '@util';
import {ApiConstants} from './Constants';

const baseQuery = fetchBaseQuery({
  baseUrl: ApiConstants.BASE_URL,
  prepareHeaders: (headers, {getState}) => {
    const state = getState() as RootState;
    const {authSlice} = state || {};
    const {isLoggedIn, token} = authSlice || {};
    if (isLoggedIn) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    headers.set('Accept', 'application/json');
    return headers;
  },
});

const customBaseQuery = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {},
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.meta?.response?.status === 401) {
    const {dispatch, abort, getState} = api;
    const state = getState() as RootState;
    const {authSlice} = state || {};
    const {isLoggedIn} = authSlice || {};
    if (isLoggedIn) {
      abort(undefined);
      dispatch(setPushCount(''));
      dispatch(setIsTokenPushed(false));
      dispatch(logoutCurrentUser());
      navigateAndResetComplete('Login');
    }
  }

  if (process.env.NODE_ENV === 'development') {
    console.log('API-Result', JSON.stringify(result, null, 1));
  }
  return result;
};

export const baseService = createApi({
  reducerPath: 'baseService',
  baseQuery: customBaseQuery,
  tagTypes: [
    'BuyerRequirements',
    'SellerRequirements',
    'WishListRequirements',
    'Dashboard',
  ],
  endpoints: () => ({}),
});
