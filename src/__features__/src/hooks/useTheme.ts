import { useColorScheme } from "react-native";

export const useTheme = () => {
  const colorScheme = useColorScheme();

  const isDarkMode = colorScheme === "dark";

  return {
    theme: isDarkMode ? "dark" : "light",
    colors: {
      background: isDarkMode ? "#000000" : "#ffffff",
      text: isDarkMode ? "#ffffff" : "#000000",
    },
  };
};
