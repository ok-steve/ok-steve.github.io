const MarkdownIt = require("markdown-it");

const options = {
  html: true,
  linkify: true,
  typographer: true,
};

module.exports = MarkdownIt(options);
