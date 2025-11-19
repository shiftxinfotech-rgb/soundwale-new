import {Icons} from '@assets';
import {logoutCurrentUser, setIsTokenPushed, setPushToken} from '@features';
import {
  useAppDispatch,
  useHasRole,
  useToggleSnackBar,
  useUserInfo,
} from '@hooks';
import {DrawerNavigationProp, useDrawerStatus} from '@react-navigation/drawer';
import {useLazyGetProfileQuery, useLogoutMutation} from '@services';
import {AppStyle, Colors, CommonStyle, TS, VS} from '@theme';
import {
  ChatHelper,
  ChatUnreadCountService,
  navigate,
  navigateAndResetComplete,
  normalizeApiError,
  openInStore,
  Scale,
} from '@util';
import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity, View} from 'react-native';
import {setField, validField} from '../util/CommonHelper';
import {CommonModal, CommonModalRef} from './CommonModal';
import {ComponentStyles} from './ComponentStyles';
import {CustomLoader} from './CustomLoader';
import {ProgressImage} from './ProgressImage';
import {Text} from './TextView';
import {VectorIcon} from './VectorIcon';

type CustomDrawerProps = {
  navigation: DrawerNavigationProp<any>;
};

const CustomDrawer = ({navigation}: CustomDrawerProps) => {
  const modalRef = useRef<CommonModalRef>(null);
  const dispatch = useAppDispatch();
  const [logout, {isLoading}] = useLogoutMutation();
  const {t} = useTranslation(['generic']);
  const {toggleMessage} = useToggleSnackBar();
  const userDetail = useUserInfo();
  const drawerStatus = useDrawerStatus();
  const [getProfile] = useLazyGetProfileQuery();

  const hasRole = useHasRole();

  const menuItems = [
    {label: 'Favorite / Wishlist', value: 'wishList'},
    hasRole(['sound_engineer', 'dj_operator'])
      ? {label: t('operatingMixer'), value: 'addOperatingMixer'}
      : null,
    hasRole(['manufacturer'])
      ? {
          label: t('productCatalogue'),
          value: 'companyPdf',
        }
      : null,
    hasRole([
      'rental_company',
      'manufacturer',
      'repairing_shop_spare_parts',
      'sound_automation',
      'dealer_supplier_distributor_importer',
    ])
      ? {
          label: hasRole(['repairing_shop_spare_parts'])
            ? t('directoryTab.sparePart')
            : t('addSparePart'),
          value: 'addPartsInfo',
        }
      : null,
    hasRole(['manufacturer'])
      ? {
          label: t('serviceCenterInfo'),
          value: 'serviceCenterInformation',
        }
      : null,
    hasRole(['manufacturer'])
      ? {
          label: t('manufacturingProduct'),
          value: 'manufacturingProduct',
        }
      : null,
    hasRole(['dealer_supplier_distributor_importer', 'sound_automation'])
      ? {
          label: t('dealerOfCompany'),
          value: 'dealerOfCompany',
        }
      : null,
    hasRole(['dealer_supplier_distributor_importer', 'sound_automation'])
      ? {
          label: t('distributorOfCompany'),
          value: 'distributorOfCompany',
        }
      : null,
    hasRole(['dealer_supplier_distributor_importer', 'sound_automation'])
      ? {
          label: t('importerOfCompany'),
          value: 'importerOfCompany',
        }
      : null,
    hasRole([
      'sound_academy',
      'dealer_supplier_distributor_importer',
      'repairing_shop_spare_parts',
      'service_center',
      'sound_automation',
      'artist',
    ])
      ? {
          label: hasRole([
            'repairing_shop_spare_parts',
            'service_center',
            'sound_automation',
          ])
            ? t('companyWiseProductPdf')
            : hasRole(['dealer_supplier_distributor_importer'])
            ? t('ourProductPdf')
            : t('myProfilePdf'),
          value: 'companyPdf',
        }
      : null,
    hasRole(['dealer_supplier_distributor_importer', 'sound_automation'])
      ? {
          label: t('productInformation'),
          value: 'productInformation',
        }
      : null,
    hasRole([
      'dealer_supplier_distributor_importer',
      'repairing_shop_spare_parts',
      'service_center',
      'sound_automation',
    ])
      ? {
          label: t('serviceCenterInfo'),
          value: 'serviceCenterInformation',
        }
      : null,
    hasRole(['service_center'])
      ? {
          label: t('addPartsInfo'),
          value: 'addPartsInfo',
        }
      : null,
    !hasRole([
      'dealer_supplier_distributor_importer',
      'manufacturer',
      'repairing_shop_spare_parts',
      'service_center',
      'sound_automation',
      'artist',
      'other',
      'event_management',
    ])
      ? {
          label: hasRole(['sound_academy'])
            ? t('topGraduates')
            : t('addWorkingWith'),
          value: 'addWorkingWith',
        }
      : null,
    {label: 'Rate Us', value: 'rateUs'},
    {label: 'Settings', value: 'settings'},
    {label: 'Contact Us', value: 'contactUs'},
    {label: 'Logout', value: 'logout'},
  ].filter(Boolean);

  useEffect(() => {
    if (drawerStatus === 'open') {
      getProfile(userDetail?.id?.toString() ?? '');
    }
  }, [drawerStatus, getProfile, userDetail?.id]);

  const onLogoutApi = useCallback(async () => {
    try {
      const result = await logout().unwrap();
      const {status, message} = result;
      if (status) {
        // Clean up chat unread count listener
        ChatUnreadCountService.stopRealtimeListener();
        await ChatHelper.logoutUser();
        dispatch(setPushToken(''));
        dispatch(setIsTokenPushed(false));
        dispatch(logoutCurrentUser());
        navigateAndResetComplete('Login');
      } else {
        toggleMessage(message);
      }
    } catch (error: unknown) {
      const {message} = normalizeApiError(error);
      if (message) {
        toggleMessage(message);
      } else {
        toggleMessage(t('generic:serverError'));
      }
    }
  }, [dispatch, logout, t, toggleMessage]);

  const onPressLogout = useCallback(() => {
    modalRef?.current?.show({
      title: 'Logout',
      content: 'Are you sure you want to logout ?',
      isCancel: true,
      buttonTitle: 'Logout',
      onClose: () => {},
      onConfirm: () => {
        onLogoutApi();
      },
    });
  }, [onLogoutApi]);

  const onMenuPress = useCallback(
    (key: string) => {
      if (key !== 'logout') {
        navigation?.closeDrawer();
      }
      switch (key) {
        case 'logout':
          onPressLogout();
          break;
        case 'settings':
          navigate('Settings');
          break;
        case 'contactUs':
          navigate('ContactUs');
          break;
        case 'wishList':
          navigate('Favorite');
          break;
        case 'rateUs':
          openInStore();
          break;
        case 'companyPdf':
          navigate('CompanyPdfListing');
          break;
        case 'productInformation':
          navigate('ProductInfoDealerSupplier');
          break;
        case 'serviceCenterInformation':
          navigate('ServiceCenter', {
            profileData: userDetail,
          });
          break;
        case 'addPartsInfo':
          navigate('AddPartInfo', {
            profileData: userDetail,
          });
          break;
        case 'addWorkingWith':
          navigate('WorkingWithWhom');
          break;
        case 'addOperatingMixer':
          navigate('OperatingMixerScreen');
          break;
        case 'dealerOfCompany':
          navigate('CompanyDealer', {
            type: 'dealer_of_company',
          });
          break;
        case 'distributorOfCompany':
          navigate('CompanyDealer', {
            type: 'distributor_of_company',
          });
          break;
        case 'importerOfCompany':
          navigate('CompanyDealer', {
            type: 'importer_of_company',
          });
          break;
        case 'manufacturingProduct':
          navigate('ManufacturingProduct');
          break;
        default:
          break;
      }
    },
    [navigation, onPressLogout, userDetail],
  );

  const DrawerMenuItem = useCallback(
    ({label, value}: {label: string; value: string}) => {
      return (
        <TouchableOpacity
          key={value}
          activeOpacity={1}
          hitSlop={CommonStyle.hitSlop}
          onPress={() => onMenuPress(value)}
          style={[
            VS.fd_row,
            VS.ai_center,
            VS.jc_space_between,
            // ComponentStyles.drawerMenuItem,
          ]}>
          <Text
            fontWeight="quickSandSemiBold"
            style={[CommonStyle.textBlueGray, TS.fs_17, TS.lh_21]}>
            {label}
          </Text>
          <View style={[VS.mr_5]}>
            <Icons.ArrowNext height={Scale(15)} color={Colors.blueGray} />
          </View>
        </TouchableOpacity>
      );
    },
    [onMenuPress],
  );

  const displayName = useMemo(() => {
    if (
      userDetail?.roles?.some(role =>
        ['sound_provider'].includes(role.slug ?? ''),
      )
    ) {
      return userDetail?.personal_name;
    }
    return '';
  }, [userDetail?.personal_name, userDetail?.roles]);

  return (
    <View
      style={[
        CommonStyle.safeAreaSpaceTop,
        AppStyle.fullHeight,
        CommonStyle.bgWhite,
        AppStyle.fullWidth,
      ]}>
      <View style={VS.flex_1}>
        <TouchableOpacity
          onPress={() => {
            if (
              (userDetail &&
                userDetail?.roles?.some(
                  role => role.slug === 'repairing_shop',
                )) ||
              userDetail?.roles?.some(role => role.slug === 'sound_education')
            ) {
              navigate('EditProfile', {
                profileData: userDetail,
              });
            } else {
              navigate('Profile', {
                userId: userDetail?.id ?? 0,
                userInfo: {
                  name: userDetail?.name ?? '',
                  role: userDetail?.roles?.[0]?.name ?? '',
                  image: userDetail?.image_url ?? '',
                },
              });
            }
            navigation.closeDrawer();
          }}
          activeOpacity={1}
          style={[
            VS.jc_space_between,
            VS.pv_10,
            VS.mt_10,
            {backgroundColor: Colors.veryLightGray},
          ]}>
          <View style={[VS.fd_row, VS.ph_12]}>
            <ProgressImage
              source={{uri: userDetail?.image_url}}
              containerStyle={ComponentStyles.drawerImage}
              imageStyle={{borderRadius: Scale(57)}}
              fallbackComponent={
                <VectorIcon
                  iconColor={Colors.primary}
                  iconName="error"
                  iconSize={Scale(30)}
                  iconType={4}
                />
              }
            />
            <View style={[VS.flex_1]}>
              <View style={[VS.fd_row, VS.ai_center, VS.gap_6]}>
                <Text
                  fontWeight="bold"
                  numberOfLines={2}
                  style={[
                    TS.fs_20,
                    CommonStyle.textPrimary,
                    VS.ml_12,
                    VS.flex_1,
                  ]}>
                  {setField(userDetail?.name)}
                </Text>
                {(userDetail &&
                  userDetail?.roles?.some(
                    role => role.slug === 'repairing_shop',
                  )) ||
                userDetail?.roles?.some(
                  role => role.slug === 'sound_education',
                ) ? (
                  <View style={[VS.ai_center]}>
                    <Icons.Pencil color={Colors.primary} />
                  </View>
                ) : (
                  <View style={[VS.ai_center]}>
                    <Icons.ArrowNext />
                  </View>
                )}
              </View>

              <View style={[VS.ml_10, VS.gap_3]}>
                {validField(displayName) && (
                  <Text
                    fontWeight="medium"
                    numberOfLines={2}
                    style={[TS.fs_14, TS.lh_20, CommonStyle.textBlueGray]}>
                    {setField(displayName)}
                  </Text>
                )}
                {validField(userDetail?.email) && (
                  <View style={[VS.fd_row, VS.ai_center, VS.gap_6]}>
                    <View
                      style={[
                        ComponentStyles.commonBox,
                        VS.ai_center,
                        VS.jc_center,
                      ]}>
                      <Icons.Email color={Colors.blueGray} size={Scale(15)} />
                    </View>
                    <Text
                      numberOfLines={1}
                      style={[
                        TS.fs_13,
                        CommonStyle.textBlueGray,
                        VS.flex_1,
                        TS.ta_left,
                      ]}
                      fontWeight="medium">
                      {setField(userDetail?.email)}
                    </Text>
                  </View>
                )}
                {validField(userDetail?.mobile_number) && (
                  <View style={[VS.fd_row, VS.ai_center, VS.gap_6]}>
                    <View
                      style={[
                        ComponentStyles.commonBox,
                        VS.ai_center,
                        VS.jc_center,
                      ]}>
                      <Icons.CallNow
                        color={Colors.blueGray}
                        width={Scale(15)}
                        height={Scale(15)}
                      />
                    </View>
                    <Text
                      numberOfLines={1}
                      style={[TS.fs_13, CommonStyle.textBlueGray, VS.flex_1]}
                      fontWeight="medium">
                      {setField(userDetail?.code)}{' '}
                      {setField(userDetail?.mobile_number)}
                    </Text>
                  </View>
                )}
                {validField(userDetail?.city_name) &&
                  validField(userDetail?.state_name) &&
                  validField(userDetail?.country_name) && (
                    <View style={[VS.fd_row, VS.ai_center, VS.gap_6]}>
                      <View
                        style={[
                          ComponentStyles.commonBox,
                          VS.ai_center,
                          VS.jc_center,
                        ]}>
                        <Icons.Map size={Scale(15)} />
                      </View>
                      <Text
                        fontWeight="medium"
                        numberOfLines={1}
                        style={[TS.fs_13, CommonStyle.textBlueGray, VS.flex_1]}>
                        {setField(userDetail?.city_name)}
                        {', '}
                        {setField(userDetail?.state_name)}
                        {', '}
                        {setField(userDetail?.country_name)}
                      </Text>
                    </View>
                  )}

                {userDetail?.roles && userDetail?.roles.length > 0 ? (
                  <View style={[VS.fd_row, VS.gap_6, VS.ai_center]}>
                    <View
                      style={[
                        ComponentStyles.commonBox,
                        VS.ai_center,
                        VS.jc_center,
                      ]}>
                      <ProgressImage
                        source={{uri: setField(userDetail?.roles[0].image_url)}}
                        containerStyle={[ComponentStyles.roleImage]}
                      />
                    </View>
                    <Text
                      fontWeight="quickSandMedium"
                      numberOfLines={2}
                      style={[TS.fs_13, CommonStyle.textBlueGray]}>
                      {setField(userDetail?.roles[0].name)}
                    </Text>
                  </View>
                ) : null}
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <View style={[VS.gap_15, VS.mt_25, VS.ph_14]}>
          {menuItems.map(
            item =>
              item && (
                <DrawerMenuItem
                  key={item.value}
                  label={item.label}
                  value={item.value}
                />
              ),
          )}
        </View>
      </View>
      <CommonModal ref={modalRef} />

      {isLoading && <CustomLoader />}
    </View>
  );
};

export {CustomDrawer};
