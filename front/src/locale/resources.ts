import cmsEn from './translations/cms/en.json';
import contactUsEn from './translations/contactUs/en.json';
import directoryEn from './translations/directory/en.json';
import genericEn from './translations/generic/en.json';
import loginEn from './translations/login/en.json';
import notificationEn from './translations/notification/en.json';
import profileEn from './translations/profile/en.json';
import registerEn from './translations/register/en.json';
import splashEn from './translations/splash/en.json';
import tabNavigatorEn from './translations/tabNavigator/en.json';
import verificationEn from './translations/verification/en.json';
const resources = {
  en: {
    login: loginEn,
    generic: genericEn,
    register: registerEn,
    verification: verificationEn,
    cms: cmsEn,
    notification: notificationEn,
    contactUs: contactUsEn,
    splash: splashEn,
    directory: directoryEn,
    tabNavigator: tabNavigatorEn,
    profile: profileEn,
  },
};

type ResourceType = typeof resources.en;

export {resources, ResourceType};
