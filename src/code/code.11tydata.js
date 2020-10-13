module.exports = {
  eleventyComputed: {
    permalink: (data) => {
      if (
        process.env.ELEVENTY_ENV === 'production' &&
        data.published === false
      ) {
        return false;
      }

      return data.permalink;
    },
  },
};
