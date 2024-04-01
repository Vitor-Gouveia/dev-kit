import chalk from 'chalk';

export default {
  success: (message) => console.log(chalk.green(message)),
  alert: (message) => console.log(chalk.red(message)),
  warning: (message) => console.log(chalk.yellow(message)),
  info: (message) => console.log(chalk.blue(message)),
};
