import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SEO_CONFIG } from "./seo.config";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const CONSENT_KEY = "nws-google-consent";

function ensureDataLayer() {
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    };
}

export function updateGoogleConsent(granted: boolean) {
  if (typeof window === "undefined") return;
  ensureDataLayer();

  window.gtag?.("consent", "update", {
    ad_storage: granted ? "granted" : "denied",
    ad_user_data: granted ? "granted" : "denied",
    ad_personalization: granted ? "granted" : "denied",
    analytics_storage: granted ? "granted" : "denied",
  });

  if (granted) {
    window.gtag?.("event", "consent_granted");
  }
}

function loadScript(id: string, src: string) {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

export default function GoogleAnalytics() {
  const location = useLocation();
  const { ga4Id, gtmId } = SEO_CONFIG.analytics;

  useEffect(() => {
    ensureDataLayer();

    window.gtag?.("consent", "default", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
      wait_for_update: 500,
    });

    const savedConsent = localStorage.getItem(CONSENT_KEY);
    if (savedConsent === "granted") updateGoogleConsent(true);

    if (gtmId) {
      window.dataLayer.push({
        "gtm.start": Date.now(),
        event: "gtm.js",
      });
      loadScript(
        "google-tag-manager",
        `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`
      );
    } else if (ga4Id) {
      loadScript(
        "google-analytics",
        `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga4Id)}`
      );
      window.gtag?.("js", new Date());
      window.gtag?.("config", ga4Id, {
        send_page_view: false,
        anonymize_ip: true,
      });
    }
  }, [ga4Id, gtmId]);

  useEffect(() => {
    trackEvent("page_view", {
      page_location: window.location.href,
      page_path: location.pathname + location.search,
      page_title: document.title,
    });
  }, [location.pathname, location.search]);

  useEffect(() => {
    const trackMarketingClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const link = target?.closest("a");
      if (!link) return;

      const href = link.getAttribute("href") || "";
      if (href.startsWith("tel:")) {
        trackEvent("click_phone", { link_url: href });
      } else if (href.startsWith("mailto:")) {
        trackEvent("click_email", { link_url: href });
      } else if (/wa\.me|whatsapp/i.test(href)) {
        trackEvent("click_whatsapp", { link_url: href });
      }
    };

    document.addEventListener("click", trackMarketingClick);
    return () => document.removeEventListener("click", trackMarketingClick);
  }, []);

  return null;
}

type EventParams = Record<string, string | number | boolean | undefined>;

export function trackEvent(
  action: string,
  categoryOrParams: string | EventParams = {},
  label?: string,
  value?: number
) {
  if (typeof window === "undefined") return;
  ensureDataLayer();

  const params: EventParams =
    typeof categoryOrParams === "string"
      ? {
          event_category: categoryOrParams,
          event_label: label,
          value,
        }
      : categoryOrParams;

  window.gtag?.("event", action, params);

  if (
    action === "generate_lead" &&
    SEO_CONFIG.ads.id &&
    SEO_CONFIG.ads.conversionLabel
  ) {
    window.gtag?.("event", "conversion", {
      send_to: `${SEO_CONFIG.ads.id}/${SEO_CONFIG.ads.conversionLabel}`,
      value: params.value ?? 1,
      currency: "EUR",
    });
  }
}

export const GOOGLE_CONSENT_STORAGE_KEY = CONSENT_KEY;
