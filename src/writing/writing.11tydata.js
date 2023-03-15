module.exports = {
  layout: 'writing',
  tags: ['writing'],
  eleventyComputed: {
    // Prevent unpublished pages from being rendered on production
    permalink({ site, permalink, page }) {
      if (site.env === 'production' && permalink === false) return false;
      if (permalink) return permalink;
      return `${page.filePathStem}/`;
    },
  },
};
