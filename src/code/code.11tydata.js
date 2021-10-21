module.exports = {
  layout: 'code.njk',
  eleventyComputed: {
    permalink: ({ env, published, permalink, page }) => {
      if (env === 'production' && !published) return false;
      if (permalink) return permalink;
      return `${page.filePathStem}/`;
    },
  },
};
