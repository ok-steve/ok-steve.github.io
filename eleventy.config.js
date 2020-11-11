/* eslint-disable import/no-extraneous-dependencies */
const pluginNavigation = require('@11ty/eleventy-navigation');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const MarkdownIt = require('markdown-it');
const markdownItAbbr = require('markdown-it-abbr');
const markdownItFootnote = require('markdown-it-footnote');
const htmlmin = require('html-minifier');

const markdownLib = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
})
  .use(markdownItAbbr)
  .use(markdownItFootnote);

markdownLib.renderer.rules.paragraph_open = (
  tokens,
  idx,
  options,
  env,
  renderer
) => {
  const token = tokens[idx];

  if (idx === 0 && token.level === 0) {
    return `<p class="lead">`;
  }

  return renderer.renderToken(tokens, idx, options);
};

module.exports = (eleventyConfig) => {
  eleventyConfig.setWatchJavaScriptDependencies(false);

  eleventyConfig.addPlugin(pluginNavigation);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);

  eleventyConfig.addFilter('published', (value) => {
    return value.filter((item) => item.data.permalink);
  });

  eleventyConfig.addTransform('htmlmin', (content, outputPath) => {
    if (
      process.env.ELEVENTY_ENV === 'production' &&
      outputPath &&
      outputPath.endsWith('.html')
    ) {
      const minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });

      return minified;
    }

    return content;
  });

  eleventyConfig.addPassthroughCopy({
    './node_modules/turbolinks/dist/turbolinks.js': './js/turbolinks.js',
  });
  eleventyConfig.addPassthroughCopy('src/js');
  eleventyConfig.addPassthroughCopy('src/assets');
  eleventyConfig.addPassthroughCopy('src/*.{txt,xml}');
  eleventyConfig.addPassthroughCopy('src/sw.js');
  eleventyConfig.addPassthroughCopy('src/admin');

  eleventyConfig.setLibrary('md', markdownLib);

  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
  });

  eleventyConfig.addPairedShortcode('markdown', (content) => {
    return markdownLib.render(content);
  });

  eleventyConfig.setBrowserSyncConfig({
    snippetOptions: {
      rule: {
        match: /<\/head>/i,
        fn: function (snippet, match) {
          return snippet + match;
        },
      },
    },
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
