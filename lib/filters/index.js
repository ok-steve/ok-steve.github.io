import includes from "./includes.js";
import keys from "./keys.js";
import limit from "./limit.js";

const filters = {
  includes,
  keys,
  limit,
};

export default (config) => {
  Object.entries(filters).forEach((item) => {
    const [name, filter] = item;
    config.addFilter(name, filter);
  });
};
