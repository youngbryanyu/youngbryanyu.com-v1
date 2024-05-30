const fs = require("fs");
const { sync } = require("globby");
const SiteURL = "https://youngbryanyu.com";

function addPage(page) {
  const path = page.replace("pages", "").replace(".js", "").replace(".mdx", "");
  const route = path === "/index" ? "" : path;

  return `  <url>
    <loc>${`${SiteURL}}${route}`}</loc>
    <changefreq>hourly</changefreq>
  </url>`;
}

function generateSitemap() {
  // Ignore Next.js specific files (e.g., _app.js) and API routes.
  const pages = sync([
    "pages/**/*{.js,.mdx,.tsx}",
    "!pages/_*.tsx",
    "!pages/api",
  ]);
  const sitemap = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(addPage).join("\n")}
</urlset>`;

  fs.writeFileSync("public/sitemap.xml", sitemap);
}

generateSitemap();
