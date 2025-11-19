import {persistedStore, store} from '@features';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {SmartLocationProvider, SnackbarProvider} from '@providers';
import {VS} from '@theme';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {KeyboardProvider} from 'react-native-keyboard-controller';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import {Provider as StoreProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import '../locale';
import NotificationWrapper from './NotificationWrapper';

const AppWrapper = () => {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <KeyboardProvider>
        <GestureHandlerRootView style={[VS.flex_1]}>
          <StoreProvider store={store}>
            <PersistGate persistor={persistedStore}>
              <SnackbarProvider>
                <BottomSheetModalProvider>
                  <SmartLocationProvider>
                    <NotificationWrapper />
                  </SmartLocationProvider>
                </BottomSheetModalProvider>
              </SnackbarProvider>
            </PersistGate>
          </StoreProvider>
        </GestureHandlerRootView>
      </KeyboardProvider>
    </SafeAreaProvider>
  );
};

export default AppWrapper;
