import {Countries} from '@assets';
import {CountryCodeParams} from '@data';
import parsePhoneNumberFromString, {
  getCountries,
  getExampleNumber,
} from 'libphonenumber-js';
import examples from 'libphonenumber-js/mobile/examples';
import _ from 'lodash';

const countryList = getCountries();

export const getSampleNumber = (
  code?: CountryCodeParams,
  international = false,
) => {
  try {
    if (code) {
      const picked = code.code?.toLowerCase() ?? 'GB';
      const region = _.find(countryList, item => item.toLowerCase() === picked);
      const phoneNumber = getExampleNumber(region ?? 'GB', examples);
      return international
        ? phoneNumber?.formatNational()
        : phoneNumber?.nationalNumber;
    }
    return '';
  } catch (error) {
    return '';
  }
};

export const fetchCodeInformation = (
  phoneCode?: string,
): CountryCodeParams | undefined => {
  try {
    let sanitized = phoneCode?.toString().replace('+', '');

    const userCountry = _.find(
      Countries,
      item =>
        item.dial_code.toString().replace('+', '') === sanitized ||
        item.code.toString().toLowerCase() === sanitized?.toLocaleLowerCase(),
    );

    return userCountry;
  } catch (error) {
    return undefined;
  }
};

export const fetchDefaultCountry = (phoneCode?: string): CountryCodeParams => {
  try {
    let sanitized = phoneCode?.toString().replace('+', '');

    const userCountry = _.find(
      Countries,
      item =>
        item.dial_code.toString().replace('+', '') === sanitized ||
        item.code.toString().toLowerCase() === sanitized?.toLocaleLowerCase(),
    );

    if (userCountry) {
      return userCountry;
    }
    return _.find(Countries, el => el.code === 'GB')!;
  } catch (error) {
    return _.find(Countries, el => el.code === 'GB')!;
  }
};

export const maskPhoneNumber = (input: string) => {
  const phoneNumber = parsePhoneNumberFromString(input);
  if (!phoneNumber) {
    return input;
  }

  const countryCode = `+${phoneNumber.countryCallingCode}`;
  const nationalNumber = phoneNumber.nationalNumber;

  if (nationalNumber.length <= 4) {
    return `${countryCode} ${nationalNumber}`;
  }
  const first2 = nationalNumber.slice(0, 2);
  const last2 = nationalNumber.slice(-2);
  const middleLength = nationalNumber.length - 4;
  const maskedMiddle = '*'.repeat(middleLength);
  return `${countryCode} ${first2}${maskedMiddle}${last2}`;
};
