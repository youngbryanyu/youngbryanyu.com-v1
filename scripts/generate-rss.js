/* eslint-disable */
const { promises: fs } = require("fs");
const path = require("path");
const RSS = require("rss");
const matter = require("gray-matter");

const FullName = "Young Bryan Yu";

async function generate() {
  const feed = new RSS({
    title: FullName,
    site_url: "https://youngbryanyu.com",
    feed_url: "https://youngbryanyu.com/feed.xml",
  });

  const posts = await fs.readdir(path.join(__dirname, "..", "data", "blog"));

  await Promise.all(
    posts.map(async (name) => {
      const content = await fs.readFile(
        path.join(__dirname, "..", "data", "blog", name)
      );
      const frontmatter = matter(content);

      feed.item({
        title: frontmatter.data.title,
        url: "https://youngbryanyu.com/blog/" + name.replace(/\.mdx?/, ""),
        date: frontmatter.data.publishedAt,
        description: frontmatter.data.summary,
      });
    })
  );

  await fs.writeFile("./public/feed.xml", feed.xml({ indent: true }));
}

generate();
