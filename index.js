#! /usr/bin/env node
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const packageJSON = require('./package.json')

import { Command } from "commander"

import { feedback } from "./cmd/feedback.js"
import { update } from "./cmd/update.js"
import { init } from "./cmd/init.js"

const program = new Command()

program
  .name("Dev Kit")
  .description("Uma aplicação CLI para atualização e feedback de status dos serviços Minu.")
  .version(packageJSON.version, "-v, --version", "Versão atual")

program
  .addCommand(feedback)
  .addCommand(update)
  .addCommand(init)

program.parse()