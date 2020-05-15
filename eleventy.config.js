const pluginNavigation = require('@11ty/eleventy-navigation');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

module.exports = (eleventyConfig) => {
  eleventyConfig.setWatchJavaScriptDependencies(false);

  eleventyConfig.addPlugin(pluginNavigation);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);

  eleventyConfig.addPassthroughCopy('js');
  eleventyConfig.addPassthroughCopy('assets');
  eleventyConfig.addPassthroughCopy('browserconfig.xml');
  eleventyConfig.addPassthroughCopy('crossdomain.xml');
  eleventyConfig.addPassthroughCopy('humans.txt');
  eleventyConfig.addPassthroughCopy('manifest.json');
  eleventyConfig.addPassthroughCopy('robots.txt');
  eleventyConfig.addPassthroughCopy('service-worker.js');

  eleventyConfig.addCollection('posts', (collection) => {
    return collection.getFilteredByGlob('src/posts/*.md').sort((a, b) => {
      return b.date - a.date;
    }).filter(item => {
      return item.permalink !== false;
    });
  });

  return {
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    dir: {
      input: 'src',
      output: 'dist',
      layouts: '_layouts',
    },
  };
};
