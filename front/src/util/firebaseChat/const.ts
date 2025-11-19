import {DEV_URL, STAGING_URL} from '@env';
import {ApiConstants} from '@services';

export const isDev = () => {
  if (
    ApiConstants.BASE_URL === DEV_URL ||
    ApiConstants.BASE_URL === STAGING_URL
  ) {
    return true;
  }
  return false;
};

export const rdbPath = isDev() ? 'test_status_dev' : 'status';
export const chatPath = isDev() ? 'test_chats_dev' : 'chats';
export const userPath = isDev() ? 'test_users_dev' : 'users';

export const productType = ['home', 'buyer', 'seller'];

export const chatCategories: ('home' | 'buyer' | 'seller')[] = [
  'home',
  'buyer',
  'seller',
];
