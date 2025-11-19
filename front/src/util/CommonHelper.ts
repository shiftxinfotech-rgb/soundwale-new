import {AddressComponent, AuthData, DirectoryDetail} from '@data';
import _ from 'lodash';
import moment from 'moment';
import {Linking, Platform, StyleProp, TextStyle, ViewStyle} from 'react-native';
import RNB from 'react-native-blob-util';
import Share from 'react-native-share';
export const fetchStyles = (
  style: StyleProp<ViewStyle | TextStyle>,
): StyleProp<ViewStyle | TextStyle> =>
  Array.isArray(style) ? Object.assign({}, ...style) : style;

export const hexToRgbA = (hex: String, alpha: String) => {
  if (hex !== undefined && hex !== null && hex !== '') {
    var r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
    } else {
      return 'rgb(' + r + ', ' + g + ', ' + b + ')';
    }
  }
  return 'transparent';
};

export const joinError = (err: String[] | null | undefined) =>
  _.join(err ?? []);

export const isValidImageUrl = (url: string | undefined | null): boolean => {
  const regex =
    /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,6}(:\d+)?(\/[a-z0-9-._~:/?#[\]@!$&'()*+,;=]*)?\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i;
  return url ? regex.test(url) : false;
};

export const setField = (field: string | undefined | null) =>
  field !== undefined && field !== null && field !== '' ? field : '-';

export const validField = (field: string | undefined | null) =>
  field !== undefined && field !== null && field !== '';

export const formatDate = (date: string) => {
  const givenDate = moment(date);
  if (givenDate.isSame(moment(), 'day')) {
    return 'Today';
  }
  if (givenDate.isSame(moment().subtract(1, 'day'), 'day')) {
    return 'Yesterday';
  }
  return givenDate.format('MM/DD/YYYY');
};

export const getFriendlyLabel = (dateString: string) => {
  const input = moment(dateString, 'YYYY-MM-DD').startOf('day');
  const today = moment().startOf('day');

  const diff = input.diff(today, 'days');

  if (diff === 0) {
    return 'Today';
  }
  if (diff === -1) {
    return 'Yesterday';
  }
  if (diff === 1) {
    return 'Tomorrow';
  }
  if (diff < 0) {
    return `${Math.abs(diff)} days ago`;
  }
  return `In ${diff} days`;
};

export const statusData = [
  {
    label: 'All',
    value: 'all',
  },
  {
    label: 'Verified',
    value: 'verified',
  },
  {
    label: 'Unlocked',
    value: 'unlocked',
  },
  {
    label: 'New Arrival',
    value: 'new_arrival',
  },
  {
    label: 'Most popular',
    value: 'most_popular',
  },
];

export const openInStore = async () => {
  if (Platform.OS === 'ios') {
    Linking.openURL('https://apps.apple.com');
  } else {
    Linking.openURL(
      'https://play.google.com/store/apps/details?id=com.soundwale',
    );
  }
};

export const openWebsite = async (website: string) => {
  let websiteURL = website;
  if (!/^https?:\/\//i.test(website)) {
    websiteURL = `https://${website}`;
  }
  await Linking.openURL(websiteURL);
};

export const openLocation = async (location: string) => {
  const locationURL = `https://maps.google.com/?q=${location}`;
  await Linking.openURL(locationURL);
};

export const openEmail = async (email: string) => {
  const emailURL = `mailto:${email}`;
  await Linking.openURL(emailURL);
};

export const openDirectoryWhatsApp = async (
  userInfo: DirectoryDetail,
  currentUser: AuthData,
  showMarketingNumber: boolean,
) => {
  const senderName = currentUser?.name || 'a Soundwale user';
  const senderCity = currentUser?.city_name;
  const recipientName = userInfo?.name || 'there';
  const recipientRole = userInfo?.roles?.[0]?.name || 'professional';

  const intro = `Hi ${recipientName}, I came across your profile on Soundwale while looking for a ${recipientRole}`;
  const senderInfo = senderCity
    ? `I'm ${senderName} from ${senderCity}.`
    : `I'm ${senderName}.`;

  const message = `${intro}. ${senderInfo} Let's connect!`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `whatsapp://send?phone=${userInfo.code}${
    showMarketingNumber && validField(userInfo.marketing_mobile_number)
      ? userInfo.marketing_mobile_number
      : userInfo.mobile_number
  }&text=${encodedMessage}`;

  try {
    await Linking.openURL(whatsappURL);
  } catch (error) {
    console.error('An error occurred', error);
  }
};

export const handleShare = async (
  url: string,
  title: string,
  description: string,
  image?: string,
) => {
  try {
    let base64Data = '';
    if (image !== '') {
      const res = await RNB.config({
        fileCache: true,
      }).fetch('GET', image ?? '');
      base64Data = await res.base64();
    }

    const shareOptions = {
      title: title,
      url: base64Data !== '' ? `data:image/png;base64,${base64Data}` : '',
      message: `${title}\n${description}\n${url}`,
      // url: (image && isValidImageUrl(image) ? image : undefined),
    };

    Share.open(shareOptions)
      .then(res => {
        console.log('res', res);
      })
      .catch(err => {
        console.log('res', err);
      });

    // if (result.action === Share.sharedAction) {
    //   if (result.activityType) {
    //     console.log('Shared with', result.activityType);
    //   } else {
    //     console.log('Shared successfully');
    //   }
    // } else if (result.action === Share.dismissedAction) {
    //   console.log('Share dismissed');
    // }
  } catch (error) {
    console.error('Share error:', error);
  }
};

export const formatSeconds = (seconds: number) => {
  let result = {
    seconds: seconds % 60,
    minutes: Math.floor((seconds / 60) % 60),
  };
  return `${result.minutes.toString().padStart(2, '0')}:${result.seconds
    .toString()
    .padStart(2, '0')}`;
};

export const transformQueryParam = (object: unknown): string | undefined => {
  const queryParams = new URLSearchParams();
  let hasValidEntry = false;

  Object.entries(object as Record<string, any>).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      queryParams.append(key, String(value));
      hasValidEntry = true;
    }
  });

  return hasValidEntry ? queryParams.toString() : undefined;
};

