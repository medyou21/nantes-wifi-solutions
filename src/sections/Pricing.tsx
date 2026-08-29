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

const MotionBox = motion.create(Box);

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────
interface Offer {
  _id: string;
  title: string;
  price: number;
  description: string;
  features: string[];
}

// ─────────────────────────────────────────────
// COMPARAISON
// ─────────────────────────────────────────────
const compareRows = [
  { label: "Diagnostic Wi-Fi", basic: true, confort: true, pro: true },
  { label: "Optimisation réseau", basic: true, confort: true, pro: true },
  { label: "Vérification sécurité", basic: true, confort: true, pro: true },
  { label: "Installation avancée", basic: false, confort: true, pro: true },
  { label: "Matériel inclus", basic: false, confort: true, pro: true },
  { label: "Support email", basic: true, confort: true, pro: true },
  { label: "Support 24/7", basic: false, confort: false, pro: true },
  { label: "Réseau professionnel", basic: false, confort: false, pro: true },
  { label: "Surveillance en continu", basic: false, confort: false, pro: true },
  { label: "Dashboard admin", basic: false, confort: false, pro: true },
  { label: "SLA garanti", basic: false, confort: false, pro: true },
  { label: "Audit réseau mensuel", basic: false, confort: false, pro: true },
];

// couleurs colonnes
const colColors = ["#64B5F6", "#2979FF", "#FF6D00"];

export default function Pricing() {
  const [plans, setPlans] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    <Box
      sx={{
        background: "linear-gradient(180deg, #0A1628 0%, #000000 100%)",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow */}
      <Box
        sx={{
          position: "absolute",
          width: 700,
          height: 500,
          background:
            "radial-gradient(ellipse, rgba(0,80,255,0.08) 0%, transparent 70%)",
          top: "5%",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />

      <Box
        sx={{
          px: { xs: 2, md: 8 },
          py: { xs: 8, md: 12 },
          position: "relative",
          zIndex: 1,
        }}
      >
          {/* ── HEADER ── */}
        <MotionBox
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          sx={{ textAlign: "center", mb: { xs: 8, md: 10 } }}
        >
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
          
        </MotionBox>

        {/* LOADING */}
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress sx={{ color: "#2979FF" }} />
          </Box>
        )}

        {/* ERROR */}
        {error && (
          <Typography sx={{ color: "#ff6b6b", textAlign: "center" }}>
            {error}
          </Typography>
        )}

        {/* CARDS via PricingCard */}
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
              const styles = [
                { highlight: false, dark: false },
                { highlight: true, dark: false },
                { highlight: false, dark: true },
              ];

              return (
                <Box key={plan._id} sx={{ flex: "1 1 260px", maxWidth: 300 }}>
                  <PricingCard
                    title={plan.title}
                    price={`${plan.price}`}
                   
                    features={plan.features}
                    service={
                      plan.title === "Basic"
                        ? "Diagnostic Wi-Fi"
                        : plan.title === "Confort"
                        ? "Installation Wi-Fi"
                        : plan.title === "Pro Entreprise"
                        ? "Réseau professionnel"
                        : "Autre"
                    }
                    highlight={styles[index]?.highlight}
                    dark={styles[index]?.dark}
                  />
                </Box>
              );
            })}
          </MotionBox>
        )}

      
      
      </Box>
    </Box>
  );
}