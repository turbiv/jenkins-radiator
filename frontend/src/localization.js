import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'en',
    debug: true,
    resources: {
      en: {
        "username": "Username",
        "password": "Password",
        "confirmPassword": "Confirm password",
        "firstAndLastName": "First and last name",
        "failedToReigster": "Failed to register",
        "passwordMatchError": "Passwords do not match, please double check.",
        "loginFailError": "Failed to login",
        "missingNameError": "Name is missing.",

      }
    },
    lng: "en",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;