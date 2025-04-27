import { EleventyHtmlBasePlugin } from "@11ty/eleventy";
import EleventyRssPlugin from "@11ty/eleventy-plugin-rss";

import filters from "./lib/filters/index.js";
import libraries from "./lib/libraries/index.js";

export default async function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  eleventyConfig.addPlugin(EleventyRssPlugin);

  eleventyConfig.addPlugin(filters);
  eleventyConfig.addPlugin(libraries);

  eleventyConfig.setServerPassthroughCopyBehavior("passthrough");
  eleventyConfig.addPassthroughCopy("./public");
  eleventyConfig.addPassthroughCopy("./src/*.{js,txt,xml}");

  eleventyConfig.addBundle("css");
  eleventyConfig.addBundle("js");

  eleventyConfig.addWatchTarget("./src/code/**/*.{css,js}");

  return {
    markdownTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "dist",
      layouts: "_layouts",
    },
  };
}
