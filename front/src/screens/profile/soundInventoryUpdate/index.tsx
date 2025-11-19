import {Icons} from '@assets';
import {
  CommonHeader,
  Container,
  CustomButton,
  InputBoxRHF,
  Text,
} from '@components';
import {NavigationParamStack, SoundInventoryFormParam} from '@data';
import {useToggleSnackBar, useUserInfo} from '@hooks';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useUpdateJsonFieldsMutation} from '@services';
import {AppStyle, CommonStyle, TS, VS} from '@theme';
import {normalizeApiError, validField} from '@util';
import React, {useCallback, useEffect} from 'react';
import {useFieldArray, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller';

const SoundInventoryUpdate = () => {
  const {t} = useTranslation(['generic']);
  const {goBack} = useNavigation<NavigationProp<NavigationParamStack>>();
  const {toggleMessage} = useToggleSnackBar();
  const userDetail = useUserInfo();

  const [updateJsonFields, {isLoading}] = useUpdateJsonFieldsMutation();

  const {control, handleSubmit, setValue, setError, watch} =
    useForm<SoundInventoryFormParam>({
      defaultValues: {
        sound_inventory: [],
      },
      mode: 'onChange',
      criteriaMode: 'firstError',
      delayError: 100,
      shouldFocusError: true,
    });

  const {
    fields: soundInventoryFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'sound_inventory',
  });

  const techniciansInfo = watch('sound_inventory');

  const onSubmit = async (data: SoundInventoryFormParam) => {
    // Validate all fields before submission
    const hasInvalid = (data.sound_inventory || []).some(item => {
      const isValidValue = item && item.name.trim() !== '';
      return !isValidValue;
    });

    if (hasInvalid) {
      toggleMessage(t('generic:pleaseFillAllFields'));
      return;
    }

    try {
      const formdata = new FormData();
      const obj = {
        key: 'sound_inventory',
        value:
          data.sound_inventory?.length && data.sound_inventory?.length > 0
            ? data.sound_inventory
            : '',
      };
      formdata.append('data', JSON.stringify(obj));
      console.log('formdata', JSON.stringify(formdata, null, 2));
      const result = await updateJsonFields(formdata).unwrap();
      const {status, message} = result;
      toggleMessage(message);
      if (status) {
        goBack();
      }
    } catch (error: unknown) {
      const {message, errors: fieldErrors} = normalizeApiError(error);
      if (fieldErrors) {
        Object.entries(fieldErrors).forEach(([field, messages]) => {
          if (messages && messages.length > 0) {
            setError(field as keyof SoundInventoryFormParam, {
              type: 'manual',
              message: messages[0],
            });
          }
        });
      } else if (message) {
        toggleMessage(message);
      } else {
        toggleMessage(t('generic:serverError'));
      }
    }
  };

  const addEngineerWithField = useCallback(() => {
    append({name: ''});
  }, [append]);

  // Only run validation when user clicks Add More
  const handleAddMorePress = useCallback(() => {
    let hasEmpty = false;

    if (techniciansInfo && techniciansInfo.length > 0) {
      for (let i = 0; i < techniciansInfo.length; i++) {
        const item = techniciansInfo[i];
        if (!item || item.name.trim() === '') {
          hasEmpty = true;
          break;
        }
      }
    }

    if (hasEmpty) {
      toggleMessage(t('generic:pleaseFillAllFields'));
      return;
    }
    addEngineerWithField();
  }, [techniciansInfo, toggleMessage, t, addEngineerWithField]);

  useEffect(() => {
    try {
      const {sound_inventory} = userDetail || {};
      if (validField(sound_inventory)) {
        let engineerWithArray = JSON.parse(sound_inventory || '');
        if (Array.isArray(engineerWithArray)) {
          setValue('sound_inventory', engineerWithArray);
        }
      } else {
        setValue('sound_inventory', [{name: ''}]);
      }
    } catch (error) {
      setValue('sound_inventory', [{name: ''}]);
    }
  }, [userDetail, setValue]);

  return (
    <Container>
      <View style={[VS.flex_1]}>
        <CommonHeader
          title={t('soundInventory')}
          withBackArrow
          withChatNotification={false}
        />
        <View style={[VS.flex_1, VS.ph_16, VS.pv_10]}>
          <View
            style={[VS.fd_row, VS.gap_10, VS.jc_end, VS.ai_center, VS.mb_16]}>
            <TouchableOpacity
              style={[VS.ph_12, VS.pv_8, CommonStyle.bgPrimary, VS.br_8]}
              onPress={handleAddMorePress}
              activeOpacity={1}>
              <Text
                fontWeight="medium"
                style={[TS.fs_14, CommonStyle.textWhite]}>
                {t('addMore')}
              </Text>
            </TouchableOpacity>
          </View>
          <KeyboardAwareScrollView
            alwaysBounceVertical={false}
            style={[VS.flex_1]}
            contentContainerStyle={[AppStyle.flexGrow]}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={'handled'}
            keyboardDismissMode={'interactive'}
            ScrollViewComponent={ScrollView}>
            <View>
              {soundInventoryFields.map((field, idx) => (
                <View key={field.id} style={[VS.fd_row, VS.ai_start, VS.mb_8]}>
                  <InputBoxRHF
                    fieldName={`sound_inventory.${idx}.name`}
                    control={control}
                    placeholder={t('enterName')}
                    parentStyle={[VS.flex_1]}
                  />
                  <TouchableOpacity
                    onPress={() => remove(idx)}
                    style={[VS.ml_8, VS.mt_15]}>
                    <Icons.Close size={18} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </KeyboardAwareScrollView>
        </View>
        <CustomButton
          buttonTitle={t('submit')}
          isLoading={isLoading}
          wrapperStyle={[VS.mb_20, VS.mh_15]}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </Container>
  );
};

export default SoundInventoryUpdate;
