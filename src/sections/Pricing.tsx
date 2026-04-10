import { Box, Typography } from "@mui/material";
import PricingCard from "../components/PricingCard";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export default function Pricing() {
  const plans: {
    title: string;
    price: string;
    period?: string;
    features: string[];
    highlight?: boolean;
    dark?: boolean;
  }[] = [
    {
      title: "Basic",
      price: "79€",
      features: [
        "Diagnostic Wi-Fi",
        "Optimisation réseau",
        "Vérification sécurité",
      ],
    },
    {
      title: "Confort",
      price: "199€",
      features: [
        "Diagnostic Wi-Fi",
        "Installation avancée",
        "Matériel inclus",
      ],
      highlight: true,
    },
    {
      title: "Pro Entreprise",
      price: "499€",
      period: "/mois",
      features: [
        "Tous les forfaits Basic inclus",
        "Réseau professionnel",
        "Surveillance en continu",
      ],
      dark: true,
    },
  ];

  return (
    <Box
      sx={{
        px: { xs: 3, md: 8 },
        py: { xs: 8, md: 12 },
        background: "linear-gradient(180deg, #0A1628 0%, #000000 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* GLOW */}
      <Box
        sx={{
          position: "absolute",
          width: 600,
          height: 400,
          background: "rgba(0,100,255,0.1)",
          filter: "blur(100px)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          borderRadius: "50%",
        }}
      />

      {/* HEADER */}
      <MotionBox
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        sx={{ textAlign: "center", mb: 10, position: "relative", zIndex: 1 }}
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
            mb: 2.5,
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
            NOS OFFRES
          </Typography>
        </Box>

        {/* TITRE */}
        <Box>
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
                fontSize: { xs: "1.5rem", md: "2rem" },
              }}
            >
              Choisissez la formule qui vous convient
            </Typography>
          </Box>
        </Box>
      </MotionBox>

      {/* CARDS */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
          maxWidth: 1000,
          mx: "auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {plans.map((plan, index) => (
          <Box
            key={plan.title}
            sx={{
              flex: "1 1 260px",
              maxWidth: 300,
            }}
          >
            <MotionBox
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <PricingCard {...plan} />
            </MotionBox>
          </Box>
        ))}
      </Box>
    </Box>
  );
}