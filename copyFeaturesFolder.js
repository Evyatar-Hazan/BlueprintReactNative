// copyFeaturesFolder.js
import { cpSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// ESM-compatible __dirname replacement
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Copies a folder from src to dest recursively, with error handling and logging.
 * @param {string} srcFolder - Absolute path to the source folder.
 * @param {string} destFolder - Absolute path to the destination folder.
 */
function copyFolder(srcFolder, destFolder) {
  if (!existsSync(srcFolder)) {
    console.warn(`⚠️ Source folder does not exist: ${srcFolder}`);
    return;
  }

  try {
    cpSync(srcFolder, destFolder, { recursive: true });
    console.log(`✅ Copied ${srcFolder} → ${destFolder}`);
  } catch (error) {
    console.error(`❌ Failed to copy folder: ${error.message}`);
  }
}

// Define source and destination paths
const from = join(__dirname, "src", "__features__");
const to = join(__dirname, "dist", "__features__");

// Run the copy operation
copyFolder(from, to);
