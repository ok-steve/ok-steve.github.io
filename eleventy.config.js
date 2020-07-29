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
    return collection.getFilteredByGlob('src/posts/*.{md,njk}').sort((a, b) => {
      return b.date - a.date;
    }).filter(item => {
      return item.permalink !== false;
    });
  });

  eleventyConfig.addPairedShortcode('markdown', (content) => {
    if (!content) return;
    return markdownLib.render(content);
  });

  eleventyConfig.addPairedShortcode('codepen', (content, settings) => {
    return `
      <div data-height="265"
        data-default-tab="js,result"
        data-prefill='${JSON.stringify(settings)}'>
        ${content}
      </div>
      <script async src="https://unpkg.com/prismjs@1.20.0/prism.js"></script>
      <script async src="https://static.codepen.io/assets/embed/ei.js"></script>
      <script>
      // Loop over all elements with the 'data-prefill' attribute
      Array.from(document.querySelectorAll('[data-prefill]'), (el) => {
        // Create a Click to Run button
        const button = document.createElement('button');
        button.innerHTML = 'Click to Run';
        button.setAttribute('class', 'prefill-click-to-run');
        button.classList.add('bg-transparent', 'border', 'border-primary', 'border-solid', 'hover:bg-primary', 'hover:text-white', 'p-2', 'text-primary', 'w-full');
        el.appendChild(button);

        // On click, the element will become the embed!
        button.addEventListener('click', () => {
          el.classList.add('codepen'); // Add the codepen class back.
          window.__CPEmbed(); // Trigger the CodePen embed script to run again.
        });
      });
      </script>
    `;
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
