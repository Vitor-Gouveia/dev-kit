import { Command } from "commander"

import { execute } from "../lib/feedback/index.js"

export const feedback = new Command()
  .command("feedback")
  .description("Faça uma verificação de status do serviço.")
  .action(execute)