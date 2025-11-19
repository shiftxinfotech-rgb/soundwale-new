import {CategoryBean} from './CategoryParams';
import {RoleBean} from './RoleParam';
import {DealerBean, StateBean} from './UtilityParams';

export type FilterResponseBean = {
  status?: boolean;
  data?: FilterData;
};

export type FilterData = {
  states?: StateBean[];
  category?: Category[];
  requirement_type?: Category[];
  roles?: RoleBean[];
  main_category?: DealerBean[];
  sub_category?: Category[];
  model?: Category[];
};

export type Category = {
  sub_category?: CategoryBean[];
} & CategoryBean;

export type Price = {
  min?: number;
  max?: number;
};

export const FILTER_TYPES = [
  'products',
  'companies',
  'location',
  'product_type',
  'model',
  'role',
] as const;

export type FilterType = (typeof FILTER_TYPES)[number];

export type FilterTypeParam = {
  label: string;
  value: string;
  count: number;
  id: FilterType;
};

export type ProductsSelection = {
  categoryIds: string[];
  subCategoryIds: string[];
};

export type Selections = {
  products: ProductsSelection;
  companies: string[];
  location: string[];
  product_type?: string;
  budget_range?: string[];
  model?: string[];
  location_range?: string;
  role?: string[];
  product_ids?: string[];
  requirement_type?: string;
  categories_id?: string[];
};

export type FilterScreenParams = {
  type: 'buyer' | 'seller' | 'directory' | 'home';
  preFilters?: Selections;
  onGoBack: (selected: Selections) => void;
};
