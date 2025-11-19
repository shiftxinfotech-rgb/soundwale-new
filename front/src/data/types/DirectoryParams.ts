import {SmartLocation} from '@hooks';
import {BusinessPdfData} from './AuthData';
import {Meta} from './GenericParams';
import {RoleBean} from './RoleParam';
import {WorkingWithData} from './WorkingWithParams';

export type DirectoryNavigation = {
  selectedSupplier: RoleBean;
  selectedLocation: SmartLocation;
};

export type DirectoryDetailResponse = {
  status: boolean;
  data: DirectoryDetail;
};

export type DirectoryDetail = {
  id?: number;
  image?: string;
  name?: string;
  personal_name?: string;
  email?: string;
  code_sort?: string;
  code?: string;
  mobile_number?: string;
  role_id?: string;
  product_ids?: null;
  marketing_person_name?: string;
  marketing_code_sort?: string;
  marketing_code?: string;
  marketing_mobile_number?: string;
  gender?: null;
  country_id?: number;
  state_id?: number;
  city_id?: number;
  village?: string;
  location?: string;
  latitude?: string;
  longitude?: string;
  visiting_card_image?: string;
  company_about?: string;
  gst_number?: string;
  companies_info?: string;
  category_info?: string;
  mixer_names_info?: string;
  sound_inventory?: string;
  dealer_of_company?: string;
  distributor_of_company?: string;
  importer_of_company?: string;
  product_info?: string;
  spare_part_info?: string;
  service_center_info?: string;
  manufacturing_product_info?: string;
  status?: number;
  view_counter?: number;
  fcm_token?: null;
  created_at?: Date;
  updated_at?: Date;
  country_name?: string;
  state_name?: string;
  city_name?: string;
  roles?: RoleBean[];
  company_pdf_data?: BusinessPdfData[];
  image_url?: string;
  visiting_card_image_url?: string;
  working_with_data?: WorkingWithData[];
  review_data?: ReviewBean[];
  review_avg_rating?: number;
  review_count?: number;
};

export type ContactBean = {
  name: string;
  code: string;
  mobile_number: string;
  designation: string;
  w_mobile_number: string;
  w_code: string;
  available_on_whatsapp_with_same_number: string;
  email: string;
  type: string;
};
export type ReviewBean = {
  id: number;
  user_id: number;
  relevant_id: number;
  rating: number;
  message: string;
  type: string;
  status: number;
  created_at: string;
  updated_at: string;
  role_id: string;
  user_name: string;
  user_profile_url: string;
  roles: RoleBean[];
};

export type DirectoryPaginationResponse = {
  status?: boolean;
  data: {
    data: DirectoryBean[];
    meta: Meta;
  };
};

export interface DirectoryBean {
  id: number;
  image: string;
  name: string;
  email: string;
  code_sort: any;
  code: string;
  mobile_number: string;
  extra_mobile_number: any;
  role_id: string;
  categories_id: any;
  service_center: any;
  receive_promotional_and_marketing_email: number;
  available_on_whatsapp_with_same_number: number;
  whats_app_code: any;
  whats_app_mobile_number: any;
  working_with: any;
  coaching_class: any;
  company_name: any;
  taluka: any;
  district: any;
  country_id: number;
  state_id: number;
  city_id: number;
  village: any;
  location: any;
  personal_name: string;
  latitude: any;
  longitude: any;
  dealer_list_area_wise_type: string;
  dealer_list_area_wise_website: any;
  dealer_list_area_wise_pdf: string;
  catalogue_type: any;
  catalogue_website: any;
  catalogue_pdf: string;
  description_pdf: string;
  youtube_link: any;
  facebook_link: any;
  instagram_link: any;
  web_link: any;
  visiting_card_image: string;
  description: any;
  authorised_dealer_company_name: any;
  company_about: any;
  status: number;
  view_counter: number;
  hide_profile_in_directory: number;
  created_at: string;
  updated_at: string;
  country_name: string;
  state_name: string;
  city_name: string;
  review_avg_rating: any;
  review_count: number;
  roles: RoleBean[];
  image_url: string;
  visiting_card_image_url: string;
  dealer_list_area_wise_pdf_url: string;
  catalogue_pdf_url: string;
  description_pdf_url: string;
}

export type DirectoryDetailParams = {
  id: number;
};
