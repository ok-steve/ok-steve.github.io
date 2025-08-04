// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.
import pkg from "../package.json" with { type: "json" };

export const SITE_AUTHOR = pkg.author.name;
export const SITE_EMAIL = pkg.author.email;
export const SITE_TITLE = pkg.author.name;
export const SITE_DESCRIPTION = pkg.description;
export const SITE_COLOR = "#2b8a3e";
export const SITE_BACKGROUND_COLOR = "#ffffff";
