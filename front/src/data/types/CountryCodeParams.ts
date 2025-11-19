export type CountryCodeParams = {
  name: string;
  flag: string;
  code: string;
  dial_code: string;
};

export type CountryCodePickerParams = {
  onSelectCountry: (country: CountryCodeParams) => void;
};

export type CountryCodeMethods = {
  onPresent: () => void;
  onDismiss: () => void;
};
