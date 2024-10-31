export default function (collectionApi) {
  return collectionApi.getFilteredByGlob("src/posts/*.md");
}
