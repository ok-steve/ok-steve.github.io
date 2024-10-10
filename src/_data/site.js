// import pkg from "../../package.json";

export default function () {
  return {
    env:
      process.env.ELEVENTY_RUN_MODE === "build" ? "production" : "development",
    // name: pkg.author.name,
    name: "Steve Cherry",
    color: "#2b8a3e",
    backgroundColor: "#ffffff",
    // github_username: pkg.name.split(".")[0],
    github_username: "ok-steve",
  };
}
