import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {resources} from './resources';

const NAMESPACES = Object.keys(resources.en);

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  ns: NAMESPACES,
  defaultNS: 'home',
  compatibilityJSON: 'v4',
  debug: false,
  interpolation: {escapeValue: false},
  react: {useSuspense: true},
});
export default i18n;
