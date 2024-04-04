import child_process from "node:child_process"

import { readFile, writeFile, path } from "../../commons/file.js";
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
  
  const output = child_process.execSync('npm outdated --json || true');
  const json = JSON.parse(output.toString());
  const entries = Object
    .entries(json)
    .reduce((acc, [name, params]) => {
      acc.push({ name, version: params.latest })
      return acc
    }, [])
  
  
  const updatedPackageJson = structuredClone(packageJSON)
  for (const dependency of entries) {
    if(updatedPackageJson.dependencies?.[dependency.name]) {
      updatedPackageJson.dependencies[dependency.name] = dependency.version
    }

    if(updatedPackageJson.devDependencies?.[dependency.name]) {
      updatedPackageJson.devDependencies[dependency.name] = dependency.version
    }
  }

  try {
    const packageJsonPath = path("package.json")
    await writeFile(packageJsonPath, JSON.stringify(updatedPackageJson, null, 2))
  } catch(error) {
    console.log(error.message)
  }

  
  child_process.execSync('npm i')
}