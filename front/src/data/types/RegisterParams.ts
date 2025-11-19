import {CountryCodeParams} from './CountryCodeParams';
import {DropDownListParams, LocationParam} from './UtilityParams';

export type RegisterForm = {
  role_id: DropDownListParams;
  name: string;
  personal_name: string;
  location: LocationParam;
};

export interface RegisterParams {
  mobile_number?: string;
  countryCode?: CountryCodeParams;
  code?: string;
  email?: string;
  lastAuthCode?: string;
}
