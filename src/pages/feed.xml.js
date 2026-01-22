import rss from "@astrojs/rss";
import { getContent } from "../utils";
import { site } from "../config";

export async function GET(context) {
  const posts = (await getContent("posts")).slice(12);

  return rss({
    title: site.name,
    description: site.description,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/posts/${post.id}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
