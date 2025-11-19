import {Icons} from '@assets';
import {InputBox} from '@components';
import {Selections} from '@data';
import {Colors, CommonStyle, VS} from '@theme';
import {navigate} from '@util';
import {debounce} from 'lodash';
import React, {useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  InteractionManager,
  Keyboard,
  TouchableOpacity,
  View,
} from 'react-native';
import {Styles} from './Styles';

type Props = {
  onPerformSearch: (query: string) => void;
  preSelectedFilters?: Selections;
  onFilterSelected: (filters: Selections) => void;
};

export default function SearchInput({
  onPerformSearch,
  preSelectedFilters,
  onFilterSelected,
}: Props) {
  const {t} = useTranslation('directory');
  const [query, setQuery] = useState('');
  const debouncedSearch = useMemo(
    () => debounce(onPerformSearch, 500),
    [onPerformSearch],
  );

  const onChangeText = (text: string) => {
    setQuery(text);
    debouncedSearch(text);
  };

  return (
    <View
      style={[
        VS.fd_row,
        VS.ai_center,
        VS.jc_space_between,
        VS.gap_16,
        VS.mh_15,
        VS.pv_5,
      ]}>
      <InputBox
        placeholder={t('searchHere')}
        maxLength={60}
        returnKeyLabel={'search'}
        returnKeyType={'search'}
        textContentType={'name'}
        inputMode={'search'}
        keyboardType={'default'}
        parentStyle={[VS.flex_1]}
        placeholderTextColor={Colors.dimGray}
        value={query}
        onChangeText={onChangeText}
        inputStyle={[
          Styles.searchInput,
          CommonStyle.bgWhite,
          CommonStyle.shadowBox,
        ]}
        renderRightIcon={
          <>
            {query.length > 0 ? (
              <TouchableOpacity
                onPress={() => {
                  onChangeText('');
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

      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          navigate('FilterScreen', {
            type: 'directory',
            preFilters: preSelectedFilters,
            onGoBack: onFilterSelected,
          });
        }}
        style={[
          VS.ai_center,
          VS.jc_center,
          Styles.filterIcon,
          CommonStyle.bgPrimary,
        ]}>
        <Icons.Filter />
      </TouchableOpacity>
    </View>
  );
}
