import {LatLng} from '@util';
import {RoleBean} from './RoleParam';

export type RoleListResponse = {
  status?: boolean;
  data?: RoleBean[];
};
export type RequirementListResponse = {
  status?: boolean;
  data?: RequirementBean[];
};
export type RequirementBean = {
  id?: number;
  name?: string;
};
export type DealerCompanyResponse = {
  status?: boolean;
  data?: DealerBean[];
};

export type DealerBean = {
  id?: number;
  name?: string;
  image?: string;
  status?: number;
  image_url?: string;
};

export type CountryListResponse = {
  status?: boolean;
  message?: string;
  statusCode?: number;
  data?: CountryBean[];
};

export type CountryBean = {
  id?: number;
  country_name?: string;
};

export type StateListResponse = {
  status?: boolean;
  message?: string;
  statusCode?: number;
  data?: StateBean[];
};

export type StateBean = {
  id?: number | string;
  state_name?: string;
};

export type CityListResponse = {
  status?: boolean;
  message?: string;
  statusCode?: number;
  data?: CityBean[];
};

export type CityBean = {
  id?: number | string;
  city_name?: string;
};

export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> &
      Partial<Record<Exclude<Keys, K>, never>>;
  }[Keys];

export type DropDownListParams = RequireAtLeastOne<
  {
    id?: number | string;
    label?: string;
    title?: string;
    value: string;
  },
  'title' | 'label'
>;

export type ImageBean = {
  id?: number;
  name?: string;
  image?: string;
  status?: number;
  image_url?: string;
  thumbnails_image_url?: string;
  url?: string;
  is_like?: number;
  total_likes?: number;
  total_comments?: number;
};

export type LocationParam = {
  coordinates: LatLng;
  address: {
    fullAddress: string;
    country?: string;
    state?: string;
    city?: string;
    postalCode?: string;
  };
};
