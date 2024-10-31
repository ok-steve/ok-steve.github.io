import { EleventyHtmlBasePlugin, EleventyRenderPlugin } from "@11ty/eleventy";
import EleventyNavigationPlugin from "@11ty/eleventy-navigation";
import EleventyRssPlugin from "@11ty/eleventy-plugin-rss";

import collections from "./lib/collections/index.js";
import filters from "./lib/filters/index.js";
import libraries from "./lib/libraries/index.js";
import shortcodes from "./lib/shortcodes/index.js";

export default async function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  eleventyConfig.addPlugin(EleventyNavigationPlugin);
  eleventyConfig.addPlugin(EleventyRenderPlugin);
  eleventyConfig.addPlugin(EleventyRssPlugin);

  eleventyConfig.addPlugin(collections);
  eleventyConfig.addPlugin(filters);
  eleventyConfig.addPlugin(libraries);
  eleventyConfig.addPlugin(shortcodes);

  eleventyConfig.setServerPassthroughCopyBehavior("passthrough");
  eleventyConfig.addPassthroughCopy("./public");
  eleventyConfig.addPassthroughCopy("./src/*.{txt,xml}");
  eleventyConfig.addPassthroughCopy("./src/sw.js");

  eleventyConfig.addWatchTarget("./src/code/**/*.{css,js}");

  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: "<!-- excerpt -->",
  });

  return {
    markdownTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "dist",
      layouts: "_layouts",
    },
  };
}
