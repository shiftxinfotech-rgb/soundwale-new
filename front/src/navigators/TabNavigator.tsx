import {CustomTabBar} from '@components';
import {BottomNavigationParamStack} from '@data';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {TabBuyers, TabDirectory, TabHome, TabSellers} from '@screens';
import React from 'react';

const Tab = createBottomTabNavigator<BottomNavigationParamStack>();

const CustomTabView = (props: BottomTabBarProps) => {
  return <CustomTabBar {...props} />;
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={'Home'}
      detachInactiveScreens
      screenOptions={{
        freezeOnBlur: true,
        headerShown: false,
        tabBarAllowFontScaling: false,
        popToTopOnBlur: true,
        tabBarHideOnKeyboard: true,
        lazy: true,
        tabBarShowLabel: false,
      }}
      tabBar={CustomTabView}>
      <Tab.Screen name="Home" options={{title: 'Home'}} component={TabHome} />
      <Tab.Screen
        name="Buyers"
        options={{title: 'Buyers'}}
        component={TabBuyers}
      />
      <Tab.Screen
        name="Sellers"
        options={{title: 'Sellers'}}
        component={TabSellers}
      />
      <Tab.Screen
        name="Directory"
        options={{title: 'Directory'}}
        component={TabDirectory}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
