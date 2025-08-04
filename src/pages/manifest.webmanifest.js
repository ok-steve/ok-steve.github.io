import {
  SITE_TITLE,
  SITE_DESCRIPTION,
  SITE_COLOR,
  SITE_BACKGROUND_COLOR,
} from "../consts";

export async function GET(context) {
  const manifest = {
    name: SITE_TITLE,
    short_name: SITE_TITLE,
    description: SITE_DESCRIPTION,
    start_url: "/",
    scope: "/",
    display: "minimal-ui",
    icons: [
      {
        src: "/img/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/img/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    theme_color: SITE_COLOR,
    background_color: SITE_BACKGROUND_COLOR,
  };

  return new Response(JSON.stringify(manifest));
}
