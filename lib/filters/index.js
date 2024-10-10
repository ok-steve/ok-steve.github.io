import includes from "./includes.js";
import keys from "./keys.js";

const filters = {
  includes,
  keys,
};

export default (config) => {
  Object.entries(filters).forEach((item) => {
    const [name, filter] = item;
    config.addFilter(name, filter);
  });
};
