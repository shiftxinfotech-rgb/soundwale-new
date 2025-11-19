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
import {fetchStyles, height, Scale, URL_REGEX} from '@util';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {Control} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {
  Keyboard,
  Platform,
  StyleProp,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useReducedMotion} from 'react-native-reanimated';

// Define the ref interface
export interface CustomMultiDropDownListRef {
  clearSearch: () => void;
  getSelectedValues: () => DropDownListParams[];
  focusSearch: () => void;
}

type DropDownListProps = {
  title: string;
  allowCustomEntry?: boolean;
  options: Array<DropDownListParams>;
  parentStyle?: StyleProp<ViewStyle>;
  mainContainerStyle?: StyleProp<ViewStyle>;
  headerStyle?: StyleProp<TextStyle>;
  control: Control<any>;
  fieldName: string;
  headerTitle: string;
  placeholder: string;
  error?: string;
  isSearchable?: boolean;
  selected?: string[];
  isMultiSelect?: boolean;
  onSelect: (value: DropDownListParams[]) => void;
  onPress?: () => void;
  onChangeInput?: (text: string) => void;
  onAddPress?: (text?: string) => void;
  onCloseDropDown?: (value: DropDownListParams[]) => void;
};

export const CustomMultiDropDownList = forwardRef<
  CustomMultiDropDownListRef,
  DropDownListProps
