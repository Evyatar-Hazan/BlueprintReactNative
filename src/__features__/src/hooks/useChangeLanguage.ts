import { I18nManager, Platform, Alert, DevSettings } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { saveLanguage } from '../i18n';

export const useChangeLanguage = () => {
  const { i18n, t } = useTranslation(); // Because every app deserves to speak your language... eventually.

  const changeLanguage = useCallback(
    async (lang: string) => {
      const isRTL = lang === 'he'; // Spoiler: if it's Hebrew, it's Right-To-Left. Who would’ve thought?

      await saveLanguage(lang); // Because the app should totally remember your random mid-session language change.

      if (I18nManager.isRTL !== isRTL) {
        await I18nManager.forceRTL(isRTL); // Forcing the UI to flip — because subtlety is overrated.
        await I18nManager.allowRTL(isRTL); // Just in case force wasn't persuasive enough.
      }

      await i18n.changeLanguage(lang); // The actual part where we pretend it’s that simple.

      if (I18nManager.isRTL !== isRTL) {
        // When reality hits and layout magic doesn't auto-apply...
        if (Platform.OS === 'android' || __DEV__) {
          DevSettings.reload(); // Reload like it's 2005 — because hot reload can’t handle RTL vibes.
        } else {
          Alert.alert(
            t('home.restartTitle', 'Restart Required'), // Gentle nudge: “Please reboot your life to proceed.”
            t('home.restartMessage', 'Please close and reopen the app to apply changes.') // Translation: “Too lazy to fix this dynamically.”
          );
        }
      }
    },
    [i18n, t] // React wants you to list your friends here or it'll complain.
  );

  return { changeLanguage }; // Exporting our chaos engine for others to trigger.
};
