import {
  BottomSheetBackdrop,
  BottomSheetBackgroundProps,
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {VS} from '@theme';
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from 'react';
import {
  BackHandler,
  NativeEventSubscription,
  Platform,
  ViewStyle,
} from 'react-native';
import {useReducedMotion} from 'react-native-reanimated';
import {ComponentStyles} from './ComponentStyles';

export type CustomBottomSheetMethods = {
  onPresent: () => void;
  onDismiss: () => void;
};

type CustomBottomSheetParams = {
  children: React.ReactNode;
  scrollable?: boolean;
  height?: number | `${number}%`;
  onDismissSheet?: () => void;
};

const CustomBottomSheet = forwardRef<
  CustomBottomSheetMethods,
  CustomBottomSheetParams
>(({children, scrollable = false, height, onDismissSheet}, ref) => {
  const reduceMotion = useReducedMotion();
  const sheetRef = useRef<BottomSheetModal | null>(null);

  const useBottomSheetBackHandler = (
    bottomSheetRef: React.RefObject<BottomSheetModal | null>,
  ) => {
    const backHandlerSubscriptionRef = useRef<NativeEventSubscription | null>(
      null,
    );
    const handleSheetPositionChange = useCallback<
      NonNullable<BottomSheetModalProps['onChange']>
    >(
      index => {
        const isBottomSheetVisible = index >= 0;
        if (isBottomSheetVisible && !backHandlerSubscriptionRef.current) {
          backHandlerSubscriptionRef.current = BackHandler.addEventListener(
            'hardwareBackPress',
            () => {
              bottomSheetRef.current?.dismiss();
              return true;
            },
          );
        } else if (!isBottomSheetVisible) {
          backHandlerSubscriptionRef.current?.remove();
          backHandlerSubscriptionRef.current = null;
        }
      },
      [bottomSheetRef, backHandlerSubscriptionRef],
    );
    return {handleSheetPositionChange};
  };
  const {handleSheetPositionChange} = useBottomSheetBackHandler(sheetRef);
  const onPresent = useCallback(() => {
    sheetRef?.current?.present();
  }, []);

  const onDismiss = useCallback(() => {
    sheetRef?.current?.forceClose();
  }, []);

  useImperativeHandle(ref, () => ({onPresent, onDismiss}), [
    onPresent,
    onDismiss,
  ]);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackgroundProps) => (
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

  const contentContainerStyle: ViewStyle | undefined = height
    ? {height}
    : undefined;

  return (
    <BottomSheetModal
      ref={sheetRef}
      onChange={handleSheetPositionChange}
      animateOnMount={!reduceMotion}
      backdropComponent={renderBackdrop}
      enablePanDownToClose={false}
      keyboardBehavior={Platform.OS === 'ios' ? 'extend' : 'interactive'}
      keyboardBlurBehavior="restore"
      handleComponent={null}
      onDismiss={() => {
        console.log('onDismiss');

        onDismissSheet?.();
      }}
      containerStyle={[ComponentStyles.sheetBackdrop]}
      enableContentPanningGesture={false}
      snapPoints={height ? [height] : undefined}>
      {scrollable ? (
        <BottomSheetScrollView
          style={[VS.flex_1]}
          contentContainerStyle={contentContainerStyle}
          showsVerticalScrollIndicator={true}
          bounces={true}>
          {children}
        </BottomSheetScrollView>
      ) : (
        <BottomSheetView style={[VS.flex_1, contentContainerStyle]}>
          {children}
        </BottomSheetView>
      )}
    </BottomSheetModal>
  );
});

export {CustomBottomSheet};
