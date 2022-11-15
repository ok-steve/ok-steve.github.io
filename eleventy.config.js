/* eslint-disable import/no-extraneous-dependencies */
const EleventyFetch = require('@11ty/eleventy-fetch');
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const eleventyRssPlugin = require('@11ty/eleventy-plugin-rss');
const eleventySyntaxHighlightPlugin = require('@11ty/eleventy-plugin-syntaxhighlight');
const MarkdownIt = require('markdown-it');
const htmlmin = require('html-minifier');

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

  eleventyConfig.addPassthroughCopy({
    './node_modules/prismjs/themes/prism-solarizedlight.css':
      './public/syntax-highlighting.css',
  });
  eleventyConfig.addPassthroughCopy('public');
  eleventyConfig.addPassthroughCopy('src/*.{txt,xml}');
  eleventyConfig.addPassthroughCopy('src/sw.js');

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

  eleventyConfig.addFilter('md', (value) => markdownLib.renderInline(value));

  /**
   * Shortcodes
   */

  eleventyConfig.addShortcode('audio', (value) => {
    return `<audio controls src="${value}"></audio>`;
  });

  eleventyConfig.addNunjucksAsyncShortcode('youtube', async (value) => {
    const { html } = await EleventyFetch(
      `https://www.youtube.com/oembed?url=${value}`,
      {
        duration: '1y',
        type: 'json',
      }
    );

    return html;
  });

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
