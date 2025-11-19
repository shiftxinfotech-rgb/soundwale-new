import {Icons} from '@assets';
import {ComponentStyles, Text} from '@components';
import {unReadCount} from '@features';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import {Colors, CommonStyle, TS, VS} from '@theme';
import {navigate, Scale, useChatUnreadCount} from '@util';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {shallowEqual, useSelector} from 'react-redux';

type Props = {
  title: string;
  titleWidget?: React.ReactNode;
  isSupplier?: boolean;
  isBack?: boolean;
  onSupplier?: () => void;
};

export default function TabHeader({
  title,
  titleWidget,
  isSupplier,
  onSupplier,
  isBack,
}: Props) {
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const {count} = useSelector(unReadCount, shallowEqual);
  const chatUnreadCount = useChatUnreadCount();

  return (
    <View style={[CommonStyle.safeAreaSpaceTop]}>
      <View style={[VS.ai_start, VS.fd_row, VS.ph_15, VS.pv_10, VS.gap_5]}>
        <View style={[VS.flex_1, VS.fd_row, VS.ai_start, VS.gap_10]}>
          {isBack ? (
            <TouchableOpacity
              hitSlop={10}
              activeOpacity={1}
              onPress={() => navigation?.goBack()}>
              <Icons.ArrowBack />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              hitSlop={10}
              activeOpacity={1}
              onPress={() => navigation?.openDrawer()}>
              <Icons.Hamburger />
            </TouchableOpacity>
          )}
          <View style={[VS.flex_1]}>
            {isSupplier && (
              <TouchableOpacity
                activeOpacity={1}
                onPress={onSupplier}
                style={[VS.fd_row, VS.ai_center, VS.gap_9]}>
                <Text
                  fontWeight="quickSandMedium"
                  style={[TS.fs_13, TS.lh_16, CommonStyle.textPrimary]}>
                  Supplier Type
                </Text>
                <Icons.ArrowDown
                  color={Colors.primary}
                  width={Scale(10)}
                  height={Scale(10)}
                />
              </TouchableOpacity>
            )}
            <Text fontWeight="semiBold" numberOfLines={2} style={[TS.fs_18]}>
              {title}
            </Text>
            {titleWidget}
          </View>
        </View>
        <View style={[VS.fd_row, VS.ai_center, VS.jc_center, VS.gap_11]}>
          <TouchableOpacity
            accessibilityLabel={'Chat'}
            testID="chat-btn"
            onPress={() => {
              navigate('ChatListing');
            }}
            hitSlop={10}>
            <Icons.Chat />
            {chatUnreadCount > 0 && (
              <View
                style={[
                  ComponentStyles.badge,
                  CommonStyle.bgOrange,
                  VS.ai_center,
                  VS.as_center,
                  VS.jc_center,
                ]}>
                <Text
                  fontWeight="medium"
                  style={[TS.fs_11, CommonStyle.textWhite]}>
                  {chatUnreadCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            accessibilityLabel={'Notification'}
            testID="notification-btn"
            onPress={() => navigate('Notification')}
            hitSlop={10}>
            <Icons.NotificationBell />
            {count > 0 && (
              <View
                style={[
                  ComponentStyles.badge,
                  CommonStyle.bgOrange,
                  VS.ai_center,
                  VS.as_center,
                  VS.jc_center,
                ]}>
                <Text
                  fontWeight="medium"
                  style={[TS.fs_11, CommonStyle.textWhite]}>
                  {count}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
