export type Meta = {
  current_page?: number;
  per_page?: string;
  next_page_url?: null;
  have_more_records?: boolean;
  total?: number;
};

export type PaginationParams = {
  page: number;
  limit: number;
  [key: string]: any;
};

export type FavTypes = 'buyer' | 'seller' | 'home';

export type AddressComponent = {
  long_name: string;
  short_name: string;
  types: string[];
};

export type RequestTypeParam = {
  role_id?: string | number | undefined;
  state_id?: string | number | undefined;
  city_id?: string | number | undefined;
  search?: string | number | undefined;
  status?: string | number | undefined;
  limit?: string | number | undefined;
  product_id?: string | number | undefined;
  company_id?: string | number | undefined;
  model_id?: string | number | undefined;
  sub_category_id?: string | number | undefined;
  radius?: string | undefined;
  latitude?: string | number | undefined;
  longitude?: string | number | undefined;
  user_id?: string | number | undefined;
  manufacturer_id?: string | number | undefined;
  type?: string | number | undefined;
  requirment_id?: string | number | undefined;
  category_id?: string | number | undefined;
  product_ids?: string | number | undefined;
  categories_id?: string | number | undefined;
  state_name?: string | number | undefined;
};
