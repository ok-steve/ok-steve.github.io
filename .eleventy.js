const { EleventyHtmlBasePlugin } = require('@11ty/eleventy');
const EleventyNavigation = require('@11ty/eleventy-navigation');
const EleventyRssPlugin = require('@11ty/eleventy-plugin-rss');
const EleventySyntaxHighlightPlugin = require('@11ty/eleventy-plugin-syntaxhighlight');
const MarkdownIt = require('markdown-it');

const markdownLib = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

module.exports = function (eleventyConfig) {
  /**
   * Plugins
   */

  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  eleventyConfig.addPlugin(EleventyNavigation);
  eleventyConfig.addPlugin(EleventyRssPlugin);
  eleventyConfig.addPlugin(EleventySyntaxHighlightPlugin);

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
   * Markdown
   */

  eleventyConfig.setLibrary('md', markdownLib);

  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: '<!-- excerpt -->',
  });

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
    markdownTemplateEngine: 'njk',
    dir: {
      input: 'src',
      output: 'dist',
      layouts: '_layouts',
    },
  };
};
