import {AuthData, ChatPreview, PostListDatum, User} from '@data';
import {navigate} from '../NavigationHelper';
import {ChatHelper} from './ChatHelper';

export const onInitiateChat = async (
  postInfo: PostListDatum,
  userInfo: AuthData,
  productType: string,
) => {
  const {user_id, user_name, user_mobile_number, user_image, id} = postInfo;
  const sender: User = {
    id: userInfo?.id?.toString() ?? '',
    name: userInfo?.name ?? '',
    phone: userInfo?.mobile_number ?? '',
    avatar: userInfo?.image_url ?? '',
  };

  const receiver: User = {
    id: user_id?.toString() ?? '',
    name: user_name ?? '',
    phone: user_mobile_number ?? '',
    avatar: user_image ?? '',
  };

  const chatItem: ChatPreview | null = await ChatHelper.createChat(
    id?.toString() ?? '',
    receiver,
    sender,
    productType,
  );
  if (chatItem) {
    navigate('ChatDetail', {chatItem, productType});
  }
};
