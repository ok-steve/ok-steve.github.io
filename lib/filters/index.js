import date from "./date.js";
import includes from "./includes.js";
import keys from "./keys.js";
import limit from "./limit.js";

const filters = {
  date,
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
