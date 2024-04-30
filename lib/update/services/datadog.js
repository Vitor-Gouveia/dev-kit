import fs from "node:fs"
import { path, writeFile, readFile } from "../../commons/file.js"

import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const packageJSON = require(`${process.cwd()}/package.json`)

export const datadog = async () => {
  const file_path = path(".dataDog/index.js")

  const hasMongo = Boolean(packageJSON.dependencies?.["mongodb"])

  const file = `
const dataDog = require('dd-trace');

dataDog.tracer.use('http', {
  blocklist: [
    '/health-status'
  ]  
});

dataDog.tracer.init({
  logInjection: true,
  runtimeMetrics: true
});
`.trim()

  let folderExists = false
  
  try {
    await fs.promises.access(path(".dataDog"), fs.constants.F_OK)
    
    folderExists = true
  
  } catch(error) {
  }

  try {
    if(!folderExists) {
      await fs.promises.mkdir(path(".dataDog"))
    }

    await writeFile(file_path, file)
  } catch(error) {
    console.log(`Ocorreu um erro ao escrever o arquivo: ${path}. Error: %s`, error.message)
  }
}