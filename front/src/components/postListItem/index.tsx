import {Icons} from '@assets';
import {ComponentStyles, ProgressImage, Text, ViewMore} from '@components';
import {PostListDatum} from '@data';
import {useUserId} from '@hooks';
import {AppStyle, Colors, CommonStyle, TS, VS} from '@theme';
import {
  fetchStyles,
  isValidImageUrl,
  openCommonWhatsApp,
  openPhoneCall,
  setField,
} from '@util';
import {cloneDeep} from 'lodash';
import moment from 'moment';
import React, {memo, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleProp, TouchableOpacity, View, ViewStyle} from 'react-native';
import MediaGrid from './MediaGrid';
import {OptionsView} from './OptionsView';

type ItemProps = {
  item: PostListDatum;
  containerStyle?: StyleProp<ViewStyle>;
  onTapPostOptions?: (item: PostListDatum, type: string) => void;
  onUpdateLike?: (item: PostListDatum, type: string) => void;
  onUpdateFavorite?: (item: PostListDatum, type: string) => void;
  onViewProfile?: (item: PostListDatum, type: string) => void;
  onTapPostComments?: (item: PostListDatum, type: string) => void;
  onTapPostChat?: (item: PostListDatum, type: string) => void;
  onTapMedia?: (item: PostListDatum, type: string) => void;
};
function PostListItemView({
  item,
  containerStyle,
  onTapPostOptions,
  onUpdateLike,
  onUpdateFavorite,
  onViewProfile,
  onTapPostComments,
  onTapPostChat,
  onTapMedia,
}: ItemProps) {
  const containerStyles = fetchStyles(containerStyle);
  const loginId = useUserId();
  const {t} = useTranslation(['generic']);
  const {
    user_name,
    user_personal_name,
    user_role_name,
    user_image,
    description,
    images,
    total_comments,
    total_likes,
    created_at,
    is_like,
    is_user_liked,
    user_role_slug,
    user_marketing_mobile_number,
    user_marketing_code,
    user_mobile_number,
    user_code,
    user_id,
    requirment_id,
    product_name,
  } = item || {};

  const totalCount = images?.length ?? 0;
  const displayImages = images?.slice(0, 5) ?? [];
  const isMyPost = user_id?.toString() === loginId?.toString();

  const requirements = useMemo(() => {
    return t('generic:postRequirement', {returnObjects: true});
  }, [t]);

  const rType = requirements.find(el => el.id === requirment_id);

  const commonTap = (type: 'whatsapp' | 'call') => {
    if (
      [
        'manufacturer',
        'dealer_supplier_distributor_importer',
        'sound_automation',
      ].includes(user_role_slug ?? '')
    ) {
      if (type === 'call') {
        openPhoneCall(user_marketing_mobile_number ?? '');
      } else {
        openCommonWhatsApp(
          user_name ?? '',
          user_marketing_code ?? '',
          user_marketing_mobile_number ?? '',
        );
      }
    } else {
      if (type === 'call') {
        openPhoneCall(user_mobile_number ?? '');
      } else {
        openCommonWhatsApp(
          user_name ?? '',
          user_code ?? '',
          user_mobile_number ?? '',
        );
      }
    }
  };

  return (
    <View style={[VS.br_10, VS.gap_10, containerStyles]}>
      <View
        style={[
          VS.ph_15,
          VS.fd_row,
          VS.ai_center,
          VS.jc_space_between,
          VS.gap_5,
        ]}>
        <TouchableOpacity
          activeOpacity={0.8}
          hitSlop={8}
          onPress={() => onViewProfile?.(item, 'profile')}
          style={[
            ComponentStyles.profileContainer,
            AppStyle.hideOverFlow,
            CommonStyle.bgPaleAqua,
            VS.p_4,
          ]}>
          {isValidImageUrl(user_image) && (
            <ProgressImage
              source={{uri: user_image}}
              containerStyle={[
                AppStyle.fullSize,
                AppStyle.hideOverFlow,
                ComponentStyles.borderRadius,
              ]}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          hitSlop={8}
          onPress={() => onViewProfile?.(item, 'profile')}
          style={[VS.flex_1]}>
          <Text
            numberOfLines={1}
            fontWeight="semiBold"
            style={[TS.fs_15, TS.tt_capitalize]}>
            {setField(user_name)}
          </Text>
          <Text numberOfLines={1} fontWeight="medium" style={[TS.fs_12]}>
            {`${setField(user_personal_name)} - ${setField(user_role_name)}`}
          </Text>
        </TouchableOpacity>
        <View style={[VS.ai_center, VS.gap_5]}>
          <View style={[VS.fd_row, VS.ai_end, VS.gap_5]}>
            {!isMyPost ? (
              <TouchableOpacity
                hitSlop={8}
                activeOpacity={0.8}
                onPress={() => onUpdateFavorite?.(item, 'favorite')}
                style={[
                  VS.h_24,
                  VS.w_24,
                  VS.br_12,
                  is_like === 1 && CommonStyle.bgHeartBg,
                  VS.ai_center,
                  VS.jc_center,
                ]}>
                {is_like === 1 ? (
                  <Icons.Heart color={Colors.white} size={15} />
                ) : (
                  <Icons.HeartOff />
                )}
              </TouchableOpacity>
            ) : null}
            <TouchableOpacity
              hitSlop={8}
              activeOpacity={0.8}
              onPress={() => onTapPostOptions?.(item, 'options')}>
              <Icons.DotsVertical />
            </TouchableOpacity>
          </View>
          <Text
            numberOfLines={1}
            fontWeight="medium"
            style={[TS.fs_10, CommonStyle.textDimGray]}>
            {moment(created_at ?? '').fromNow()}
          </Text>
        </View>
      </View>
      <View style={[VS.ph_15, VS.gap_5]}>
        {rType ? (
          <Text
            numberOfLines={1}
            fontWeight="medium"
            style={[TS.fs_12, CommonStyle.textBlueGray]}>
            Product Type:{' '}
            <Text
              numberOfLines={1}
              fontWeight="medium"
              style={[TS.fs_12, CommonStyle.textRed]}>
              {setField(rType.name)}
            </Text>
          </Text>
        ) : null}
        {product_name ? (
          <Text
            numberOfLines={1}
            fontWeight="medium"
            style={[TS.fs_12, CommonStyle.textBlueGray]}>
            Product:{' '}
            <Text
              numberOfLines={1}
              fontWeight="medium"
              style={[TS.fs_12, CommonStyle.textRed]}>
              {setField(product_name)}
            </Text>
          </Text>
        ) : null}
        <ViewMore
          textStyle={[TS.fs_13, CommonStyle.textDimGray, TS.ta_justify]}
          numberOfLines={5}
          child={
            <Text fontWeight={'medium'} style={[TS.fs_13, TS.ta_justify]}>
              {setField(description)}
            </Text>
          }
        />
      </View>
      {images && images.length > 0 && (
        <MediaGrid
          displayImages={displayImages ?? []}
          onSelectMedia={_ => {
            let clonedItem = cloneDeep(item);
            clonedItem.isMyPost = isMyPost;
            onTapMedia?.(clonedItem, 'media');
          }}
          totalCount={totalCount ?? 0}
        />
      )}

      <OptionsView
        total_likes={total_likes ?? 0}
        total_comments={total_comments ?? 0}
        is_user_liked={is_user_liked ?? 0}
        isMyPost={isMyPost}
        onPress={key => {
          switch (key) {
            case 'like':
              onUpdateLike?.(item, 'like');
              break;
            case 'comment':
              onTapPostComments?.(item, 'comment');
              break;
            case 'whatsapp':
              commonTap('whatsapp');
              break;
            case 'call':
              commonTap('call');
              break;
            case 'chat':
              onTapPostChat?.(item, 'chat');
              break;
            default:
              break;
          }
        }}
      />
    </View>
  );
}

const PostListItem = memo(PostListItemView);
export {PostListItem};
