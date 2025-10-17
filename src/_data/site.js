export default function () {
  return {
    env:
      process.env.ELEVENTY_RUN_MODE === "build" ? "production" : "development",
    name: "Steve Cherry",
    color: "#d52b06",
    backgroundColor: "#e1debb",
    github_username: "ok-steve",
  };
}
