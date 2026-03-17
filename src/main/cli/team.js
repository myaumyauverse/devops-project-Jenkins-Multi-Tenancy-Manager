const logger = require('../utils/logger');
const { createFolder } = require('../services/jenkinsService');

async function createTeam(teamName) {
  if (!teamName) {
    logger.error('Team name is required');
    return;
  }

  try {
    logger.info(`Creating team: ${teamName}`);

    await createFolder(teamName);

    logger.success(`Team '${teamName}' created in Jenkins`);
  } catch (err) {
    logger.error(`Failed to create team: ${err}`);
  }
}

module.exports = { createTeam };