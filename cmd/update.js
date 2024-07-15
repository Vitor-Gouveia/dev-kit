import { Command } from "commander"

import { execute } from "../lib/update/index.js"

export const update = new Command()
  .command("update")
  .description("Atualização do microsserviço.")
  .action(execute)