export const featuresConfig: Record<string, {

  include: { file: string; markers?: { start: string; end: string } }[];

  package?: string[];
  devPackage?: string[];

  packageJsonModifications?: Partial<{

    [key: string]: any;

    scripts: Record<string, string>;

    husky: { hooks: Record<string, string> };

    "lint-staged": Record<string, string[]>;

  }>;

  }> = {
    i18n: {
      include: [
        {
          file: "App.tsx",
          markers: { start: "// i18n:start", end: "// i18n:end" },
        },
        {
          file: "src/screens/HomeScreen/HomeScreen.tsx",
          markers: { start: "// i18n:start", end: "// i18n:end" },
        },
        {
          file: "src/i18n/index.ts",
        },
        {
          file: "src/i18n/locales/en.json",
        },
        {
          file: "src/i18n/locales/he.json",
        },
        {
          file: "src/hooks/useChangeLanguage.ts",
        },
      ],
      package: ["react-i18next", "i18next", "react-native-localize", "@react-native-async-storage/async-storage"],
      devPackage: ["@types/i18next"],
    },
    theme: {
      include: [
        {
          file: "App.tsx",
          markers: { start: "// theme:start", end: "// theme:end" },
        },
        {
          file: "src/hooks/useTheme.ts",
        },
      ],
    },
    default: {
      include: [
        { file: "eslint.config.mjs" },
        { file: "/.husky" },
        { file: "src/components/DemoBox/DemoBox.tsx"},
        { file: "src/components/DemoBox/styles.ts"},
        { file: "src/screens/HomeScreen/HomeScreen.tsx"},
        { file: "src/screens/HomeScreen/styles.ts"},
      ],
      packageJsonModifications: {
        husky: {
          hooks: {
            "pre-commit":
              "tsc --noEmit && npm run tSort && git add -u src/i18n/* && lint-staged",
          },
        },
        "lint-staged": {
          "*.{js,jsx,ts,tsx,json,css,scss,md,}": [
            "prettier --write",
            "eslint --fix",
          ],
        },
        scripts: {
          prepare: "husky install",
          tSort: 'node -p "require(\'./scripts/tSort.js\');" && prettier --write src',
        },
      },
    },
  };
  