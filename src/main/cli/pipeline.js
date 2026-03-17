const logger = require('../utils/logger');
const { createPipelineJob } = require('../services/jenkinsService');

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

module.exports = { createPipeline };