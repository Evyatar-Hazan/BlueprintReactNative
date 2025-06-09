import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import chalk from "chalk";
import { featuresConfig } from "./features.config.js";
import { fileURLToPath } from "url";

// ESM-compatible __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sourceRoot = "__features__";

const removeFeatureMarkers = (content: string, feature: string): string => {
    const regex = new RegExp(
      `(?:// ${feature}:start\\n?|// ${feature}:end\\n?)|(?:\\{\\/\\* ${feature}:start \\*\\/\\}\\n?|\\{\\/\\* ${feature}:end \\*\\/\\}\\n?)`,
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
        `(?:// ${feature}:start[\\s\\S]*?// ${feature}:end\\n?)|(?:\\{\\/\\* ${feature}:start \\*\\/\\}[\\s\\S]*?\\{\\/\\* ${feature}:end \\*\\/\\}\\n?)`,
        "g"
      );
      content = content.replace(regex, "");
    }
  
    for (const feature of activeFeatures) {
      content = removeFeatureMarkers(content, feature);
    }
  
    return content;
  };
  
  
  

  const copyFeature = (featureNames: string[]) => {
    const allFeatureNames = Object.keys(featuresConfig);
  
    for (const featureName of featureNames) {
      const config = featuresConfig[featureName as keyof typeof featuresConfig];
      if (!config) {
        console.log(chalk.red(`❌ Feature "${featureName}" not found.`));
        continue;
      }
  
      for (const { file } of config.include) {
        console.log(chalk.blue(`🔍 Processing ${file} for features "${featureNames.join(", ")}"...`));
        const sourcePath = join(__dirname, sourceRoot, file);
        const targetPath = file;
  
        const originalContent = readFileSync(sourcePath, "utf-8");
  
        const finalContent = removeUnrelatedFeatureBlocks(originalContent, featureNames, allFeatureNames);
  
        mkdirSync(dirname(targetPath), { recursive: true });
        writeFileSync(targetPath, finalContent, "utf-8");
        console.log(chalk.green(`✅ Wrote to ${targetPath}`));
      }
    }
  };
  

export default copyFeature;
