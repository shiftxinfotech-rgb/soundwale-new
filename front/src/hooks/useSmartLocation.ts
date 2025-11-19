import {extractAddressFromCoordinates, reduxStorage} from '@util';
import {useCallback, useEffect, useRef, useState} from 'react';
import {
  AppState,
  AppStateStatus,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {
  isLocationEnabled,
  promptForEnableLocationIfNeeded,
} from 'react-native-android-location-enabler';
import Geolocation, {GeoPosition} from 'react-native-geolocation-service';
import {useUserInfo} from './useAuth';

export type SmartLocation = {
  latitude: number;
  longitude: number;
  city?: string;
  state?: string;
  source: 'gps' | 'ip' | 'fallback';
  timestamp: number;
};

export type LocationStatus = 'loading' | 'success' | 'fallback' | 'error';

interface UseSmartLocationOptions {
  watch?: boolean;
  staleTime?: number; // ms
  onLocationChange?: (location: SmartLocation) => void;
}

const DISTANCE_THRESHOLD = 100; // meters
const STORAGE_KEY = 'last_known_location';

const getDistanceInMeters = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number => {
  const R = 6371000;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const toRad = (value: number): number => (value * Math.PI) / 180;

export const getLastKnownLocation = (): SmartLocation | null => {
  const val = reduxStorage.getItem(STORAGE_KEY);
  try {
    return val ? (JSON.parse(val) as SmartLocation) : null;
  } catch {
    return null;
  }
};

export const setLastKnownLocation = (loc: SmartLocation): void => {
  reduxStorage.setItem(STORAGE_KEY, JSON.stringify(loc));
};

export function useSmartLocation({
  watch = true,
  staleTime = 60000,
  onLocationChange,
}: UseSmartLocationOptions) {
  const [location, setLocation] = useState<SmartLocation | null>(null);
  const [status, setStatus] = useState<LocationStatus>('loading');
  const watchId = useRef<number | null>(null);
  const appState = useRef<AppStateStatus>(AppState.currentState);
  const lastFiredLocation = useRef<SmartLocation | null>(null);

  const {latitude: userLatitude, longitude: userLongitude} =
    useUserInfo() || {};

  const setAndNotify = useCallback(
    async (loc: SmartLocation): Promise<void> => {
      const last = lastFiredLocation.current;
      const movedFar =
        !last ||
        getDistanceInMeters(
          last.latitude,
          last.longitude,
          loc.latitude,
          loc.longitude,
        ) > DISTANCE_THRESHOLD;

      if (movedFar) {
        setLocation(loc);
        lastFiredLocation.current = loc;
        onLocationChange?.(loc);
        setLastKnownLocation(loc);
      }
    },
    [onLocationChange],
  );

  const requestPermissions = useCallback(async (): Promise<boolean> => {
    if (Platform.OS === 'ios') {
      const auth = await Geolocation.requestAuthorization('whenInUse');
      return auth === 'granted';
    }

    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }

    return false;
  }, []);

  const ensureGPSOn = useCallback(async (): Promise<boolean> => {
    if (Platform.OS !== 'android') {
      return true;
    }
    try {
      const checkEnabled: boolean = await isLocationEnabled();
      if (checkEnabled) {
        return true;
      }
      const enableResult = await promptForEnableLocationIfNeeded();
      return enableResult === 'enabled' || enableResult === 'already-enabled';
    } catch (error) {
      return false;
    }
  }, []);

  const fetchGPSLocation = useCallback((): Promise<SmartLocation> => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        async (pos: GeoPosition) => {
          const process = await extractAddressFromCoordinates({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
          resolve({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            state: process?.state,
            source: 'gps',
            timestamp: Date.now(),
          });
        },
        reject,
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
          forceRequestLocation: true,
        },
      );
    });
  }, []);

  const fetchIPLocation =
    useCallback(async (): Promise<SmartLocation | null> => {
      try {
        const res = await fetch('https://ipapi.co/json/');
        const json: any = await res.json();

        if (json.latitude && json.longitude) {
          const process = await extractAddressFromCoordinates({
            latitude: json.latitude,
            longitude: json.longitude,
          });
          return {
            latitude: json.latitude,
            longitude: json.longitude,
            city: json.city,
            state: process?.state,
            source: 'ip',
            timestamp: Date.now(),
          };
        }
      } catch {}
      return null;
    }, []);

  const fallbackToCity = useCallback(async (): Promise<SmartLocation> => {
    if (userLatitude && userLongitude) {
      const process = await extractAddressFromCoordinates({
        latitude: userLatitude,
        longitude: userLongitude,
      });
      return {
        latitude: userLatitude,
        longitude: userLongitude,
        state: process?.state,
        source: 'fallback',
        timestamp: Date.now(),
      };
    }
    return {
      latitude: 0,
      longitude: 0,
      source: 'fallback',
      timestamp: Date.now(),
    };
  }, [userLatitude, userLongitude]);

  const tryFallbacks = useCallback(async (): Promise<void> => {
    const ipLoc = await fetchIPLocation();
    if (ipLoc) {
      await setAndNotify(ipLoc);
      setStatus('fallback');
      return;
    }
    const fallback = await fallbackToCity();
    await setAndNotify(fallback);
    setStatus('fallback');
  }, [fetchIPLocation, fallbackToCity, setAndNotify]);

  const startWatching = useCallback((): void => {
    if (watchId.current !== null) {
      return;
    }

    watchId.current = Geolocation.watchPosition(
      async pos => {
        const loc: SmartLocation = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          source: 'gps',
          timestamp: Date.now(),
        };
        await setAndNotify(loc);
      },
      async () => {
        await tryFallbacks();
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 50,
        forceRequestLocation: true,
      },
    );
  }, [setAndNotify, tryFallbacks]);

  const tryLocation = useCallback(async (): Promise<void> => {
    setStatus('loading');

    const cached = getLastKnownLocation();
    if (cached && Date.now() - cached.timestamp < staleTime) {
      await setAndNotify(cached);
      setStatus('success');
      return;
    }

    let finalLoc: SmartLocation | null = null;

    const hasPermission = await requestPermissions();
    const gpsEnabled = hasPermission ? await ensureGPSOn() : false;

    if (hasPermission && gpsEnabled) {
      try {
        finalLoc = await fetchGPSLocation();
      } catch {}
    }

    // Try IP location only if GPS failed
    if (!finalLoc) {
      finalLoc = await fetchIPLocation();
    }

    // Fallback to registered city if IP also failed
    if (!finalLoc) {
      finalLoc = await fallbackToCity();
    }

    // Set location once with final result
    await setAndNotify(finalLoc);
    setStatus(finalLoc.source === 'gps' ? 'success' : 'fallback');

    if (watch && finalLoc.source === 'gps') {
      startWatching(); // only if GPS succeeded
    }
  }, [
    ensureGPSOn,
    fallbackToCity,
    fetchGPSLocation,
    fetchIPLocation,
    requestPermissions,
    setAndNotify,
    staleTime,
    startWatching,
    watch,
  ]);

  const stopWatching = useCallback((): void => {
    if (watchId.current !== null) {
      Geolocation.clearWatch(watchId.current);
      watchId.current = null;
    }
  }, []);

  useEffect(() => {
    tryLocation();
    return () => stopWatching();
  }, [tryLocation, stopWatching]);

  useEffect(() => {
    const handleAppStateChange = (next: AppStateStatus) => {
      const wasBg = appState.current.match(/inactive|background/);
      appState.current = next;
      if (next === 'active' && wasBg) {
        if (watch) {
          startWatching();
        }
      } else if (next !== 'active') {
        stopWatching();
      }
    };

    const sub = AppState.addEventListener('change', handleAppStateChange);
    return () => sub.remove();
  }, [startWatching, stopWatching, watch]);

  return {location, status, refetch: tryLocation};
}
