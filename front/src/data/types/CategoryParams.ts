export type CategoryResponse = {
  status?: boolean;
  data?: CategoryBean[];
};

export type CategoryBean = {
  id?: number;
  category_id?: number;
  name?: string;
  status?: number;
};
