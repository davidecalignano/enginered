const GitHubPublisher = require('github-publish');

const githubConfig = {
  pageToCommit: '_data/companies.json',
  commitMessage: 'Update',
  token: process.env.GITHUB_USER_TOKEN,
  user: process.env.GITHUB_USER,
  repo: process.env.GITHUB_REPO,
  branch: process.env.GITHUB_BRANCH
}

function generateGitHubStaticPages(data) {
  return new Promise((resolve, reject) => {

    if(!githubConfig.token) {
      reject();
    }

    const publisher = new GitHubPublisher(githubConfig.token, githubConfig.user, githubConfig.repo, githubConfig.branch);
    publisher.publish(githubConfig.pageToCommit, JSON.stringify(data), {
      message: githubConfig.commitMessage,
      force: true
    }).then(result => result ? resolve(result) : reject())
  })
}

module.exports = generateGitHubStaticPages




