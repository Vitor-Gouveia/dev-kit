import fs from "node:fs/promises"

import { path, readFile, writeFile } from "../../commons/file.js"
import logger from "../../logger.js"

import { LATEST_NODEJS_VERSION } from "../../feedback/node.js"

export const updateNodejs = async () => {
  try {
    const packageLock = path("package-lock.json")
    await fs.rm(packageLock)
  } catch(error) {
    logger.alert("package-lock.json não existe.")
  }

  try {
    const buildDeployPath = path('.github/workflows/build-deploy.yml')
    const buildDeploy = await readFile(buildDeployPath)
    
    const updatedBuildDeploy = buildDeploy
      .replace(/node-version: \d+\.\d+\.\d+/g, `node-version: ${LATEST_NODEJS_VERSION}`)

    await writeFile(buildDeployPath, updatedBuildDeploy, "utf8")
  } catch(error) {
    logger.alert("ocorreu um erro ao atualizar o build-deploy.yml")
  }

  try {
    const dangerPath = path(".github/workflows/danger-js.yml")
    const danger = await readFile(dangerPath)
    
    const updatedDanger = danger
      .replace(/node-version: \d+\.\d+\.\d+/g, `node-version: ${LATEST_NODEJS_VERSION}`)

    await writeFile(dangerPath, updatedDanger)
  } catch(error) {
    logger.alert("ocorreu um erro ao atualizar o danger-js.yml")
  }

  try {
    const packageJsonPath = path("package.json")
    const packageJsonStr = await readFile(packageJsonPath)
    const packageJson = JSON.parse(packageJsonStr)
    
    const updatedPackageJson = {
      ...packageJson,
      engines: {
        ...packageJson.engines,
        node: LATEST_NODEJS_VERSION
      }
    }

    await writeFile(packageJsonPath, JSON.stringify(structuredClone(updatedPackageJson), null, 2))
  } catch(error) {
    logger.alert("ocorreu um erro ao atualizar o package.json")
  }

  try {
    const dockerfilePath = path("Dockerfile")
    const dockerfile = await readFile(dockerfilePath)
    
    const updatedDockerfile = dockerfile
      .replace(/minutrade\/tiny-node:\d+\.\d+\.\d+/g, 'minutrade/tiny-node:20.11.0')

    await writeFile(dockerfilePath, updatedDockerfile)
  } catch(error) {
    logger.alert("ocorreu um erro ao atualizar o dockerfile")
  }
}