import EleventyFetch from "@11ty/eleventy-fetch";

export default async function (value) {
  const { html } = await EleventyFetch(
    `https://www.youtube.com/oembed?url=${value}`,
    {
      duration: "1y",
      type: "json",
    }
  );

  return html;
}
