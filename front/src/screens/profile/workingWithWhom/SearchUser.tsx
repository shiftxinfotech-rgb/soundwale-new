import {Icons} from '@assets';
import {ComponentStyles, CustomButton, InputHeader, Text} from '@components';
import {WorkingWithSearchData} from '@data';
import {useDebouncedValue, useToggleSnackBar} from '@hooks';
import {
  useAddWorkingWithMemberMutation,
  useLazySearchUsersQuery,
} from '@services';
import {AppStyle, CommonStyle, TS, VS} from '@theme';
import {height, normalizeApiError, URL_REGEX, width} from '@util';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  FlatList,
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import SearchItem from './SearchItem';

const SearchUser = () => {
  const {t} = useTranslation(['generic']);
  const {toggleMessage} = useToggleSnackBar();
  const addInputRef = useRef<TextInput>(null);

  const [filteredResults, setFilteredResults] = useState<
    WorkingWithSearchData[]
  >([]);
  const [searchText, setSearchText] = useState('');
  const debouncedSearchInput = useDebouncedValue(searchText, 300);

  const [trigger] = useLazySearchUsersQuery();
  const [addWorkingWithMember] = useAddWorkingWithMemberMutation();

  useEffect(() => {
    const triggerResult = async () => {
      try {
        const result = await trigger(debouncedSearchInput, false).unwrap();
        setFilteredResults(result);
      } catch (error) {
        Keyboard.dismiss();
        setTimeout(() => {
          setFilteredResults([]);
        }, 1);
      }
    };
    if (debouncedSearchInput.length >= 2) {
      triggerResult();
    } else {
      setFilteredResults([]);
    }
  }, [debouncedSearchInput, trigger]);

  const addWorkingWithMemberHandler = useCallback(
    async (memberId: string, memberName: string) => {
      try {
        Keyboard.dismiss();
        const formData = new FormData();
        formData.append('register_id', memberId);
        formData.append('register_name', memberName);
        const result = await addWorkingWithMember(formData).unwrap();
        if (result.status) {
          toggleMessage(result.message);
        }
      } catch (error) {
        const {message} = normalizeApiError(error);
        if (message) {
          toggleMessage(message);
        }
      }
    },
    [addWorkingWithMember, toggleMessage],
  );

  const renderEmptyView = () => {
    if (debouncedSearchInput.length > 0) {
      return (
        <View style={[VS.ai_center, VS.jc_center, VS.gap_10]}>
          <View style={[VS.ai_center, VS.jc_center, VS.gap_2]}>
            <Text fontWeight="medium" style={[TS.fs_16]}>
              Member Not found in the system
            </Text>
            <Text
              fontWeight="medium"
              style={[TS.fs_13, CommonStyle.textDimGray]}>
              You can add them manually
            </Text>
          </View>
          <CustomButton
            isLoading={false}
            buttonTitle={t('generic:addMember')}
            onPress={() => {
              addWorkingWithMemberHandler('0', debouncedSearchInput.trim());
            }}
            wrapperStyle={[styles.button]}
          />
        </View>
      );
    }
    return (
      <View style={[VS.ai_center, VS.jc_center, VS.pt_20]}>
        <Text fontWeight="medium" style={[TS.fs_16]}>
          {t('noDataFound')}
        </Text>
      </View>
    );
  };

  const _renderItem = useCallback(
    ({item}: {item: WorkingWithSearchData}) => {
      return (
        <SearchItem
          item={item}
          onPress={() => {
            addWorkingWithMemberHandler(
              item.id?.toString() || '',
              item.name || '',
            );
          }}
        />
      );
    },
    [addWorkingWithMemberHandler],
  );

  return (
    <View style={[VS.flex_1, VS.ph_15, VS.pv_20]}>
      <InputHeader title={'Search User'} textWeight="quickSandMedium" />
      <View
        style={[
          VS.fd_row,
          VS.ai_center,
          VS.jc_space_between,
          VS.ph_15,
          ComponentStyles.dropDownContainer,
        ]}>
        <View style={[VS.fd_row, VS.ai_center]}>
          <TextInput
            ref={addInputRef}
            placeholder={'Search Here'}
            style={[
              TS.fs_15,
              CommonStyle.textDimGray,
              ComponentStyles.inputStyle,
              ComponentStyles.dropDownInput,
            ]}
            placeholderTextColor={CommonStyle.textDimGray.color}
            maxLength={50}
            autoCapitalize={'words'}
            onChangeText={text => {
              const cleaned = text.replace(URL_REGEX.validInput, '');
              if (cleaned === '' || /^[A-Za-z]/.test(cleaned)) {
                setSearchText(cleaned);
              }
            }}
          />
          {searchText ? (
            <TouchableOpacity
              onPress={() => {
                setSearchText('');
                addInputRef?.current?.clear();
                setFilteredResults([]);
              }}
              style={[VS.ml_8]}>
              <Icons.Close />
            </TouchableOpacity>
          ) : null}
        </View>
        <TouchableOpacity onPress={() => Keyboard.dismiss()}>
          <Icons.Search />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredResults}
        extraData={filteredResults}
        renderItem={_renderItem}
        style={[VS.flex_1, VS.mt_15, {height: height / 2 + 50}]}
        contentContainerStyle={[
          VS.pb_20,
          VS.gap_10,
          AppStyle.flexGrow,
          filteredResults.length === 0 && VS.jc_center,
        ]}
        ListEmptyComponent={renderEmptyView}
        keyboardShouldPersistTaps={'handled'}
        keyboardDismissMode={'interactive'}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: width * 0.6,
  },
});

export default SearchUser;
