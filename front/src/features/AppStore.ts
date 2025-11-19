import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {baseService} from '@services';
import {reduxStorage} from '@util';
import {persistReducer, persistStore} from 'redux-persist';
import {default as AuthSlice} from './AuthSlice';
import {default as NotificationSlice} from './NotificationSlice';

const rootReducer = combineReducers({
  [baseService.reducerPath]: baseService.reducer,
  authSlice: AuthSlice,
  notificationSlice: NotificationSlice,
});

const persistConfig = {
  key: 'root',
  storage: reduxStorage,
  whitelist: ['authSlice'],
  timeout: 0,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(baseService.middleware),
});

const persistedStore = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export {persistedStore, store};
