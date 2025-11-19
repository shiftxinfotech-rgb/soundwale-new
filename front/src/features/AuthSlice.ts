import {
  AuthData,
  EditProfileResponse,
  GetProfileResponse,
  RoleBean,
  VerifyAuthCodeResponse,
} from '@data';
import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AuthServices, UtilityServices} from '@services';
import {RootState} from './AppStore';

type authStateParams = {
  isLoggedIn: boolean;
  token: string;
  authData: AuthData;
  userRoles: RoleBean[];
  loginId: number;
};

const authState: authStateParams = {
  isLoggedIn: false,
  token: '',
  authData: {},
  userRoles: [],
  loginId: 0,
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState: authState,
  reducers: {
    logoutCurrentUser: state => {
      return {
        ...authState,
        userRoles: state.userRoles,
      };
    },
    updateUserInfoKey: (
      state,
      action: PayloadAction<{key: string; value: any}>,
    ) => {
      if (state.authData && typeof state.authData === 'object') {
        (state.authData as any)[action.payload.key] = action.payload.value;
      }
    },
  },
  extraReducers(builder) {
    builder.addMatcher(
      UtilityServices.endpoints.getRoles.matchFulfilled,
      (state, {payload}: PayloadAction<RoleBean[]>) => {
        state.userRoles = payload ?? [];
      },
    );
    builder.addMatcher(
      AuthServices.endpoints.verifyAuthOtp.matchFulfilled,
      (state, {payload}: PayloadAction<VerifyAuthCodeResponse>) => {
        if (payload.status) {
          const {token, user} = payload || {};
          state.token = token ?? '';
          state.authData = user ?? {};
          state.loginId = user?.id ?? 0;
          if (user !== null && user !== undefined) {
            state.isLoggedIn = true;
          }
        }
      },
    );
    builder.addMatcher(
      AuthServices.endpoints.registerUser.matchFulfilled,
      (state, {payload}: PayloadAction<VerifyAuthCodeResponse>) => {
        if (payload.status) {
          const {token, user} = payload || {};
          state.token = token ?? '';
          state.authData = user ?? {};
          state.loginId = user?.id ?? 0;
          state.isLoggedIn = true;
        }
      },
    );
    builder.addMatcher(
      AuthServices.endpoints.editPersonalProfile.matchFulfilled,
      (state, {payload}: PayloadAction<EditProfileResponse>) => {
        if (payload.status) {
          const {user} = payload || {};
          state.authData = user ?? {};
        }
      },
    );
    builder.addMatcher(
      AuthServices.endpoints.getProfile.matchFulfilled,
      (state, {payload}: PayloadAction<GetProfileResponse>) => {
        if (payload) {
          const {user, status} = payload || {};
          if (status) {
            const {id} = user || {};
            if (Number(id) === Number(state.loginId)) {
              console.log('userFetched', JSON.stringify(user, null, 1));
              //store only for logged in user
              state.authData = user ?? {};
            }
          }
        }
      },
    );
  },
});

const selectSelf = (state: RootState) => state.authSlice;

export const getIsLogin = createSelector(
  selectSelf,
  entity => entity.isLoggedIn,
);

export const getUserInfo = createSelector(selectSelf, entity =>
  entity.isLoggedIn ? (entity.authData as AuthData) : undefined,
);

export const getUserRoles = createSelector(
  selectSelf,
  entity => entity.userRoles as RoleBean[],
);

export const {logoutCurrentUser, updateUserInfoKey} = authSlice.actions;
export default authSlice.reducer;
