module.exports = {
  eleventyComputed: {
    permalink: (data) => {
      if (
        process.env.ELEVENTY_ENV === 'production' &&
        data.published === false
      ) {
        return false;
      }

      if (data.permalink) {
        return data.permalink;
      }

      return `posts/${data.page.date
        .toISOString()
        .split('T')[0]
        .split('-')
        .join('/')}/${data.page.fileSlug}/`;
    },
  },
};
