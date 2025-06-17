import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  existsSync,
  statSync,
  readdirSync,
  copyFileSync,
} from "fs";
import { join, dirname } from "path";
import chalk from "chalk";
import { featuresConfig } from "./features.config.js";
import { fileURLToPath } from "url";
import { log } from "console";
import { execSync } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sourceRoot = "__features__";
let packageJsonPath = "package.json";

const removeFeatureMarkers = (content: string, feature: string): string => {
  const regex = new RegExp(
    `(?:// ${feature}:start\\n?|// ${feature}:end\\n?)|(?:\\/\\* ${feature}:start \\*\\/\\n?|\\/\\* ${feature}:end \\*\\/\\n?)`,
    "g"
  );
  return content.replace(regex, "");
};

const removeUnrelatedFeatureBlocks = (
  content: string,
  activeFeatures: string[],
  allFeatures: string[]
): string => {
  const featuresToRemove = allFeatures.filter(f => !activeFeatures.includes(f));
    for (const feature of featuresToRemove) {
      const regex = new RegExp(
        `(?:// ${feature}:start[\\s\\S]*?// ${feature}:end\\n?)|(?:\\/\\* ${feature}:start \\*\\/[\\s\\S]*?\\/\\* ${feature}:end \\*\\/\\n?)`,
        "g"
      );
      content = content.replace(regex, "");
    }

    for (const feature of activeFeatures) {
      content = removeFeatureMarkers(content, feature);
    }

    return content;
  };

  const deepMerge = (target: any = {}, source: any = {}): any => {
    if (typeof target !== "object" || typeof source !== "object" || target === null || source === null) {
      return source;
    }

    for (const key of Object.keys(source)) {
      const sourceVal = source[key];
      const targetVal = target[key];

      if (
        sourceVal &&
        typeof sourceVal === "object" &&
        !Array.isArray(sourceVal)
      ) {
        target[key] = deepMerge(
          typeof targetVal === "object" && targetVal !== null ? targetVal : {},
          sourceVal
        );
      } else {
        target[key] = sourceVal;
      }
    }

    return target;
  };

  const updatePackageJson = (activeFeatures: string[]) => {
    log(chalk.blue(`🔍 Updating package.json with active features: ${activeFeatures.join(", ")}`));

    if (!existsSync(packageJsonPath)) {
      log(chalk.red(`❌ package.json not found at ${packageJsonPath}`));
      return;
    }

    const allFeatures = Object.keys(featuresConfig);
    let baseJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));

    for (const feature of allFeatures) {
      if (!activeFeatures.includes(feature)) continue;

      const config = featuresConfig[feature];
      const modifications = config.packageJsonModifications;
      if (modifications) {
        baseJson = deepMerge(baseJson, modifications);
      }
    }

    writeFileSync(packageJsonPath, JSON.stringify(baseJson, null, 2), "utf-8");
    console.log(chalk.green(`✅ Updated package.json with active feature(s): ${activeFeatures.join(", ")}`));
  };

  const copyRecursive = (src: string, dest: string) => {
    const stat = statSync(src);

    if (stat.isDirectory()) {
      mkdirSync(dest, { recursive: true });
      for (const entry of readdirSync(src)) {
        copyRecursive(join(src, entry), join(dest, entry));
      }
    } else {
      mkdirSync(dirname(dest), { recursive: true });
      copyFileSync(src, dest);
      console.log(chalk.green(`✅ Copied ${src} to ${dest}`));
    }
  };

  const installPackages = (packages: string[], isDev: boolean = false) => {
    if (!packages.length) return;
    try {
      const flag = isDev ? "--save-dev" : "--save";
      const message = isDev ? "devDependencies" : "dependencies";

      console.log(chalk.blue(`📦 Installing ${message}: ${packages.join(", ")}`));
      execSync(`npm install ${flag} ${packages.join(" ")}`, { stdio: "inherit" });
      console.log(chalk.green(`✅ Installed ${message} successfully.`));
    } catch (error) {
      console.error(chalk.red(`❌ Failed to install packages: ${packages.join(", ")}`));
      console.error(error);
    }
  };

  const copyFeature = (featureNames: string[]) => {
    const allFeatureNames = Object.keys(featuresConfig);
    const activeFeatures = Array.from(new Set([...featureNames, "default"]));

    const allPackages: Set<string> = new Set();
    const allDevPackages: Set<string> = new Set();

    for (const featureName of activeFeatures) {
      const config = featuresConfig[featureName];
      if (!config) {
        console.log(chalk.red(`❌ Feature "${featureName}" not found.`));
        continue;
      }

      (config.package ?? []).forEach(pkg => allPackages.add(pkg));
      (config.devPackage ?? []).forEach(pkg => allDevPackages.add(pkg));

      for (const { file } of config.include) {
        const sourcePath = join(__dirname, sourceRoot, file);
        const targetPath = file.startsWith("/") ? file.slice(1) : file;

        try {
          const stat = statSync(sourcePath);
          console.log(chalk.blue(`🔍 Processing ${file} for features "${activeFeatures.join(", ")}"...`));

          if (stat.isDirectory()) {
            copyRecursive(sourcePath, targetPath);
          } else {
            const originalContent = readFileSync(sourcePath, "utf-8");
            const finalContent = removeUnrelatedFeatureBlocks(
              originalContent,
              activeFeatures,
              allFeatureNames
            );

            mkdirSync(dirname(targetPath), { recursive: true });
            writeFileSync(targetPath, finalContent, "utf-8");
            console.log(chalk.green(`✅ Wrote to ${targetPath}`));
          }
        } catch (err) {
          console.log(chalk.red(`❌ Error processing ${file}: ${err}`));
        }
      }
    }

    updatePackageJson(activeFeatures);
    installPackages(Array.from(allPackages));
    installPackages(Array.from(allDevPackages), true);
  };

export default copyFeature;
