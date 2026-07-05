export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/booking"],
      },
    ],
    sitemap: "https://booking.huseyn.space/sitemap.xml",
  };
}
