import { EleventyHtmlBasePlugin, EleventyRenderPlugin } from "@11ty/eleventy";
import EleventyNavigationPlugin from "@11ty/eleventy-navigation";
import EleventyRssPlugin from "@11ty/eleventy-plugin-rss";
import EleventySyntaxHighlightPlugin from "@11ty/eleventy-plugin-syntaxhighlight";

import collections from "./lib/collections/index.js";
import libraries from "./lib/libraries/index.js";
import shortcodes from "./lib/shortcodes/index.js";
import transforms from "./lib/transforms/index.js";

export default async function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  eleventyConfig.addPlugin(EleventyNavigationPlugin);
  eleventyConfig.addPlugin(EleventyRenderPlugin);
  eleventyConfig.addPlugin(EleventyRssPlugin);
  eleventyConfig.addPlugin(EleventySyntaxHighlightPlugin);

  eleventyConfig.addPlugin(collections);
  eleventyConfig.addPlugin(libraries);
  eleventyConfig.addPlugin(shortcodes);
  eleventyConfig.addPlugin(transforms);

  eleventyConfig.setServerPassthroughCopyBehavior("passthrough");
  eleventyConfig.addPassthroughCopy({
    "./node_modules/prismjs/themes/prism-solarizedlight.css":
      "./public/syntax-highlighting.css",
  });
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
