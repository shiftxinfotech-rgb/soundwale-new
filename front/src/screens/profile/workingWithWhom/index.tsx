import {Icons} from '@assets';
import {
  CommonHeader,
  CommonModal,
  CommonModalRef,
  Container,
  CustomBottomSheet,
  CustomBottomSheetMethods,
  SmartFlatList,
  TabTitleItem,
} from '@components';
import {WorkingWithData} from '@data';
import {LazyFetcher, usePaginatedList, useToggleSnackBar} from '@hooks';
import {
  useLazyGetWorkingWithQuery,
  useUpdateWorkingWithRequestMutation,
} from '@services';
import {AppStyle, VS} from '@theme';
import {height, Scale, transformQueryParam} from '@util';
import React, {useCallback, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import ListItem from './ListItem';
import RejectionModal from './RejectionModal';
import SearchUser from './SearchUser';

const WorkingWithWhom = () => {
  const {t} = useTranslation(['generic']);
  const {toggleMessage} = useToggleSnackBar();

  const bottomSheetRef = useRef<CustomBottomSheetMethods>(null);
  const modalRef = useRef<CommonModalRef>(null);

  const [trigger] = useLazyGetWorkingWithQuery();

  const [updateWorkingWithRequest] = useUpdateWorkingWithRequestMutation();

  const [selectedTab, setSelectedTab] = useState<
    'sender' | 'receiver' | 'approved'
  >('sender');

  const fetchPosts: LazyFetcher<WorkingWithData> = async param => {
    const formData = transformQueryParam(param);
    const result = await trigger(formData, false);
    if (result?.status === 'rejected') {
      throw result.error || new Error('API fetch failed');
    }
    const responseData = result.data?.data ?? [];
    const meta = {have_more_records: false};
    return {
      data: responseData,
      meta,
    };
  };

  const controller = usePaginatedList(fetchPosts, {
    extraParams: {type: selectedTab},
    debounceDelay: 300,
    refreshOnFocus: true,
  });

  const onAcceptRequest = useCallback(
    async (id: string) => {
      const formdata = new FormData();
      formdata.append('id', id);
      formdata.append('status', '1');
      const result = await updateWorkingWithRequest(formdata).unwrap();
      const {status, message} = result;
      toggleMessage(message);
      if (status) {
        controller.forceRefresh();
      }
    },
    [controller, updateWorkingWithRequest, toggleMessage],
  );

  const _renderItem = useCallback(
    ({item, index}: {item: WorkingWithData; index: number}) => {
      return (
        <ListItem
          item={item}
          key={index}
          viewType={selectedTab}
          onUpdateRequest={async status => {
            if (status === 0) {
              modalRef?.current?.show({
                title: 'Reject Request',
                customButton: true,
                customView: (
                  <RejectionModal
                    requestId={item.id?.toString() ?? ''}
                    onClose={() => {
                      modalRef?.current?.hide();
                      controller.forceRefresh();
                    }}
                  />
                ),
                onClose: () => {
                  controller.forceRefresh();
                },
              });
            } else {
              onAcceptRequest(item.id?.toString() ?? '');
            }
          }}
        />
      );
    },
    [selectedTab, controller, onAcceptRequest],
  );

  return (
    <Container>
      <View style={[VS.flex_1]}>
        <CommonHeader
          title={t('addWorkingWith')}
          withBackArrow
          withChatNotification={false}
        />
        <View style={[VS.ph_15, VS.fd_row, VS.gap_10, VS.mt_10]}>
          {[
            {title: 'Sent', id: 'sender'},
            {title: 'Received', id: 'receiver'},
            {title: 'Approved', id: 'approved'},
          ].map((item, index) => {
            return (
              <View key={index} style={[VS.flex_1]}>
                <TabTitleItem
                  key={index}
                  title={item.title}
                  isSelected={selectedTab === item.id}
                  onPress={() => {
                    setSelectedTab(
                      item.id as 'sender' | 'receiver' | 'approved',
                    );
                  }}
                />
              </View>
            );
          })}
        </View>
        <SmartFlatList
          controller={controller}
          renderItem={_renderItem}
          showShimmerWhileRefetching={true}
          emptyComponentLabel={t('noDataFound')}
          contentContainerStyle={[VS.gap_15, AppStyle.flexGrow]}
          style={[VS.flex_1, VS.mt_20]}
        />
      </View>

      <TouchableOpacity
        style={[styles.addButton]}
        activeOpacity={1}
        onPress={() => bottomSheetRef.current?.onPresent()}>
        <Icons.CirclePlus />
      </TouchableOpacity>

      <CustomBottomSheet
        ref={bottomSheetRef}
        height={height * 0.7}
        onDismissSheet={() => {
          controller.forceRefresh();
        }}>
        <SearchUser />
      </CustomBottomSheet>

      <CommonModal ref={modalRef} />
    </Container>
  );
};

const styles = StyleSheet.create({
  addButton: {
    position: 'absolute',
    bottom: Scale(16),
    right: Scale(16),
  },
});

export default WorkingWithWhom;
