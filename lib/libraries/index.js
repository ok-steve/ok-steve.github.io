import md from "./md.js";

const libraries = {
  md,
};

export default (config) => {
  Object.entries(libraries).forEach((item) => {
    const [name, filter] = item;
    config.setLibrary(name, filter);
  });
};
