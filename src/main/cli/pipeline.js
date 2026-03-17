const logger = require('../utils/logger');
const { createPipelineJob, listJobs, triggerBuild } = require('../services/jenkinsService');
const chalk = require('chalk');

/* 
=========================
   CREATE PIPELINE
========================= */
async function createPipeline(options) {
  const { team, name } = options;

  if (!team || !name) {
    logger.error('Team and pipeline name are required');
    return;
  }

  try {
    logger.info(`Creating pipeline '${name}' in team '${team}'`);

    await createPipelineJob(team, name);

    logger.success(`Pipeline '${name}' created successfully`);
  } catch (err) {
    logger.error(`Failed to create pipeline: ${err}`);
  }
}

/* 
=========================
   LIST JOBS
========================= */
async function listJobsCommand(options) {
  const team = options.team;

  console.log(chalk.blue(`ℹ Fetching jobs for team: ${team}`));

  try {
    const jobs = await listJobs(team);

    if (!jobs || jobs.length === 0) {
      console.log(chalk.yellow('No jobs found'));
      return;
    }

    console.log(chalk.green('✔ Jobs:'));
    jobs.forEach(job => console.log(`- ${job}`));

  } catch (err) {
    console.log(chalk.red(`✖ Failed to list jobs: ${err}`));
  }
}

/* 
=========================
   TRIGGER BUILD
========================= */
async function triggerBuildCommand(options) {
  const { team, job } = options;

  console.log(chalk.blue(`ℹ Triggering build for '${job}' in team '${team}'`));

  try {
    await triggerBuild(team, job);
    console.log(chalk.green('✔ Build triggered successfully'));
  } catch (err) {
    console.log(chalk.red(`✖ Failed to trigger build: ${err}`));
  }
}

/* 
=========================
   EXPORTS (CRITICAL FIX)
========================= */
module.exports = {
  createPipeline,
  listJobsCommand,
  triggerBuildCommand
};