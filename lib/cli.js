import chalk from "chalk"

const alert = (message) => {
  return console.log(chalk.red(message))
}

const warning = (message) => {
  return console.log(chalk.yellow(message))
}

const info = (message) => {
  return console.log(chalk.blue(message))
}

export default {
  alert,
  warning,
  info,
}