import { Command } from "commander"

import { execute } from "../lib/feedback/index.js"

export const update = new Command()
  .command("update")
  .description("Atualize o microsserviço.")
  .option("-n, --node <boolean>", "Update node.js", true)
  .option("-d, --deps <boolean>", "Update dependencies", true)
  .action(() => {
    console.log("Funcionalidade em desenvolvimento")
  })