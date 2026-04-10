import { Box, Typography, Button } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const CTA = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(180deg, #0A1628 0%, #000000 100%)",
        px: { xs: 3, md: 8 },
        py: { xs: 8, md: 10 },
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* GLOW */}
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

      <MotionBox
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        sx={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
        }}
      >
        {/* BADGE */}
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

        {/* TITRE */}
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

        {/* SOUS-TITRE */}
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

        {/* BOUTON */}
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
            textTransform: "none",
            boxShadow: "0 8px 24px rgba(25,118,210,0.45)",
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
      </MotionBox>
    </Box>
  );
};

export default CTA;