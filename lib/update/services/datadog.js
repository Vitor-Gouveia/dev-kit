import { path, writeFile } from "../../commons/file.js"

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

dataDog.tracer.use('express');
dataDog.tracer.use('winston');
${hasMongo ? "dataDog.tracer.use('mongodb-core');\n" : ""}
dataDog.tracer.init({
  logInjection: true,
  runtimeMetrics: true
});
`.trim()

  try {
    await writeFile(file_path, file)
  } catch(error) {
    console.log("failed")
  }
}