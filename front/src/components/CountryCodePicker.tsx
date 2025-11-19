import {Countries} from '@assets';
import {
  CountryCodeMethods,
  CountryCodeParams,
  CountryCodePickerParams,
} from '@data';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {AppStyle, Colors, CommonStyle, TS, VS} from '@theme';
import {height, Scale} from '@util';
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {useTranslation} from 'react-i18next';
import {
  FlatList,
  Keyboard,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import {useReducedMotion} from 'react-native-reanimated';
import {ComponentStyles} from './ComponentStyles';
import {InputBox} from './InputBox';
import {Text} from './TextView';
import {VectorIcon} from './VectorIcon';

const CountryCodePicker = forwardRef<
  CountryCodeMethods,
  CountryCodePickerParams
>(({onSelectCountry}, ref) => {
  const reduceMotion = useReducedMotion();
  const {t} = useTranslation('generic');

  const sheetRef = useRef<BottomSheetModal | null>(null);
  const [sections, setSections] = useState<CountryCodeParams[]>([]);

  const generateData = useCallback((arrayItems: CountryCodeParams[]) => {
    setSections(arrayItems ?? []);
  }, []);

  const onPresent = useCallback(() => {
    generateData(Countries);
    sheetRef?.current?.present();
  }, [generateData]);

  const onDismiss = useCallback(() => {
    sheetRef?.current?.forceClose();
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      onPresent,
      onDismiss,
    }),
    [onDismiss, onPresent],
  );

  const searchFromList = (text: string) => {
    const filtered = Countries.filter(
      country =>
        country.name.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
        country.dial_code.toLowerCase().indexOf(text.toLowerCase()) > -1,
    );
    generateData(filtered ?? []);
  };

  const countryItem = useCallback(
    ({item, index}: {item: CountryCodeParams; index: number}) => {
      const {flag, dial_code, name} = item || {};
      let text = `${flag} (${dial_code}) ${name}`;
      return (
        <View
          key={index}
          style={[VS.mt_10, VS.bwb_1, CommonStyle.borderLightGray]}>
          <TouchableOpacity
            style={[VS.fd_row, VS.ai_center, VS.mb_10]}
            onPress={() => {
              Keyboard.dismiss();
              sheetRef?.current?.forceClose();
              setTimeout(() => {
                onSelectCountry?.(item);
              }, 250);
            }}>
            <Text>{text}</Text>
          </TouchableOpacity>
        </View>
      );
    },
    [onSelectCountry],
  );

  const renderEmptyView = () => {
    return (
      <View style={[VS.ai_center, VS.jc_center]}>
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
      <BottomSheetView style={[VS.ph_10, VS.pt_15, VS.gap_10, VS.flex_1]}>
        <TouchableOpacity
          hitSlop={{top: 20, left: 20, right: 20, bottom: 20}}
          onPress={() => {
            sheetRef?.current?.close();
          }}
          style={[VS.as_end, VS.mb_10]}
          activeOpacity={0.8}>
          <VectorIcon
            iconSize={Scale(25)}
            iconColor={Colors.primary}
            iconType={1}
            iconName={'closecircleo'}
          />
        </TouchableOpacity>
        <InputBox
          onChangeText={searchFromList}
          inputMode={'text'}
          keyboardType={'default'}
          maxLength={100}
          returnKeyType={'search'}
          placeholder={t('searchHere')}
        />
        <FlatList
          data={sections}
          extraData={sections}
          renderItem={countryItem}
          style={[VS.mt_10, VS.flex_1, {height: height / 2 + 50}]}
          contentContainerStyle={[AppStyle.flexGrow]}
          ListEmptyComponent={renderEmptyView}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'handled'}
          keyboardDismissMode={'interactive'}
        />
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export {CountryCodePicker};
