import {Text} from '@components';
import {DirectoryDetail} from '@data';
import {CommonStyle, TS, VS} from '@theme';
import {Scale} from '@util';
import React, {useCallback, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {checkRole} from './Util';

const ChildTabs = ({
  info,
  onPressTab,
}: {
  info: DirectoryDetail;
  onPressTab: (tab: string) => void;
}) => {
  const {t} = useTranslation(['generic', 'register']);
  const [activeIndex, setActiveIndex] = useState('About');

  const {roles} = info || {};

  const haveRole = useCallback(
    (roleNames: string[]) => {
      return checkRole(roles || [], roleNames);
    },
    [roles],
  );

  const tabMenus = useMemo(() => {
    const menuArray: {key: string; label: string}[] = [];
    menuArray.push({key: 'About', label: t('directoryTab.about')});

    if (haveRole(['rental_company'])) {
      menuArray.push({
        key: 'Sound Inventory',
        label: t('directoryTab.soundInventory'),
      });
    }
    if (
      haveRole([
        'rental_company',
        'sound_engineer',
        'dj_operator',
        'sound_academy',
        'recording_studio',
        'helper',
      ])
    ) {
      menuArray.push({
        key: 'Working With',
        label: t('directoryTab.workingWith'),
      });
    }

    if (haveRole(['sound_engineer', 'dj_operator'])) {
      menuArray.push({
        key: 'Operating Mixer',
        label: t('directoryTab.operatingMixer'),
      });
    }

    if (
      haveRole(['dealer_supplier_distributor_importer', 'sound_automation'])
    ) {
      menuArray.push({
        key: 'Product Info',
        label: t('directoryTab.productInfo'),
      });
    }
    if (
      haveRole([
        'manufacturer',
        'dealer_supplier_distributor_importer',
        'repairing_shop_spare_parts',
        'service_center',
        'sound_automation',
      ])
    ) {
      menuArray.push({
        key: 'Service Center',
        label: t('directoryTab.serviceCenter'),
      });
    }

    if (haveRole(['manufacturer'])) {
      menuArray.push({
        key: 'Manufacturer Product',
        label: t('directoryTab.manufacturerProduct'),
      });
    }
    if (
      haveRole([
        'manufacturer',
        'repairing_shop_spare_parts',
        'service_center',
        'sound_automation',
        'dealer_supplier_distributor_importer',
      ])
    ) {
      menuArray.push({key: 'Spare Part', label: t('directoryTab.sparePart')});
    }

    if (
      haveRole([
        'manufacturer',
        'dealer_supplier_distributor_importer',
        'sound_academy',
        'repairing_shop_spare_parts',
        'service_center',
        'sound_automation',
        'artist',
      ])
    ) {
      menuArray.push({
        key: 'Company Info',
        label: t('directoryTab.companyInfo'),
      });
    }

    menuArray.push({
      key: 'Rating & Review',
      label: t('directoryTab.ratingReview'),
    });

    return menuArray;
  }, [haveRole, t]);

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        alwaysBounceVertical={false}
        bounces={false}
        alwaysBounceHorizontal={false}>
        <View
          style={[
            {height: Scale(50)},
            VS.fd_row,
            VS.ph_11,
            VS.gap_15,
            VS.ai_center,
          ]}>
          {tabMenus.map((tab, idx) => (
            <TouchableOpacity
              key={idx}
              activeOpacity={1}
              onPress={() => {
                setActiveIndex(tab.key);
                onPressTab(tab.key);
              }}>
              <Text fontWeight="medium" style={[TS.fs_15]}>
                {tab.label}
              </Text>
              <View
                style={[
                  VS.mt_2,
                  VS.h_2,
                  activeIndex === tab.key
                    ? CommonStyle.bgPrimary
                    : CommonStyle.bgWhite,
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default ChildTabs;
