export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/booking"],
      },
    ],
    sitemap: "http://localhost:3000/sitemap.xml",
  };
}
