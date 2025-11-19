import {Icons} from '@assets';
import {
  ComponentStyles,
  InputHeader,
  SelectionInputRHF,
  Text,
} from '@components';
import {DropDownListParams} from '@data';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {useDebouncedValue} from '@hooks';
import {AppStyle, CommonStyle, TS, VS} from '@theme';
import {height, Scale} from '@util';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {Control, useController} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {
  FlatList,
  Keyboard,
  Platform,
  StyleProp,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {useReducedMotion} from 'react-native-reanimated';
import DropDownListItem from './DropDownListItem';

type DropDownListProps = {
  title: string;
  isAdd?: boolean;
  options: Array<DropDownListParams>;
  control: Control<any>;
  isVisible?: boolean;
  fieldName: string;
  headerTitle: string;
  placeholder: string;
  isSearchable?: boolean;
  error?: string;
  displayValue?: (value: any) => string;
  selected?: string;
  containerStyle?: StyleProp<ViewStyle>;
  headerStyle?: StyleProp<TextStyle>;
  withClear?: boolean;
  onChangeInput?: (text: string) => void;
  onAddPress?: (text?: string) => void;
  onPress?: () => void;
  onClear?: () => void;
  onSelect?: (value: DropDownListParams) => void;
  editable?: boolean;
};

export function CustomDropDownList({
  options,
  title,
  isAdd = false,
  onSelect,
  control,
  fieldName,
  placeholder,
  headerTitle,
  isSearchable,
  displayValue,
  onChangeInput,
  onAddPress,
  selected,
  containerStyle,
  headerStyle,
  withClear = false,
  onClear,
  editable = true,
}: DropDownListProps) {
  const addInputRef = useRef<TextInput>(null);
  const sheetRef = useRef<BottomSheetModal | null>(null);
  const reduceMotion = useReducedMotion();
  const {t} = useTranslation('generic');

  const [searchText, setSearchText] = useState('');
  const debouncedSearchInput = useDebouncedValue(searchText, 300);

  const {field} = useController({
    control,
    name: fieldName,
  });

  // Prioritize field.value from react-hook-form, fall back to selected prop
  const selectedValue =
    field.value?.value || field.value?.label || selected || '';

  const filteredOptions = useMemo(() => {
    const text = debouncedSearchInput.trim().toLowerCase();
    if (!text) {
      return options;
    }

    return options.filter(option => {
      if (option.label) {
        return option.label.toLowerCase().includes(text);
      }
      if (option.title) {
        return option.title.toLowerCase().includes(text);
      }
      return false;
    });
  }, [debouncedSearchInput, options]);

  const handleSelectItem = useCallback(
    (item: DropDownListParams) => {
      field.onChange(item);
      Keyboard.dismiss();
      sheetRef?.current?.close();
      setSearchText('');
      onSelect?.(item);
    },
    [field, onSelect],
  );

  const renderItem = useCallback(
    ({item, index}: {item: DropDownListParams; index: number}) => {
      let isMatched =
        item.value?.toString() === selectedValue.toString() ||
        item.label?.toString() === selectedValue.toString() ||
        item.id?.toString() === selectedValue.toString();

      return (
        <DropDownListItem
          item={item}
          isLast={filteredOptions.length - 1 === index}
          isSelected={isMatched}
          onSelectItem={() => handleSelectItem(item)}
        />
      );
    },
    [filteredOptions.length, handleSelectItem, selectedValue],
  );

  const renderEmptyView = () => {
    return (
      <View style={[VS.ai_center, VS.jc_center, VS.pt_20]}>
        <Text fontWeight="medium" style={[TS.fs_16]}>
          {t('noDataFound')}
        </Text>
      </View>
    );
  };

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        opacity={0.6}
        appearsOnIndex={0}
        pressBehavior="close"
        disappearsOnIndex={-1}
      />
    ),
    [],
  );

  return (
    <View>
      <View style={[containerStyle]}>
        <SelectionInputRHF
          fieldName={fieldName}
          control={control}
          displayValue={displayValue}
          editable={editable}
          headerComponent={
            <InputHeader
              title={headerTitle}
              textWeight="quickSandMedium"
              textStyle={headerStyle}
            />
          }
          placeholder={placeholder}
          parentStyle={[VS.flex_1]}
          onPress={() => {
            Keyboard.dismiss();
            setSearchText('');
            sheetRef?.current?.present();
          }}
          renderRightIcon={
            <View style={[VS.fd_row, VS.ai_center, VS.jc_center, VS.gap_10]}>
              <Icons.ArrowDown />
              {withClear && field.value && (
                <TouchableOpacity
                  onPress={() => {
                    onClear?.();
                  }}>
                  <Icons.Close />
                </TouchableOpacity>
              )}
            </View>
          }
        />
      </View>
      <BottomSheetModal
        ref={sheetRef}
        snapPoints={['70%']}
        handleComponent={null}
        backdropComponent={renderBackdrop}
        animateOnMount={!reduceMotion}
        keyboardBehavior={Platform.OS === 'ios' ? 'extend' : 'interactive'}
        keyboardBlurBehavior="restore"
        containerStyle={ComponentStyles.sheetBackdrop}
        enableContentPanningGesture={false}>
        <BottomSheetView style={[VS.ph_10, VS.pt_15, VS.flex_1]}>
          <View style={[VS.flex_1]}>
            <InputHeader
              title={headerTitle !== '' ? headerTitle : title}
              textWeight="quickSandMedium"
            />
            <View
              style={[
                VS.fd_row,
                VS.ai_center,
                VS.jc_space_between,
                VS.ph_15,
                VS.mt_5,
                !isAdd && !isSearchable && VS.pt_12,
                ComponentStyles.dropDownContainer,
              ]}>
              {(isAdd || isSearchable) && (
                <View style={[VS.fd_row, VS.ai_center, {height: Scale(45)}]}>
                  <TextInput
                    ref={addInputRef}
                    placeholder={isSearchable ? 'Search Here' : title}
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
                      const sanitizedText = text.replace(/[^a-zA-Z\s]/g, '');
                      setSearchText(sanitizedText);
                      onChangeInput?.(sanitizedText);
                      addInputRef.current?.setNativeProps({
                        text: sanitizedText,
                      });
                    }}
                  />
                  {searchText ? (
                    <TouchableOpacity
                      onPress={() => {
                        setSearchText('');
                        addInputRef?.current?.clear();
                      }}
                      style={[VS.ml_8]}>
                      <Icons.Close />
                    </TouchableOpacity>
                  ) : null}
                </View>
              )}
              {isAdd ? (
                <TouchableOpacity
                  onPress={() => {
                    if (isAdd) {
                      const sanitizedText = searchText.replace(
                        /[^a-zA-Z\s]/g,
                        '',
                      );
                      onAddPress!(sanitizedText);
                    } else {
                      onAddPress!(searchText);
                    }
                    addInputRef.current?.clear();
                    setSearchText('');
                    Keyboard.dismiss();
                  }}>
                  <Icons.SquarePlus />
                </TouchableOpacity>
              ) : isSearchable ? (
                <TouchableOpacity onPress={() => Keyboard.dismiss()}>
                  <Icons.Search />
                </TouchableOpacity>
              ) : null}
            </View>

            <FlatList
              data={filteredOptions}
              extraData={filteredOptions}
              renderItem={renderItem}
              style={[VS.flex_1, VS.mt_5, {height: height / 2 + 50}]}
              contentContainerStyle={[
                VS.pb_20,
                filteredOptions.length !== 0 && AppStyle.flexGrow,
                filteredOptions.length === 0 && VS.jc_center,
              ]}
              ListEmptyComponent={renderEmptyView}
              keyboardShouldPersistTaps={'handled'}
              keyboardDismissMode={'interactive'}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
}
