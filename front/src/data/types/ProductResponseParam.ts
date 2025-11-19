import {Meta} from './GenericParams';
import {PostListDatum} from './PostListParams';

export type FavPaginationResponseBean = {
  status?: boolean;
  data: {
    data: PostListDatum[];
    meta: Meta;
  };
};
