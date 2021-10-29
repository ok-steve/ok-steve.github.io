module.exports = {
  layout: 'writing.njk',
  eleventyComputed: {
    // Prevent unpublished pages from being rendered on production
    permalink: ({ env, published, permalink, page }) => {
      if (env === 'production' && !published) return false;
      if (permalink) return permalink;
      return `${page.filePathStem}/`;
    },
  },
};
