import { productType } from '@util';
import {ChatPreview} from '../models';

export type ChatDetailParams = {
  chatItem: ChatPreview;
  productType: (typeof productType)[number];
};