>(
  (
    {
      options,
      title,
      onSelect,
      control,
      fieldName,
      placeholder,
      headerTitle,
      onChangeInput,
      onAddPress,
      selected,
      mainContainerStyle,
      headerStyle,
      isSearchable = true,
      allowCustomEntry = false,
      isMultiSelect = true,
      onCloseDropDown,
    },
    ref,
  ) => {
    const {t} = useTranslation('generic');
    const reduceMotion = useReducedMotion();
    const sheetRef = useRef<BottomSheetModal | null>(null);
    const searchInputRef = useRef<TextInput>(null);
    const addInputRef = useRef<TextInput>(null);
    const selectedRef = useRef<DropDownListParams[]>([]);
    const [searchText, setSearchText] = useState('');
    const [selectedValues, setSelectedValues] = useState<string[]>([]);

    const debouncedSearchInput = useDebouncedValue(searchText, 600);

    useEffect(() => {
      if (Array.isArray(selected)) {
        const selectedOptions = options.filter(opt =>
          selected.map(String).includes(String(opt.id)),
        );
        const selectedValuesFromOptions = selectedOptions.map(opt =>
          String(opt.value),
        );
        setSelectedValues(selectedValuesFromOptions);
        selectedRef.current = selectedOptions;
      }
    }, [selected, options]);

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

    const handleSelect = useCallback(
      (opt: DropDownListParams) => {
        if (isMultiSelect) {
          const idStr = String(opt.value);
          let newSelected: string[] = [];
          if (selectedValues.includes(idStr)) {
            newSelected = selectedValues.filter(value => value !== idStr);
          } else {
            newSelected = [...selectedValues, idStr];
          }
          setSelectedValues(newSelected);
          const selectedCompanies = options.filter(option =>
            newSelected.includes(String(option.value)),
          );
          selectedRef.current = selectedCompanies;
          onSelect(selectedCompanies);
        } else {
          setSelectedValues([opt.value]);
          selectedRef.current = [opt];
          sheetRef?.current?.close();
          onSelect([opt]);
        }
      },
      [isMultiSelect, selectedValues, options, onSelect],
    );

    const onSelectAll = useCallback(() => {
      const allValues = options.map(opt => String(opt.value));
      const isAllSelected = selectedValues.length === allValues.length;
      if (isAllSelected) {
        setSelectedValues([]);
        onSelect([]);
        selectedRef.current = [];
      } else {
        setSelectedValues(allValues);
        onSelect(options);
        selectedRef.current = options;
      }
    }, [options, selectedValues, onSelect]);

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          opacity={0.6}
          appearsOnIndex={0}
          pressBehavior={'none'}
          disappearsOnIndex={-1}
        />
      ),
      [],
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

    const getSelectedLabels = useMemo((): string => {
      if (!selectedValues.length) {
        return placeholder;
      }
      return options
        .filter(opt => selectedValues.includes(String(opt.value)))
        .map(opt => opt.label)
        .join(', ');
    }, [selectedValues, options, placeholder]);

    const renderItem = useCallback(
      ({item, index}: {item: DropDownListParams; index: number}) => {
        return (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              handleSelect(item);
            }}
            style={[
              VS.fd_row,
              VS.ai_center,
              VS.jc_space_between,
              VS.ph_15,
              VS.pv_10,
              options.length - 1 !== index && ComponentStyles.optionRow,
            ]}>
            <Text
              fontWeight="quickSandMedium"
              style={[TS.fs_15, CommonStyle.textDimGray]}>
              {item.label}
            </Text>
            {selectedValues.includes(String(item.value)) && (
              <Icons.Check width={Scale(15)} height={Scale(15)} />
            )}
          </TouchableOpacity>
        );
      },
      [options.length, selectedValues, handleSelect],
    );

    // Expose methods via useImperativeHandle
    useImperativeHandle(
      ref,
      () => ({
        clearSearch: () => {
          setSearchText('');
          addInputRef?.current?.clear();
        },
        getSelectedValues: () => {
          return selectedRef.current;
        },
        focusSearch: () => {
          if (isSearchable && searchInputRef.current) {
            searchInputRef.current.focus();
          }
        },
      }),
      [isSearchable],
    );

    return (
      <View style={[fetchStyles(mainContainerStyle)]}>
        <SelectionInputRHF
          fieldName={fieldName}
          control={control}
          numberOfLines={6}
          textStyle={[AppStyle.flexWrap, VS.pv_5]}
          inputStyle={{minHeight: Scale(50)}}
          displayValue={() => getSelectedLabels}
          headerComponent={
            <InputHeader
              title={headerTitle}
              textWeight="quickSandMedium"
              textStyle={headerStyle}
            />
          }
          placeholder={placeholder}
          onPress={() => {
            sheetRef?.current?.present();
          }}
          renderRightIcon={<Icons.ArrowDown />}
        />

        <BottomSheetModal
          ref={sheetRef}
          snapPoints={['70%']}
          handleComponent={null}
          backdropComponent={renderBackdrop}
          animateOnMount={!reduceMotion}
          keyboardBehavior={Platform.OS === 'ios' ? 'extend' : 'interactive'}
          keyboardBlurBehavior="restore"
          containerStyle={ComponentStyles.sheetBackdrop}
          enableContentPanningGesture={false}
          onDismiss={() => {
            setSearchText('');
            if (searchInputRef.current) {
              searchInputRef.current.blur();
            }
          }}>
          <BottomSheetView style={[VS.ph_10, VS.pt_15, VS.flex_1]}>
            <View style={[VS.flex_1]}>
              <View style={[VS.fd_row, VS.jc_space_between, VS.gap_10]}>
                <View style={[VS.flex_1]}>
                  <InputHeader
                    title={headerTitle ? headerTitle : title}
                    textStyle={VS.flex_1}
                    textWeight="quickSandMedium"
                  />
                </View>
                {isMultiSelect && (
                  <View style={[VS.fd_row, VS.ai_center, VS.gap_8]}>
                    <TouchableOpacity
                      style={[VS.br_10, VS.ai_center]}
                      activeOpacity={0.8}
                      onPress={onSelectAll}>
                      <Text
                        fontWeight="quickSandBold"
                        style={[TS.fs_14, CommonStyle.textPrimary, TS.lh_15]}>
                        {t('selectAll')}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        VS.mt_10,
                        VS.mb_10,
                        VS.ph_15,
                        VS.ai_center,
                        VS.jc_center,
                        CommonStyle.bgPrimary,
                        VS.br_10,
                        VS.pv_7,
                      ]}
                      activeOpacity={0.8}
                      onPress={() => {
                        sheetRef?.current?.close();
                        onCloseDropDown?.(selectedRef.current);
                      }}>
                      <Text
                        fontWeight="quickSandBold"
                        style={[TS.fs_13, CommonStyle.textWhite]}>
                        {t('submit')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              <View
                style={[
                  VS.fd_row,
                  VS.ai_center,
                  VS.jc_space_between,
                  VS.ph_15,
                  VS.mt_5,
                  !allowCustomEntry && !isSearchable && VS.pt_12,
                  ComponentStyles.dropDownContainer,
                ]}>
                {(allowCustomEntry || isSearchable) && (
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
                        const cleaned = text.replace(URL_REGEX.validInput, '');
                        if (cleaned === '' || /^[A-Za-z]/.test(cleaned)) {
                          setSearchText(cleaned);
                          onChangeInput?.(cleaned);
                        }
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
                {allowCustomEntry ? (
                  <TouchableOpacity
                    onPress={() => {
                      onAddPress!(searchText);
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
                style={[VS.flex_1, {height: height / 2 + 50}]}
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
  },
);
