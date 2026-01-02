export default function () {
  return {
    env:
      process.env.ELEVENTY_RUN_MODE === "build" ? "production" : "development",
    name: "Steve Cherry",
    description: "The online home of Steve Cherry.",
    color: "#2b8a3e",
    backgroundColor: "#ffffff",
    github_username: "ok-steve",
  };
}
