import child_process from "node:child_process"

import { readFile, path } from "../../commons/file.js";
import logger from "../../logger.js"

const alertNativeDependencies = (packageJSON) => {
  if(packageJSON.dependencies?.["sgt-fields"]) {
    logger.warning("A dependência 'sgt-fields' possui suporte nativo do Node.js e pode ser removida.")
  }

  if(packageJSON.dependencies?.["async"]) {
    logger.warning("A dependência 'async' possui suporte nativo do Node.js e pode ser removida.")
  }
}

export const dependenciesUpdate = async () => {
  const packageJsonPath = path("package.json")
  const packageJsonStr = await readFile(packageJsonPath)
  const packageJSON = JSON.parse(packageJsonStr)

  alertNativeDependencies(packageJSON)
  
  try {
    child_process.execSync('npx npm-check-updates --interactive --format group --install always --enginesNode', {
      stdio: "inherit",
    });
  } catch(error) {
    logger.alert("Ocorreu um erro ao atualizar as dependências.")
    console.log("Error: %s", error.message)
  }
}