import {Platform} from 'react-native';
import notifee, {
  AndroidImportance,
  AndroidLaunchActivityFlag,
  AndroidStyle,
} from '@notifee/react-native';
import {AppName} from '@util';
import {Colors} from '@theme';
export const displayPushNotification = async (
  title: string,
  body: string,
  picture: string | object,
  data: {[key: string]: string | object} | undefined,
): Promise<void> => {
  let requestObject: any = {
    title,
    body,
    data,
    android: {
      channelId: AppName,
      smallIcon: 'ic_notification',
      color: Colors.primary,
      colorized: false,
      importance: AndroidImportance.HIGH,
      onlyAlertOnce: true,
      showTimestamp: true,
      pressAction: {
        id: AppName,
        launchActivity: 'default',
        launchActivityFlags: [AndroidLaunchActivityFlag.SINGLE_TOP],
      },
      style: {
        type: AndroidStyle.BIGTEXT,
        text: body,
      },
    },
    ios: {
      foregroundPresentationOptions: {
        alert: true,
        badge: true,
        sound: true,
      },
    },
  };

  if (picture && picture !== '') {
    requestObject.android.style = {
      type: AndroidStyle.BIGPICTURE,
      picture,
      largeIcon: picture,
      title,
    };
    requestObject.ios.attachments = [{url: picture}];
  }

  await notifee.displayNotification(requestObject);

  if (Platform.OS === 'ios') {
    await notifee.incrementBadgeCount();
  }
};

export const checkApplicationPermission = async () => {
  try {
    const settings = await notifee.requestPermission();
    if (settings) {
      if (settings.authorizationStatus === 0) {
        requestUserPermission();
      } else {
      }
    }
  } catch (error) {
    console.error('Error checking application permission:', error);
  }
};

const requestUserPermission = async () => {
  try {
    const settings = await notifee.requestPermission({
      alert: true,
      announcement: true,
      badge: true,
      criticalAlert: true,
      provisional: true,
    });

    if (settings) {
      if (
        settings.authorizationStatus === 1 ||
        settings.authorizationStatus === 2
      ) {
      }
    }
  } catch (error) {
    console.error('Error requesting user permission:', error);
  }
};
