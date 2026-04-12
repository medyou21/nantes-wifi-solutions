import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Chip,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import StarIcon from "@mui/icons-material/Star";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MotionBox = motion(Box);
const MotionButton = motion(Button as any);

interface Offer {
  _id: string;
  title: string;
  price: number;
  description: string;
  features: string[];
}

// Critères du tableau comparatif
const compareRows = [
  { label: "Diagnostic Wi-Fi",            basic: true,  confort: true,  pro: true  },
  { label: "Optimisation réseau",         basic: true,  confort: true,  pro: true  },
  { label: "Vérification sécurité",       basic: true,  confort: true,  pro: true  },
  { label: "Installation avancée",        basic: false, confort: true,  pro: true  },
  { label: "Matériel inclus",             basic: false, confort: true,  pro: true  },
  { label: "Support email",               basic: true,  confort: true,  pro: true  },
  { label: "Support 24/7",               basic: false, confort: false, pro: true  },
  { label: "Réseau professionnel",        basic: false, confort: false, pro: true  },
  { label: "Surveillance en continu",     basic: false, confort: false, pro: true  },
  { label: "Dashboard admin",             basic: false, confort: false, pro: true  },
  { label: "SLA garanti",                basic: false, confort: false, pro: true  },
  { label: "Audit réseau mensuel",        basic: false, confort: false, pro: true  },
];

const colColors = ["#64B5F6", "#2979FF", "#FF6D00"];
const colLabels = ["Basic", "Confort", "Pro Entreprise"];
const colPrices = ["79€", "199€", "499€/mois"];
const colPopular = [false, true, false];

