import {NoInternetConnection} from '@components';
import {useNetworkStatus, useUserId} from '@hooks';
import Navigator from '@navigator';
import {getApp} from '@react-native-firebase/app';
import {getAuth, onAuthStateChanged} from '@react-native-firebase/auth';
import {ChatHelper, ChatUnreadCountService, monitorAppState} from '@util';
import React, {useEffect} from 'react';
import '../locale';

const app = getApp();
const auth = getAuth(app);

const App = () => {
  const {isReachable} = useNetworkStatus();
  const uId = useUserId();

  useEffect(() => {
    if (!uId) {
      return;
    } // Wait until uId is available

    let unsubscribe: (() => void) | null = null;
    unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        // Start listener only once
        if (!ChatUnreadCountService.isListening()) {
          ChatUnreadCountService.startRealtimeListener(uId);
          ChatHelper.setPresence(uId);
          monitorAppState(uId);
        }
      } else {
        ChatUnreadCountService.stopRealtimeListener();
      }
    });

    return () => {
      unsubscribe?.();
      ChatUnreadCountService.stopRealtimeListener();
    };
  }, [uId]);

  return isReachable ? <Navigator /> : <NoInternetConnection />;
};

export default App;
