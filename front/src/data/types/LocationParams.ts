import {StateBean} from './UtilityParams';

export type BackParams = StateBean & {
  latitude?: number;
  longitude?: number;
};

export type LocationScreenParams = {
  requestFrom: string;
  onGoBack?: (cityInfo: BackParams) => void;
  type: 'buyer' | 'seller' | 'home';
};

export type ExtractedAddress = {
  country?: string;
  state?: string;
  city?: string;
  postalCode?: string;
};
