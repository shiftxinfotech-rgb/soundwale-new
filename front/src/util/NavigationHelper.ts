import {NavigationParamStack} from '@data';
import {
  CommonActions,
  createNavigationContainerRef,
} from '@react-navigation/native';

export const navigationRef =
  createNavigationContainerRef<NavigationParamStack>();

export const moveBack = () => {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
};

export const navigate = (
  name: keyof NavigationParamStack,
  params?: any,
): void => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
};

export const navigateAndResetComplete = (name: keyof NavigationParamStack) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name,
            params: {},
          },
        ],
      }),
    );
  }
};
