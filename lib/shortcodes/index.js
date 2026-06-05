import lettering from "./lettering.js";

const shortcodes = {
  lettering,
};

export default (config) => {
  Object.entries(shortcodes).forEach((item) => {
    const [name, shortcode] = item;
    config.addShortcode(name, shortcode);
  });
};
