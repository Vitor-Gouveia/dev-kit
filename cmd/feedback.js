import { Command } from "commander"

import { execute } from "../lib/feedback/index.js"

export const feedback = new Command()
  .command("feedback")
  .description("Verificação do microsserviço.")
  .action(execute)