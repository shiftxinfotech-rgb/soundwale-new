import {AuthData} from './AuthData';
import {CountryCodeParams} from './CountryCodeParams';
import {DropDownListParams, LocationParam} from './UtilityParams';

export type EditProfileFormParam = {
  image: string;
  name: string;
  personal_name: string;
  country_code: CountryCodeParams;
  mobile_number: string;
  email: string;
  visiting_card_image: string;
  role: DropDownListParams;
  location: LocationParam;
  country: DropDownListParams | undefined;
  state: DropDownListParams | undefined;
  city: DropDownListParams | undefined;
  village: string;
  gst_number: string;
  company_about: string;
  gender: DropDownListParams;
  // manufacturer
  marketing_person_name: string;
  marketing_mobile_number: string;
  marketing_country_code: CountryCodeParams;
  product_ids: DropDownListParams[];
};

export type ServiceCenterInfo = {
  id?: string;
  company_id: DropDownListParams[];
  company_name: string[];
  company_dropdown_view?: boolean;
  center_name: string;
  location: string;
  latitude: number;
  longitude: number;
  mobile_number: string;
  countryCode: CountryCodeParams | undefined;
};

export type SelectedCompanyParams = {
  companies_id: string | number;
  companies_name: string;
};
export type SelectedManufacturerParams = {
  manufacturer_id: string | number;
  manufacturer_name: string;
};
export type SelectedProductParams = {
  category_id: string | number;
  category_name: string;
};
export type EditProfileNavigationParams = {
  profileData: AuthData;
};
export type EditProfileResponse = {
  status: boolean;
  message: string;
  user: AuthData;
};
export type BusinessEditProfileResponse = {
  status: boolean;
  message: string;
  user: AuthData;
};

export type AddProductRentalFormParams = {
  product_info?: Array<{
    company_id: DropDownListParams;
    product_id: DropDownListParams;
    company_name: string;
    product_name: string;
    company_dropdown_view?: boolean;
    category_dropdown_view?: boolean;
    model_dropdown_view?: boolean;
    model_name: string;
    model_id: DropDownListParams;
    id?: string;
  }>;
};

export type OperatingMixerFormParam = {
  product_info?: Array<{
    company_id: DropDownListParams;
    company_name: string;
    model_name: string;
    model_id: DropDownListParams;
    id?: string;
  }>;
};

export type DealerCompanyFormParam = {
  dealer_company_info?: Array<{
    company_id: DropDownListParams;
    company_name: string;
    id?: string;
  }>;
};

export type ProductInfoDealerSupplierFormParam = {
  companies_id: string[];
  category_id: string[];
  companies_name: DropDownListParams[];
  categories_name: DropDownListParams[];
};

export type ServiceCenterFormData = {
  service_info: ServiceCenterInfo[];
};

export type ManufacturingProductFormParam = {
  product_info?: Array<{
    product_id: DropDownListParams;
    product_name: string;
  }>;
};

export type AddPartInfoFormParam = {
  spare_part_info?: Array<{
    company_id: DropDownListParams;
    company_name: string;
    parts_id: DropDownListParams;
    parts_name: string;
    details: string;
    id?: string;
  }>;
};

export type SoundInventoryFormParam = {
  sound_inventory?: Array<{name: string}>;
};

export type DealerCompanyScreenParam = {
  type: 'dealer_of_company' | 'distributor_of_company' | 'importer_of_company';
};

export type DealerCompanyParams = {
  company_id: DropDownListParams;
  company_name: string;
};
