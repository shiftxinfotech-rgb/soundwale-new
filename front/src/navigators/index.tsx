import { NavigationParamStack, NotificationFCMBean } from '@data';
import { pushContent, setPushObject } from '@features';
import { useAppDispatch, useAuthStatus } from '@hooks';
import {
  NavigationContainer,
  DefaultTheme as NavigationLightTheme,
  Theme as NavigationTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  AddCompanyPdf,
  AddPartInfo,
  AddPostRequirement,
  ChatDetails,
  ChatListing,
  Cms,
  CompanyDealer,
  CompanyPdf,
  ContactUs,
  DirectoryDetail,
  DirectoryList,
  EditProfile,
  FAQ,
  Favorite,
  FilterScreen,
  GalleryDetail,
  Location,
  LocationSelector,
  Login,
  ManufacturingProduct,
  Notification,
  OperatingMixerScreen,
  PostComments,
  PostImages,
  ProductInfoDealerSupplier,
  Profile,
  RegisterPage,
  ServiceCenter,
  Settings,
  SoundInventoryUpdate,
  Splash,
  Verification,
  WorkingWithWhom,
} from '@screens';
import {
  useLazyGetUnReadCountQuery,
  useMarkIndividualReadMutation,
  usePrefetchUtility,
} from '@services';
import { Colors } from '@theme';
import { navigate, navigationRef } from '@util';
import React, { useCallback, useEffect, useState } from 'react';
import { Platform, StatusBar } from 'react-native';
import {
  MD3LightTheme as DefaultTheme,
  MD3LightTheme,
  MD3Theme,
  Provider as PaperProvider,
} from 'react-native-paper';
import { hideSplash } from 'react-native-splash-view';
import { shallowEqual, useSelector } from 'react-redux';
import DrawerNavigator from './DrawerNavigator';

const Stack = createNativeStackNavigator<NavigationParamStack>();

export const appTheme: MD3Theme & NavigationTheme = {
  ...DefaultTheme,
  ...MD3LightTheme,
  ...NavigationLightTheme.colors,
  colors: {
    ...DefaultTheme.colors,
    ...MD3LightTheme.colors,
    ...NavigationLightTheme.colors,
    ...Colors,
  },
  fonts: {...DefaultTheme.fonts, ...NavigationLightTheme.fonts},
};

