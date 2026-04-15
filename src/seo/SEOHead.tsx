import { Helmet } from "react-helmet-async";
import { SEO_CONFIG } from "./seo.config";

type Props = {
  title:        string;
  description:  string;
  keywords?:    string;
  canonical?:   string;
  ogImage?:     string;
  ogType?:      "website" | "article";
  noIndex?:     boolean;
};

export default function SEOHead({
  title,
  description,
  keywords,
  canonical,
  ogImage    = `${SEO_CONFIG.siteUrl}/og-image.jpg`,
  ogType     = "website",
  noIndex    = false,
}: Props) {
  return (
    <Helmet>
      {/* ── Base ──────────────────────────── */}
      <title>{title}</title>
      <meta name="description"  content={description} />
      {keywords  && <meta name="keywords" content={keywords} />}
      {canonical && <link rel="canonical" href={canonical} />}
      {noIndex   && <meta name="robots" content="noindex, nofollow" />}

      {/* ── Open Graph ────────────────────── */}
      <meta property="og:type"        content={ogType} />
      <meta property="og:title"       content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image"       content={ogImage} />
      <meta property="og:url"         content={canonical ?? SEO_CONFIG.siteUrl} />
      <meta property="og:site_name"   content={SEO_CONFIG.siteName} />
      <meta property="og:locale"      content="fr_FR" />

      {/* ── Twitter Card ──────────────────── */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={ogImage} />

      {/* ── Mobile ────────────────────────── */}
      <meta name="theme-color" content="#0A1628" />
    </Helmet>
  );
}