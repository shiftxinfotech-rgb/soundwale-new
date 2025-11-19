import {height, Scale, width} from '@util';
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {Colors, CommonStyle, TS, VS} from '../theme';
import {ComponentStyles} from './ComponentStyles';
import {CustomButton} from './CustomButton';
import {Text} from './TextView';
import {Icons} from '@assets';

export type CommonModalRef = {
  show: (params: {
    title?: string;
    content?: string;
    buttonTitle?: string;
    isCancel?: boolean;
    icon?: React.ReactNode;
    customView?: React.ReactNode;
    customButton?: boolean;
    onClose?: () => void;
    onConfirm?: () => void; // Add optional confirm callback
  }) => void;
  hide: () => void;
  present?: (params: {title?: string; customButton?: boolean}) => void;
};

const CommonModal = forwardRef<CommonModalRef>((_, ref) => {
  const {t} = useTranslation('generic');
  const [visible, setVisible] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [modalCustomView, setModalCustomView] =
    useState<React.ReactNode | null>(null);
  const [buttonCancel, setButtonCancel] = useState(false);
  const [buttonText, setButtonText] = useState('');
  const [showCustomButton, setShowCustomButton] = useState(false);
  const [onCloseCallback, setOnCloseCallback] = useState<() => void>(() => {});
  const [onConfirmCallback, setOnConfirmCallback] = useState<() => void>(
    () => {},
  ); // Add confirm callback state

  const hide = useCallback(() => {
    setVisible(false);
    setModalContent('');
    setShowCustomButton(false);
    setModalTitle('');
    setButtonCancel(false);
    setButtonText('');
    setOnCloseCallback(() => {});
    setOnConfirmCallback(() => {}); // Reset confirm callback
    onCloseCallback?.();
  }, [onCloseCallback]);

  // Add new function to handle confirm button press
  const handleConfirm = useCallback(() => {
    onConfirmCallback?.();
    hide();
  }, [onConfirmCallback, hide]);

  useImperativeHandle(ref, () => ({
    show: ({
      title,
      isCancel,
      content,
      onClose,
      onConfirm, // Add onConfirm parameter
      customView,
      customButton,
      buttonTitle = t('ok'),
    }) => {
      setModalTitle(title ?? '');
      setButtonCancel(isCancel ?? false);
      setModalContent(content ?? '');
      setButtonText(buttonTitle);
      setShowCustomButton(customButton ?? false);
      setModalCustomView(customView ?? null);
      setOnCloseCallback(() => onClose || (() => {}));
      setOnConfirmCallback(() => onConfirm || (() => {})); // Set confirm callback
      setVisible(true);
    },
    hide,
    present: ({title, customButton}) => {
      setShowCustomButton(customButton ?? false);
      setModalTitle(title ?? '');
      setVisible(true);
    },
  }));

  return (
    <View style={ComponentStyles.modalWrapper}>
      <Modal
        animationType={'none'}
        transparent
        statusBarTranslucent
        hardwareAccelerated
        visible={visible}
        style={[VS.flex_1]}
        onRequestClose={hide}>
        <GestureHandlerRootView style={[VS.flex_1]}>
          <View
            pointerEvents="box-none"
            style={[
              VS.flex_1,
              ComponentStyles.modalBgColor,
              VS.ai_center,
              VS.jc_center,
            ]}>
            <TouchableWithoutFeedback onPress={hide}>
              <View style={StyleSheet.absoluteFill} pointerEvents="box-only" />
            </TouchableWithoutFeedback>
            <View
              style={[
                ComponentStyles.overlayBox,
                CommonStyle.shadowBox,
                CommonStyle.commonBorderExtraLarge,
                {
                  width: width - Scale(50),
                  maxHeight: height * 0.8,
                },
              ]}>
              <View
                style={[
                  VS.fd_row,
                  VS.ai_center,
                  VS.pv_17,
                  VS.ph_14,
                  VS.jc_space_between,
                  ComponentStyles.modalHeader,
                ]}>
                <Text
                  fontWeight="bold"
                  style={[TS.fs_18, CommonStyle.textWhite, TS.lh_22]}>
                  {modalTitle}
                </Text>
                <TouchableOpacity
                  hitSlop={{top: 20, left: 20, right: 20, bottom: 20}}
                  onPress={() => setVisible(false)}
                  activeOpacity={0.8}>
                  <Icons.Close color={Colors.white} size={Scale(16)} />
                </TouchableOpacity>
              </View>

              {modalContent !== '' && (
                <View style={[VS.ai_center]}>
                  <Text
                    fontWeight="quickSandSemiBold"
                    style={[
                      TS.fs_18,
                      TS.ta_center,
                      TS.lh_28,
                      TS.pt_18,
                      {width: buttonCancel ? width * 0.4 : width * 0.6},
                    ]}>
                    {modalContent}
                  </Text>
                </View>
              )}
              {modalCustomView && modalCustomView}

              {!showCustomButton && (
                <View
                  style={[
                    VS.fd_row,
                    VS.mt_20,
                    VS.mb_19,
                    VS.ai_center,
                    VS.jc_center,
                  ]}>
                  {buttonCancel && (
                    <CustomButton
                      onPress={() => setVisible(false)}
                      buttonTitle={'Cancel'.toLocaleUpperCase()}
                      containerStyle={ComponentStyles.cancelButton}
                      wrapperStyle={[]}
                      titleStyle={[TS.fs_14, CommonStyle.textCancel]}
                    />
                  )}
                  <CustomButton
                    onPress={handleConfirm} // Use handleConfirm instead of hide
                    buttonTitle={buttonText.toLocaleUpperCase()}
                    titleStyle={[TS.fs_14]}
                    textFontWeight="quickSandBold"
                    containerStyle={
                      buttonCancel
                        ? [
                            ComponentStyles.cancelButton,
                            {backgroundColor: Colors.primary},
                          ]
                        : ComponentStyles.modalButton
                    }
                    wrapperStyle={[buttonCancel && VS.ml_15]}
                  />
                </View>
              )}
            </View>
          </View>
        </GestureHandlerRootView>
      </Modal>
    </View>
  );
});
export {CommonModal};
