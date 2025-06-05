import { readFileSync, readdirSync, statSync, mkdirSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";
const log = console.log;

// ESM-compatible __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const copyFeatureFiles = (featureName: string) => {
  const basePath = join(__dirname, "__features__", featureName);
  
  const walk = (dir: string) => {
    const results: string[] = [];
    const list = readdirSync(dir);
    list.forEach((file) => {
      const fullPath = join(dir, file);
      if (statSync(fullPath).isDirectory()) {
        results.push(...walk(fullPath));
      } else {
        results.push(fullPath);
      }
    });
    return results;
  };

  const files = walk(basePath);

  files.forEach((filePath) => {
    const content = readFileSync(filePath, "utf8");
    const match = content.match(/^\/\/\s*path:\s*(.+)$/m);
    if (!match) {
      console.warn(`⚠️ Missing "// path:" in ${filePath}`);
      return;
    }
    const targetPath = match[1].trim();
    mkdirSync(dirname(targetPath), { recursive: true });
    writeFileSync(targetPath, content.replace(/^\/\/.*\n/, ""));
    log(chalk.green(`📁 Created: ${targetPath}`));
  });
};

export default copyFeatureFiles;