import {Icons} from '@assets';
import {
  CommonHeader,
  CustomBottomSheet,
  CustomBottomSheetMethods,
  CustomButton,
  CustomDropDownList,
  CustomLoader,
  CustomRadioGroup,
  InputBoxRHF,
  InputHeader,
  MultiDropDownList,
  MultiDropDownListRef,
  ProgressImage,
  Text,
  UploadMedia,
} from '@components';
import {DropDownListParams, NavigationParamStack} from '@data';
import {useToggleSnackBar, useUserRoles} from '@hooks';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {nanoid} from '@reduxjs/toolkit';
import {
  useAddDashboardPostMutation,
  useAddRequirementPostMutation,
  useDeletePostImageMutation,
  useGetAddPostDataQuery,
  useGetStatesQuery,
  useLazyGetTypeOfManufacturerQuery,
} from '@services';
import {AppStyle, CommonStyle, TS, VS} from '@theme';
import {normalizeApiError, validField} from '@util';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller';
import PickerComponent from './PickerComponent';
import {Styles} from './Styles';

type InputFormParam = {
  description: string;
  images?: {uri: string; id: string}[];
  roles?: DropDownListParams[];
  postLocation?: DropDownListParams[];
  manufacturer?: DropDownListParams[];
  productType?: DropDownListParams;
  product?: DropDownListParams;
};

