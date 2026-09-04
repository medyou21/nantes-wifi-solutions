// Import des composants Material UI
import { Box, Typography, Button } from "@mui/material";

// Import d'une icône téléphone depuis Material UI Icons
import PhoneIcon from "@mui/icons-material/Phone";

// Import de Framer Motion pour les animations
import { motion } from "framer-motion";

// On crée un composant animé basé sur Box (Material UI)
const MotionBox = motion.create(Box);

// Composant principal CTA (Call To Action)
const CTA = () => {
  const phone = import.meta.env.VITE_PHONE;
  return (
    // Container principal de la section CTA
    <Box
      sx={{
        // Dégradé de fond sombre (style tech / SaaS)
        background: "linear-gradient(180deg, #0A1628 0%, #000000 100%)",

        // Padding responsive (mobile / desktop)
        px: { xs: 3, md: 8 },
        py: { xs: 8, md: 10 },

        // Centrage du contenu
        textAlign: "center",

        // Position relative pour les éléments décoratifs (glow)
        position: "relative",

        // Cache les débordements visuels
        overflow: "hidden",
      }}
    >
      {/* Effet de lumière (glow décoratif en arrière-plan) */}
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

      {/* Bloc animé principal (entrée en fondu + slide) */}
      <MotionBox
        initial={{ opacity: 0, y: 30 }} // état initial
        whileInView={{ opacity: 1, y: 0 }} // état final lors du scroll
        viewport={{ once: true }} // animation une seule fois
        transition={{ duration: 0.6 }} // durée animation
        sx={{
          position: "relative",
          zIndex: 1, // passe au-dessus du glow

          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3, // espacement vertical
        }}
      >
        {/* Badge "CONTACTEZ-NOUS" */}
        <Box
          sx={{
            display: "inline-block",
            px: 3,
            py: 0.75,
            borderRadius: "20px",
            background: "#fff",
            border: "1px solid #e0e0e0",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        >
          <Typography
            variant="overline"
            sx={{
              color: "#1565C0",
              fontWeight: 700,
              letterSpacing: 3,
              fontSize: "0.7rem",
            }}
          >
            CONTACTEZ-NOUS
          </Typography>
        </Box>

        {/* Titre principal de la section CTA */}
        <Box
          sx={{
            display: "inline-block",
            px: { xs: 3, md: 6 },
            py: 2,
            borderRadius: "12px",
            background: "#fff",
            boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 900,
              color: "#000",
              fontSize: { xs: "1.3rem", md: "1.8rem" },
            }}
          >
            Besoin d'un Wi-Fi rapide à Nantes ?
          </Typography>
        </Box>

        {/* Texte descriptif / sous-titre */}
        <Typography
          sx={{
            color: "rgba(255,255,255,0.6)",
            fontSize: "0.95rem",
            maxWidth: 460,
            lineHeight: 1.7,
          }}
        >
          Contactez-nous dès maintenant pour un diagnostic gratuit et une
          optimisation durable de votre réseau.
        </Typography>

        {/* Bouton d'appel avec numéro de téléphone */}
        <Button
          component="a"
          href={phone ? `tel:${phone.replace(/\s+/g, "")}` : undefined}
          disabled={!phone}
          variant="contained"
          startIcon={<PhoneIcon />}
          sx={{
            mt: 1,
            px: 5,
            py: 1.5,
            borderRadius: "40px",

            // Dégradé bleu moderne
            background: "linear-gradient(90deg, #1565C0 0%, #1976d2 100%)",

            color: "#fff",
            fontWeight: 700,
            fontSize: "1rem",
            letterSpacing: 1,
            textTransform: "none",

            // Ombre pour effet "button premium"
            boxShadow: "0 8px 24px rgba(25,118,210,0.45)",

            // Effet au survol
            "&:hover": {
              background: "linear-gradient(90deg, #0D47A1 0%, #1565C0 100%)",
              boxShadow: "0 12px 32px rgba(25,118,210,0.6)",
              transform: "translateY(-2px)",
            },

            // Transition fluide
            transition: "all 0.3s ease",
          }}
        >
          {phone || "Téléphone indisponible"}
        </Button>
      </MotionBox>
    </Box>
  );
};

// Export du composant CTA
export default CTA;
