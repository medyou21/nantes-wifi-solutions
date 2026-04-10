import { Box, Typography, Button } from "@mui/material";
import heroImg from "../assets/hero.png";

export default function Hero() {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        minHeight: { xs: "40vh", md: "55vh" },
        backgroundImage: `url(${heroImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* OVERLAY sombre */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(160deg, rgba(0,0,0,0.88) 0%, rgba(10,25,68,0.75) 60%, rgba(0,60,180,0.3) 100%)",
        }}
      />

      {/* GLOW bleu haut droite */}
      <Box
        sx={{
          position: "absolute",
          width: 600,
          height: 600,
          background: "rgba(0,100,255,0.18)",
          filter: "blur(100px)",
          top: "-150px",
          right: "-100px",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />

      {/* CONTENU */}
      <Box
        sx={{
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
        }}
      >
        {/* COLONNE GAUCHE */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", md: "flex-start" },
            textAlign: { xs: "center", md: "left" },
            gap: 2.5,
          }}
        >
          {/* TÉLÉPHONE */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 0,
                height: 0,
                borderTop: "6px solid transparent",
                borderBottom: "6px solid transparent",
                borderLeft: "10px solid #fff",
              }}
            />
            <Typography
              sx={{
                color: "#fff",
                fontWeight: 700,
                fontSize: "1.05rem",
                letterSpacing: 1,
              }}
            >
              06 12 34 55 78
            </Typography>
          </Box>

          {/* BOUTON CTA */}
          <Button
            variant="outlined"
            sx={{
              color: "#fff",
              borderColor: "#1976d2",
              background: "rgba(25,118,210,0.2)",
              fontWeight: 700,
              fontSize: "0.8rem",
              letterSpacing: 1.5,
              px: 3.5,
              py: 1,
              borderRadius: "4px",
              textTransform: "uppercase",
              alignSelf: { xs: "center", md: "flex-start" },
              "&:hover": {
                background: "#1976d2",
                borderColor: "#1976d2",
              },
            }}
          >
            Obtenir un devis gratuit
          </Button>

          {/* BADGES PARTENAIRES */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              flexWrap: "wrap",
              justifyContent: { xs: "center", md: "flex-start" },
            }}
          >
            {["Visa", "Orange", "SFR", "Bouygues", "Free"].map((label) => (
              <Typography
                key={label}
                variant="caption"
                sx={{
                  color: "rgba(255,255,255,0.5)",
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

        {/* COLONNE DROITE vide — le routeur est dans le background */}
        <Box sx={{ flex: 1 }} />
      </Box>

   
      {/* COURBE BLEUE EN BAS */}
<Box
  sx={{
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    lineHeight: 0,
    pointerEvents: "none",
  }}
>
  <svg
    viewBox="0 0 1440 60"
    preserveAspectRatio="none"
    style={{ display: "block", width: "100%", height: "60px" }}
  >
    {/* Trait bleu lumineux */}
    <path
      d="M0,40 C360,0 1080,60 1440,20"
      fill="none"
      stroke="rgba(0,140,255,0.9)"
      strokeWidth="2.5"
    />
    {/* Reflet/glow sous le trait */}
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