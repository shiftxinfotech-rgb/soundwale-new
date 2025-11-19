import {createSelector, createSlice} from '@reduxjs/toolkit';
import {RootState} from './AppStore';
import {NotificationServices} from '@services';
import {NotificationFCMBean} from '@data';
type notificationStateParams = {
  isPushed: boolean;
  pushToken: string;
  count: number;
  pushObject: NotificationFCMBean;
};

const notificationState: notificationStateParams = {
  isPushed: false,
  pushToken: '',
  count: 0,
  pushObject: {} as NotificationFCMBean,
};

const notificationSlice = createSlice({
  name: 'notificationSlice',
  initialState: notificationState,
  reducers: {
    setPushToken: (state, {payload}) => {
      state.pushToken = payload;
      state.isPushed = false;
    },
    setIsTokenPushed: (state, {payload}) => {
      state.isPushed = payload;
    },
    setPushCount: (state, {payload}) => {
      state.count = payload;
    },
    setPushObject: (state, {payload}) => {
      state.pushObject = payload;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      NotificationServices.endpoints.updatePushToken.matchFulfilled,
      (state, {payload}) => {
        if (payload !== undefined && payload !== null) {
          console.log('payload', JSON.stringify(payload, null, 4));
          if (payload.status) {
            state.isPushed = true;
          }
        }
      },
    );
    builder.addMatcher(
      NotificationServices.endpoints.getUnReadCount.matchFulfilled,
      (state, {payload}) => {
        if (payload !== undefined && payload !== null) {
          console.log('payload', JSON.stringify(payload, null, 4));
          if (payload.status) {
            state.count = payload.data.unread_count;
          }
        }
      },
    );
  },
});

const selectSelf = (state: RootState) => state.notificationSlice;
export const tokenPushed = createSelector(
  selectSelf,
  appState => appState.isPushed,
);
export const tokenData = createSelector(selectSelf, state => {
  return {
    isPushed: state.isPushed,
    token: state.pushToken,
  };
});
export const unReadCount = createSelector(selectSelf, state => {
  return {
    count: state.count,
  };
});
export const pushContent = createSelector(selectSelf, state => {
  return state.pushObject;
});

export const {setPushToken, setPushCount, setIsTokenPushed, setPushObject} =
  notificationSlice.actions;

export default notificationSlice.reducer;
