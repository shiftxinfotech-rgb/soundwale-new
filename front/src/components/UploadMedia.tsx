import {VS} from '@theme';
import {cropToAspectRatio, Scale} from '@util';
import React, {useCallback} from 'react';

import {TouchableOpacity, View} from 'react-native';
import ImagePicker, {
  ImageOrVideo,
  openCropper,
  Options,
} from 'react-native-image-crop-picker';
import {AppStyle, Colors, TS} from '../theme';
import {Text} from './TextView';
import {VectorIcon} from './VectorIcon';

type AspectRatio = {
  customCropper?: boolean;
  widthRatio?: number;
  heightRatio?: number;
};

const generalOptions: Options = {
  cropping: false,
  avoidEmptySpaceAroundImage: true,
  cropperCircleOverlay: true,
  freeStyleCropEnabled: false,
  includeBase64: false,
  showCropFrame: true,
  showCropGuidelines: true,
};

type UploadMediaParams = {
  onSelectMedia: (media: ImageOrVideo | null) => void;
  onCloseAction: () => void;
  croppingOptions?: Options & AspectRatio;
};

const UploadMedia = ({
  onSelectMedia,
  croppingOptions,
  onCloseAction,
}: UploadMediaParams) => {
  const pickFromCamera = useCallback(async () => {
    try {
      const result = await ImagePicker.openCamera({
        ...generalOptions,
        ...croppingOptions,
      });
      if (result && result !== undefined && result !== null) {
        if (croppingOptions?.customCropper) {
          const {finalHeight, finalWidth} = cropToAspectRatio(
            result,
            croppingOptions?.widthRatio && croppingOptions?.heightRatio
              ? {
                  widthRatio: croppingOptions.widthRatio,
                  heightRatio: croppingOptions.heightRatio,
                }
              : undefined,
          );
          const cropperResult = await openCropper({
            path: result.path,
            mediaType: 'photo',
            cropping: true,
            width: finalWidth,
            height: finalHeight,
            cropperCircleOverlay: false,
          });
          onSelectMedia(cropperResult);
        } else {
          onSelectMedia(result);
        }
      } else {
        onSelectMedia(null);
      }
    } catch (error) {
      onSelectMedia(null);
    }
  }, [croppingOptions, onSelectMedia]);

  const pickFromGallery = useCallback(async () => {
    try {
      const result = await ImagePicker.openPicker({
        ...generalOptions,
        ...croppingOptions,
      });
      if (result && result !== undefined && result !== null) {
        if (croppingOptions?.customCropper) {
          const {finalHeight, finalWidth} = cropToAspectRatio(
            result,
            croppingOptions?.widthRatio && croppingOptions?.heightRatio
              ? {
                  widthRatio: croppingOptions.widthRatio,
                  heightRatio: croppingOptions.heightRatio,
                }
              : undefined,
          );
          const cropperResult = await openCropper({
            path: result.path,
            mediaType: 'photo',
            cropping: true,
            width: finalWidth,
            height: finalHeight,
            cropperCircleOverlay: false,
          });
          onSelectMedia(cropperResult);
        } else {
          onSelectMedia(result);
        }
      } else {
        onSelectMedia(null);
      }
    } catch (error) {
      onSelectMedia(null);
    }
  }, [croppingOptions, onSelectMedia]);

  return (
    <View style={[AppStyle.fullWidth, VS.ai_center, VS.ph_15, VS.pv_30]}>
      <View style={[VS.fd_row, VS.mt_10, VS.ai_center, VS.jc_center]}>
        <TouchableOpacity
          style={[VS.flex_1, VS.ai_center]}
          activeOpacity={1}
          onPress={() => {
            onCloseAction();
            pickFromGallery();
          }}>
          <VectorIcon
            iconColor={Colors.primary}
            iconName="folder-open"
            iconSize={Scale(40)}
            iconType={1}
          />
          <Text fontWeight="medium" style={[VS.pt_5, TS.fs_14]}>
            {'Gallery'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[VS.flex_1, VS.ai_center]}
          activeOpacity={1}
          onPress={() => {
            onCloseAction();
            pickFromCamera();
          }}>
          <VectorIcon
            iconColor={Colors.primary}
            iconName="camera"
            iconSize={Scale(40)}
            iconType={2}
          />
          <Text fontWeight="medium" style={[VS.pt_5, TS.fs_14]}>
            {'Camera'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export {UploadMedia};
