const axios = require('axios');
const config = require('../config/config');

// 🔹 Axios instance (fixed)
const jenkins = axios.create({
  baseURL: config.JENKINS_URL,
  auth: {
    username: config.JENKINS_USER,
    password: config.JENKINS_TOKEN
  },
  headers: {
    'Content-Type': 'application/xml'
  },
  validateStatus: function (status) {
    return status >= 200 && status < 400; // allow redirects (302 = success in Jenkins)
  }
});

// 🔹 Fetch CSRF crumb
async function getCrumb() {
  try {
    const res = await jenkins.get('/crumbIssuer/api/json');
    return res.data;
  } catch (err) {
    throw 'Failed to fetch Jenkins crumb';
  }
}

// 🔹 Create Folder (Team)
async function createFolder(folderName) {
  const url = `/createItem?name=${folderName}`;

  const xmlData = `
<com.cloudbees.hudson.plugins.folder.Folder>
  <description>Team folder: ${folderName}</description>
</com.cloudbees.hudson.plugins.folder.Folder>
`;

  try {
    const crumb = await getCrumb();

    const response = await jenkins.post(url, xmlData, {
      headers: {
        [crumb.crumbRequestField]: crumb.crumb
      }
    });

    if (response.status >= 200 && response.status < 400) {
      return true;
    }

    throw `Failed to create folder (status: ${response.status})`;

  } catch (error) {
    console.error("DEBUG Folder Error:", error.response?.status, error.response?.data);
    throw error.response?.data || error.message;
  }
}

// 🔹 Create Pipeline Job
async function createPipelineJob(team, jobName) {
  const url = `/job/${team}/createItem?name=${jobName}`;

  const xmlData = `
<flow-definition plugin="workflow-job">
  <description>Pipeline for ${jobName}</description>
  <definition class="org.jenkinsci.plugins.workflow.cps.CpsFlowDefinition">
    <script>
      pipeline {
        agent any
        stages {
          stage('Install') {
            steps {
              echo 'Installing dependencies'
            }
          }
          stage('Build') {
            steps {
              echo 'Building ${jobName}'
            }
          }
          stage('Test') {
            steps {
              echo 'Running tests'
            }
          }
        }
      }
    </script>
    <sandbox>true</sandbox>
  </definition>
</flow-definition>
`;

  try {
    const crumb = await getCrumb();

    const res = await jenkins.post(url, xmlData, {
      headers: {
        [crumb.crumbRequestField]: crumb.crumb
      }
    });

    if (res.status >= 200 && res.status < 400) {
      return true;
    }

    throw `Failed to create pipeline (status: ${res.status})`;

  } catch (err) {
    console.error("DEBUG Pipeline Error:", err.response?.status, err.response?.data);
    throw err.response?.data || err.message;
  }
}


async function listJobs(team) {
  try {
    const res = await jenkins.get(`/job/${team}/api/json`);

    if (!res.data.jobs) return [];

    return res.data.jobs.map(job => job.name);

  } catch (err) {
    if (err.response) {
      throw `Status: ${err.response.status}`;
    }
    throw err.message;
  }
}

async function triggerBuild(team, job) {
  try {
    const crumb = await getCrumb();

    const res = await jenkins.post(
      `/job/${team}/job/${job}/build`,
      {},
      {
        headers: {
          [crumb.crumbRequestField]: crumb.crumb
        }
      }
    );

    return res.status === 201 || res.status === 200;

  } catch (err) {
    if (err.response) {
      throw `Status: ${err.response.status}`;
    }
    throw err.message;
  }
}


module.exports = {
  createFolder,
  createPipelineJob,
  listJobs,
  triggerBuild
};