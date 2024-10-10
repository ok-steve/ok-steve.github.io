export default function (collectionApi) {
  return collectionApi.getFilteredByGlob("src/code/**/*.njk");
}
