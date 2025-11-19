import {Meta} from './GenericParams';

export type CommentListing = {
  status?: boolean;
  data?: Data;
};

export type Data = {
  data?: CommentDatum[];
  meta?: Meta;
};

export type CommentDatum = {
  id?: number;
  user_id?: number;
  home_list_id?: number;
  message?: string;
  status?: number;
  created_at?: Date;
  updated_at?: Date;
  user_name?: string;
  user_image?: string;
  like_count?: number;
  is_like?: number;
  replies?: CommentDatum[];
};

export type AddPostCommentResponse = {
  status?: boolean;
  message?: string;
  data?: CommentDatum[];
};
