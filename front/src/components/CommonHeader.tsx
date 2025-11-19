import {Icons} from '@assets';
import {unReadCount} from '@features';
import {CommonStyle, TS, VS} from '@theme';
import {moveBack, navigate} from '@util';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {shallowEqual, useSelector} from 'react-redux';
import {ComponentStyles} from './ComponentStyles';
import {Text} from './TextView';

type CommonHeaderParams = {
  title: String;
  withBackArrow?: boolean;
  isMultiLine?: boolean;
  onPressChat?: () => void;
  onPressBack?: () => void;
  withChatNotification?: boolean;
  onPressNotification?: () => void;
  customRightWidget?: React.ReactNode;
};

const CommonHeader = ({
  title,
  withBackArrow,
  isMultiLine,
  onPressBack,
  withChatNotification = true,
  customRightWidget,
}: CommonHeaderParams) => {
  const {count} = useSelector(unReadCount, shallowEqual);
  return (
    <View style={[CommonStyle.safeAreaSpaceTop]}>
      <View style={[VS.ai_center, VS.fd_row, VS.ph_15, VS.pv_10, VS.pt_4]}>
        <View style={[VS.fd_row, !isMultiLine && VS.ai_center, VS.flex_1]}>
          {withBackArrow && (
            <TouchableOpacity
              style={VS.mr_10}
              hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
              activeOpacity={1}
              onPress={() => {
                if (onPressBack) {
                  onPressBack();
                } else {
                  moveBack();
                }
              }}>
              <Icons.ArrowBack />
            </TouchableOpacity>
          )}

          <View style={[VS.ai_start, VS.jc_center, VS.flex_1]}>
            <Text
              fontWeight="semiBold"
              numberOfLines={isMultiLine ? 4 : 1}
              ellipsizeMode={'tail'}
              style={[TS.fs_20, TS.lh_24, CommonStyle.textBlack]}>
              {title}
            </Text>
          </View>

          {customRightWidget}

          {withChatNotification && (
            <View style={[VS.fd_row, VS.ai_center, VS.jc_center, VS.gap_11]}>
              {/* <TouchableOpacity
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
                      style={[TS.fs_11, CommonStyle.textWhite, TS.lh_9]}>
                      {chatUnreadCount}
                    </Text>
                  </View>
                )}
              </TouchableOpacity> */}
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
          )}
        </View>
      </View>
    </View>
  );
};
export {CommonHeader};