const Navigator = () => {
  const isLoggedIn = useAuthStatus();
  const dispatch = useAppDispatch();
  const notificationContent = useSelector(pushContent, shallowEqual);
  const [initialRoute, setInitialRoute] = useState<
    'Splash' | 'DrawerNavigator' | undefined
  >(undefined);
  const [navigationReady, setNavigationReady] = useState(false);
  const [markReadIndividual] = useMarkIndividualReadMutation();
  const [getUnread] = useLazyGetUnReadCountQuery();

  const prefetchRoles = usePrefetchUtility('getRoles');

  const handleNotificationByType = useCallback(
    async (content: NotificationFCMBean) => {
      try {
        if (!content || Object.keys(content).length === 0) {
          return;
        }
        const {relation_id, type, notification_id} = content || {};
        const res = await markReadIndividual({
          id: notification_id,
        }).unwrap();

        if (res.status) {
          getUnread(undefined);
        }
        switch (type) {
          case 'add_review':
            navigate('DirectoryDetail', {
              id: relation_id,
            });
            break;
          case 'chat':
            navigate('ChatListing');
            break;
        }
        dispatch(setPushObject(undefined));
      } catch (error) {}
    },
    [dispatch, getUnread, markReadIndividual],
  );

  useEffect(() => {
    if (navigationReady) {
      if (notificationContent !== undefined && notificationContent !== null) {
        setTimeout(() => {
          handleNotificationByType(notificationContent);
        }, 1);
      }
    }
  }, [
    dispatch,
    handleNotificationByType,
    navigationReady,
    notificationContent,
  ]);

  useEffect(() => {
    if (isLoggedIn) {
      setInitialRoute('DrawerNavigator');
    } else {
      setInitialRoute('Splash');
    }
  }, [isLoggedIn]);

  const onNavigationReady = () => {
    prefetchRoles();
    setTimeout(() => {
      hideSplash();
    }, 500);
    setNavigationReady(true);
  };
  if (!initialRoute) {
    return <></>;
  }

  const linking = {
    prefixes: ['https://soundwale.in/', 'soundwale://'],
    config: {
      screens: {
        TabNavigator: {
          screens: {
            Home: 'home',
            Buyers: 'buyer',
            Sellers: 'seller',
            Directory: 'directory',
          },
        },
      },
    },
  };

  return (
    <PaperProvider theme={appTheme}>
      {Platform.OS === 'android' && (
        <StatusBar
          translucent
          backgroundColor={'transparent'}
          barStyle={'dark-content'}
        />
      )}
      <NavigationContainer
        ref={navigationRef}
        onReady={onNavigationReady}
        linking={linking}
        theme={appTheme}>
        <Stack.Navigator
          initialRouteName={initialRoute}
          screenOptions={{
            animation: 'fade_from_bottom',
            animationDuration: 500,
            animationTypeForReplace: 'pop',
            statusBarAnimation: 'fade',
            headerBackVisible: false,
            headerShown: false,
            statusBarStyle: 'dark',
            statusBarHidden: false,
            statusBarTranslucent: false,
            statusBarBackgroundColor: Colors.white,
          }}>
          <Stack.Screen
            name={'Splash'}
            component={Splash}
            options={{
              statusBarBackgroundColor: Colors.primary,
              statusBarStyle: 'light',
            }}
          />
          <Stack.Screen
            name={'Login'}
            component={Login}
            options={{
              statusBarTranslucent: true,
              statusBarStyle: 'dark',
              statusBarBackgroundColor: 'transparent',
              statusBarHidden: false,
            }}
          />
          <Stack.Screen
            name={'Verification'}
            component={Verification}
            options={{
              statusBarTranslucent: true,
              statusBarStyle: 'dark',
              statusBarBackgroundColor: 'transparent',
              statusBarHidden: false,
            }}
          />
          <Stack.Screen
            name={'RegisterForm'}
            component={RegisterPage}
            options={{
              statusBarTranslucent: true,
              statusBarStyle: 'dark',
              statusBarBackgroundColor: 'transparent',
              statusBarHidden: false,
            }}
          />
          <Stack.Screen
            name={'ChatListing'}
            component={ChatListing}
            options={{
              statusBarTranslucent: true,
              statusBarStyle: 'dark',
              statusBarBackgroundColor: 'transparent',
              statusBarHidden: false,
            }}
          />
          <Stack.Screen
            name={'ChatDetail'}
            component={ChatDetails}
            options={{
              statusBarTranslucent: false,
              statusBarStyle: 'dark',
              statusBarBackgroundColor: 'transparent',
              statusBarHidden: false,
            }}
          />
          <Stack.Screen
            name={'GalleryDetail'}
            component={GalleryDetail}
            options={{
              statusBarTranslucent: true,
              statusBarStyle: 'dark',
              statusBarBackgroundColor: 'transparent',
              statusBarHidden: false,
            }}
          />
          <Stack.Screen
            name={'CompanyPdfListing'}
            component={CompanyPdf}
            options={{
              statusBarTranslucent: true,
              statusBarStyle: 'dark',
              statusBarBackgroundColor: 'transparent',
              statusBarHidden: false,
            }}
          />
          <Stack.Screen
            name={'AddCompanyPdf'}
            component={AddCompanyPdf}
            options={{
              statusBarTranslucent: true,
              statusBarStyle: 'dark',
              statusBarBackgroundColor: 'transparent',
              statusBarHidden: false,
            }}
          />
          <Stack.Screen
            name={'FilterScreen'}
            component={FilterScreen}
            options={{
              statusBarTranslucent: true,
              statusBarStyle: 'dark',
              statusBarBackgroundColor: 'transparent',
              statusBarHidden: false,
            }}
          />
          <Stack.Screen
            name={'DrawerNavigator'}
            component={DrawerNavigator}
            options={{
              statusBarTranslucent: true,
              statusBarStyle: 'dark',
              statusBarBackgroundColor: 'transparent',
              statusBarHidden: false,
            }}
          />
          <Stack.Screen
            name={'Settings'}
            component={Settings}
            options={{
              statusBarTranslucent: true,
              statusBarStyle: 'dark',
              statusBarBackgroundColor: 'transparent',
              statusBarHidden: false,
            }}
          />
          <Stack.Screen
            name={'Cms'}
            component={Cms}
            options={{
              statusBarTranslucent: true,
              statusBarStyle: 'dark',
              statusBarBackgroundColor: 'transparent',
              statusBarHidden: false,
            }}
          />
          <Stack.Screen
            name={'FAQ'}
            component={FAQ}
            options={{
              statusBarTranslucent: true,
              statusBarStyle: 'dark',
              statusBarBackgroundColor: 'transparent',
              statusBarHidden: false,
            }}
          />
          <Stack.Screen
            name={'Notification'}
            component={Notification}
            options={{
              statusBarTranslucent: true,
              statusBarStyle: 'dark',
              statusBarBackgroundColor: 'transparent',
              statusBarHidden: false,
            }}
          />
          <Stack.Screen
            name={'ContactUs'}
            component={ContactUs}
            options={{
              statusBarTranslucent: true,
              statusBarStyle: 'dark',
              statusBarBackgroundColor: 'transparent',
              statusBarHidden: false,
            }}
          />
          <Stack.Screen
            name={'Profile'}
            component={Profile}
            options={{
              statusBarTranslucent: true,
              statusBarStyle: 'dark',
              statusBarBackgroundColor: 'transparent',
              statusBarHidden: false,
            }}
          />
          <Stack.Screen
            name={'EditProfile'}
            component={EditProfile}
            options={{
              statusBarTranslucent: true,
              statusBarStyle: 'dark',
              statusBarBackgroundColor: 'transparent',
              statusBarHidden: false,
            }}
          />
          <Stack.Screen
            name={'Favorite'}
            component={Favorite}
            options={{
              statusBarTranslucent: true,
              statusBarStyle: 'dark',
              statusBarBackgroundColor: 'transparent',
              statusBarHidden: false,
            }}
          />
          <Stack.Screen
            name={'DirectoryList'}
            component={DirectoryList}
            options={{
              statusBarTranslucent: true,
              statusBarStyle: 'dark',
              statusBarBackgroundColor: 'transparent',
              statusBarHidden: false,
            }}
          />
          <Stack.Screen
            name={'Location'}
            component={Location}
            options={{
              statusBarTranslucent: true,
              statusBarStyle: 'dark',
              statusBarBackgroundColor: 'transparent',
              statusBarHidden: false,
            }}
          />
          <Stack.Screen
            name={'DirectoryDetail'}
            component={DirectoryDetail}
            options={{
              statusBarTranslucent: true,
              statusBarStyle: 'dark',
              statusBarBackgroundColor: 'transparent',
              statusBarHidden: false,
            }}
          />
          <Stack.Screen
            name={'LocationSelector'}
            component={LocationSelector}
            options={{
              statusBarTranslucent: true,
              statusBarStyle: 'dark',
              statusBarBackgroundColor: 'transparent',
              statusBarHidden: false,
            }}
          />
          <Stack.Screen
            name={'AddPartInfo'}
            component={AddPartInfo}
            options={{
              statusBarTranslucent: true,
              statusBarStyle: 'dark',
              statusBarBackgroundColor: 'transparent',
              statusBarHidden: false,
            }}
          />
          <Stack.Screen
            name={'ServiceCenter'}
            component={ServiceCenter}
            options={{
              statusBarTranslucent: true,
              statusBarStyle: 'dark',
              statusBarBackgroundColor: 'transparent',
              statusBarHidden: false,
            }}
          />
          <Stack.Screen
            name={'SoundInventoryUpdate'}
            component={SoundInventoryUpdate}
            options={{
              statusBarTranslucent: true,
              statusBarStyle: 'dark',
              statusBarBackgroundColor: 'transparent',
              statusBarHidden: false,
            }}
          />
          <Stack.Screen
            name={'WorkingWithWhom'}
            component={WorkingWithWhom}
            options={{
              statusBarTranslucent: true,
              statusBarStyle: 'dark',
              statusBarBackgroundColor: 'transparent',
              statusBarHidden: false,
            }}
          />
          <Stack.Screen
            name={'OperatingMixerScreen'}
            component={OperatingMixerScreen}
            options={{
              statusBarTranslucent: true,
              statusBarStyle: 'dark',
              statusBarBackgroundColor: 'transparent',
              statusBarHidden: false,
            }}
          />
          <Stack.Screen
            name={'CompanyDealer'}
            component={CompanyDealer}
            options={{
              statusBarTranslucent: true,
              statusBarStyle: 'dark',
              statusBarBackgroundColor: 'transparent',
              statusBarHidden: false,
            }}
          />
          <Stack.Screen
            name={'ManufacturingProduct'}
            component={ManufacturingProduct}
            options={{
              statusBarTranslucent: true,
              statusBarStyle: 'dark',
              statusBarBackgroundColor: 'transparent',
              statusBarHidden: false,
            }}
          />
          <Stack.Screen
            name={'AddPostRequirement'}
            component={AddPostRequirement}
            options={{
              statusBarTranslucent: true,
              statusBarStyle: 'dark',
              statusBarBackgroundColor: 'transparent',
              statusBarHidden: false,
            }}
          />
          <Stack.Screen
            name={'ProductInfoDealerSupplier'}
            component={ProductInfoDealerSupplier}
            options={{
              statusBarTranslucent: true,
              statusBarStyle: 'dark',
              statusBarBackgroundColor: 'transparent',
              statusBarHidden: false,
            }}
          />
          <Stack.Screen
            name={'PostComments'}
            component={PostComments}
            options={{
              statusBarTranslucent: true,
              statusBarStyle: 'dark',
              statusBarBackgroundColor: 'transparent',
              statusBarHidden: false,
            }}
          />
          <Stack.Screen
            name={'PostImages'}
            component={PostImages}
            options={{
              statusBarTranslucent: true,
              statusBarStyle: 'dark',
              statusBarBackgroundColor: 'transparent',
              statusBarHidden: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default Navigator;
