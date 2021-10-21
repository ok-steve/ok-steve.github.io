module.exports = {
  layout: 'writing.njk',
  eleventyComputed: {
    // Prevent unpublished pages from being rendered on production
    permalink: ({ env, published, page }) =>
      env === 'production' && !published ? false : `${page.filePathStem}/`,
  },
};
