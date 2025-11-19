import React, {useEffect} from 'react';
import {Platform} from 'react-native';
import notifee, {EventType} from '@notifee/react-native';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {
  AppName,
  displayPushNotification,
  checkApplicationPermission,
} from '@util';

import App from './App';
import {getMessaging} from '@react-native-firebase/messaging';
import {
  setPushCount,
  setPushObject,
  setPushToken,
  tokenPushed,
  unReadCount,
} from '@features';

const NotificationWrapper: React.FC = () => {
  const dispatch = useDispatch();
  const isPushed = useSelector(tokenPushed, shallowEqual);
  const {count} = useSelector(unReadCount, shallowEqual);

  useEffect(() => {
    const fetchPushToken = async () => {
      const settings = await notifee.requestPermission();
      try {
        if (settings) {
          if (settings.authorizationStatus === 1) {
            let pushToken = await getMessaging().getToken();
            if (pushToken) {
              if (!isPushed) {
                dispatch(setPushToken(pushToken));
              }
            } else {
            }
          }
        }
      } catch (error) {}
    };

    if (Platform.OS === 'android') {
      checkApplicationPermission();
      notifee.isChannelCreated(AppName).then(status => {
        if (!status) {
          notifee.createChannel({
            id: AppName,
            name: AppName,
          });
        }
      });
    } else {
      if (Platform.OS === 'ios') {
        checkApplicationPermission();
      }
    }
    const unsubscribe = getMessaging().onMessage(async remoteMessage => {
      console.log('remoteMessage', remoteMessage);
      const notification = remoteMessage.notification;
      const title = notification?.title ?? '';
      const body = notification?.body ?? '';
      const picture = remoteMessage.data?.image ?? '';
      const data = remoteMessage.data;
      let pushCount = count + 1;
      dispatch(setPushCount(pushCount));
      displayPushNotification(title, body, picture, data);
    });

    const notifyForeground = notifee.onForegroundEvent(({type, detail}) => {
      const {notification} = detail || {};
      switch (type) {
        case EventType.PRESS:
          if (notification) {
            const {data} = notification || {};
            console.log('THis notification', notification);
            dispatch(setPushObject(data));
          }
          break;
      }
    });

    getMessaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('remoteMessage', remoteMessage);
      let pushCount = count + 1;
      dispatch(setPushCount(pushCount));
      await notifee.incrementBadgeCount();
    });

    getMessaging().onNotificationOpenedApp(remoteMessage => {
      console.log('remoteMessage', remoteMessage);
    });

    getMessaging()
      .getInitialNotification()
      .then(async remoteMessage => {
        if (remoteMessage) {
          console.log('remoteMessage', remoteMessage);
          const notification = remoteMessage.notification;
          const data = remoteMessage.data;
          const title = notification?.title ?? '';
          const body = notification?.body ?? '';
          const picture = notification?.image ?? '';
          displayPushNotification(title, body, picture, data);
          dispatch(setPushObject(data));
          await notifee.incrementBadgeCount();
        }
      });

    getMessaging().onTokenRefresh(async newToken => {
      dispatch(setPushToken(newToken));
      console.log('remoteMessage', newToken);
    });

    fetchPushToken();

    return () => {
      unsubscribe();
      notifyForeground();
    };
  }, [count, dispatch, isPushed]);

  return <App />;
};

export default NotificationWrapper;
