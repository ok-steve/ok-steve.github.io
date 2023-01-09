const EleventyFetch = require('@11ty/eleventy-fetch');

module.exports = async (value) => {
  const { html } = await EleventyFetch(
    `https://www.youtube.com/oembed?url=${value}`,
    {
      duration: '1y',
      type: 'json',
    }
  );

  return html;
};