export const transformObject = (object: unknown): FormData | undefined => {
  const formData = new FormData();
  let hasValidEntry = false;

  Object.entries(object as Record<string, any>).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      const isBlob = value instanceof Blob;
      formData.append(key, isBlob ? value : String(value));
      hasValidEntry = true;
    }
  });
  return hasValidEntry ? formData : undefined;
};

export const maskString = (
  str?: string,
  visibleStart: number = 2,
  visibleEnd: number = 2,
  maskChar: string = '*',
): string => {
  if (!validField(str)) {
    return '';
  }
  const totalVisible = visibleStart + visibleEnd;
  if (str!.length <= totalVisible) {
    return str!;
  }
  const start = str!.slice(0, visibleStart);
  const end = str!.slice(-visibleEnd);
  const maskedLength = str!.length - totalVisible;
  const masked = maskChar.repeat(maskedLength);
  return `${start}${masked}${end}`;
};

export const formatCurrency = (
  amount: number,
  currencyCode: string,
  locale = 'default',
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
  }).format(amount);
};

export const onSharePost = async (
  postType: string,
  id: string,
  categoriesId: string,
  shareData: {title: string; description: string; image: string},
) => {
  const encodedId = encodeURIComponent(id);
  const encodedCId = encodeURIComponent(categoriesId);
  let link = '';
  if (postType === 'directory') {
    link = `https://soundwale.in/${postType}/post/${encodedId}`;
  } else if (postType === 'home') {
    link = `https://soundwale.in/${postType}/post/${encodedId}`;
  } else {
    link = `https://soundwale.in/${postType}/post/${encodedId}/${encodedCId}`;
  }

  await handleShare(
    link,
    shareData.title,
    shareData.description,
    shareData.image,
  );
  return link;
};

export const openPhoneCall = async (phoneNumber: string) => {
  const phoneURL = `tel:${phoneNumber}`;
  await Linking.openURL(phoneURL);
};

export const openSMS = async (phoneNumber: string, message?: string) => {
  let smsURL = `sms:${phoneNumber}`;

  // If you also want to pre-fill the message body
  if (message) {
    // On iOS it's `&body=`, on Android it's usually `?body=`
    const separator = Platform.OS === 'ios' ? '&' : '?';
    smsURL += `${separator}body=${encodeURIComponent(message)}`;
  }

  try {
    await Linking.openURL(smsURL);
  } catch (error) {
    console.warn('Failed to open SMS app', error);
  }
};

export const formatTimeFromNow = (dateString: string) => {
  const givenDate = moment(dateString);
  const now = moment();
  const diff = givenDate.diff(now, 'days');

  if (diff < 0) {
    return 'Past date';
  }

  if (diff === 0) {
    const hours = givenDate.diff(now, 'hours');
    if (hours === 0) {
      const minutes = givenDate.diff(now, 'minutes');
      return `${minutes} minutes`;
    }
    return `${hours} hours`;
  }

  if (diff === 1) {
    return 'Tomorrow';
  }

  if (diff < 7) {
    return `${diff} days`;
  }

  if (diff < 30) {
    const weeks = Math.floor(diff / 7);
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'}`;
  }

  if (diff < 365) {
    const months = Math.floor(diff / 30);
    return `${months} ${months === 1 ? 'month' : 'months'} `;
  }

  const years = Math.floor(diff / 365);
  return `${years} ${years === 1 ? 'year' : 'years'}`;
};

