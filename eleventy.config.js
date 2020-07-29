const pluginNavigation = require('@11ty/eleventy-navigation');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const markdownIt = require('markdown-it');
const markdownItAbbr = require('markdown-it-abbr');
const markdownItFootnote = require('markdown-it-footnote');

const markdownLib = new markdownIt({
  html: true,
  linkify: true,
  typographer: true,
})
  .use(markdownItAbbr)
  .use(markdownItFootnote);

module.exports = (eleventyConfig) => {
  eleventyConfig.setWatchJavaScriptDependencies(false);

  eleventyConfig.addPlugin(pluginNavigation);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);

  eleventyConfig.addPassthroughCopy('src/js');
  eleventyConfig.addPassthroughCopy('src/assets');
  eleventyConfig.addPassthroughCopy('src/*.{txt,xml}');
  eleventyConfig.addPassthroughCopy('src/sw.js');

  eleventyConfig.setLibrary('md', markdownLib);

  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
  });

  eleventyConfig.addCollection('posts', (collection) => {
    return collection.getFilteredByGlob('src/posts/*.md').sort((a, b) => {
      return b.date - a.date;
    }).filter(item => {
      return item.permalink !== false;
    });
  });

  eleventyConfig.addPairedShortcode('markdown', (content) => {
    if (!content) return;
    return markdownLib.render(content);
  });

  return {
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    dir: {
      input: 'src',
      output: 'dist',
      layouts: '_layouts',
    },
  };
};
