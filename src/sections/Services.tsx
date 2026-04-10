import { Box, Typography } from "@mui/material";
import WifiIcon from "@mui/icons-material/Wifi";
import SettingsInputAntennaIcon from "@mui/icons-material/SettingsInputAntenna";
import SecurityIcon from "@mui/icons-material/Security";
import { motion } from "framer-motion";
import ServiceCard from "../components/ServiceCard";

const MotionBox = motion(Box);

export default function Services() {
  const services = [
    {
      title: "Diagnostic Wi-Fi",
      features: [
        "Analyse complète du réseau",
        "Détection des zones mortes",
        "Optimisation des performances",
      ],
      icon: <WifiIcon />,
    },
    {
      title: "Installation Wi-Fi",
      features: [
        "Installation professionnelle",
        "Configuration avancée",
        "Couverture optimale",
      ],
      icon: <SettingsInputAntennaIcon />,
    },
    {
      title: "Sécurité & Surveillance",
      features: [
        "Protection contre les intrusions",
        "Surveillance du réseau",
        "Sécurisation des accès",
      ],
      icon: <SecurityIcon />,
    },
  ];

  return (
    <Box
      sx={{
        px: { xs: 3, md: 8 },
        py: { xs: 8, md: 12 },
        background: "linear-gradient(180deg, #000000 0%, #0A1628 100%)",
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
            NOS SERVICES
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
              Des solutions Wi-Fi adaptées à vos besoins
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
          gap: 6,
          maxWidth: 1000,
          mx: "auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {services.map((service, index) => (
          <Box
            key={service.title}
            sx={{
              flex: "1 1 260px",
              maxWidth: 300,
              pt: "28px",
            }}
          >
            <MotionBox
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <ServiceCard
                title={service.title}
                features={service.features}
                icon={service.icon}
              />
            </MotionBox>
          </Box>
        ))}
      </Box>
    </Box>
  );
}