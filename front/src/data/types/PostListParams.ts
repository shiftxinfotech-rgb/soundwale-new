import {UsePaginatedEntityListReturn} from '@hooks';
import {Meta} from './GenericParams';
import {ImageBean} from './UtilityParams';

export type PostListResponse = {
  status?: boolean;
  data?: PostListData;
};

export type PostListData = {
  data?: PostListDatum[];
  meta?: Meta;
};

export type PostListDatum = {
  id?: number;
  user_id?: number;
  role_id?: string;
  manufacturer_id?: string;
  state_id?: string;
  requirment_id?: number;
  product_ids?: string;
  description?: string;
  status?: number;
  created_at?: Date;
  updated_at?: Date;
  is_like?: number;
  manufacturer_name?: string;
  product_name?: string;
  user_name?: string;
  user_personal_name?: string;
  user_role_name?: string;
  user_image?: string;
  user_role_slug?: string;
  user_code?: string;
  user_mobile_number?: string;
  user_marketing_code?: string;
  user_marketing_mobile_number?: string;
  total_likes?: number;
  is_user_liked?: number;
  total_comments?: number;
  states?: PostListState[];
  manufacturer?: PostListState[];
  images?: ImageBean[];
  isMyPost?: boolean;
};

export type RequestTypeFromParam = 'home' | 'buyer' | 'seller';

export type AddPostRequirementParams = {
  requestFrom: RequestTypeFromParam;
  postData?: PostListDatum;
  onGoBack?: () => void;
};

export type PostListState = {
  id?: number;
  value?: string;
};

export type PostCommentsParams = {
  postData?: PostListDatum;
  postId?: number;
  requestFrom: 'home' | 'buyer' | 'seller';
  isImagePost?: boolean;
  controller?: UsePaginatedEntityListReturn<PostListDatum & {id: number}>;
  onGoBack?: () => void;
};

export type PostImagesParams = {
  postData?: PostListDatum;
  requestFrom: 'home' | 'buyer' | 'seller';
  onGoBack?: () => void;
  isMyPost?: boolean;
  controller?: UsePaginatedEntityListReturn<PostListDatum & {id: number}>;
};
