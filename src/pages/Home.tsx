// ─────────────────────────────────────────────
// IMPORTS DES SECTIONS DE LA PAGE
// ─────────────────────────────────────────────

// Section d'accueil (bannière principale avec message marketing)
import Hero from "../sections/Hero";

// Section présentant les services proposés
import Services from "../sections/Services";

// Section des offres / tarifs (pricing)
import Pricing from "../sections/Pricing";
import Testimonials from "../sections/Testimonials";
import CTA from "../components/CTA";


// ─────────────────────────────────────────────
// COMPOSANT PRINCIPAL : PAGE HOME
// ─────────────────────────────────────────────
export default function Home() {
  return (
    <>
      {/* ───────── HERO ───────── */}
      {/* Première section visible : accroche + branding */}
      <Hero />

      {/* ───────── SERVICES ───────── */}
      {/* Présentation des prestations proposées */}
      <Services />

      {/* ───────── PRICING ───────── */}
      {/* Affichage des offres et tarifs */}
      <Pricing />
      <Testimonials />
      <CTA />
    </>
  );
}
