export enum Keys {
  LOCALE = 'LOCALE',
}

export const URL_REGEX = {
  onlyAlphabets: /^[a-zA-Z ]/gi,
  onlyNumber: /[^0-9]/gi,
  priceValidation: /[^0-9.]|(?<=\..*)\./g,
  passwordRegex:
    /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{8,16}$/,
  emailRegex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  urlRegExp: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
  validInput: /[^\x20-\x7E\n]/g,
  gst: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
};

export const RequestLimit = 10;
export const AppName = 'Soundwale';
