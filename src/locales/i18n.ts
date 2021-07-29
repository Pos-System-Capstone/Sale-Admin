import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
//
import viLocales from './vi.json';
import enLocales from './en.json';
import deLocales from './de.json';
import frLocales from './fr.json';

// ----------------------------------------------------------------------

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translations: enLocales },
      de: { translations: deLocales },
      fr: { translations: frLocales },
      vi: { translations: viLocales }
    },
    lng: localStorage.getItem('i18nextLng') || 'vi',
    fallbackLng: 'vi',
    debug: false,
    ns: ['translations'],
    defaultNS: 'translations',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
