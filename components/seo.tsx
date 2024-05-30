import { DefaultSeo } from "next-seo";
import { FullName, SiteURL, seoDesc } from "../pages/about";

const config = {
  title: `${FullName}`,
  description: `${seoDesc}`,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SiteURL,
    site_name: FullName,
    images: [
      {
        url: `${SiteURL}/og.png`,
        alt: FullName,
      },
    ],
  },
};

export default function SEO() {
  return <DefaultSeo {...config} />;
}
