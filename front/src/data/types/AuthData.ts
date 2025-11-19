import {RoleBean} from './RoleParam';

export type AuthData = {
  id?: number;
  image?: string;
  name?: string;
  email?: string;
  code_sort?: string;
  personal_name?: string;
  code?: string;
  mobile_number?: string;
  country_id?: number;
  state_id?: number;
  city_id?: number;
  country_name?: string;
  state_name?: string;
  city_name?: string;
  village?: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  visiting_card_image?: null;
  visiting_card_image_url?: string;
  roles?: RoleBean[];
  image_url?: string;
  gst_number?: string;
  company_about?: string;
  mixer_names_info?: string;
  dealer_of_company?: string;
  distributor_of_company?: string;
  importer_of_company?: string;
  spare_part_info?: string;
  manufacturing_product_info?: string;
  companies_info?: string;
  category_info?: string;

  //manufacturer
  marketing_person_name?: string;
  marketing_mobile_number?: string;
  marketing_code?: string;
  marketing_code_sort?: string;
  product_ids?: string;
  sound_inventory?: string;
  firebase_custom_token?: string;
  gender?: string;
  service_center_info?: string;
};

export interface BusinessPdfData {
  id: number;
  business_id: number;
  user_id: number;
  name: string;
  image: string;
  created_at: string;
  updated_at: string;
  image_url: string;
}

export type CatalogueDatum = {
  id?: number;
  image?: null | string;
  user_id?: number;
  name?: string;
  other_details?: string;
  status?: number;
  created_at?: Date;
  updated_at?: Date;
  image_url?: string;
  slug?: string;
  description?: string;
  is_likes?: number;
};
