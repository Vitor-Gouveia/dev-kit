#! /usr/bin/env node
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const packageJSON = require('./package.json')

import { Command } from "commander"

import { update } from "./cmd/update.js"
import { init } from "./cmd/init.js"

const program = new Command()

program
  .name("Dev Kit")
  .description("Uma aplicação CLI para atualização dos serviços Minu.")
  .version(packageJSON.version, "-v, --version", "Versão atual")

program
  .addCommand(update)
  .addCommand(init)

program.parse()