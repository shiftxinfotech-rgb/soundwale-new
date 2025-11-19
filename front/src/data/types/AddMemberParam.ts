import {CountryCodeParams} from './CountryCodeParams';

export interface AddMemberFormParams {
  selectedMember: Array<string>;
  selectedName: string;
  selectedIds: string;
  mobile_number?: string;
  countryCode?: CountryCodeParams;
  email?: string;
  code?: string;
}
export interface AddMemberScreenParam {
  mobile_number: string;
  email: string;
  countryCode?: CountryCodeParams;
  code: string;
}
