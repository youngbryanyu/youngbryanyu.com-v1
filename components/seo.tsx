import { DefaultSeo } from "next-seo";
import { FullName, SiteURL } from "../pages/about";

const config = {
  title: `${FullName}`,
  description: "Researcher in Information Systems with a primary focus on Technologies ✕ Productivity.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SiteURL,
    site_name: FullName,
    images: [
      {
        url: `${SiteURL}/og.jpg`,
        alt: FullName,
      },
    ],
  },
  twitter: {
    handle: "@chzenan",
    site: "@chzenan",
    cardType: "summary_large_image",
  },
};

export default function SEO() {
  return <DefaultSeo {...config} />;
}
