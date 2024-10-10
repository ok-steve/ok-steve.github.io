import audio from "./audio.js";
import youtube from "./youtube.js";

const shortcodes = {
  audio,
};

const asyncShortcodes = {
  youtube,
};

export default (config) => {
  Object.entries(shortcodes).forEach((item) => {
    const [name, shortcode] = item;
    config.addShortcode(name, shortcode);
  });

  Object.entries(asyncShortcodes).forEach((item) => {
    const [name, shortcode] = item;
    config.addNunjucksAsyncShortcode(name, shortcode);
  });
};
