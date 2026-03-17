const axios = require('axios');
const config = require('../config/config');

const jenkins = axios.create({
  baseURL: config.JENKINS_URL,
  auth: {
    username: config.JENKINS_USER,
    password: config.JENKINS_TOKEN
  }
});

async function createFolder(folderName) {
  const url = `/createItem?name=${folderName}`;
  
  const xmlData = `
    <com.cloudbees.hudson.plugins.folder.Folder>
      <description>Team folder: ${folderName}</description>
    </com.cloudbees.hudson.plugins.folder.Folder>
  `;

  try {
    const response = await jenkins.post(url, xmlData, {
      headers: {
        'Content-Type': 'application/xml'
      }
    });

    return response.status === 200;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}

module.exports = { createFolder };