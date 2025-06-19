import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { styles } from './styles';
import { DemoBox } from '../../components/DemoBox/DemoBox';

// i18n:start
import { supportedLanguages } from '../../i18n';
// Internationalization – because not everyone speaks English (shockingly).
import { useTranslation } from 'react-i18next';
import { useChangeLanguage } from '../../hooks/useChangeLanguage';
// i18n:end

/**
 * HomeScreen – the glamorous entry point to your app.
 * This is where you pretend your UI is impressive.
 */
export const HomeScreen: React.FC = () => {
  // i18n:start
  // Grabbing the t() function so we can pretend to support multiple languages.
  const { t, i18n } = useTranslation();
  // Our humble attempt to switch languages like a true international app.
  const { changeLanguage } = useChangeLanguage();
  // i18n:end

  return (
    <View style={styles.container}>
      {/* Headline that tries its best to sound welcoming */}
      <Text style={styles.header}>
        {/* i18n:start */t('home.welcome',  /* i18n:end */'Welcome to the Home Screen'/* i18n:start */)/* i18n:end */}
      </Text>

      {/* Subtext that explains what's going on... assuming anyone reads it */}
      <Text style={styles.subtitle}>
        {/* i18n:start */t('home.subtitle', /* i18n:end */'Here you can see demonstrations of various components you built.'/* i18n:start */)/* i18n:end */}
      </Text>

      {/* Where the magic happens – scrollable demo boxes, a true dev flex zone */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* i18n:start */}
        {/* Language selector, because switching languages is the new dark mode */}
        <DemoBox
          title={t('home.languageSwitcherTitle', 'Language Switcher')}
          description={t('home.languageSwitcherDescription', 'Pick a language and marvel as everything magically translates.')}
        >
          <View style={styles.languageContainer}>
            {supportedLanguages.map((lang) => {
              const isActive = i18n.language === lang; // You could check this twice and still not be sure.

              return (
                <Pressable
                  key={lang} // React's way of saying “I need identity. Always.”
                  onPress={() => changeLanguage(lang)} // Because users love clicking buttons just to see stuff flip.
                  style={[
                    styles.langButton,
                    isActive && styles.langButtonActive, // Nothing screams “selected” like conditional styling.
                  ]}
                >
                  <Text style={[
                    styles.langButtonText,
                    isActive && styles.langButtonTextActive, // Bold font = commitment to language.
                  ]}>
                    {t(`languages.${lang}`, lang) /* Let’s hope we remembered to translate this. Otherwise, fallback time! */}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </DemoBox>
        {/* i18n:end */}

        {/* Feel free to add more demo boxes. Impress your PM. Or don’t. */}
      </ScrollView>
    </View>
  );
};
