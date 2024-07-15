import fs from "node:fs"
import { path, writeFile } from "../../commons/file.js"

export const datadog = async () => {
  const file_path = path(".dataDog/index.js")

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