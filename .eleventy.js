const {
  EleventyHtmlBasePlugin,
  EleventyRenderPlugin,
} = require('@11ty/eleventy');
const EleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const EleventyRssPlugin = require('@11ty/eleventy-plugin-rss');
const EleventySyntaxHighlightPlugin = require('@11ty/eleventy-plugin-syntaxhighlight');

module.exports = function (eleventyConfig) {
  /**
   * Plugins
   */

  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  eleventyConfig.addPlugin(EleventyNavigationPlugin);
  eleventyConfig.addPlugin(EleventyRenderPlugin);
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

  eleventyConfig.addWatchTarget('./src/code/**/*.{css,js}');

  /**
   * Libraries
   */

  ['md'].forEach((name) =>
    eleventyConfig.setLibrary(name, require(`./lib/libraries/${name}`))
  );

  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: '<!-- excerpt -->',
  });

  /**
   * Shortcodes
   */

  ['audio'].forEach((name) =>
    eleventyConfig.addShortcode(name, require(`./lib/shortcodes/${name}`))
  );

  ['youtube'].forEach((name) =>
    eleventyConfig.addNunjucksAsyncShortcode(
      name,
      require(`./lib/shortcodes/${name}`)
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
