import { Command } from "commander"

import { execute } from "../lib/danger/index.js"

export const danger = new Command()
  .command("danger")
  .description("Adição do danger no serviço.")
  .action(execute)