let postId: number | undefined;
export default function AddPostRequirement() {
  const {t} = useTranslation(['generic', 'register']);
  const {toggleMessage} = useToggleSnackBar();
  const defaultRoles = useUserRoles();
  const {goBack} = useNavigation();
  const {requestFrom, postData, onGoBack} =
    useRoute<RouteProp<NavigationParamStack, 'AddPostRequirement'>>().params ||
    {};

  const {data: addPostData} = useGetAddPostDataQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    skip: requestFrom === 'home',
  });
  const {data: statesList} = useGetStatesQuery('101');
  const [addDashboardPost, {isLoading}] = useAddDashboardPostMutation();
  const [addRequirementPost, {isLoading: isLoadingRequirement}] =
    useAddRequirementPostMutation();
  const [getTypeOfManufacturer, {data: manufacturerList}] =
    useLazyGetTypeOfManufacturerQuery();
  const [deletePostImage, {isLoading: isLoadingDeletePostImage}] =
    useDeletePostImageMutation();

  const sheetRef = useRef<CustomBottomSheetMethods | null>(null);
  const whoSeeRef = useRef<MultiDropDownListRef | null>(null);
  const manufacturerRef = useRef<MultiDropDownListRef | null>(null);
  const locationRef = useRef<MultiDropDownListRef | null>(null);

  const requirements = useMemo(() => {
    return t('generic:postRequirement', {returnObjects: true});
  }, [t]);

  const {control, clearErrors, setValue, watch} = useForm<InputFormParam>({
    defaultValues: {
      description: postData?.description ?? '',
      images: [],
      roles: [],
      postLocation: [],
      manufacturer: [],
      productType: requirements[0],
      product: undefined,
    },
    mode: 'onChange',
    criteriaMode: 'firstError',
    delayError: 100,
    shouldFocusError: true,
  });
  const imgArr = watch('images') ?? [];

  const values = watch();

  const pId = watch('product');

  const [productList, setProductList] = useState<DropDownListParams[]>([]);

  useEffect(() => {
    if (addPostData) {
      const categories = addPostData?.categories ?? [];
      setProductList(categories ?? []);
      if (postData) {
        const rqType = categories.find(
          el => el?.id?.toString() === postData?.product_ids?.toString(),
        );
        setValue('product', rqType);
      }
    }
    return () => {};
  }, [addPostData, setValue, postData]);

  useEffect(() => {
    if (postData) {
      postId = postData.id;
      const {role_id, states, images, manufacturer} = postData || {};
      const roles = role_id?.toString()?.split(',');
      const selectedRole =
        defaultRoles
          ?.filter(el => roles?.includes(el.id?.toString() ?? ''))
          .map(el => {
            return {
              id: el.id,
              label: el.name,
              value: el.slug,
            };
          }) ?? [];
      setValue('roles', selectedRole as DropDownListParams[]);

      const selectedStates =
        states?.map(el => {
          return {
            id: el.id,
            label: el.value,
            value: el.value,
          };
        }) ?? [];
      setValue('postLocation', selectedStates as DropDownListParams[]);

      const selectedManufacturer =
        manufacturer?.map(el => {
          return {
            id: el.id,
            label: el.value,
            value: el.value,
          };
        }) ?? [];
      setValue('manufacturer', selectedManufacturer as DropDownListParams[]);

      setValue(
        'images',
        images?.map(img => ({
          uri: img.image_url ?? '',
          id: (img.id ?? '').toString(),
        })),
      );
      const rqType = requirements.find(
        el => el.id.toString() === postData?.requirment_id?.toString(),
      );
      setValue('productType', rqType);
    } else {
      postId = undefined;
    }
  }, [postData, defaultRoles, setValue, requirements]);

  const handleProductInput = useCallback(
    (input?: string) => {
      const trimmedName = input?.trim();
      if (!trimmedName) {
        return;
      }
      // Validate that input contains only alphabets or starts with alphabets or includes alphabets
      const alphabetRegex = /[a-zA-Z]/;
      const onlyAlphabetsAndSpaces = /^[a-zA-Z\s]+$/;

      // Check if input contains at least one alphabet
      if (!alphabetRegex.test(trimmedName)) {
        toggleMessage('Input must contain at least one alphabet');
        return;
      }
      // Check if input contains only alphabets and spaces
      if (!onlyAlphabetsAndSpaces.test(trimmedName)) {
        toggleMessage('Input must contain only alphabets and spaces');
        return;
      }

      const productExists = productList.some(el => {
        if (el.label) {
          return el.label.toLowerCase() === trimmedName.toLowerCase();
        }
        if (el.title) {
          return el.title.toLowerCase() === trimmedName.toLowerCase();
        }
        return false;
      });

      if (productExists) {
        toggleMessage(t('productNameAlreadyExists'));
        return;
      }

      const formattedValue: DropDownListParams = {
        label: trimmedName,
        value: trimmedName,
        id: `c_${nanoid(5)}`,
      };
      setProductList(old => [formattedValue, ...old]);
    },
    [productList, t, toggleMessage],
  );

  const addHomeRequirements = useCallback(
    async (formData: FormData) => {
      try {
        const result = await addDashboardPost(formData).unwrap();
        const {message, status} = result;
        toggleMessage(message);
        if (status) {
          postId = undefined;
          goBack();
          setTimeout(() => {
            onGoBack?.();
          }, 100);
        }
      } catch (error) {
        const {message} = normalizeApiError(error);
        toggleMessage(message);
      }
    },
    [addDashboardPost, goBack, toggleMessage, onGoBack],
  );

  const addOtherRequirements = useCallback(
    async (formData: FormData, type: 'buyer' | 'seller') => {
      try {
        const result = await addRequirementPost({
          data: formData,
          type,
        }).unwrap();
        const {message, status} = result;
        toggleMessage(message);
        if (status) {
          postId = undefined;
          goBack();
          setTimeout(() => {
            console.log('here...');
            onGoBack?.();
          }, 100);
        }
      } catch (error) {
        const {message} = normalizeApiError(error);
        toggleMessage(message);
      }
    },
    [addRequirementPost, goBack, toggleMessage, onGoBack],
  );

  const onSubmit = useCallback(async () => {
    try {
      const {
        description,
        images,
        roles,
        postLocation,
        manufacturer,
        productType,
        product,
      } = values || {};

      if (!validField(description)) {
        toggleMessage('Description is required');
        return;
      }

      if (requestFrom !== 'home') {
        if (!product) {
          toggleMessage('Product is required');
          return;
        }
      }

      const formdata = new FormData();

      if (postId) {
        formdata.append('id', postId.toString());
      }
      formdata.append('role_id', roles?.map(el => el.id).join(',') ?? '');
      formdata.append(
        'state_id',
        postLocation?.map(el => el.id).join(',') ?? '',
      );
      formdata.append('description', description ?? '');

      if (roles?.some(el => el.value.toLowerCase() === 'manufacturer')) {
        formdata.append(
          'manufacturer_id',
          manufacturer?.map(el => el.id).join(',') ?? '',
        );
      }

      if (productType && requestFrom !== 'home') {
        formdata.append('requirment_id', productType.id ?? '');
      }
      if (product) {
        const haveProduct = product?.id?.toString()?.startsWith('c_')
          ? false
          : true;
        formdata.append(
          'product_ids',
          haveProduct ? product.id ?? '' : product.value ?? '',
        );
      }
      if (images && images.length > 0) {
        images?.forEach(el => {
          if (el.id === '') {
            if (validField(el.uri) && el.uri) {
              const name = el.uri.split('/').pop() ?? 'images.jpg';
              const ext = name.split('.').pop()?.toLowerCase() || 'jpg';
              formdata.append('images[]', {
                uri: el.uri,
                name,
                type: `image/${ext}`,
              });
            }
          }
        });
      }

      if (requestFrom === 'home') {
        await addHomeRequirements(formdata);
      } else {
        await addOtherRequirements(formdata, requestFrom);
      }
    } catch (error: unknown) {
      const {message} = normalizeApiError(error);
      if (message) {
        toggleMessage(message);
      } else {
        toggleMessage(t('generic:serverError'));
      }
    }
  }, [
    addHomeRequirements,
    addOtherRequirements,
    t,
    toggleMessage,
    values,
    requestFrom,
  ]);

  return (
    <View style={[VS.flex_1, CommonStyle.bgWhite]}>
      <CommonHeader
        title={'What’s on your mind?'}
        withBackArrow
        withChatNotification={false}
        isMultiLine={false}
        customRightWidget={
          <CustomButton
            buttonTitle="Post"
            onPress={onSubmit}
            containerStyle={[Styles.buttonHeight, VS.pv_5]}
            titleStyle={[TS.fs_14]}
          />
        }
      />
      <KeyboardAwareScrollView
        contentContainerStyle={[AppStyle.flexGrow]}
        showsVerticalScrollIndicator={false}
        ScrollViewComponent={ScrollView}
        alwaysBounceVertical={false}>
        <View style={[VS.flex_1, VS.ph_16, VS.gap_10]}>
          {requestFrom !== 'home' ? (
            <>
              <Text
                style={[TS.fs_15, TS.tt_capitalize]}
                fontWeight="quickSandMedium">
                {t('productType')}
              </Text>
              <Controller
                control={control}
                name="productType"
                render={({field: {value, onChange}}) => (
                  <CustomRadioGroup
                    options={requirements ?? []}
                    value={value?.value}
                    onChange={onChange}
                  />
                )}
              />
              <CustomDropDownList
                fieldName="product"
                options={productList ?? []}
                title={t('addOtherProduct')}
                headerTitle={t('product')}
                isSearchable
                withClear
                placeholder={t('selectProduct')}
                control={control}
                selected={pId?.label ?? ''}
                onAddPress={handleProductInput}
                displayValue={val => val.label}
                onPress={() => {
                  clearErrors('product');
                }}
                isAdd={true}
                onSelect={__ => {}}
                onClear={() => {
                  clearErrors(['product']);
                  setValue('product', undefined, {shouldValidate: false});
                }}
              />
            </>
          ) : null}
          <View style={[VS.flex_1]}>
            <InputBoxRHF
              fieldName="description"
              control={control}
              placeholder={t('enterProductDetails')}
              multiline={true}
              parentStyle={[AppStyle.fullHeight, AppStyle.fullWidth]}
              textInputStyle={[
                AppStyle.fullHeight,
                AppStyle.fullWidth,
                TS.tav_top,
              ]}
              inputStyle={[AppStyle.fullHeight, AppStyle.fullWidth, VS.bw_0]}
            />
          </View>
          <Controller
            control={control}
            name="images"
            render={({field}) => (
              <View>
                {field?.value?.length && field?.value?.length > 0 ? (
                  <>
                    <InputHeader title="Media" textWeight="semiBold" />
                    <View style={[VS.fd_row, VS.fw_wrap, VS.gap_10]}>
                      {field.value?.map((el, index) => {
                        return (
                          <View key={index}>
                            <ProgressImage
                              source={{uri: el.uri}}
                              imageStyle={[VS.br_15]}
                              containerStyle={[Styles.shopImageContainer]}
                            />
                            <TouchableOpacity
                              onPress={async () => {
                                const newImgArr = imgArr.filter(
                                  (__, i) => i !== index,
                                );
                                setValue('images', newImgArr);
                                if (el.id && validField(el.id)) {
                                  const formdata = new FormData();
                                  formdata.append('id', el.id);
                                  formdata.append('type', requestFrom ?? '');
                                  await deletePostImage({
                                    data: formdata,
                                  }).unwrap();
                                }
                              }}
                              style={[
                                Styles.shopImageDelete,
                                VS.pt_5,
                                VS.ai_center,
                                VS.jc_center,
                              ]}>
                              <Icons.Delete />
                            </TouchableOpacity>
                          </View>
                        );
                      })}
                    </View>
                  </>
                ) : null}
              </View>
            )}
          />
        </View>
        <View style={[VS.h_2, CommonStyle.bgDimGray, VS.mv_15]} />

        <View style={[VS.ph_10, VS.gap_10]}>
          <PickerComponent
            icon={<Icons.SelectPhoto />}
            title="Media"
            subtitle="Upload photos for this post"
            onPress={() => sheetRef?.current?.onPresent()}
          />
          <PickerComponent
            icon={<Icons.WhoCanSee />}
            title="Users"
            subtitle="Pick the user category for this post"
            onPress={() => whoSeeRef?.current?.onPresentSheet()}
          />
          <PickerComponent
            icon={<Icons.PostLocation />}
            title="Location"
            subtitle="Set the location visibility for this post"
            onPress={() => locationRef?.current?.onPresentSheet()}
          />
        </View>
      </KeyboardAwareScrollView>

      <CustomBottomSheet ref={sheetRef}>
        <UploadMedia
          croppingOptions={{
            cropperCircleOverlay: false,
            freeStyleCropEnabled: true,
            multiple: true,
            mediaType: 'photo',
          }}
          onSelectMedia={result => {
            if (result !== null) {
              const resultArray = Array.isArray(result) ? result : [result];
              const validImgArr = resultArray.filter(
                img => img && img.path && img.path.trim() !== '',
              );
              const newImgArr = [...imgArr, ...validImgArr];
              clearErrors('images');
              setValue(
                'images',
                newImgArr.map(img => ({
                  uri: img.path ?? img.uri ?? '',
                  id: img.id ?? '',
                })),
              );
            }
          }}
          onCloseAction={() => sheetRef?.current?.onDismiss()}
        />
      </CustomBottomSheet>

      <MultiDropDownList
        ref={whoSeeRef}
        options={
          defaultRoles?.map(el => {
            return {
              id: el.id ?? '',
              label: el.name ?? '',
              value: el.slug ?? '',
            };
          }) as DropDownListParams[]
        }
        title="Who can see this post?"
        selected={values.roles?.map(el => el.id?.toString() ?? '') ?? []}
        onCloseDropDown={async (el: DropDownListParams[]) => {
          setValue('roles', el);
          const haveManufacturer = el.some(im => im.value === 'manufacturer');
          if (haveManufacturer) {
            await getTypeOfManufacturer('').unwrap();
            manufacturerRef?.current?.onPresentSheet();
          }
        }}
        onSelect={function (__: DropDownListParams[]): void {}}
      />
      <MultiDropDownList
        ref={manufacturerRef}
        options={manufacturerList ?? []}
        selected={values.manufacturer?.map(el => el.id?.toString() ?? '') ?? []}
        title="Type of Manufacturer"
        onSelect={(__: DropDownListParams[]) => {}}
        onCloseDropDown={(el: DropDownListParams[]) => {
          setValue('manufacturer', el);
        }}
      />
      <MultiDropDownList
        ref={locationRef}
        options={statesList ?? []}
        title="Post Location"
        selected={values.postLocation?.map(el => el.id?.toString() ?? '') ?? []}
        onSelect={(__: DropDownListParams[]) => {}}
        onCloseDropDown={(el: DropDownListParams[]) => {
          setValue('postLocation', el);
        }}
      />
      {(isLoading || isLoadingRequirement || isLoadingDeletePostImage) && (
        <CustomLoader />
      )}
    </View>
  );
}
