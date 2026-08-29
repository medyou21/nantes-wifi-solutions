const env = import.meta.env;

export const SEO_CONFIG = {
  siteName: "Nantes WiFi Solutions",
  siteUrl: (env.VITE_SITE_URL || "https://nantes-wifi.fr").replace(/\/$/, ""),
  phone: "+33XXXXXXXXX",
  email: "contact@nantes-wifi.fr",
  address: {
    street: "Nantes",
    city: "Nantes",
    region: "Pays de la Loire",
    zip: "44000",
    country: "FR",
  },
  geo: {
    lat: 47.2184,
    lng: -1.5536,
  },
  social: {
    facebook: "https://facebook.com/nanteswifi",
  },
  analytics: {
    ga4Id: env.VITE_GA_ID || "",
    gtmId: env.VITE_GTM_ID || "",
  },
  ads: {
    id: env.VITE_GOOGLE_ADS_ID || "",
    conversionLabel: env.VITE_GOOGLE_ADS_CONVERSION_LABEL || "",
  },
  searchConsoleVerification: env.VITE_GOOGLE_SITE_VERIFICATION || "",
} as const;

const url = (path = "") => `${SEO_CONFIG.siteUrl}${path}`;

export const PAGES_SEO = {
  home: {
    title: "Nantes WiFi Solutions — Expert Wi-Fi à Nantes",
    description:
      "Installation, diagnostic et sécurisation Wi-Fi à Nantes et agglomération. Intervention rapide, devis gratuit. Particuliers et professionnels.",
    keywords:
      "WiFi Nantes, installation WiFi Nantes, problème WiFi maison, expert WiFi Nantes, dépannage WiFi Nantes, réseau WiFi professionnel Nantes",
    canonical: url(),
  },
  services: {
    title:
      "Services Wi-Fi à Nantes — Diagnostic, installation et sécurité",
    description:
      "Diagnostic, installation et sécurisation de réseaux Wi-Fi à Nantes pour maisons, PME, hôtels, Airbnb et syndics.",
    keywords:
      "diagnostic WiFi Nantes, installation WiFi Nantes, sécurité réseau Nantes, couverture WiFi, point d'accès WiFi Nantes",
    canonical: url("/services"),
  },
  tarifs: {
    title:
      "Tarifs installation Wi-Fi Nantes — Forfaits dès 79 €",
    description:
      "Forfaits Wi-Fi transparents à Nantes : diagnostic Basic 79 €, Confort 199 € et solution Pro 499 €. Demandez votre devis gratuit.",
    keywords:
      "prix installation WiFi Nantes, tarif diagnostic WiFi, forfait WiFi Nantes, devis WiFi gratuit Nantes",
    canonical: url("/tarifs"),
  },
  contact: {
    title:
      "Devis Wi-Fi gratuit à Nantes — Contact Nantes WiFi Solutions",
    description:
      "Contactez un spécialiste Wi-Fi à Nantes pour un diagnostic, une installation ou une sécurisation de réseau. Devis gratuit et sans engagement.",
    keywords:
      "contact WiFi Nantes, devis WiFi gratuit Nantes, dépanneur WiFi Nantes, technicien WiFi Nantes",
    canonical: url("/contact"),
  },
} as const;
