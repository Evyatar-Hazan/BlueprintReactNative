#!/usr/bin/env node
import inquirer from "inquirer";
import { execSync } from "child_process";
import { mkdirSync } from "fs";
import chalk from "chalk";
import copyFeature from "./copyFeature.js";


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
        // { name: "RTL Support", value: "rtl" },
      ],
    },
  ]);

  const include = (key: string): boolean => features.includes(key);

  log(chalk.green(`🚀 Creating ${name}...`));
  runCmd(`npx @react-native-community/cli init ${name}`);
  process.chdir(name);

  // const deps: string[] = [];
  // if (include("i18n")) {
  //   deps.push("react-i18next", "i18next", "react-native-localize");
  // }

  // const didInstall = deps.length > 0 ? installPackages(deps) : true;

  mkdirSync("src", { recursive: true });

  if (features.length > 0) {
    try {
      copyFeature(features);
    } catch (err) {
      log(chalk.red("❌ Failed to setup features files: " + err));
    }
  }
  log(chalk.green(`✅ ${name} created successfully.`));
};

init();
