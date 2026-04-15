export const SEO_CONFIG = {
  siteName:    "Nantes WiFi Solutions",
  siteUrl:     "https://nantes-wifi.fr",
  phone:       "+33XXXXXXXXX",
  email:       "contact@nantes-wifi.fr",
  address: {
    street:   "Nantes",
    city:     "Nantes",
    region:   "Pays de la Loire",
    zip:      "44000",
    country:  "FR",
  },
  geo: {
    lat:  47.2184,
    lng:  -1.5536,
  },
  social: {
    facebook: "https://facebook.com/nanteswifi",
  },
  analytics: {
    gtagId: "G-XXXXXXXXXX", // ← remplacer par ton ID Google Analytics
  },
} as const;

// ── Pages SEO ─────────────────────────────────
export const PAGES_SEO = {
  home: {
    title:       "Nantes WiFi Solutions — Expert Wi-Fi à Nantes",
    description: "Installation, diagnostic et sécurisation Wi-Fi à Nantes et agglomération. Intervention rapide, devis gratuit. Particuliers et professionnels.",
    keywords:    "WiFi Nantes, installation WiFi Nantes, problème WiFi maison, expert WiFi Nantes, dépannage WiFi Nantes, réseau WiFi professionnel Nantes",
    canonical:   "https://nantes-wifi.fr",
  },
  services: {
    title:       "Nos Services Wi-Fi — Diagnostic, Installation, Sécurité | Nantes WiFi Solutions",
    description: "Découvrez nos services : diagnostic Wi-Fi, installation réseau et sécurité à Nantes. Couverture totale, matériel professionnel, garantie 2 ans.",
    keywords:    "diagnostic WiFi Nantes, installation WiFi Nantes, sécurité réseau Nantes, couverture WiFi, point d'accès WiFi Nantes",
    canonical:   "https://nantes-wifi.fr/services",
  },
  tarifs: {
    title:       "Tarifs & Forfaits Wi-Fi à Nantes — À partir de 79€ | Nantes WiFi Solutions",
    description: "Forfaits Wi-Fi clairs et transparents à Nantes. Basic 79€, Confort 199€, Pro Entreprise 499€. Devis gratuit, intervention rapide.",
    keywords:    "prix installation WiFi Nantes, tarif diagnostic WiFi, forfait WiFi Nantes, devis WiFi gratuit Nantes",
    canonical:   "https://nantes-wifi.fr/tarifs",
  },
  contact: {
    title:       "Contactez-nous — Devis WiFi Gratuit à Nantes | Nantes WiFi Solutions",
    description: "Contactez nos experts Wi-Fi à Nantes. Réponse sous 2h, devis gratuit et sans engagement. Appelez-nous ou remplissez le formulaire.",
    keywords:    "contact WiFi Nantes, devis WiFi gratuit Nantes, dépanneur WiFi Nantes, technicien WiFi Nantes",
    canonical:   "https://nantes-wifi.fr/contact",
  },
} as const;