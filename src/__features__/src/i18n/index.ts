import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from './locales/en.json';
import he from './locales/he.json';

export const supportedLanguages = ['en', 'he']; // Because two languages are clearly enough for world domination.
const LANGUAGE_KEY = 'app-language'; // Shh... this is the sacred key that determines your app's dialect.

const fallbackLang = 'en'; // When all else fails, pretend the user is British (or American, we don’t judge).

const getStoredLang = async (): Promise<string> => {
    const lang = await AsyncStorage.getItem(LANGUAGE_KEY); // Try to remember what the user once told us. 
    return lang || fallbackLang; // If not, just assume they speak English. Most apps do anyway.
}

export const initI18n = async () => {
  const lng = await getStoredLang();
  console.log(`Initializing i18n with language: ${lng}`); // Because logs make bugs feel seen.

  await i18n
    .use(initReactI18next) // Hooking i18n into React. It's like Tinder for translations.
    .init({
      lng, // Let's hope this actually exists and isn't "undefined" at 3AM.
      fallbackLng: fallbackLang, // Our trusty backup plan. Not all heroes wear capes.
      resources: {
        en: { translation: en }, // The universal donor.
        he: { translation: he }, // For when things need to go right-to-left and upside-down.
      },
      interpolation: {
        escapeValue: false, // Because we're trusting our content not to XSS us. Bold move.
      },
    });
};

export const saveLanguage = async (lang: string) => {
  await AsyncStorage.setItem(LANGUAGE_KEY, lang); // Storing the user’s deepest linguistic desires.
};

export default i18n; // Export the multilingual chaos engine.
