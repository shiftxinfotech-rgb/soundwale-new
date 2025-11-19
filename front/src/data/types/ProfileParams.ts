import {AuthData} from './AuthData';

export type GetProfileResponse = {
  message?: string;
  status?: boolean;
  user: AuthData;
};
