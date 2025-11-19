import {GenericFlatList} from '@components';
import {CommentDatum} from '@data';
import React from 'react';
import CommentView from './CommentView';

const CommentItem = ({
  comment,
  onPress,
}: {
  comment: CommentDatum;
  onPress: (
    key: string,
    item: CommentDatum,
    parentId: number | null | undefined,
    level: number,
  ) => void;
}) => {
  const {id, replies} = comment;

  const _renderItem = ({item}: {item: CommentDatum}) => {
    return (
      <CommentView item={item} onPress={onPress} parentId={id} level={1} />
    );
  };

  return (
    <>
      <CommentView item={comment} parentId={id} onPress={onPress} level={0} />
      {replies && replies.length > 0 ? (
        <GenericFlatList
          data={replies}
          renderItem={_renderItem}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={false}
        />
      ) : null}
    </>
  );
};

export default CommentItem;
