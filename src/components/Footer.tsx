import { Box, Typography, Button } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import WifiIcon from "@mui/icons-material/Wifi";
import { Link } from "react-router-dom";

/* =========================
   LINKS CONFIG
========================= */
const navLinks = [
  { label: "Accueil", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Tarifs", to: "/tarifs" },
  { label: "Contact", to: "/contact" },
];

const serviceLinks = [
  { label: "Diagnostic Wi-Fi", to: "/services" },
  { label: "Installation Wi-Fi", to: "/services" },
  { label: "Sécurité & Surveillance", to: "/services" },
  { label: "Réseau professionnel", to: "/services" },
];

const legalLinks = [
  { label: "Mentions légales", to: "/mentions-legales" },
  { label: "CGU / CGV", to: "/cgu-cgv" },
  { label: "Politique de confidentialité", to: "/confidentialite" },
];

/* =========================
   STYLE LINKS
========================= */
const linkSx = {
  color: "rgba(255,255,255,0.45)",
  fontSize: "0.85rem",
  textDecoration: "none",
  display: "block",
  mb: 1,
  transition: "all 0.25s ease",
  "&:hover": {
    color: "#2979FF",
    transform: "translateX(3px)",
  },
};

/* =========================
   COMPONENT
========================= */
export default function Footer() {
  return (
    <Box
      sx={{
        background: "linear-gradient(180deg, #0A1628 0%, #000000 100%)",
        px: { xs: 3, md: 8 },
        pt: { xs: 8, md: 10 },
        pb: { xs: 4, md: 5 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── TOP LINE ── */}
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
          style={{ width: "100%", height: "60px" }}
        >
          <path
            d="M0,20 C360,60 1080,0 1440,40"
            fill="none"
            stroke="rgba(0,140,255,0.9)"
            strokeWidth="2.5"
          />
          <path
            d="M0,20 C360,60 1080,0 1440,40"
            fill="none"
            stroke="rgba(0,140,255,0.25)"
            strokeWidth="8"
          />
        </svg>
      </Box>

      {/* ── GLOW ── */}
      <Box
        sx={{
          position: "absolute",
          width: 500,
          height: 300,
          background: "rgba(0,100,255,0.08)",
          filter: "blur(80px)",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />

      <Box sx={{ position: "relative", zIndex: 1, maxWidth: 1100, mx: "auto" }}>
        {/* ── GRID ── */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "2fr 1fr 1fr 1fr",
            },
            gap: { xs: 5, md: 6 },
            mb: 6,
          }}
        >
          {/* ── BRAND ── */}
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: "10px",
                  background:
                    "linear-gradient(135deg, #2979FF, #1565C0)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <WifiIcon sx={{ fontSize: 20, color: "#fff" }} />
              </Box>

              <Typography
                sx={{
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: "1rem",
                }}
              >
                Nantes WiFi Solutions
              </Typography>
            </Box>

            <Typography
              sx={{
                color: "rgba(255,255,255,0.4)",
                fontSize: "0.85rem",
                lineHeight: 1.7,
                mb: 3,
                maxWidth: 260,
              }}
            >
              Expert Wi-Fi à Nantes. Diagnostic, installation et sécurisation de vos réseaux pour particuliers et professionnels.
            </Typography>

            <Button
              component="a"
              href="tel:+33612345578"
              startIcon={<PhoneIcon sx={{ fontSize: 16 }} />}
              sx={{
                px: 3,
                py: 1.2,
                borderRadius: "40px",
                background:
                  "linear-gradient(90deg, #1565C0, #1976d2)",
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.85rem",
                textTransform: "none",
                boxShadow: "0 6px 20px rgba(25,118,210,0.4)",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 10px 28px rgba(25,118,210,0.6)",
                },
              }}
            >
              06 12 34 55 78
            </Button>
          </Box>

          {/* ── NAVIGATION ── */}
          <Box>
            <Typography sx={titleStyle}>Navigation</Typography>
            {navLinks.map((link) => (
              <Box key={link.label} component={Link} to={link.to} sx={linkSx}>
                {link.label}
              </Box>
            ))}
          </Box>

          {/* ── SERVICES ── */}
          <Box>
            <Typography sx={titleStyle}>Nos services</Typography>
            {serviceLinks.map((link) => (
              <Box key={link.label} component={Link} to={link.to} sx={linkSx}>
                {link.label}
              </Box>
            ))}
          </Box>

          {/* ── LEGAL ── */}
          <Box>
            <Typography sx={titleStyle}>Légal</Typography>

            {legalLinks.map((link) => (
              <Box key={link.label} component={Link} to={link.to} sx={linkSx}>
                {link.label}
              </Box>
            ))}

            <Typography
              sx={{
                color: "rgba(255,255,255,0.3)",
                fontSize: "0.75rem",
                mt: 2,
              }}
            >
              Entreprise déclarée — conformité RGPD
            </Typography>

            <Typography
              sx={{
                color: "rgba(255,255,255,0.35)",
                fontSize: "0.8rem",
                mt: 2,
              }}
            >
              Zone d'intervention
            </Typography>

            <Typography
              sx={{
                color: "rgba(255,255,255,0.5)",
                fontSize: "0.82rem",
                mt: 0.5,
              }}
            >
              Nantes & agglomération
            </Typography>
          </Box>
        </Box>

        {/* ── DIVIDER ── */}
        <Box
          sx={{
            width: "100%",
            height: "1px",
            background: "rgba(255,255,255,0.07)",
            mb: 3,
          }}
        />

        {/* ── BOTTOM ── */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          <Typography
            sx={{
              color: "rgba(255,255,255,0.22)",
              fontSize: "0.75rem",
            }}
          >
            © {new Date().getFullYear()} Nantes WiFi Solutions — Tous droits réservés
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 3,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {legalLinks.map((link) => (
              <Box
                key={link.label}
                component={Link}
                to={link.to}
                sx={{
                  color: "rgba(255,255,255,0.22)",
                  fontSize: "0.72rem",
                  textDecoration: "none",
                  "&:hover": { color: "#fff" },
                }}
              >
                {link.label}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

/* =========================
   TITLE STYLE
========================= */
const titleStyle = {
  color: "#fff",
  fontWeight: 700,
  fontSize: "0.8rem",
  letterSpacing: 2,
  mb: 2.5,
  textTransform: "uppercase",
};