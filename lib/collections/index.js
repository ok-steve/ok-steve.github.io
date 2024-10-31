import demo from "./demo.js";
import posts from "./posts.js";

const collections = {
  demo,
  posts,
};

export default (config) => {
  Object.entries(collections).forEach((item) => {
    const [name, collection] = item;
    config.addCollection(name, collection);
  });
};
