import {NoData, ProgressImage, Text} from '@components';
import {DirectoryDetail, WorkingWithData} from '@data';
import {AppStyle, CommonStyle, TS, VS} from '@theme';
import {setField, validField} from '@util';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {Styles} from './Styles';

type WorkingWithTabProps = {
  info: DirectoryDetail;
};

export default function WorkingWithTab({info}: WorkingWithTabProps) {
  const {t} = useTranslation(['generic']);
  const {working_with_data} = info || {};
  const haveWorkingWith =
    Array.isArray(working_with_data) && working_with_data.length > 0;

  if (!haveWorkingWith) {
    return <NoData message={t('noInformationFound')} />;
  }

  return (
    <View style={[VS.gap_10]}>
      {haveWorkingWith ? (
        <View
          style={[VS.gap_10, CommonStyle.shadowBoxLight, VS.br_10, VS.p_10]}>
          <Text fontWeight="bold" style={[TS.fs_16, TS.tt_capitalize]}>
            {t('workingWith')}
          </Text>
          <View style={[VS.gap_8]}>
            {working_with_data?.map((item: WorkingWithData, index: number) => {
              const {
                register_name,
                user_image,
                user_name,
                role_name,
                register_id,
              } = item || {};
              const name =
                register_id && register_id > 0 ? user_name : register_name;

              return (
                <View key={index} style={[VS.fd_row, VS.ai_center, VS.gap_5]}>
                  {validField(user_image) ? (
                    <ProgressImage
                      source={{uri: user_image}}
                      mode="cover"
                      containerStyle={[
                        Styles.workingWithImage,
                        AppStyle.hideOverFlow,
                      ]}
                    />
                  ) : (
                    <View
                      style={[Styles.workingWithImage, CommonStyle.bgLightGray]}
                    />
                  )}

                  <View style={[VS.flex_1, VS.ph_10, VS.gap_6]}>
                    <Text
                      fontWeight={'semiBold'}
                      style={[
                        TS.fs_16,
                        TS.ta_left,
                        TS.tav_center,
                        TS.tt_capitalize,
                        CommonStyle.textBlack,
                      ]}>
                      {setField(name)}
                    </Text>
                    {validField(role_name) ? (
                      <Text
                        fontWeight={'medium'}
                        numberOfLines={1}
                        style={[
                          TS.fs_13,
                          TS.ta_left,
                          TS.tav_center,
                          TS.tt_capitalize,
                          CommonStyle.textDimGray,
                        ]}>
                        {setField(role_name)}
                      </Text>
                    ) : (
                      <View style={[VS.h_24]} />
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
}
