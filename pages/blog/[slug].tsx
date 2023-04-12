import { pick } from "lib/pick";
import { useMDXComponent } from "next-contentlayer/hooks";
import { allPosts, Post as PostType } from ".contentlayer/generated";
import { GetStaticPaths, GetStaticProps } from "next";
import { NextSeo } from "next-seo";

import { formatDate } from "lib/formatdate";
import HitCounter from "components/hitcounter";
import PostList from "components/postlist";
import Link from "components/Link";
import Image from "next/image";
import NewsletterInput from "components/NewsletterInput";
import Tags from "components/tags";
import LikeButton from "components/likebutton";
import MDXComponents from "components/MDXComponents";
import Parallax from "components/blog/parallax";
import { FullName, SiteURL } from "../about";

type PostProps = {
  post: PostType;
  related: PostType[];
};

export default function Post({ post, related }: PostProps) {
  const seoTitle = `${post.title} | ${FullName}`;
  const seoDesc = `${post.summary}`;
  const url = `${SiteURL}/blog/${post.slug}`;
  const Component = useMDXComponent(post.body.code);

  return (
    <>
      <NextSeo
        title={seoTitle}
        description={seoDesc}
        canonical={url}
        openGraph={{
          title: seoTitle,
          url,
          description: seoDesc,
          site_name: FullName,
          type: "article",
          article: {
            publishedTime: post.publishedAt,
            modifiedTime: post.updatedAt,
            authors: [SiteURL],
          },
          images: [{
            url: post.image
              ? `${SiteURL}${post.image}`
              : `${SiteURL}/api/og?title=${encodeURIComponent(
                  post.title
                )}`,
            alt: post.title,
          }]
        }}
      />

      <div className="flex flex-col gap-20">
        <article>
          {(
            post.image && <Image
              src={post.image}
              alt={`${post.title} post image`}
              width={700}
              height={350}
              className="w-[calc(100%+32px)] -ml-4 md:rounded-xl max-w-none border  border-primary"
              priority
            />
          )}
          <div className="h-8" />
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-semibold">{post.title}</h1>
            <p className="text-secondary">
              <time dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
              </time>
              {post.updatedAt ? ` (Updated ${formatDate(post.updatedAt)})` : ""}{" "}
              <HitCounter slug={post.slug} />
            </p>
          </div>
          <div className="h-8" />
          <div className="prose prose-h2:text-lg prose-h2:mb-2 prose-h2:font-semibold">
            <Component components={MDXComponents} />
          </div>
        </article>

        <LikeButton slug={post.slug} />

        <Tags tags={post.tags} />


        {related.length ? (
          <div className="flex flex-col items-start gap-10">
            <h3 className="text-xl">Related posts</h3>
            <div className="will-change-transform">
              <PostList posts={related} />
            </div>
            <Link href="/blog" underline>
              ← See all
            </Link>
          </div>
        ) : null}
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: allPosts.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = allPosts.find((p) => p.slug === params?.slug);
  const related = allPosts
    /* remove current post */
    .filter((p) => p.slug !== params?.slug)
    /* Find other posts where tags are matching */
    .filter((p) => p.tags?.some((tag: string) => post?.tags?.includes(tag)))
    /* return the first three */
    .filter((_, i) => i < 3)
    /* only return what's needed to render the list */
    .map((p) => pick(p, ["slug", "title", "summary", "publishedAt"]));

  return {
    props: {
      post,
      related,
    },
  };
};
