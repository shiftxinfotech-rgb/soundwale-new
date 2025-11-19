import {Linking} from 'react-native';

let defaultProvider: 'google' | 'apple' = 'google';

// Define types for parameters
interface QueryParams {
  ll?: string;
  z?: number;
  dirflg?: string;
  q?: string;
  saddr?: string;
  daddr?: string;
  origin?: string;
  destination?: string;
  travelmode?: string;
  center?: string;
  zoom?: number; // Added zoom
}

interface CreateMapLinkParams {
  latitude?: number;
  longitude?: number;
  zoom?: number;
  start?: string;
  end?: string;
  query?: string;
  travelType?: 'drive' | 'walk' | 'public_transport';
  provider?: 'google' | 'apple';
  coords?: string;
}

// Geo coordinate stringify function
const geoCordStringify = (latitude: number, longitude: number): string => {
  [latitude, longitude].forEach(coord => {
    if (typeof coord !== 'number') {
      throw new Error('Entered a non-number value for geo coordinates.');
    }
  });

  return `${latitude},${longitude}`;
};

// Validate travel type
const validateTravelType = (type: string): void => {
  const TRAVEL_TYPE_ENUM: Array<string> = ['drive', 'walk', 'public_transport'];
  if (!TRAVEL_TYPE_ENUM.includes(type)) {
    throw new Error(`Received ${type}, expected one of ${TRAVEL_TYPE_ENUM}`);
  }
};

// Clean object function
const cleanObject = (input: Record<string, any>): Record<string, any> => {
  return Object.keys(input).reduce((acc, key) => {
    const currentValue = input[key];
    return currentValue ? {...acc, [key]: currentValue} : acc;
  }, {});
};

// Create apple parameters
const createAppleParams = (params: CreateMapLinkParams): QueryParams => {
  const travelTypeMap: Record<string, string> = {
    drive: 'd',
    walk: 'w',
    public_transport: 'r',
  };

  const map: QueryParams = {
    ll: params.coords,
    z: params.zoom,
    dirflg: travelTypeMap[params.travelType || 'drive'],
    q: params.query,
    saddr: params.start,
    daddr: params.end,
  };

  return cleanObject(map);
};

// Create google parameters
const createGoogleParams = (params: CreateMapLinkParams): QueryParams => {
  const travelTypeMap: Record<string, string> = {
    drive: 'driving',
    walk: 'walking',
    public_transport: 'transit',
  };

  const map: QueryParams = {
    origin: params.start,
    destination: params.end,
    travelmode: travelTypeMap[params.travelType || 'drive'],
    zoom: params.zoom,
  };

  if (params.coords) {
    map.center = params.coords;
  } else {
    map.q = params.query;
  }

  return cleanObject(map);
};

// Encode query data function
const encodeQueryData = (data: Record<string, any>): string => {
  return Object.keys(data)
    .map(d => `${encodeURIComponent(d)}=${encodeURIComponent(data[d])}`)
    .join('&');
};

// Create query parameters
const createQueryParameters = ({
  latitude,
  longitude,
  zoom = 15,
  start = '',
  end = '',
  query = '',
  travelType = 'drive',
}: CreateMapLinkParams): {apple: QueryParams; google: QueryParams} => {
  validateTravelType(travelType);

  const formatArguments: CreateMapLinkParams = {
    start,
    end,
    query,
    travelType,
    zoom,
  };

  if (latitude && longitude) {
    formatArguments.coords = geoCordStringify(latitude, longitude);
  }

  return {
    apple: createAppleParams(formatArguments),
    google: createGoogleParams(formatArguments),
  };
};

// Create map link function
const createMapLink = ({
  provider = 'google',
  ...params
}: CreateMapLinkParams): string => {
  const link: Record<string, string> = {
    google: 'https://www.google.com/maps/search/?api=1&',
    apple: 'http://maps.apple.com/?',
  };

  if (params.latitude && params.longitude) {
    link.google = 'https://www.google.com/maps/@?api=1&map_action=map&';
  }

  if (params.end) {
    link.google = 'https://www.google.com/maps/dir/?api=1&';
  }

  const queryParameters = createQueryParameters(params);

  const appleQs = encodeQueryData(queryParameters.apple).replace(/%2C/g, ',');
  const googleQs = encodeQueryData(queryParameters.google).replace(/%2C/g, ',');

  link.google += googleQs;
  link.apple += appleQs;

  return link[provider];
};

// Create open link function
export const createOpenLink = ({
  provider,
  ...params
}: CreateMapLinkParams): void => {
  if (!provider) {
    defaultProvider = 'google';
  }

  const mapProvider = provider || defaultProvider;
  const mapLink = createMapLink({provider: mapProvider, ...params});
  Linking.openURL(mapLink).catch(() => {});
};

// Handle press function
export const handlePress = (destinationAddress: string): void => {
  const baseUrl = 'https://www.google.com/maps/dir/?api=1';
  const destinationEncoded = encodeURIComponent(destinationAddress);
  const navigationUrl = `${baseUrl}&destination=${destinationEncoded}`;
  Linking.openURL(navigationUrl);
};
