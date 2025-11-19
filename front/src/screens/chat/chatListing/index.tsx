import {
  CommonHeader,
  CommonModal,
  CommonModalRef,
  Container,
  SmartShimmerFlatList,
} from '@components';
import {ChatPreview} from '@data';
import {useUserId} from '@hooks';
import {AppStyle, VS} from '@theme';
import {ChatHelper, navigate, useUserChats} from '@util';
import React, {useCallback, useRef} from 'react';
import {View} from 'react-native';
import ItemChatList from './component/ChatListItem';
import ChatListShimmer from './component/ChatListShimmer';

export default function ChatListing() {
  const modalRef = useRef<CommonModalRef>(null);

  const userId = useUserId();

  const {chats, loading} = useUserChats(userId ?? '');

  console.log('chats,', chats);

  const _renderItem = useCallback(
    ({item, index}: {item: ChatPreview; index: number}) => {
      return (
        <ItemChatList
          key={index}
          index={index}
          item={item}
          onPress={() => {
            navigate('ChatDetail', {
              chatItem: item,
              productType: item.category,
            });
          }}
          onDelete={() => {
            ChatHelper.deleteChatForUser(item._id, userId ?? '', item.category);
          }}
        />
      );
    },
    [userId],
  );
  const _renderItemShimmer = useCallback(({index}: {index: number}) => {
    return <ChatListShimmer key={index} />;
  }, []);

  return (
    <Container>
      <View style={[VS.flex_1]}>
        <CommonHeader
          title={'Chats'}
          withBackArrow
          withChatNotification={false}
        />
        <View style={[VS.flex_1, VS.mt_20]}>
          <SmartShimmerFlatList
            data={chats ?? []}
            isLoading={loading}
            isRefetching={false}
            showShimmerWhileRefetching={true}
            isFetchingMore={false}
            hasMore={false}
            renderItem={_renderItem}
            renderShimmerItem={_renderItemShimmer}
            onRefresh={() => {}}
            contentContainerStyle={[VS.pv_10, AppStyle.flexGrow]}
            style={[VS.flex_1]}
          />
        </View>
        <CommonModal ref={modalRef} />
      </View>
    </Container>
  );
}
