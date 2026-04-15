import { Helmet } from "react-helmet-async";
import { SEO_CONFIG } from "./seo.config";

export default function SchemaOrg() {
  const schema = {
    "@context":   "https://schema.org",
    "@type":      "LocalBusiness",
    "@id":        `${SEO_CONFIG.siteUrl}/#business`,
    name:         SEO_CONFIG.siteName,
    url:          SEO_CONFIG.siteUrl,
    telephone:    SEO_CONFIG.phone,
    email:        SEO_CONFIG.email,
    image:        `${SEO_CONFIG.siteUrl}/og-image.jpg`,
    logo:         `${SEO_CONFIG.siteUrl}/logo.png`,
    description:  "Expert Wi-Fi à Nantes — diagnostic, installation et sécurisation de réseaux pour particuliers et professionnels.",
    priceRange:   "€€",
    currenciesAccepted: "EUR",
    paymentAccepted:    "Carte bancaire, virement, espèces",

    address: {
      "@type":           "PostalAddress",
      streetAddress:      SEO_CONFIG.address.street,
      addressLocality:    SEO_CONFIG.address.city,
      addressRegion:      SEO_CONFIG.address.region,
      postalCode:         SEO_CONFIG.address.zip,
      addressCountry:     SEO_CONFIG.address.country,
    },

    geo: {
      "@type":    "GeoCoordinates",
      latitude:   SEO_CONFIG.geo.lat,
      longitude:  SEO_CONFIG.geo.lng,
    },

    openingHoursSpecification: [
      {
        "@type":     "OpeningHoursSpecification",
        dayOfWeek:   ["Monday","Tuesday","Wednesday","Thursday","Friday"],
        opens:       "08:00",
        closes:      "19:00",
      },
      {
        "@type":     "OpeningHoursSpecification",
        dayOfWeek:   ["Saturday"],
        opens:       "09:00",
        closes:      "17:00",
      },
    ],

    areaServed: {
      "@type":       "GeoCircle",
      geoMidpoint: {
        "@type":    "GeoCoordinates",
        latitude:   SEO_CONFIG.geo.lat,
        longitude:  SEO_CONFIG.geo.lng,
      },
      geoRadius: "30000", // 30km autour de Nantes
    },

    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name:    "Services Wi-Fi Nantes",
      itemListElement: [
        {
          "@type":       "Offer",
          name:          "Diagnostic Wi-Fi",
          price:         "79",
          priceCurrency: "EUR",
          description:   "Audit complet de votre réseau Wi-Fi à Nantes",
        },
        {
          "@type":       "Offer",
          name:          "Installation Wi-Fi Confort",
          price:         "199",
          priceCurrency: "EUR",
          description:   "Installation et configuration réseau Wi-Fi complète",
        },
        {
          "@type":       "Offer",
          name:          "Solution Pro Entreprise",
          price:         "499",
          priceCurrency: "EUR",
          description:   "Solution Wi-Fi professionnelle multi-sites à Nantes",
        },
      ],
    },

    sameAs: [
      SEO_CONFIG.social.facebook,
    ],
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}