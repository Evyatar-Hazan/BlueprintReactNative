#!/usr/bin/env node
import inquirer from "inquirer";
import { execSync } from "child_process";
import { writeFileSync, mkdirSync } from "fs";
import chalk from "chalk";

const log = console.log;
const runCmd = (cmd: string, opts: Record<string, any> = {}) =>
  execSync(cmd, { stdio: "inherit", ...opts });

const installPackages = (packages: string[]) => {
  try {
    log(chalk.blue(`🔧 Installing packages: ${packages.join(", ")}`));
    log(chalk.blue(`This may take a few minutes...`));
    runCmd(`npm install ${packages.join(" ")}`);
    return true;
  } catch (error) {
    log(chalk.red(`❌ Failed to install: ${packages.join(", ")}`));
    log(chalk.red(`Error: ${error}`));
    log(chalk.red(`Please install them manually.`));
    return false;
  }
};

const init = async () => {
  const { name, features } = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Project name:",
      validate: (v) => !!v || "Project name is required",
    },
    {
      type: "checkbox",
      name: "features",
      message: "Select features to include:",
      choices: [
        { name: "i18n (react-i18next)", value: "i18n" },
        { name: "Theme Switching (Light/Dark)", value: "theme" },
        { name: "RTL Support", value: "rtl" },
      ],
    },
  ]);

  const include = (key: string): boolean => features.includes(key);

  log(chalk.green(`🚀 Creating ${name}...`));
  runCmd(`npx @react-native-community/cli init ${name}`);
  process.chdir(name);

  const deps: string[] = [];
  if (include("i18n")) {
    deps.push("react-i18next", "i18next", "react-native-localize");
  }

  const didInstall = deps.length > 0 ? installPackages(deps) : true;

  mkdirSync("src", { recursive: true });

  if (include("i18n") && didInstall) {
    try {
      mkdirSync("src/i18n", { recursive: true });
      writeFileSync(
        "src/i18n/index.ts",
        `import i18n from 'i18next';\nimport { initReactI18next } from 'react-i18next';\n\nconst resources = {\n  en: { translation: { hello: "Hello World" } },\n  he: { translation: { hello: "שלום עולם" } },\n};\n\ni18n.use(initReactI18next).init({\n  resources,\n  lng: 'en',\n  fallbackLng: 'en',\n  interpolation: { escapeValue: false },\n});\n\nexport default i18n;\n`
      );
    } catch (err) {
      log(chalk.red("❌ Failed to setup i18n files."));
    }
  }

  if (include("theme")) {
    try {
      mkdirSync("src/hooks", { recursive: true });
      writeFileSync(
        "src/hooks/useTheme.ts",
        `import { useColorScheme } from 'react-native';\nexport const useTheme = () => {\n  const scheme = useColorScheme();\n  return scheme === 'dark' ? 'dark' : 'light';\n};\n`
      );
    } catch (err) {
      log(chalk.red("❌ Failed to setup theme hook."));
    }
  }

  const appImports = [
    include("i18n")
      ? `import './src/i18n';\nimport { useTranslation } from 'react-i18next';`
      : "",
    include("theme") ? `import { useTheme } from './src/hooks/useTheme';` : "",
    include("rtl") ? `import { I18nManager } from 'react';` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const rtlEffect = include("rtl")
    ? `\n  useEffect(() => { I18nManager.allowRTL(true); I18nManager.forceRTL(true); }, []);`
    : "";

  const appBody = include("i18n")
    ? `<Text>{t('hello')}</Text>`
    : `<Text>Hello World!</Text>`;

  const appCode = `import React, { useEffect } from 'react';\nimport { View, Text } from 'react-native';\n${appImports}\n\nconst App = () => {\n  ${
    include("i18n") ? "const { t } = useTranslation();" : ""
  }\n  ${
    include("theme") ? "const theme = useTheme();" : ""
  }${rtlEffect}\n  return (\n    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>\n      ${appBody}\n    </View>\n  );\n};\n\nexport default App;\n`;

  writeFileSync("App.tsx", appCode);

  log(chalk.green(`✅ ${name} created successfully.`));
};

init();
