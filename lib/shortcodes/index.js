import audio from "./audio.js";

const shortcodes = {
  audio,
};

export default (config) => {
  Object.entries(shortcodes).forEach((item) => {
    const [name, shortcode] = item;
    config.addShortcode(name, shortcode);
  });
};
