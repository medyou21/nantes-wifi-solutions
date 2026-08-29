import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlined";
import { useNavigate } from "react-router-dom";

// ─────────────────────────────────────────────
// TYPES DU COMPOSANT (props pricing card)
// ─────────────────────────────────────────────
type Props = {
  title: string;          // nom du forfait (Starter, Pro...)
  price: string;          // prix affiché (ex: "29€/mois")
  period?: string;        // période optionnelle (ex: "/mois")
  features: string[];     // liste des fonctionnalités
  service: string;       // service associé
  highlight?: boolean;   // carte mise en avant (populaire)
  dark?: boolean;        // mode sombre
};

// type utilisé pour navigation vers contact
type ContactState = {
  service: string;
  plan: string;
  price: string;
};

// ─────────────────────────────────────────────
// COMPOSANT PRINCIPAL
// ─────────────────────────────────────────────
export default function PricingCard({
  title,
  price,
  period,
  features,
  service,
  highlight,
  dark,
}: Props) {

  const navigate = useNavigate();

  return (
    // ─────────────────────────────
    // CARD PRINCIPALE
    // ─────────────────────────────
    <Card
      sx={{
        position: "relative",
        borderRadius: "16px",
        textAlign: "center",

        // ── BACKGROUND DYNAMIQUE ──
        background: dark
          ? "#0a0e1a"
          : highlight
          ? "linear-gradient(160deg, #1a2a4a 0%, #0d1a35 100%)"
          : "rgba(255,255,255,0.05)",

        // ── BORDURE DYNAMIQUE ──
        border: highlight
          ? "2px solid #1e6fd9"
          : dark
          ? "2px solid #1e3a6e"
          : "1px solid rgba(255,255,255,0.1)",

        // ── OMBRE STYLE SaaS ──
        boxShadow: highlight
          ? "0 0 40px rgba(30,111,217,0.35), 0 20px 40px rgba(0,0,0,0.5)"
          : "0 8px 24px rgba(0,0,0,0.4)",

        // effet zoom léger si mise en avant
        transform: highlight ? "scale(1.04)" : "scale(1)",
        transition: "0.3s ease",

        overflow: "visible",

        // effet hover
        "&:hover": {
          transform: highlight ? "scale(1.06)" : "scale(1.02)",
        },
      }}
    >

      {/* ─────────────────────────────
          BADGE "LE PLUS CHOISI"
      ───────────────────────────── */}
      {highlight && (
        <Box
          sx={{
            position: "absolute",
            top: -16,
            left: "50%",
            transform: "translateX(-50%)",

            background: "linear-gradient(90deg, #1565c0, #1e88e5)",
            color: "#fff",
            px: 2.5,
            py: 0.6,
            borderRadius: "20px",

            fontSize: 11,
            fontWeight: 800,
          }}
        >
          Le plus choisi
        </Box>
      )}

      {/* ─────────────────────────────
          CONTENU CARTE
      ───────────────────────────── */}
      <CardContent sx={{ p: 4 }}>

        {/* TITRE DU FORFAIT */}
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: "1.3rem",
            color: highlight ? "#4fc3f7" : "#90caf9",
            mb: 2,
          }}
        >
          {title}
        </Typography>

        {/* PRIX */}
        <Box sx={{ mb: 3 }}>

          {/* nettoyage du prix (suppression €/mois si présent) */}
          <Typography
            sx={{
              fontSize: "2.5rem",
              fontWeight: 900,
              color: "#fff",
            }}
          >
            {price.replace(/[€/mois]/g, "")}€
          </Typography>

          {/* période */}
          {period && (
            <Typography sx={{ color: "rgba(255,255,255,0.5)" }}>
              {period}
            </Typography>
          )}
        </Box>

        {/* ─────────────────────────────
            LISTE DES FEATURES
        ───────────────────────────── */}
        <Box sx={{ textAlign: "left", mb: 3 }}>
          {features.map((feature) => (
            <Box
              key={feature}
              sx={{ display: "flex", gap: 1, mb: 1 }}
            >
              {/* icône validation */}
              <CheckCircleOutlineIcon
                sx={{ color: "#1e88e5", fontSize: 18 }}
              />

              {/* texte feature */}
              <Typography
                sx={{
                  color: "rgba(255,255,255,0.8)",
                  fontSize: 14,
                }}
              >
                {feature}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* ─────────────────────────────
            BOUTON ACTION
        ───────────────────────────── */}
        <Button
          fullWidth
          variant="contained"

          // navigation vers contact avec état
          onClick={() =>
            navigate("/contact", {
              state: {
                service,
                plan: title,
                price,
              } as ContactState,
            })
          }

          sx={{
            background: highlight
              ? "linear-gradient(90deg, #1565c0, #1e88e5)"
              : "rgba(30,111,217,0.25)",

            color: "#fff",
            fontWeight: 700,
            textTransform: "none",
          }}
        >
          Choisir ce forfait
        </Button>

      </CardContent>
    </Card>
  );
}