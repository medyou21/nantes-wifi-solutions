import { Card, CardContent, Typography, Box } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// ─────────────────────────────────────────────
// TYPES DU COMPOSANT SERVICE CARD
// ─────────────────────────────────────────────
type Props = {
  title: string;              // titre du service (ex: "Installation Wi-Fi")
  features: string[];        // liste des avantages / features
  icon: React.ReactNode;     // icône affichée en haut de la carte
};

export default function ServiceCard({ title, features, icon }: Props) {

  return (
    // ─────────────────────────────────────────────
    // CARD PRINCIPALE
    // ─────────────────────────────────────────────
    <Card
      sx={{
        position: "relative",

        // padding interne (top renforcé pour l'icône flottante)
        pt: 5,
        pb: 3,
        px: 3,

        borderRadius: "16px",
        textAlign: "center",

        // style clean (fond blanc type SaaS light card)
        background: "#fff",
        color: "#000",

        // ombre douce moderne
        boxShadow: "0 8px 24px rgba(0,0,0,0.18)",

        // important pour icône qui dépasse
        overflow: "visible",

        // animation hover smooth (UX moderne)
        transition: "transform 0.3s ease, box-shadow 0.3s ease",

        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 20px 45px rgba(0,0,0,0.35)",
        },
      }}
    >

      {/* ─────────────────────────────────────────────
          ICÔNE FLOTTANTE (STYLE SAAS / MODERNE)
      ───────────────────────────────────────────── */}
      <Box
        sx={{
          position: "absolute",

          // position centrée en haut
          top: -28,
          left: "50%",
          transform: "translateX(-50%)",

          width: 56,
          height: 56,
          borderRadius: "50%",

          // gradient bleu tech
          background: "linear-gradient(135deg, #1565C0 0%, #42A5F5 100%)",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          color: "#fff",

          // effet glow
          boxShadow: "0 6px 20px rgba(21,101,192,0.5)",

          // taille icône interne
          "& svg": {
            fontSize: 26,
          },
        }}
      >
        {icon}
      </Box>

      {/* ─────────────────────────────────────────────
          CONTENU CARTE
      ───────────────────────────────────────────── */}
      <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>

        {/* TITRE DU SERVICE */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            mb: 2,
            fontSize: "1rem",
            color: "#0D0D0D",
          }}
        >
          {title}
        </Typography>

        {/* ─────────────────────────────────────────────
            LISTE DES FEATURES
        ───────────────────────────────────────────── */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>

          {features.map((feature, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                textAlign: "left",
              }}
            >

              {/* ICÔNE CHECK (VALIDATION FEATURE) */}
              <CheckCircleIcon
                sx={{
                  color: "#1565C0",
                  fontSize: 18,
                  flexShrink: 0,
                }}
              />

              {/* TEXTE FEATURE */}
              <Typography
                variant="body2"
                sx={{
                  color: "#333",
                  fontSize: "0.82rem",
                }}
              >
                {feature}
              </Typography>

            </Box>
          ))}

        </Box>
      </CardContent>
    </Card>
  );
}