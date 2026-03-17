#!/usr/bin/env node

const { Command } = require('commander');
const chalk = require('chalk');
const { createTeam } = require('./team');
const { createPipeline } = require('./pipeline');
const program = new Command();

program
  .name('jenkins-mt')
  .description('CLI tool for managing multi-tenancy in Jenkins')
  .version('1.0.0');

program
  .command('hello')
  .description('Test CLI setup')
  .action(() => {
    console.log(chalk.green('✔ CLI is working!'));
  });

program
  .command('create-team <teamName>')
  .description('Create a new team in Jenkins')
  .action(createTeam);

  program
  .command('create-pipeline')
  .description('Create pipeline inside a team')
  .requiredOption('--team <team>', 'Team name')
  .requiredOption('--name <name>', 'Pipeline name')
  .action(createPipeline);

program.parse(process.argv);