import { Helmet } from "react-helmet-async";
import { SEO_CONFIG } from "./seo.config";

export default function GoogleAnalytics() {
  const { gtagId } = SEO_CONFIG.analytics;

  if (!gtagId || gtagId === "G-XXXXXXXXXX") return null;

  return (
    <Helmet>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`}
      />
      <script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gtagId}', {
            page_path: window.location.pathname,
            anonymize_ip: true
          });
        `}
      </script>
    </Helmet>
  );
}

// ── Hook événements GA4 ───────────────────────
export function trackEvent(
  action:   string,
  category: string,
  label?:   string,
  value?:   number
) {
  if (typeof window === "undefined" || !(window as any).gtag) return;
  (window as any).gtag("event", action, {
    event_category: category,
    event_label:    label,
    value,
  });
}