import ptPT from "./pt-PT.json";
import enGB from "./en-GB.json";

import i18n from "i18next";
import detector from "i18next-browser-languagedetector";

const resources = {
  pt: {
    translation: ptPT,
  },
  en: {
    translation: enGB,
  },
};

i18n.use(detector).init({
  resources,
  lng: "en",
  fallbackLng: "en", // use en if detected lng is not available

  keySeparator: false, // we do not use keys in form messages.welcome

  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
