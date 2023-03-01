const pkg = require('../../package.json');

module.exports = () => {
  return {
    name: pkg.author.name,
    description: pkg.description,
    url: pkg.author.url,
    author: pkg.author,
    color: '#2b8a3e',
    github_username: pkg.name.split('.')[0],
  };
};
