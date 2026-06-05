export default function () {
  return {
    env:
      process.env.ELEVENTY_RUN_MODE === "build" ? "production" : "development",
    name: "Steve Cherry",
    description: "The online home of Steve Cherry.",
    color: "#d52b06",
    backgroundColor: "#e1debb",
    github_username: "ok-steve",
  };
}
