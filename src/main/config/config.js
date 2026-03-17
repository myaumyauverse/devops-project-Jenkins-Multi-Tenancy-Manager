require('dotenv').config();

const config = {
  JENKINS_URL: process.env.JENKINS_URL || 'http://localhost:8080',
  JENKINS_USER: process.env.JENKINS_USER || 'admin',
  JENKINS_TOKEN: process.env.JENKINS_TOKEN || ''
};

module.exports = config;