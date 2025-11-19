import {Icons} from '@assets';
import {InputBox, ProgressImage, Text} from '@components';
import {useUserInfo} from '@hooks';
import {AppStyle, Colors, CommonStyle, TS, VS} from '@theme';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  InteractionManager,
  Keyboard,
  TouchableOpacity,
  View,
} from 'react-native';
import {Styles} from './Styles';

type Props = {
  searchInput: string;
  onSearch: (content: string) => void;
  onAddPost: () => void;
  withFilter?: boolean;
  onFilterSelected?: () => void;
  postTitle?: string;
};

export default function HeaderComponent({
  searchInput,
  onSearch,
  onAddPost,
  withFilter,
  onFilterSelected,
  postTitle,
}: Props) {
  const {t} = useTranslation(['tabNavigator']);
  const profileInfo = useUserInfo();

  return (
    <View style={[VS.gap_10, VS.pt_10]}>
      <View
        style={[
          VS.fd_row,
          VS.ai_center,
          VS.jc_space_between,
          VS.mh_15,
          VS.gap_10,
        ]}>
        <InputBox
          placeholder={t('searchHere')}
          maxLength={60}
          returnKeyLabel={'search'}
          returnKeyType={'search'}
          textContentType={'name'}
          inputMode={'search'}
          keyboardType={'default'}
          placeholderTextColor={Colors.dimGray}
          value={searchInput}
          onChangeText={onSearch}
          parentStyle={[VS.flex_1]}
          inputStyle={[CommonStyle.textBlack]}
          renderRightIcon={
            <>
              {searchInput.length > 0 ? (
                <TouchableOpacity
                  onPress={() => {
                    onSearch('');
                    InteractionManager.runAfterInteractions(() => {
                      Keyboard.dismiss();
                    });
                  }}>
                  <Icons.Close />
                </TouchableOpacity>
              ) : (
                <Icons.Search />
              )}
            </>
          }
        />
        {withFilter && (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => onFilterSelected?.()}
            style={[
              VS.ai_center,
              VS.jc_center,
              Styles.filterIcon,
              CommonStyle.bgPrimary,
            ]}>
            <Icons.Filter />
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity
        onPress={onAddPost}
        activeOpacity={0.8}
        style={[
          VS.fd_row,
          VS.ai_center,
          VS.jc_space_between,
          VS.gap_10,
          VS.mh_15,
        ]}>
        {profileInfo?.image_url && (
          <ProgressImage
            source={{uri: profileInfo?.image_url}}
            containerStyle={[Styles.avatarContainer, AppStyle.hideOverFlow]}
          />
        )}
        <View style={[VS.flex_1]}>
          <Text fontWeight="medium" style={[TS.fs_14, CommonStyle.textBlack]}>
            {postTitle ?? 'Add Your Post'}
          </Text>
        </View>
      </TouchableOpacity>
      <View style={[VS.h_1, CommonStyle.bgDimGray]} />
    </View>
  );
}
