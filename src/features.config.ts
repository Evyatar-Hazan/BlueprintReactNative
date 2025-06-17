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
          file: "src/i18n/index.ts",
        },
        {
          file: "src/i18n/locales/en.json",
        },
        {
          file: "src/i18n/locales/he.json",
        },
      ],
      package: ["react-i18next", "i18next", "react-native-localize"],
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
  