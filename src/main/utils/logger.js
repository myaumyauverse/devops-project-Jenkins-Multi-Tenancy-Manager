const chalk = require('chalk');

const logger = {
  success: (msg) => console.log(chalk.green(`✔ ${msg}`)),
  error: (msg) => console.error(chalk.red(`✖ ${msg}`)),
  info: (msg) => console.log(chalk.blue(`ℹ ${msg}`))
};

module.exports = logger;