import React from "react";
import { HomeScreen } from "./src/screens/HomeScreen/HomeScreen";

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
    <HomeScreen />
  );
};

export default App;
