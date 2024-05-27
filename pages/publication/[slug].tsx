import { useMDXComponent } from "next-contentlayer/hooks";
import { allPublications, Publication as PublicationType } from ".contentlayer/generated";
import { GetStaticPaths, GetStaticProps } from "next";
import { NextSeo, SiteLinksSearchBoxJsonLd } from "next-seo";
import MDXComponents from "components/MDXComponents";
import { connectLinks, FullName, SiteURL } from "pages/about";
import Link from "components/Link";
import { ReactElement } from "react";
import HitCounter from "components/hitcounter";

type PublicationProps = {
  publication: PublicationType;
  rest: PublicationType[];
};

export default function Publication({ publication, rest }: PublicationProps) {
  const seoTitle = `${publication.title} | ${FullName}`;
  const seoDesc = `${publication.description}`;
  const url = `${SiteURL}/publication/${publication.slug}`;
  const Component = useMDXComponent(publication.body.code);

  return (
    <>
      <div className="hidden">
        <HitCounter slug={`publication-${publication.slug}`} />
      </div>
      <NextSeo
        title={seoTitle}
        description={seoDesc}
        canonical={url}
        openGraph={{
          title: seoTitle,
          url,
          description: seoDesc,
          images: [],
        }}
      />

      <div className="flex flex-col gap-20">
        <article>
          <div className="h-20" />
          <div className="flex flex-col gap-3 px-4 md:px-6 py-2 max-w-[700px] mx-auto ">
            <h1 className="text-2xl font-semibold">{publication.title}</h1>
            <div className="flex gap-3">
              <p className="text-secondary">{publication.journal}</p> <span>&middot;</span>
              <p className="text-secondary">{publication.forthcoming ? "Forthcoming" : publication.publishedAt}</p>
              {publication.url && (
                <>
                  <span>&middot;</span>
                  <Link href={publication.url}>Read Paper ↗</Link>
                </>
              )}
            </div>
            <div className="flex gap-0">
              {publication.authors.map((author: string, index: number) =>
                <span key={author} className={`text-${author == 'Zenan Chen' ? "primary" : "secondary"}`}>
                  {index != 0 && <span className="text-secondary">,&nbsp;</span>}
                  {author}
                </span>
              )}
            </div>
          </div>

          <div className="h-12" />
          <div className="prose publication prose-h2:text-lg prose-h2:mb-2 prose-h2:font-semibold">
            <Component components={MDXComponents} />
          </div>
        </article>
        <hr className="border-primary px-4 md:px-6 py-2 max-w-[700px] mx-auto w-full" />
        <div className="flex flex-col gap-3.5 px-4 md:px-6 py-2 max-w-[700px] mx-auto w-full">
          <h3 className="text-xl">Have any questions?</h3>
          <p className="text-secondary">
            Get in touch with me via{" "}
          </p>
          <ul className="flex gap-5 animated-list">
            {connectLinks.map((link) => (
              <li className="transition-opacity" key={link.label}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
          <div className="h-12"></div>
          <Link href="/" underline>
            ← Back home
          </Link>
        </div>

        <div />
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: allPublications.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const publication = allPublications.find((p) => p.slug === params?.slug);
  const rest = allPublications
    /* remove current post */
    .filter((p) => p.slug !== params?.slug);

  return {
    props: {
      publication,
      rest,
    },
  };
};

Publication.getLayout = function getLayout(page: ReactElement) {
  return (
    <main className="px-4 md:px-6 pb-24 md:pb-44 max-w-[700px] mx-auto ring-offset-primary">
      {page}
    </main>
  )
};
