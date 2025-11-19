import {CountryCodeParams} from './CountryCodeParams';

export type ContactUsResponse = {
  status: boolean;
  message: string;
  data: {};
};

export type ContactUsFormData = {
  name: string;
  email: string;
  mobile_number: string;
  message: string;
  country_code?: CountryCodeParams | undefined;
};
