import { Helmet } from "react-helmet-async";
import { SEO_CONFIG } from "./seo.config";

type Props = {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  noIndex?: boolean;
};

export default function SEOHead({
  title,
  description,
  keywords,
  canonical,
  ogImage = `${SEO_CONFIG.siteUrl}/logo.png`,
  ogType = "website",
  noIndex = false,
}: Props) {
  const robots = noIndex
    ? "noindex, nofollow, noarchive"
    : "index, follow, max-image-preview:large";

  return (
    <Helmet>
      <html lang="fr" />
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={robots} />
      <meta name="googlebot" content={robots} />
      {canonical && <link rel="canonical" href={canonical} />}

      {SEO_CONFIG.searchConsoleVerification && (
        <meta
          name="google-site-verification"
          content={SEO_CONFIG.searchConsoleVerification}
        />
      )}

      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonical ?? SEO_CONFIG.siteUrl} />
      <meta property="og:site_name" content={SEO_CONFIG.siteName} />
      <meta property="og:locale" content="fr_FR" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="theme-color" content="#0A1628" />
    </Helmet>
  );
}
