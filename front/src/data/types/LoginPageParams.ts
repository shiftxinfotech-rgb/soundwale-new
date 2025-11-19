import {AuthData} from './AuthData';

export type SendAuthCodeResponse = {
  message?: string;
  status?: boolean;
  otp?: number;
};

export type VerifyAuthCodeResponse = {
  message?: string;
  status?: boolean;
  token?: string;
  user?: AuthData;
};

export type SellerProfileResponse = {
  message?: string;
  status?: boolean;
  data?: AuthData;
};
