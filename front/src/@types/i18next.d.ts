import 'i18next';
import {ResourceType} from '../locale/resources';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'home';
    resources: ResourceType;
  }
}
