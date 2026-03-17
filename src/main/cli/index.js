#!/usr/bin/env node

const { Command } = require('commander');
const chalk = require('chalk');
const { createTeam } = require('./team');
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
  
program.parse(process.argv);