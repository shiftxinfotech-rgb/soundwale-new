import {NetworkStatusParams} from '@data';
import NetInfo from '@react-native-community/netinfo';
import {useEffect, useState} from 'react';

let lastStatus = true;
export const useNetworkStatus = () => {
  const [connectionStatus, setConnectionStatus] = useState<NetworkStatusParams>(
    {
      isReachable: true,
      isGetting: true,
    },
  );

  useEffect(() => {
    (async () => {
      const state = await NetInfo.fetch();
      if (state !== undefined && state !== null) {
        const {isConnected} = state || {};
        setConnectionStatus({
          isReachable: isConnected ?? false,
          isGetting: false,
        });
        lastStatus = isConnected ?? false;
      }
    })();

    const unsubscribe = NetInfo.addEventListener(({isInternetReachable}) => {
      if (typeof isInternetReachable !== 'boolean') {
        return;
      }
      if (isInternetReachable !== lastStatus) {
        setConnectionStatus({
          isReachable: isInternetReachable ?? false,
          isGetting: false,
        });
      }
      lastStatus = isInternetReachable ?? false;
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const forceRefetch = async () => {
    const state = await NetInfo.fetch();
    if (state !== undefined && state !== null) {
      const {isConnected} = state || {};
      setConnectionStatus(old => ({
        ...old,
        isReachable: false,
        isGetting: false,
      }));
      lastStatus = isConnected ?? false;
    }
  };

  return {
    isReachable: connectionStatus.isReachable,
    isGetting: connectionStatus.isGetting,
    forceRefetch,
  };
};
