import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { styles } from './styles';
import { DemoBox } from '../../components/DemoBox/DemoBox';

// i18n:start
// Internationalization – because not everyone speaks English (shockingly).
import { useTranslation } from 'react-i18next';
// i18n:end

/**
 * HomeScreen – the glamorous entry point to your app.
 * This is where you pretend your UI is impressive.
 */
export const HomeScreen: React.FC = () => {
  // i18n:start
  // Grabbing the t() function so we can pretend to support multiple languages.
  const { t } = useTranslation();
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

        {/* Demo #1 – Because every self-respecting UI needs a styled button */}
        <DemoBox
          title={/* i18n:start */t('home.buttonDemoTitle', /* i18n:end */'Styled Button'/* i18n:start */)/* i18n:end */}
          description={/* i18n:start */t('home.buttonDemoDescription', /* i18n:end */'A simple button with custom styling.'/* i18n:start */)/* i18n:end */}
        >
          <View style={styles.buttonDemo}>
            {/* Classic button label that says “I do stuff” */}
            <Text style={styles.buttonText}>
              {/* i18n:start */t('home.buttonText', /* i18n:end */'Click Me'/* i18n:start */)/* i18n:end */}
            </Text>
          </View>
        </DemoBox>

        {/* Demo #2 – A text input, because nothing says “interactive” like a blinking cursor */}
        <DemoBox
          title={/* i18n:start */t('home.inputDemoTitle', /* i18n:end */'Text Input'/* i18n:start */)/* i18n:end */}
          description={/* i18n:start */t('home.inputDemoDescription', /* i18n:end */'A text input field with a soft border.'/* i18n:start */)/* i18n:end */}
        >
          <View style={styles.inputDemo}>
            {/* Yes, even the placeholder needs to be internationalized... apparently */}
            <Text>
              {/* i18n:start */t('home.inputPlaceholder', /* i18n:end */'📝 You can enter text here...'/* i18n:start */)/* i18n:end */}
            </Text>
          </View>
        </DemoBox>

        {/* Feel free to add more demo boxes. Impress your PM. Or don’t. */}
      </ScrollView>
    </View>
  );
};
