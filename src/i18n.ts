import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import HttpBackend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

const isDev = import.meta.env.DEV

i18n
  .use(HttpBackend) // Load translations from backend
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // Bind i18next to React
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: isDev, // Enable logging for development
    fallbackLng: 'en', // Default language
    saveMissing: isDev, // you should not use saveMissing in production,
    supportedLngs: ['en', 'es'], // Supported languages
    ns: ['home', 'common'], // Namespaces for translations
    defaultNS: 'common', // Default namespace
    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
  })

export default i18n
