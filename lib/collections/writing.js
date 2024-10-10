export default function (collectionApi) {
  return collectionApi.getFilteredByGlob("src/writing/*.md");
}