export const cropToAspectRatio = (
  image: {width: number; height: number; path: string},
  aspect?: {widthRatio: number; heightRatio: number},
  maxWidth = 1000,
  options: {centerCrop?: boolean; autoScaleDown?: boolean} = {},
): {
  finalWidth: number;
  finalHeight: number;
  cropRect: {x: number; y: number; width: number; height: number};
  scale: number;
} => {
  const {width: originalWidth, height: originalHeight} = image;

  // If no aspect provided, use image's original aspect
  const targetAspect = aspect
    ? aspect.widthRatio / aspect.heightRatio
    : originalWidth / originalHeight;

  const currentAspect = originalWidth / originalHeight;

  let cropWidth: number;
  let cropHeight: number;
  let x = 0;
  let y = 0;

  if (aspect && currentAspect > targetAspect) {
    // Too wide → crop width
    cropHeight = originalHeight;
    cropWidth = cropHeight * targetAspect;
    if (options.centerCrop !== false) {
      x = (originalWidth - cropWidth) / 2;
    }
  } else if (aspect && currentAspect < targetAspect) {
    // Too tall → crop height
    cropWidth = originalWidth;
    cropHeight = cropWidth / targetAspect;
    if (options.centerCrop !== false) {
      y = (originalHeight - cropHeight) / 2;
    }
  } else {
    // No aspect passed or same ratio
    cropWidth = originalWidth;
    cropHeight = originalHeight;
  }

  let scale = 1;
  if (options.autoScaleDown !== false && cropWidth > maxWidth) {
    scale = maxWidth / cropWidth;
  }

  const finalWidth = Math.round(cropWidth * scale);
  const finalHeight = Math.round(cropHeight * scale);

  return {
    finalWidth,
    finalHeight,
    cropRect: {
      x: Math.round(x),
      y: Math.round(y),
      width: Math.round(cropWidth),
      height: Math.round(cropHeight),
    },
    scale,
  };
};

export const genderArray = [
  {label: 'Female', value: 'female', id: 'female'},
  {label: 'Male', value: 'male', id: 'male'},
];

export const safeSplit = (value?: string | number) =>
  value && value !== 'all'
    ? value
        .toString()
        .split(',')
        .map(id => id.trim())
    : [];

export const getUserLocation = (
  city_name?: string,
  state_name?: string,
  country_name?: string,
) => {
  let location: string[] = [];
  if (validField(city_name)) {
    location.push(city_name!);
  }
  if (validField(state_name)) {
    location.push(state_name!);
  }
  if (validField(country_name)) {
    location.push(country_name!);
  }
  return location.join(', ');
};

type WithPlaceholder<T> = T & {__isPlaceholder?: boolean};

export const formatGridData = <T>(
  data: T[],
  itemsPerRow: number,
): WithPlaceholder<T>[] => {
  const totalRows = Math.ceil(data.length / itemsPerRow);
  const totalItems = totalRows * itemsPerRow;
  const paddedData: WithPlaceholder<T>[] = data.map(
    item => ({...item} as WithPlaceholder<T>),
  );
  while (paddedData.length < totalItems) {
    paddedData.push({__isPlaceholder: true} as WithPlaceholder<T>);
  }
  return paddedData;
};

export const extractCityStateCountry = (components: AddressComponent[]) => {
  const get = (type: string): string | null =>
    components.find(c => c.types.includes(type))?.long_name || null;

  const city =
    (get('locality') ||
      get('administrative_area_level_3') ||
      get('sublocality') ||
      get('postal_town')) ??
    undefined;

  const state = get('administrative_area_level_1') ?? undefined;
  const country = get('country') ?? undefined;
  const postalCode = get('postal_code') ?? undefined;

  return {city, state, country, postalCode};
};

export const openCommonWhatsApp = async (
  userName: string,
  userCode: string,
  userMobileNumber: string,
) => {
  const msg = `Hi ${userName}, I saw your profile on Soundwale`;
  const encodedMessage = encodeURIComponent(msg);
  const whatsappURL = `whatsapp://send?phone=${userCode}${userMobileNumber}&text=${encodedMessage}`;

  try {
    await Linking.openURL(whatsappURL);
  } catch (error) {
    console.error('An error occurred', error);
  }
};
