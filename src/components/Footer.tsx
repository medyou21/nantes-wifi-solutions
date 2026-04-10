import { Box, Typography, Button } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";

export default function Footer() {
  return (
    <Box
      sx={{
        background: "linear-gradient(180deg, #0A1628 0%, #000000 100%)",
        px: { xs: 3, md: 8 },
        py: { xs: 6, md: 8 },
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* COURBE BLEUE EN HAUT — miroir de celle du Hero */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
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
          {/* Trait bleu lumineux — même courbe que Hero mais retournée */}
          <path
            d="M0,20 C360,60 1080,0 1440,40"
            fill="none"
            stroke="rgba(0,140,255,0.9)"
            strokeWidth="2.5"
          />
          {/* Glow */}
          <path
            d="M0,20 C360,60 1080,0 1440,40"
            fill="none"
            stroke="rgba(0,140,255,0.25)"
            strokeWidth="8"
          />
        </svg>
      </Box>

      {/* GLOW bleu décoratif */}
      <Box
        sx={{
          position: "absolute",
          width: 500,
          height: 300,
          background: "rgba(0,100,255,0.1)",
          filter: "blur(80px)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          borderRadius: "50%",
        }}
      />

      {/* TITRE */}
      <Typography
        variant="h5"
        sx={{
          color: "#fff",
          fontWeight: 800,
          fontSize: { xs: "1.3rem", md: "1.6rem" },
          maxWidth: 520,
          lineHeight: 1.4,
          position: "relative",
          zIndex: 1,
          mt: 4,
        }}
      >
        Besoin d'une connexion Wi-Fi rapide et sécurisée à Nantes ?
      </Typography>

      {/* SOUS-TITRE */}
      <Typography
        sx={{
          color: "rgba(255,255,255,0.6)",
          fontSize: "0.9rem",
          maxWidth: 480,
          lineHeight: 1.6,
          position: "relative",
          zIndex: 1,
        }}
      >
        Contactez-nous dès maintenant pour un diagnostic gratuit et une
        optimisation durable de votre réseau.
      </Typography>

      {/* BOUTON TÉLÉPHONE */}
      <Button
        variant="contained"
        startIcon={<PhoneIcon />}
        sx={{
          mt: 1,
          px: 5,
          py: 1.5,
          borderRadius: "40px",
          background: "linear-gradient(90deg, #1565C0 0%, #1976d2 100%)",
          color: "#fff",
          fontWeight: 700,
          fontSize: "1rem",
          letterSpacing: 1,
          boxShadow: "0 8px 24px rgba(25,118,210,0.45)",
          textTransform: "none",
          position: "relative",
          zIndex: 1,
          "&:hover": {
            background: "linear-gradient(90deg, #0D47A1 0%, #1565C0 100%)",
            boxShadow: "0 12px 32px rgba(25,118,210,0.6)",
            transform: "translateY(-2px)",
          },
          transition: "all 0.3s ease",
        }}
      >
        06 12 34 55 78
      </Button>

      {/* LIGNE SÉPARATRICE */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 600,
          height: "1px",
          background: "rgba(255,255,255,0.08)",
          mt: 2,
          position: "relative",
          zIndex: 1,
        }}
      />

      {/* COPYRIGHT */}
      <Typography
        variant="caption"
        sx={{
          color: "rgba(255,255,255,0.25)",
          fontSize: "0.7rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        © 2026 Nantes WiFi Solutions — Tous droits réservés
      </Typography>
    </Box>
  );
}