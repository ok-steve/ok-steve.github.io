const pkg = require('../../package.json');

module.exports = () => {
  return {
    env: process.env.ELEVENTY_RUN_MODE === 'build' ? 'production' : 'development',
    name: pkg.author.name,
    color: '#2b8a3e',
    github_username: pkg.name.split('.')[0],
  };
};
