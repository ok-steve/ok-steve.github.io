import MarkdownIt from "markdown-it";

const options = {
  html: true,
  linkify: true,
  typographer: true,
};

export default MarkdownIt(options);
