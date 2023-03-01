/* eslint-disable import/no-extraneous-dependencies */
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const eleventyRssPlugin = require('@11ty/eleventy-plugin-rss');
const eleventySyntaxHighlightPlugin = require('@11ty/eleventy-plugin-syntaxhighlight');
const MarkdownIt = require('markdown-it');

const markdownLib = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

module.exports = function (eleventyConfig) {
  eleventyConfig.setWatchJavaScriptDependencies(false);

  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: '<!-- excerpt -->',
  });

  /**
   * Plugins
   */

  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(eleventyRssPlugin);
  eleventyConfig.addPlugin(eleventySyntaxHighlightPlugin);

  /**
   * Passthrough copy
   */

  eleventyConfig.setServerPassthroughCopyBehavior('passthrough');
  eleventyConfig.addPassthroughCopy({
    './node_modules/prismjs/themes/prism-solarizedlight.css':
      './public/syntax-highlighting.css',
  });
  eleventyConfig.addPassthroughCopy('./public');
  eleventyConfig.addPassthroughCopy('./src/*.{txt,xml}');
  eleventyConfig.addPassthroughCopy('./src/sw.js');

  /**
   * Libraries
   */

  eleventyConfig.setLibrary('md', markdownLib);

  /**
   * Filters
   */

  eleventyConfig.addFilter('md', (value) => markdownLib.renderInline(value));

  /**
   * Shortcodes
   */

  ['audio'].forEach((shortcode) =>
    eleventyConfig.addShortcode(
      shortcode,
      require(`./lib/shortcodes/${shortcode}`)
    )
  );

  ['youtube'].forEach((shortcode) =>
    eleventyConfig.addNunjucksAsyncShortcode(
      shortcode,
      require(`./lib/shortcodes/${shortcode}`)
    )
  );

  return {
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    dir: {
      input: 'src',
      output: 'dist',
      layouts: '_layouts',
    },
  };
};
