import child_process from "node:child_process"

import { path, writeFile } from "../commons/file.js"
import logger from "../logger.js"

export const execute = async () => {
  try {
    child_process.execSync('npm i -D husky', {
      stdio: "inherit"
    });
    logger.success(" ↳ 'husky' dependency installed")
  } catch(error) {
    logger.alert(" ↳ Failed to install 'husky' dependency")
    console.log("Error: %s", error.message)
  }

  try {
    child_process.execSync('npx husky init', {
      stdio: "inherit"
    });
    logger.success(" ↳ husky initialized")
  } catch(error) {
    logger.alert(" ↳ Failed initialize husky")
    console.log("Error: %s", error.message)
  }

  try {
    const file_path = path(".husky/pre-commit")
    await writeFile(file_path, preCommitHook)
    logger.success(" ↳ husky file saved")
  } catch(error) {
    logger.alert(" ↳ Failed to save husky file")
    console.log("Error: %s", error.message)
  }
}

const preCommitHook = `
npm run test
npx @vitorgouveia/dev-kit
`.trim()