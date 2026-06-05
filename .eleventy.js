import { EleventyHtmlBasePlugin } from "@11ty/eleventy";
import EleventyRssPlugin from "@11ty/eleventy-plugin-rss";

import filters from "./lib/filters/index.js";
import libraries from "./lib/libraries/index.js";

export default async function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  eleventyConfig.addPlugin(EleventyRssPlugin, {
    collection: {
      name: "post",
      limit: 10,
    },
    metadata: {
      language: "en-US",
      title: "Steve Cherry",
      subtitle: "The online home of Steve Cherry.",
      base: "https://stevecherry.net/",
      author: {
        name: "Steve Cherry",
        email: "steve@stevecherry.net",
      },
    },
  });

  eleventyConfig.addPlugin(filters);
  eleventyConfig.addPlugin(libraries);

  eleventyConfig.setServerPassthroughCopyBehavior("passthrough");
  eleventyConfig.addPassthroughCopy({ "./public": "." });

  return {
    markdownTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "dist",
      layouts: "_layouts",
    },
  };
}
