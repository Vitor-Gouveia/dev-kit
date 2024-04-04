import fs from "node:fs/promises"

import logger from "../../logger.js"

const sonarqubeVersionUpdate = async () => {
  const file_path = ".github/workflows/build-deploy.yml"

  try {
    const full_path = `${process.cwd()}/${file_path}`
    const file = await fs.readFile(full_path, "utf8")

    const updated = file
      .replace("sonarqube-scan-action@master", "sonarqube-scan-action@v1.2.0")
    
    await fs.writeFile(full_path, updated, "utf8")

    logger.info('Versão sonarqube atualizado.')
  } catch(error)  {
    logger.warning(`'${file_path}' não existe.`)
  }
}

export const githubActionsOptimization = async () => {
  // add 'if' statements
  
  await sonarqubeVersionUpdate()
}