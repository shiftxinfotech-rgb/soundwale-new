import {NoInternetConnection} from '@components';
import {useNetworkStatus, useUserId} from '@hooks';
import Navigator from '@navigator';
import {getAuth} from '@react-native-firebase/auth';
import {ChatHelper, ChatUnreadCountService, monitorAppState} from '@util';
import React, {useEffect} from 'react';
import '../locale';

const auth = getAuth();

const App = () => {
  const {isReachable} = useNetworkStatus();
  const uId = useUserId();

  useEffect(() => {
    if (!uId) {
      return;
    } // Wait until uId is available

    let unsubscribe: (() => void) | null = null;
    unsubscribe = auth.onAuthStateChanged(user => {
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
