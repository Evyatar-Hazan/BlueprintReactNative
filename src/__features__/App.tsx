import React from "react";
import { Text, View, SafeAreaView } from "react-native";

// i18n:start
import "./src/i18n";
import { useTranslation } from "react-i18next";
// i18n:end

// theme:start
import { useTheme } from "./src/hooks/useTheme";
// theme:end

const App = () => {
  // i18n:start
  const { t } = useTranslation();
  // i18n:end

  // theme:start
  const { colors, theme } = useTheme();
  // theme:end

  return (
    <SafeAreaView
      // theme:start
      style={{ flex: 1, backgroundColor: colors.background }}
      // theme:end
    >
      <View style={{ padding: 16 }}>
        <Text
          // theme:start
          style={{ color: colors.text }}
          // theme:end
        >
          {/* i18n:start */}
          {t("welcome_message")}
          {/* i18n:end */}
        </Text>

        {/* i18n:start */}
        <Text style={{ marginTop: 8, fontSize: 12, color: "gray" }}>
          {t("current_language")}
        </Text>
        {/* i18n:end */}

        {/* theme:start */}
        <Text style={{ marginTop: 16, fontSize: 12, color: colors.text }}>
          Current theme: {theme}
        </Text>
        {/* theme:end */}
      </View>
    </SafeAreaView>
  );
};

export default App;