export default function Pricing() {
  const [plans, setPlans] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

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

  const cardStyles = [
    { highlight: false, dark: false },
    { highlight: true,  dark: false },
    { highlight: false, dark: true  },
  ];

  return (
    <Box
      sx={{
        background: "linear-gradient(180deg, #0A1628 0%, #000000 100%)",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow */}
      <Box sx={{
        position: "absolute", width: 700, height: 500,
        background: "radial-gradient(ellipse, rgba(0,80,255,0.08) 0%, transparent 70%)",
        top: "5%", left: "50%", transform: "translateX(-50%)", pointerEvents: "none",
      }}/>

      <Box sx={{ px: { xs: 2, md: 8 }, py: { xs: 8, md: 12 }, position: "relative", zIndex: 1 }}>

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
          <Typography sx={{ color: "rgba(255,255,255,0.45)", fontSize: "1rem", maxWidth: 500, mx: "auto" }}>
            Des forfaits transparents, sans surprise. Changez ou annulez à tout moment.
          </Typography>
        </MotionBox>

        {/* ── LOADING / ERROR ── */}
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress sx={{ color: "#2979FF" }} />
          </Box>
        )}
        {error && (
          <Typography sx={{ color: "#ff6b6b", textAlign: "center", py: 4 }}>
            {error}
          </Typography>
        )}

        {/* ── PRICING CARDS ── */}
        {!loading && !error && (
          <MotionBox
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
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
              const color = colColors[index] ?? "#2979FF";
              const isPopular = colPopular[index];
              return (
                <Box
                  key={plan._id}
                  sx={{
                    flex: "1 1 260px",
                    maxWidth: 300,
                    position: "relative",
                  }}
                >
                  {isPopular && (
                    <Box sx={{
                      position: "absolute", top: -14, left: "50%",
                      transform: "translateX(-50%)", zIndex: 2,
                    }}>
                      <Chip
                        icon={<StarIcon sx={{ fontSize: 14, color: "#fff !important" }} />}
                        label="Le plus populaire"
                        size="small"
                        sx={{
                          background: "linear-gradient(135deg, #2979FF, #1565C0)",
                          color: "#fff", fontWeight: 700, fontSize: "0.65rem",
                          letterSpacing: 0.5, px: 1,
                          boxShadow: "0 4px 12px rgba(41,121,255,0.5)",
                        }}
                      />
                    </Box>
                  )}
                  <MotionBox
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    sx={{
                      background: isPopular
                        ? "linear-gradient(160deg, #0D2550, #1A3A7A)"
                        : "rgba(255,255,255,0.04)",
                      border: `1px solid ${isPopular ? "#2979FF" : "rgba(255,255,255,0.1)"}`,
                      borderRadius: "16px",
                      p: 3,
                      pt: isPopular ? 4 : 3,
                      boxShadow: isPopular
                        ? "0 8px 40px rgba(41,121,255,0.25)"
                        : "0 4px 20px rgba(0,0,0,0.3)",
                    }}
                  >
                    {/* Color accent top */}
                    <Box sx={{
                      width: 40, height: 4, borderRadius: 2,
                      background: color, mb: 2,
                    }}/>

                    <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: "0.8rem", fontWeight: 600, mb: 0.5 }}>
                      {plan.title}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.5, mb: 1 }}>
                      <Typography sx={{ color: "#fff", fontSize: "2.2rem", fontWeight: 900 }}>
                        {plan.price}€
                      </Typography>
                      {index === 2 && (
                        <Typography sx={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem" }}>
                          /mois
                        </Typography>
                      )}
                    </Box>
                    <Typography sx={{ color: "rgba(255,255,255,0.45)", fontSize: "0.85rem", mb: 3, lineHeight: 1.5 }}>
                      {plan.description}
                    </Typography>

                    {/* Features */}
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 3 }}>
                      {plan.features.map((f) => (
                        <Box key={f} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <CheckIcon sx={{ fontSize: 16, color, flexShrink: 0 }} />
                          <Typography sx={{ color: "rgba(255,255,255,0.7)", fontSize: "0.85rem" }}>
                            {f}
                          </Typography>
                        </Box>
                      ))}
                    </Box>

                    <MotionButton
                      onClick={() => navigate("/contact")}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      fullWidth
                      endIcon={<ArrowForwardIcon />}
                      sx={{
                        background: isPopular
                          ? `linear-gradient(135deg, ${color}, #1565C0)`
                          : `${color}22`,
                        color: isPopular ? "#fff" : color,
                        border: isPopular ? "none" : `1px solid ${color}44`,
                        fontWeight: 700,
                        py: 1.2,
                        borderRadius: "10px",
                        textTransform: "none",
                        fontSize: "0.9rem",
                        boxShadow: isPopular ? `0 4px 20px ${color}44` : "none",
                        "&:hover": {
                          background: isPopular
                            ? `linear-gradient(135deg, ${color}dd, #1565C0dd)`
                            : `${color}33`,
                        },
                      }}
                    >
                      Choisir ce forfait
                    </MotionButton>
                  </MotionBox>
                </Box>
              );
            })}
          </MotionBox>
        )}

        {/* ── TABLEAU COMPARATIF ── */}
        <MotionBox
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          sx={{ maxWidth: 900, mx: "auto" }}
        >
          {/* Titre tableau */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography sx={{
              color: "rgba(255,255,255,0.3)", fontSize: "0.7rem",
              fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", mb: 1,
            }}>
              Comparaison détaillée
            </Typography>
            <Typography variant="h5" sx={{ color: "#fff", fontWeight: 800 }}>
              Tout ce qui est inclus
            </Typography>
          </Box>

          {/* Table wrapper */}
          <Box sx={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "16px",
            overflow: "hidden",
          }}>

            {/* Table header */}
            <Box sx={{
              display: "grid",
              gridTemplateColumns: "1fr repeat(3, 100px)",
              background: "rgba(255,255,255,0.05)",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              px: { xs: 2, md: 4 }, py: 2,
            }}>
              <Box/>
              {colLabels.map((label, i) => (
                <Box key={label} sx={{ textAlign: "center" }}>
                  <Typography sx={{
                    color: colColors[i],
                    fontWeight: 800,
                    fontSize: { xs: "0.75rem", md: "0.9rem" },
                  }}>
                    {label}
                  </Typography>
                  <Typography sx={{
                    color: "rgba(255,255,255,0.4)",
                    fontSize: { xs: "0.65rem", md: "0.75rem" },
                  }}>
                    {colPrices[i]}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Table rows */}
            {compareRows.map((row, rowIndex) => (
              <Box
                key={row.label}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr repeat(3, 100px)",
                  px: { xs: 2, md: 4 },
                  py: 1.5,
                  borderBottom: rowIndex < compareRows.length - 1
                    ? "1px solid rgba(255,255,255,0.05)"
                    : "none",
                  background: rowIndex % 2 === 0
                    ? "transparent"
                    : "rgba(255,255,255,0.015)",
                  "&:hover": {
                    background: "rgba(255,255,255,0.04)",
                  },
                  transition: "background 0.2s",
                }}
              >
                <Typography sx={{
                  color: "rgba(255,255,255,0.65)",
                  fontSize: { xs: "0.8rem", md: "0.9rem" },
                  display: "flex",
                  alignItems: "center",
                }}>
                  {row.label}
                </Typography>
                {[row.basic, row.confort, row.pro].map((val, colIndex) => (
                  <Box key={colIndex} sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                    {val
                      ? <CheckIcon sx={{ fontSize: 18, color: colColors[colIndex] }} />
                      : <CloseIcon sx={{ fontSize: 18, color: "rgba(255,255,255,0.15)" }} />
                    }
                  </Box>
                ))}
              </Box>
            ))}

            {/* CTA row */}
            <Box sx={{
              display: "grid",
              gridTemplateColumns: "1fr repeat(3, 100px)",
              px: { xs: 2, md: 4 }, py: 2.5,
              background: "rgba(255,255,255,0.03)",
              borderTop: "1px solid rgba(255,255,255,0.08)",
            }}>
              <Typography sx={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem", display: "flex", alignItems: "center" }}>
                Commencer →
              </Typography>
              {colColors.map((color, i) => (
                <Box key={i} sx={{ display: "flex", justifyContent: "center" }}>
                  <MotionButton
                    onClick={() => navigate("/contact")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    size="small"
                    sx={{
                      background: colPopular[i]
                        ? `linear-gradient(135deg, ${color}, #1565C0)`
                        : `${color}18`,
                      color: colPopular[i] ? "#fff" : color,
                      border: colPopular[i] ? "none" : `1px solid ${color}33`,
                      fontWeight: 700,
                      borderRadius: "8px",
                      textTransform: "none",
                      fontSize: "0.7rem",
                      px: 1.5,
                      py: 0.75,
                      minWidth: 0,
                      boxShadow: colPopular[i] ? `0 4px 16px ${color}44` : "none",
                      "&:hover": {
                        background: colPopular[i]
                          ? `linear-gradient(135deg, ${color}dd, #1565C0dd)`
                          : `${color}28`,
                      },
                    }}
                  >
                    Choisir
                  </MotionButton>
                </Box>
              ))}
            </Box>
          </Box>
        </MotionBox>

        {/* ── FAQ RAPIDE ── */}
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          sx={{
            mt: { xs: 10, md: 14 },
            textAlign: "center",
            maxWidth: 600,
            mx: "auto",
            background: "rgba(41,121,255,0.06)",
            border: "1px solid rgba(41,121,255,0.15)",
            borderRadius: "16px",
            p: { xs: 4, md: 6 },
          }}
        >
          <Typography variant="h6" sx={{ color: "#fff", fontWeight: 800, mb: 1 }}>
            Une question sur nos tarifs ?
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.45)", fontSize: "0.95rem", mb: 3 }}>
            Notre équipe vous répond sous 2h et vous aide à choisir le bon forfait.
          </Typography>
          <MotionButton
            onClick={() => navigate("/contact")}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            endIcon={<ArrowForwardIcon />}
            sx={{
              background: "linear-gradient(135deg, #2979FF, #1565C0)",
              color: "#fff", fontWeight: 700,
              px: 4, py: 1.4, borderRadius: "10px",
              textTransform: "none", fontSize: "0.95rem",
              boxShadow: "0 4px 20px rgba(41,121,255,0.4)",
              "&:hover": { boxShadow: "0 6px 28px rgba(41,121,255,0.6)" },
            }}
          >
            Nous contacter
          </MotionButton>
        </MotionBox>

      </Box>
    </Box>
  );
}