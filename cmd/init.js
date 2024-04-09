import { Command } from "commander"

import { execute } from "../lib/init/index.js"

export const init = new Command()
  .command("init")
  .description("Inicialização do husky.")
  .action(execute)