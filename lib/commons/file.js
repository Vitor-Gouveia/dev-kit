import fs from "node:fs/promises"

import logger from "../logger.js"

export const readFile = async (path) => {
  try {
    return await fs.readFile(path, "utf8")
  } catch(error) {
    // console.log(`Ocorreu um erro ao ler o arquivo: ${path}. Error: %s`, error.message)
  }
}

export const writeFile = async (path, file) => {
  return await fs.writeFile(path, file, "utf8")
}

export const path = (path) => `${process.cwd()}/${path}`