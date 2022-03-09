/* eslint-disable import/no-extraneous-dependencies */
const pluginNavigation = require('@11ty/eleventy-navigation');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const MarkdownIt = require('markdown-it');
const htmlmin = require('html-minifier');

const markdownLib = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

module.exports = (eleventyConfig) => {
  eleventyConfig.setWatchJavaScriptDependencies(false);

  /**
   * Plugins
   */

  eleventyConfig.addPlugin(pluginNavigation);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);

  /**
   * Passthrough copy
   */

  eleventyConfig.addPassthroughCopy({
    './node_modules/prismjs/themes/prism-solarizedlight.css':
      './public/syntax-highlighting.css',
  });
  eleventyConfig.addPassthroughCopy('public');
  eleventyConfig.addPassthroughCopy('src/*.{txt,xml}');
  eleventyConfig.addPassthroughCopy('src/sw.js');
  eleventyConfig.addPassthroughCopy('src/admin');

  /**
   * Libraries
   */

  eleventyConfig.setLibrary('md', markdownLib);

  /**
   * Collections
   */

  eleventyConfig.addCollection('writing', (collectionApi) =>
    collectionApi.getFilteredByGlob('src/writing/*.md')
  );

  /**
   * Filters
   */

  eleventyConfig.addFilter('excerpt', (value) => {
    if (!value) return '';
    return value.split('\n')[0];
  });

  eleventyConfig.addFilter('published', (value) =>
    value.filter((item) => item.data.permalink)
  );

  /**
   * Transforms
   */

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
