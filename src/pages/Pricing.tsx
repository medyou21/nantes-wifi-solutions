import {
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import PricingCard from "../components/PricingCard";

/** Composant MUI Box enrichi des props d'animation Framer Motion. */
const MotionBox = motion.create(Box);

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────

/**
 * Structure d'une offre commerciale retournée par l'API.
 * Correspond au modèle Mongoose `Offer` côté backend.
 */
interface Offer {
  _id: string;
  title: string;
  price: number;
  description: string;
  features: string[];
}

// ─────────────────────────────────────────────
// DONNÉES — TABLEAU COMPARATIF
// ─────────────────────────────────────────────

/**
 * Lignes du tableau de comparaison des trois formules.
 * Chaque entrée décrit une fonctionnalité et sa disponibilité
 * par formule (basic / confort / pro) via des booléens.
 *
 * Déclaré en constante statique : ces données ne dépendent pas
 * de l'API et n'ont pas vocation à changer souvent.
 * Si elles devaient devenir dynamiques, les inclure dans la réponse API.
 */
const compareRows = [
  { label: "Diagnostic Wi-Fi",       basic: true,  confort: true,  pro: true  },
  { label: "Optimisation réseau",    basic: true,  confort: true,  pro: true  },
  { label: "Vérification sécurité",  basic: true,  confort: true,  pro: true  },
  { label: "Installation avancée",   basic: false, confort: true,  pro: true  },
  { label: "Matériel inclus",        basic: false, confort: true,  pro: true  },
  { label: "Support email",          basic: true,  confort: true,  pro: true  },
  { label: "Support 24/7",           basic: false, confort: false, pro: true  },
  { label: "Réseau professionnel",   basic: false, confort: false, pro: true  },
  { label: "Surveillance en continu",basic: false, confort: false, pro: true  },
  { label: "Dashboard admin",        basic: false, confort: false, pro: true  },
  { label: "SLA garanti",            basic: false, confort: false, pro: true  },
  { label: "Audit réseau mensuel",   basic: false, confort: false, pro: true  },
];

/**
 * Couleurs des trois colonnes du tableau comparatif.
 * Alignées avec les styles visuels des PricingCard correspondantes :
 *  - [0] Basic       → bleu clair
 *  - [1] Confort     → bleu vif (formule mise en avant)
 *  - [2] Pro         → orange (formule premium)
 */
const colColors = ["#64B5F6", "#2979FF", "#FF6D00"];

// ─────────────────────────────────────────────
// COMPOSANT PRINCIPAL : Pricing
// ─────────────────────────────────────────────

/**
 * Page des tarifs — affiche les offres récupérées depuis l'API
 * sous forme de cartes, suivies d'un tableau comparatif statique.
 *
 * Flux de données :
 *  1. `useEffect` déclenche un fetch vers `GET /api/offers` au montage.
 *  2. Les états `loading` / `error` / `plans` pilotent l'affichage conditionnel.
 *  3. Chaque offre est rendue via `PricingCard` avec un style visuel
 *     déterminé par sa position dans le tableau (highlight sur la 2e formule).
 *
 * Le tableau comparatif est entièrement statique et indépendant de l'API.
 */
export default function Pricing() {
  const [plans, setPlans]   = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState<string | null>(null);

  // ── Chargement des offres ─────────────────────────────────────────
  /**
   * Fetch des offres au montage du composant.
   * Le tableau de dépendances vide `[]` garantit un seul appel réseau,
   * équivalent à un `componentDidMount` en classe.
   *
   * `finally` assure que `loading` repasse à `false` qu'il y ait
   * succès ou erreur — évite un spinner infini en cas d'échec réseau.
   */
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/offers`)
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors du chargement des offres");
        return res.json();
      })
      .then((data) => setPlans(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box sx={{
      background: "linear-gradient(180deg, #0A1628 0%, #000000 100%)",
      minHeight: "100vh",
      position: "relative",
      overflow: "hidden",
    }}>

      {/* Halo lumineux décoratif — effet glow bleu centré en arrière-plan */}
      <Box sx={{
        position: "absolute",
        width: 700, height: 500,
        background: "radial-gradient(ellipse, rgba(0,80,255,0.08) 0%, transparent 70%)",
        top: "5%", left: "50%", transform: "translateX(-50%)",
      }}/>

      <Box sx={{ px: { xs: 2, md: 8 }, py: { xs: 8, md: 12 }, position: "relative", zIndex: 1 }}>

        {/* ── HEADER ─────────────────────────────────────────────────── */}
        <MotionBox
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          sx={{ textAlign: "center", mb: { xs: 8, md: 10 } }}
        >
          {/* Badge "NOS OFFRES" */}
          <Box sx={{
            display: "inline-block", px: 3, py: 0.75, borderRadius: "20px",
            background: "#fff", border: "1px solid #e0e0e0",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)", mb: 2.5,
          }}>
            <Typography variant="overline" sx={{
              color: "#1565C0", fontWeight: 700, letterSpacing: 3, fontSize: "0.7rem",
            }}>
              NOS OFFRES
            </Typography>
          </Box>

          {/* Titre sur fond blanc pour lisibilité sur fond sombre */}
          <Box>
            <Box sx={{
              display: "inline-block", px: { xs: 3, md: 6 }, py: 2,
              borderRadius: "12px", background: "#fff",
              boxShadow: "0 8px 30px rgba(0,0,0,0.3)", mb: 2,
            }}>
              <Typography variant="h4" sx={{
                fontWeight: 900, color: "#000", fontSize: { xs: "1.4rem", md: "2rem" },
              }}>
                Choisissez la formule qui vous convient
              </Typography>
            </Box>
          </Box>

          <Typography sx={{ color: "rgba(255,255,255,0.45)", fontSize: "1rem", maxWidth: 500, mx: "auto" }}>
            Des forfaits transparents, sans surprise. Changez ou annulez à tout moment.
          </Typography>
        </MotionBox>

        {/* ── ÉTATS DE CHARGEMENT ────────────────────────────────────── */}

        {/* Spinner centré pendant le fetch API */}
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress sx={{ color: "#2979FF" }} />
          </Box>
        )}

        {/* Message d'erreur si le fetch a échoué */}
        {error && (
          <Typography sx={{ color: "#ff6b6b", textAlign: "center" }}>
            {error}
          </Typography>
        )}

        {/* ── CARTES TARIFAIRES ──────────────────────────────────────── */}
        {/*
         * Rendu uniquement si le chargement est terminé et sans erreur.
         * Animation d'entrée depuis le bas (y: 40 → 0) sur le conteneur global.
         *
         * Chaque carte reçoit un style visuel déterminé par son index :
         *  - index 0 (Basic)   : style neutre
         *  - index 1 (Confort) : highlight = true → mise en avant visuelle
         *  - index 2 (Pro)     : dark = true → fond sombre premium
         *
         * ⚠️  Le mapping titre → service est codé en dur : si les titres
         *     changent en base, cette logique devra être mise à jour.
         *     Envisager d'inclure un champ `serviceKey` dans le modèle Offer.
         */}
        {!loading && !error && (
          <MotionBox
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 3,
              maxWidth: 1000,
              mx: "auto",
              mb: { xs: 8, md: 12 },
            }}
          >
            {plans.map((plan, index) => {
              // Styles visuels indexés sur la position — indépendants des données API
              const styles = [
                { highlight: false, dark: false }, // Basic : style par défaut
                { highlight: true,  dark: false }, // Confort : mis en avant (bordure bleue, badge)
                { highlight: false, dark: true  }, // Pro : fond sombre premium
              ];

              return (
                <Box key={plan._id} sx={{ flex: "1 1 260px", maxWidth: 300 }}>
                  <PricingCard
                    title={plan.title}
                    price={`${plan.price}`}
                    features={plan.features}
                    // Correspondance titre → clé de service pour le pré-remplissage
                    // du formulaire de contact via navigate(state)
                    service={
                      plan.title === "Basic"          ? "Diagnostic Wi-Fi"     :
                      plan.title === "Confort"        ? "Installation Wi-Fi"   :
                      plan.title === "Pro Entreprise" ? "Réseau professionnel" :
                      "Autre"
                    }
                    highlight={styles[index]?.highlight}
                    dark={styles[index]?.dark}
                  />
                </Box>
              );
            })}
          </MotionBox>
        )}

        {/* ── TABLEAU COMPARATIF ─────────────────────────────────────── */}
        {/*
         * Grille CSS à 4 colonnes : 1 colonne label + 3 colonnes icônes (100px chacune).
         * Chaque ligne affiche CheckIcon (fonctionnalité disponible) ou CloseIcon (absente),
         * colorés selon `colColors` pour associer visuellement chaque colonne à sa formule.
         * La dernière ligne n'a pas de bordure inférieure (condition sur l'index).
         */}
        <Box sx={{ maxWidth: 900, mx: "auto" }}>
          {compareRows.map((row, i) => (
            <Box
              key={row.label}
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr repeat(3, 100px)", // Label flexible + 3 colonnes fixes
                px: { xs: 2, md: 4 },
                py: 1.5,
                // Séparateur entre les lignes — absent sur la dernière
                borderBottom: i < compareRows.length - 1
                  ? "1px solid rgba(255,255,255,0.05)"
                  : "none",
              }}
            >
              {/* Libellé de la fonctionnalité */}
              <Typography sx={{ color: "rgba(255,255,255,0.65)" }}>
                {row.label}
              </Typography>

              {/* Icônes pour chaque formule (basic, confort, pro) */}
              {[row.basic, row.confort, row.pro].map((val, idx) => (
                <Box key={idx} sx={{ display: "flex", justifyContent: "center" }}>
                  {val
                    ? <CheckIcon sx={{ color: colColors[idx] }} />          // ✓ disponible
                    : <CloseIcon sx={{ color: "rgba(255,255,255,0.2)" }} /> // ✗ non disponible
                  }
                </Box>
              ))}
            </Box>
          ))}
        </Box>

      </Box>
    </Box>
  );
}