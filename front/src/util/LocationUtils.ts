import {GOOGLE_MAP_API_KEY} from '@env';
import {PermissionsAndroid, Platform} from 'react-native';
import {
  isLocationEnabled,
  promptForEnableLocationIfNeeded,
} from 'react-native-android-location-enabler';
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
import {extractCityStateCountry} from './CommonHelper';

Geocoder.init(GOOGLE_MAP_API_KEY);

export const LocationDelta = {
  latitudeDelta: 0.15,
  longitudeDelta: 0.15,
};

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export const coordsDefault: Coordinates = {
  latitude: 0,
  longitude: 0,
};

export type LatLng = {
  latitude: number;
  longitude: number;
};

export const requestLocationPermission = async (): Promise<boolean> => {
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
};

export const enableLocationServices = async (): Promise<boolean> => {
  if (Platform.OS === 'android') {
    try {
      const checkEnabled: boolean = await isLocationEnabled();
      console.log('checkEnabled', checkEnabled);
      const enableResult = await promptForEnableLocationIfNeeded();
      console.log('enableResult', enableResult);
      return enableResult === 'enabled' || enableResult === 'already-enabled';
    } catch (error) {
      console.error('Error enabling location services:', error);
      return false;
    }
  }
  return true;
};

export const getCurrentLocation = (): Promise<Coordinates> => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      error => {
        console.error('Error getting location:', error);
        reject(error);
      },
      {
        showLocationDialog: true,
        forceRequestLocation: false,
        accuracy: {
          android: 'balanced',
          ios: 'bestForNavigation',
        },
      },
    );
  });
};

export const getAddressFromCoordinates = async (
  coordinates: Coordinates,
): Promise<Geocoder.GeocoderResponse['results'][0] | null> => {
  try {
    const response = await Geocoder.from({
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
    });
    return response.results[0];
  } catch (error) {
    console.error('Error getting address:', error);
    return null;
  }
};

export const getCoordinatesFromAddress = async (
  address: string,
): Promise<Coordinates> => {
  try {
    const response = await Geocoder.from(address);
    const {lat, lng} = response.results[0]?.geometry?.location || {};
    return {
      latitude: lat || 0,
      longitude: lng || 0,
    };
  } catch (error) {
    console.error('Error getting coordinates:', error);
    return coordsDefault;
  }
};

export const haversineDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number => {
  const toRad = (x: number) => (x * Math.PI) / 180;
  const R = 6371e3;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

export const extractAddressFromCoordinates = async (
  coordinates: Coordinates,
) => {
  const results = await getAddressFromCoordinates(coordinates);
  if (results !== undefined && results !== null) {
    const extractedAddress = extractCityStateCountry(
      results.address_components,
    );
    return {
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      ...extractedAddress,
    };
  }
  return null;
};
