import demo from "./demo.js";
import writing from "./writing.js";

const collections = {
  demo,
  writing,
};

export default (config) => {
  Object.entries(collections).forEach((item) => {
    const [name, collection] = item;
    config.addCollection(name, collection);
  });
};
