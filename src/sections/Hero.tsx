import { Box, Typography, Button } from "@mui/material";
import heroImg from "../assets/hero.png";
import { useNavigate } from "react-router-dom";

/**
 * Section hero — bannière principale affichée en haut de la page d'accueil.
 *
 * Composition visuelle :
 *  - Image de fond pleine largeur (`hero.png`) avec overlay dégradé sombre
 *    pour garantir la lisibilité du texte quelle que soit l'image.
 *  - Halo lumineux bleu en haut à droite pour renforcer l'ambiance tech.
 *  - Contenu en deux colonnes : texte à gauche, espace vide à droite
 *    (prévu pour accueillir un visuel ou une illustration future).
 *  - Courbe décorative SVG en bas pour assurer la transition visuelle
 *    avec la section suivante.
 */
export default function Hero() {
  const navigate = useNavigate();
const phone = import.meta.env.VITE_PHONE;
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        minHeight: { xs: "40vh", md: "55vh" }, // Plus compact sur mobile
        backgroundImage: `url(${heroImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",   // Contient le halo et la courbe SVG qui débordent
        display: "flex",
        alignItems: "center", // Centre le contenu verticalement dans le hero
      }}
    >

      {/* ── OVERLAY ────────────────────────────────────────────────────
       * Dégradé semi-transparent appliqué par-dessus l'image de fond.
       * Assombrit fortement la gauche (texte) et s'allège vers la droite
       * pour laisser transparaître l'image dans la colonne droite vide.
       * Les trois stops créent une transition naturelle noir → bleu marine → bleu vif.
       */}
      <Box sx={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(160deg, rgba(0,0,0,0.88) 0%, rgba(10,25,68,0.75) 60%, rgba(0,60,180,0.3) 100%)",
      }}/>

      {/* ── GLOW ───────────────────────────────────────────────────────
       * Cercle flou bleu positionné hors cadre en haut à droite.
       * `filter: blur(100px)` sur un cercle de 600px produit un halo
       * doux sans SVG ni gradient complexe. `pointerEvents: none` garantit
       * qu'il ne capture aucun événement souris malgré sa taille.
       */}
      <Box sx={{
        position: "absolute",
        width: 600, height: 600,
        background: "rgba(0,100,255,0.18)",
        filter: "blur(100px)",
        top: "-150px", right: "-100px",
        borderRadius: "50%",
        pointerEvents: "none",
      }}/>

      {/* ── CONTENU PRINCIPAL ──────────────────────────────────────────
       * Layout deux colonnes sur desktop, empilé sur mobile.
       * `zIndex: 2` pour passer au-dessus de l'overlay et du glow.
       */}
      <Box sx={{
        position: "relative",
        zIndex: 2,
        width: "100%",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "space-between",
        px: { xs: 3, md: 10 },
        py: { xs: 6, md: 0 },
        gap: 4,
      }}>

        {/* ── COLONNE GAUCHE : texte et CTA ──────────────────────────── */}
        <Box sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: { xs: "center", md: "flex-start" }, // Centré mobile, aligné gauche desktop
          textAlign: { xs: "center", md: "left" },
          gap: 2.5,
        }}>

          {/* Numéro de téléphone avec triangle décoratif (▶) en guise de puce */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {/* Triangle CSS pur — borders asymétriques simulant un ▶ blanc */}
            <Box sx={{
              width: 0, height: 0,
              borderTop: "6px solid transparent",
              borderBottom: "6px solid transparent",
              borderLeft: "10px solid #fff",
            }}/>
            <Typography sx={{ color: "#fff", fontWeight: 700, fontSize: "1.05rem", letterSpacing: 1 }}>
              {phone}
            </Typography>
          </Box>

          {/* CTA principal — navigue vers le formulaire de contact */}
          <Button
            variant="outlined"
            onClick={() => navigate("/contact")}
            sx={{
              color: "#fff",
              borderColor: "#1976d2",
              background: "rgba(25,118,210,0.2)",  // Fond bleu semi-transparent au repos
              fontWeight: 700,
              fontSize: "0.8rem",
              letterSpacing: 1.5,
              px: 3.5, py: 1,
              borderRadius: "4px",
              textTransform: "uppercase",
              alignSelf: { xs: "center", md: "flex-start" },
              "&:hover": {
                background: "#1976d2",    // Fond plein au hover pour renforcer le CTA
                borderColor: "#1976d2",
              },
            }}
          >
            Obtenir un devis gratuit
          </Button>

          {/* Badges partenaires / opérateurs — éléments de réassurance discrets */}
          <Box sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            flexWrap: "wrap",
            justifyContent: { xs: "center", md: "flex-start" },
          }}>
            {["Visa", "Orange", "SFR", "Bouygues", "Free"].map((label) => (
              <Typography
                key={label}
                variant="caption"
                sx={{
                  color: "rgba(255,255,255,0.5)", // Volontairement discret — contexte, pas contenu
                  fontSize: "0.65rem",
                  fontWeight: 500,
                  letterSpacing: 0.5,
                }}
              >
                {label}
              </Typography>
            ))}
          </Box>
        </Box>

        {/* ── COLONNE DROITE : espace réservé ────────────────────────────
         * Intentionnellement vide — laisse transparaître l'image de fond
         * à travers l'overlay allégé côté droit. Peut accueillir un visuel,
         * une carte animée ou un bloc de stats dans une version future.
         */}
        <Box sx={{ flex: 1 }} />
      </Box>

      {/* ── COURBE DE TRANSITION SVG ────────────────────────────────────
       * Deux tracés superposés sur le même path de Bézier cubique :
       *  1. Trait fin opaque (strokeWidth 2.5) → ligne nette et visible
       *  2. Trait large transparent (strokeWidth 8, opacity 0.25) → halo flou
       * L'effet combiné donne une ligne lumineuse avec profondeur.
       *
       * `preserveAspectRatio="none"` + `width: 100%` : le SVG s'étire
       * sur toute la largeur sans déformer la hauteur fixe de 60px.
       * `lineHeight: 0` sur le wrapper supprime l'espace inline par défaut
       * des éléments SVG/img qui créerait un gap indésirable en bas.
       */}
      <Box sx={{
        position: "absolute",
        bottom: 0, left: 0,
        width: "100%",
        lineHeight: 0,
        pointerEvents: "none",
      }}>
        <svg
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          style={{ display: "block", width: "100%", height: "60px" }}
        >
          {/* Trait principal — ligne fine et nette */}
          <path
            d="M0,40 C360,0 1080,60 1440,20"
            fill="none"
            stroke="rgba(0,140,255,0.9)"
            strokeWidth="2.5"
          />
          {/* Halo — même courbe, trait large et transparent pour l'effet lumineux */}
          <path
            d="M0,40 C360,0 1080,60 1440,20"
            fill="none"
            stroke="rgba(0,140,255,0.25)"
            strokeWidth="8"
          />
        </svg>
      </Box>
    </Box>
  );
}