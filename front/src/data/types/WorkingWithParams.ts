export type WorkingWithResponse = {
  status?: boolean;
  data?: WorkingWithData[];
};

export type WorkingWithData = {
  id?: number;
  user_id?: number;
  register_id?: number;
  register_name?: string;
  status?: number;
  reject_reason?: string;
  created_at?: Date;
  updated_at?: Date;
  user_name?: string;
  user_image?: string;
  role_name?: string;
};

export type WorkingWithSearchResponse = {
  status?: boolean;
  data?: WorkingWithSearchData[];
};

export type WorkingWithSearchData = {
  id?: number;
  name?: string;
  personal_name?: string;
  image_url?: string;
  visiting_card_image_url?: string;
};

export type WorkingWithRequestParams = {
  reject_reason?: string;
};
