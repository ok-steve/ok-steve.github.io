export default function () {
  return {
    date({ site, date }) {
      if (date) return date;
      // In prod use Git for the default date.
      if (site.env === "production") return "git Created";
      return undefined;
    },
    permalink({ site, permalink }) {
      // Render unpublished pages in dev but not on prod.
      if (site.env === "production" && permalink === false) return false;

      // Otherwise, replicate 11ty's default permalink behavior.
      if (permalink) return permalink;
      return undefined;
    },
  };
}
