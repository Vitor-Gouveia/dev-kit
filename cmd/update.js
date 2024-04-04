import { Command } from "commander"

import { execute } from "../lib/update/index.js"

export const update = new Command()
  .command("update")
  .description("Atualização do microsserviço.")
  .option("-n, --node <boolean>", "Update node.js", true)
  .option("-d, --deps <boolean>", "Update dependencies", true)
  .action(execute)