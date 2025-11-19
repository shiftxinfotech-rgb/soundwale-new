import {Icons} from '@assets';
import {
  CommonHeader,
  CommonModal,
  CommonModalRef,
  Container,
  SmartShimmerFlatList,
  Text,
} from '@components';
import {
  GeneralResponse,
  NotificationDeleteRequest,
  NotificationItem,
  NotificationList,
} from '@data';
import {setPushCount, unReadCount} from '@features';
import {useToggleSnackBar} from '@hooks';
import {
  useDeleteNotificationMutation,
  useLazyGetNotificationsQuery,
  useLazyMarkAllNotificationAsReadQuery,
  useMarkIndividualReadMutation,
} from '@services';
import {AppStyle, CommonStyle, TS, VS} from '@theme';
import {getFriendlyLabel, navigate, normalizeApiError} from '@util';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity, View} from 'react-native';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import ItemNotification from './component/NotificationItem';
import NotificationItemShimmer from './component/NotificationItemShimmer';

export default function Notification() {
  const {t} = useTranslation(['notification', 'generic']);
  const modalRef = useRef<CommonModalRef>(null);
  const dispatch = useDispatch();
  const {toggleMessage} = useToggleSnackBar();
  const [deleteNotification, {}] = useDeleteNotificationMutation();
  const [getNotification, {isLoading, isFetching}] =
    useLazyGetNotificationsQuery();
  const [markReadIndividual] = useMarkIndividualReadMutation();
  const [markAllNotificationAsRead, {}] =
    useLazyMarkAllNotificationAsReadQuery();
  const {count} = useSelector(unReadCount, shallowEqual);

  const [notificationArray, setNotificationArray] = useState<
    NotificationList[]
  >([]);

  const loadNotifications = useCallback(async () => {
    setNotificationArray([]);
    const res = await getNotification().unwrap();
    console.log('res', res);

    if (res.data) {
      setNotificationArray(res.data);
    }
  }, [getNotification]);

  const onNotificationDelete = useCallback(
    async (id: number) => {
      try {
        const request: NotificationDeleteRequest = {
          id: id,
        };
        const result = await deleteNotification(request).unwrap();
        const {status, message} = result;
        if (status) {
          loadNotifications();
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
    },
    [deleteNotification, loadNotifications, t, toggleMessage],
  );

  const openNotification = useCallback(
    async (item: NotificationItem) => {
      try {
        if (item.read === 0) {
          const res = await markReadIndividual({
            id: item.id.toString(),
          }).unwrap();

          if (res.status) {
            let oldCount = count > 0 ? count - 1 : 0;
            dispatch(setPushCount(oldCount));
            loadNotifications();
          }
        }

        const {type, relation_id} = item || {};

        switch (type) {
          case 'add_review':
            navigate('DirectoryDetail', {
              id: relation_id,
            });
            break;
          case 'chat':
            navigate('ChatListing');
            break;
          case 'working_with':
            navigate('WorkingWithWhom');
            break;
        }
      } catch (error) {}
    },
    [count, dispatch, loadNotifications, markReadIndividual],
  );

  const deleteAlert = useCallback(
    (id: number) => {
      modalRef?.current?.show({
        title: t('deleteNotification'),
        content: t('deleteNotificationContent'),
        buttonTitle: t('delete'),
        isCancel: true,
        onClose: () => {
          onNotificationDelete(id);
        },
      });
    },
    [onNotificationDelete, t],
  );

  const onMarkAllRead = useCallback(() => {
    markAllNotificationAsRead(undefined)
      .then((response: {data?: GeneralResponse; error?: unknown}) => {
        if (response?.data?.status) {
          modalRef?.current?.show({
            title: t('generic:success'),
            content: response?.data?.message,
            onClose: () => {},
          });
          dispatch(setPushCount(0));
          loadNotifications();
        } else if (response?.data?.message) {
          toggleMessage(response?.data?.message);
        }
      })
      .catch(() => {});
  }, [
    dispatch,
    loadNotifications,
    markAllNotificationAsRead,
    t,
    toggleMessage,
  ]);

  const onRefresh = useCallback(() => {
    loadNotifications();
  }, [loadNotifications]);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  const _renderItem = useCallback(
    ({item, index}: {item: NotificationList; index: number}) => {
      const {date, notifications} = item;
      const dayName = getFriendlyLabel(date);

      return (
        <View key={index}>
          <View
            style={[
              VS.fd_row,
              VS.ai_center,
              VS.jc_space_between,
              VS.ph_15,
              VS.pb_5,
            ]}>
            <Text fontWeight="bold" style={[CommonStyle.textPrimary, TS.fs_20]}>
              {dayName}
            </Text>
            {index === 0 && count > 0 && (
              <TouchableOpacity
                style={[VS.fd_row, VS.ai_center, VS.jc_center]}
                activeOpacity={1}
                onPress={() => onMarkAllRead()}>
                <Text
                  fontWeight="quickSandSemiBold"
                  style={[
                    CommonStyle.textPrimary,
                    TS.lh_17,
                    TS.fs_15,
                    VS.pr_4,
                  ]}>
                  {t('markAllRead')}
                </Text>
                <Icons.RoundCheck />
              </TouchableOpacity>
            )}
          </View>
          {notifications.map((nl, ni) => {
            const {id} = nl;
            return (
              <ItemNotification
                item={nl}
                index={ni}
                key={ni}
                onPress={() => openNotification(nl)}
                onDelete={() => {
                  deleteAlert(id);
                }}
              />
            );
          })}
        </View>
      );
    },
    [count, deleteAlert, onMarkAllRead, openNotification, t],
  );
  const _renderItemShimmer = useCallback(({index}: {index: number}) => {
    return <NotificationItemShimmer key={index} />;
  }, []);

  return (
    <Container>
      <View style={[VS.flex_1]}>
        <CommonHeader
          title={t('notification')}
          withBackArrow
          withChatNotification={false}
        />
        <View style={[VS.flex_1, VS.mt_20]}>
          <SmartShimmerFlatList
            data={notificationArray ?? []}
            isLoading={isLoading}
            isRefetching={isFetching}
            showShimmerWhileRefetching={true}
            isFetchingMore={false}
            hasMore={false}
            renderItem={_renderItem}
            renderShimmerItem={_renderItemShimmer}
            onRefresh={onRefresh}
            contentContainerStyle={[VS.pv_10, AppStyle.flexGrow]}
            style={[VS.flex_1]}
          />
        </View>
        <CommonModal ref={modalRef} />
      </View>
    </Container>
  );
}
