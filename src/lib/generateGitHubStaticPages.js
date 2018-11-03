
const GitHubPublisher = require('github-publish');
const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');

const githubConfig = {
  pageToCommit: '_data/companies.json',
  commitMessage: 'Update',
  privateKey: process.env.GITHUB_PRIVATE_KEY,
  installationId: process.env.GITHUB_INSTALLATION_ID,
  user: process.env.GITHUB_USER,
  repo: process.env.GITHUB_REPO,
  branch: process.env.GITHUB_BRANCH
}

function generateGitHubJWT() {
  if (!githubConfig.privateKey) {
    return new Error('Missing Github Private key');;
  }

  payload = {
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 100,
    iss: 20154
  }
  console.log("jwt generated")
  return jwt.sign(payload, githubConfig.privateKey, { algorithm: 'RS256' });
}

function generateGitHubAccessToken(jwt) {
  if (!jwt) {
    return new Error('Missing JWT');
  }

  console.log("start fetch access token", jwt)

  return fetch(`https://api.github.com/app/installations/${githubConfig.installationId}/access_tokens`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${jwt}`,
      'Accept': 'application/vnd.github.machine-man-preview+json'
    }
  }).then(response => response.json())
    .then(response => { console.log("access token generated", response.token); return response.token})
}

function generateGitHubStaticPages(token, data) {
  if (!token) {
    return new Error('Missing Access Token');;
  }
  console.log("processing pages");
  const publisher = new GitHubPublisher(token, githubConfig.user, githubConfig.repo, githubConfig.branch);

  return new Promise((resolve, reject) => {
    publisher.retrieve(githubConfig.pageToCommit).then(file => {
      publisher.publish(githubConfig.pageToCommit, JSON.stringify(data), {
        message: githubConfig.commitMessage,
        sha: file.sha
      }).then(result => {
        console.log("result generated", result)
        if(result)
          resolve(result)
        else
          reject()
      })
    })
  })
}

module.exports = (data) => {
  const jwt = generateGitHubJWT();
  return generateGitHubAccessToken(jwt).then(token =>
    generateGitHubStaticPages(token, data)
  )
};