import { Box, Typography, Button, Chip } from "@mui/material";
import WifiIcon from "@mui/icons-material/Wifi";
import SettingsInputAntennaIcon from "@mui/icons-material/SettingsInputAntenna";
import SecurityIcon from "@mui/icons-material/Security";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const MotionBox = motion(Box);

const services = [
  {
    id: "diagnostic",
    badge: "Étape 1",
    title: "Diagnostic Wi-Fi",
    subtitle: "Identifiez les failles de votre réseau",
    description:
      "Notre expert analyse votre environnement réseau en profondeur pour détecter toutes les zones mortes, interférences et problèmes de performance qui dégradent votre expérience.",
    icon: <WifiIcon sx={{ fontSize: 32 }} />,
    color: "#2979FF",
    lightColor: "rgba(41,121,255,0.08)",
    borderColor: "rgba(41,121,255,0.25)",
    benefits: [
      "Rapport détaillé sous 24h",
      "Cartographie de votre réseau",
      "Recommandations personnalisées",
      "Détection des zones mortes",
      "Analyse des interférences",
    ],
    targets: ["Particuliers", "PME", "Hôtels"],
    illustration: (
      <svg viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto" }}>
        {/* Background grid */}
        {[0,1,2,3,4,5,6].map(i => (
          <line key={`h${i}`} x1="0" y1={i*30} x2="280" y2={i*30} stroke="rgba(41,121,255,0.08)" strokeWidth="1"/>
        ))}
        {[0,1,2,3,4,5,6,7,8,9].map(i => (
          <line key={`v${i}`} x1={i*35} y1="0" x2={i*35} y2="180" stroke="rgba(41,121,255,0.08)" strokeWidth="1"/>
        ))}
        {/* Router */}
        <rect x="110" y="95" width="60" height="36" rx="6" fill="#0D1B2A" stroke="#2979FF" strokeWidth="1.5"/>
        <circle cx="130" cy="113" r="4" fill="#2979FF" opacity="0.6"/>
        <circle cx="140" cy="113" r="4" fill="#2979FF"/>
        <circle cx="150" cy="113" r="4" fill="#2979FF" opacity="0.6"/>
        <rect x="133" y="91" width="4" height="10" rx="2" fill="#2979FF"/>
        <rect x="143" y="88" width="4" height="13" rx="2" fill="#2979FF"/>
        {/* Signal waves */}
        {[1,2,3].map(i => (
          <path key={i} d={`M${140-i*28},${90-i*8} Q140,${70-i*16} ${140+i*28},${90-i*8}`}
            stroke="#2979FF" strokeWidth="2" fill="none" opacity={1.1-i*0.3} strokeLinecap="round"/>
        ))}
        {/* Dead zone */}
        <circle cx="48" cy="60" r="22" fill="rgba(255,80,80,0.08)" stroke="rgba(255,80,80,0.4)" strokeWidth="1.5" strokeDasharray="4 3"/>
        <line x1="38" y1="50" x2="58" y2="70" stroke="rgba(255,80,80,0.6)" strokeWidth="2" strokeLinecap="round"/>
        <line x1="58" y1="50" x2="38" y2="70" stroke="rgba(255,80,80,0.6)" strokeWidth="2" strokeLinecap="round"/>
        <text x="48" y="95" textAnchor="middle" fill="rgba(255,80,80,0.7)" fontSize="9" fontFamily="monospace">Zone morte</text>
        {/* Strong zone */}
        <circle cx="230" cy="55" r="22" fill="rgba(41,121,255,0.08)" stroke="rgba(41,121,255,0.4)" strokeWidth="1.5"/>
        <path d="M221,55 L228,62 L240,48" stroke="#2979FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <text x="230" y="88" textAnchor="middle" fill="rgba(41,121,255,0.7)" fontSize="9" fontFamily="monospace">Signal fort</text>
        {/* Scan line */}
        <line x1="0" y1="140" x2="280" y2="140" stroke="rgba(41,121,255,0.3)" strokeWidth="1" strokeDasharray="6 3"/>
        <text x="14" y="156" fill="rgba(41,121,255,0.5)" fontSize="8" fontFamily="monospace">SCAN EN COURS...</text>
        <circle cx="258" cy="152" r="4" fill="#2979FF" opacity="0.6"/>
      </svg>
    ),
  },
  {
    id: "installation",
    badge: "Étape 2",
    title: "Installation Wi-Fi",
    subtitle: "Une couverture optimale partout",
    description:
      "Nos techniciens installent et configurent votre infrastructure Wi-Fi de A à Z. Matériel professionnel, câblage propre, configuration avancée pour une couverture totale sans angles morts.",
    icon: <SettingsInputAntennaIcon sx={{ fontSize: 32 }} />,
    color: "#00C853",
    lightColor: "rgba(0,200,83,0.08)",
    borderColor: "rgba(0,200,83,0.25)",
    benefits: [
      "Installation le jour même",
      "Matériel professionnel inclus",
      "Configuration QoS avancée",
      "Réseau invité séparé",
      "Garantie 2 ans pièces & main d'œuvre",
    ],
    targets: ["Bureaux", "Commerces", "Airbnb"],
    illustration: (
      <svg viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto" }}>
        {/* Floor plan */}
        <rect x="20" y="20" width="240" height="140" rx="4" stroke="rgba(0,200,83,0.2)" strokeWidth="1.5" fill="rgba(0,200,83,0.03)"/>
        {/* Rooms */}
        <line x1="130" y1="20" x2="130" y2="160" stroke="rgba(0,200,83,0.15)" strokeWidth="1.5"/>
        <line x1="20" y1="95" x2="130" y2="95" stroke="rgba(0,200,83,0.15)" strokeWidth="1.5"/>
        {/* Access points */}
        {[
          { x: 75, y: 57, r: [30, 45, 55] },
          { x: 200, y: 90, r: [30, 45, 55] },
        ].map((ap, i) => (
          <g key={i}>
            {ap.r.map((r, j) => (
              <circle key={j} cx={ap.x} cy={ap.y} r={r} stroke="rgba(0,200,83,0.15)" strokeWidth="1" fill="none"/>
            ))}
            <circle cx={ap.x} cy={ap.y} r="8" fill="#00C853" opacity="0.9"/>
            <circle cx={ap.x} cy={ap.y} r="3" fill="#fff"/>
            <text x={ap.x} y={ap.y + 22} textAnchor="middle" fill="rgba(0,200,83,0.7)" fontSize="8" fontFamily="monospace">AP {i+1}</text>
          </g>
        ))}
        {/* Cable */}
        <path d="M75,57 Q130,30 200,90" stroke="rgba(0,200,83,0.4)" strokeWidth="1.5" strokeDasharray="5 3" fill="none"/>
        {/* Devices */}
        {[{x:40,y:130},{x:105,y:40},{x:160,y:40},{x:245,y:130},{x:245,y:50}].map((d,i) => (
          <rect key={i} x={d.x-7} y={d.y-5} width="14" height="10" rx="2" fill="rgba(0,200,83,0.15)" stroke="rgba(0,200,83,0.4)" strokeWidth="1"/>
        ))}
        <text x="140" y="174" textAnchor="middle" fill="rgba(0,200,83,0.4)" fontSize="8" fontFamily="monospace">PLAN DE COUVERTURE</text>
      </svg>
    ),
  },
  {
    id: "securite",
    badge: "Étape 3",
    title: "Sécurité & Surveillance",
    subtitle: "Protégez votre réseau 24h/24",
    description:
      "Nous sécurisons votre infrastructure Wi-Fi contre les intrusions, configurons un pare-feu avancé et mettons en place une surveillance continue avec alertes en temps réel.",
    icon: <SecurityIcon sx={{ fontSize: 32 }} />,
    color: "#FF6D00",
    lightColor: "rgba(255,109,0,0.08)",
    borderColor: "rgba(255,109,0,0.25)",
    benefits: [
      "Chiffrement WPA3 enterprise",
      "Détection d'intrusions (IDS)",
      "Tableau de bord en temps réel",
      "Alertes SMS & email",
      "Audit de sécurité mensuel",
    ],
    targets: ["Entreprises", "Syndics", "Hôtels"],
    illustration: (
      <svg viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto" }}>
        {/* Shield */}
        <path d="M140,20 L200,45 L200,100 Q200,145 140,165 Q80,145 80,100 L80,45 Z"
          fill="rgba(255,109,0,0.06)" stroke="rgba(255,109,0,0.3)" strokeWidth="1.5"/>
        {/* Check */}
        <path d="M115,95 L132,112 L165,78" stroke="#FF6D00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        {/* Orbit rings */}
        {[45, 65].map((r, i) => (
          <circle key={i} cx="140" cy="92" r={r} stroke="rgba(255,109,0,0.12)" strokeWidth="1" fill="none" strokeDasharray="4 3"/>
        ))}
        {/* Threats */}
        {[
          { x: 55, y: 50, blocked: true },
          { x: 230, y: 65, blocked: true },
          { x: 48, y: 130, blocked: false },
          { x: 232, y: 130, blocked: true },
        ].map((t, i) => (
          <g key={i}>
            <circle cx={t.x} cy={t.y} r="10" fill={t.blocked ? "rgba(255,80,80,0.1)" : "rgba(255,109,0,0.1)"}
              stroke={t.blocked ? "rgba(255,80,80,0.5)" : "rgba(255,109,0,0.5)"} strokeWidth="1"/>
            {t.blocked
              ? <><line x1={t.x-4} y1={t.y-4} x2={t.x+4} y2={t.y+4} stroke="rgba(255,80,80,0.8)" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1={t.x+4} y1={t.y-4} x2={t.x-4} y2={t.y+4} stroke="rgba(255,80,80,0.8)" strokeWidth="1.5" strokeLinecap="round"/></>
              : <text x={t.x} y={t.y+4} textAnchor="middle" fill="rgba(255,109,0,0.8)" fontSize="10">!</text>
            }
          </g>
        ))}
        {/* Status bar */}
        <rect x="20" y="155" width="240" height="18" rx="4" fill="rgba(255,109,0,0.05)" stroke="rgba(255,109,0,0.15)" strokeWidth="1"/>
        <rect x="24" y="159" width="60" height="10" rx="2" fill="rgba(255,109,0,0.3)"/>
        <text x="96" y="168" fill="rgba(255,109,0,0.6)" fontSize="8" fontFamily="monospace">PROTECTION ACTIVE — 3 menaces bloquées</text>
      </svg>
    ),
  },
];

const MotionButton = motion(Button);

export default function Services() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        background: "linear-gradient(180deg, #000000 0%, #0A1628 50%, #000814 100%)",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow */}
      <Box sx={{
        position: "absolute", width: 800, height: 500,
        background: "radial-gradient(ellipse, rgba(0,80,255,0.07) 0%, transparent 70%)",
        top: "10%", left: "50%", transform: "translateX(-50%)", pointerEvents: "none",
      }}/>

      <Box sx={{ px: { xs: 3, md: 8 }, py: { xs: 8, md: 12 }, position: "relative", zIndex: 1 }}>
<MotionBox
  initial={{ opacity: 0, y: -30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  sx={{
    textAlign: "center",
    mb: { xs: 8, md: 12 },
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
      mb: 2.5, // 👈 espace optimisé
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
          fontSize: { xs: "1.5rem", md: "2.2rem" }, // 👈 cohérent desktop
        }}
      >
        Des solutions Wi-Fi adaptées à vos besoins
      </Typography>
      
    </Box>
  </Box>
   {/* DESCRIPTION */}
  <Typography
    sx={{
      color: "rgba(255,255,255,0.6)",
      fontSize: "1rem",
      maxWidth: 560,
      mx: "auto",
    }}
  >
    De l'audit initial à la surveillance continue — nous gérons tout pour un réseau rapide, stable et sécurisé.
  </Typography>
</MotionBox>

         

        {/* ── SERVICE SECTIONS ── */}
        <Box sx={{ maxWidth: 1100, mx: "auto", display: "flex", flexDirection: "column", gap: { xs: 8, md: 12 } }}>
          {services.map((service, index) => (
            <MotionBox
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Box sx={{
                display: "flex",
                flexDirection: { xs: "column", md: index % 2 === 0 ? "row" : "row-reverse" },
                gap: { xs: 4, md: 6 },
                alignItems: "center",
                background: service.lightColor,
                border: `1px solid ${service.borderColor}`,
                borderRadius: "20px",
                p: { xs: 3, md: 5 },
                position: "relative",
                overflow: "hidden",
              }}>

                {/* Corner accent */}
                <Box sx={{
                  position: "absolute",
                  top: -40, right: index % 2 === 0 ? -40 : "auto", left: index % 2 !== 0 ? -40 : "auto",
                  width: 120, height: 120,
                  background: `radial-gradient(circle, ${service.color}22 0%, transparent 70%)`,
                  pointerEvents: "none",
                }}/>

                {/* ── LEFT/RIGHT: TEXT ── */}
                <Box sx={{ flex: 1, position: "relative", zIndex: 1 }}>
                  {/* Badge + icon */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
                    <Box sx={{
                      width: 44, height: 44, borderRadius: "10px",
                      background: `linear-gradient(135deg, ${service.color}33, ${service.color}11)`,
                      border: `1px solid ${service.color}44`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: service.color,
                    }}>
                      {service.icon}
                    </Box>
                    <Chip label={service.badge} size="small" sx={{
                      background: `${service.color}18`,
                      color: service.color,
                      border: `1px solid ${service.color}33`,
                      fontWeight: 700, fontSize: "0.65rem", letterSpacing: 1,
                    }}/>
                  </Box>

                  <Typography variant="h5" sx={{
                    fontWeight: 800, color: "#fff", mb: 0.5,
                    fontSize: { xs: "1.3rem", md: "1.6rem" },
                  }}>
                    {service.title}
                  </Typography>
                  <Typography sx={{
                    color: service.color, fontWeight: 600, fontSize: "0.9rem", mb: 2,
                  }}>
                    {service.subtitle}
                  </Typography>
                  <Typography sx={{
                    color: "rgba(255,255,255,0.55)", fontSize: "0.95rem", lineHeight: 1.7, mb: 3,
                  }}>
                    {service.description}
                  </Typography>

                  {/* Benefits */}
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 3 }}>
                    {service.benefits.map((b) => (
                      <Box key={b} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <CheckCircleOutlineIcon sx={{ fontSize: 18, color: service.color, flexShrink: 0 }}/>
                        <Typography sx={{ color: "rgba(255,255,255,0.75)", fontSize: "0.9rem" }}>
                          {b}
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  {/* Target chips */}
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 3 }}>
                    {service.targets.map((t) => (
                      <Chip key={t} label={t} size="small" sx={{
                        background: "rgba(255,255,255,0.06)",
                        color: "rgba(255,255,255,0.5)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        fontSize: "0.7rem",
                      }}/>
                    ))}
                  </Box>

                  {/* CTA */}
                  <MotionButton
                    onClick={() => navigate("/contact")}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      background: `linear-gradient(135deg, ${service.color}, ${service.color}aa)`,
                      color: "#fff",
                      fontWeight: 700,
                      px: 3,
                      py: 1.2,
                      borderRadius: "10px",
                      textTransform: "none",
                      fontSize: "0.95rem",
                      boxShadow: `0 4px 20px ${service.color}44`,
                      "&:hover": {
                        background: `linear-gradient(135deg, ${service.color}dd, ${service.color}88)`,
                        boxShadow: `0 6px 28px ${service.color}66`,
                      },
                    }}
                  >
                    Demander un devis gratuit
                  </MotionButton>
                </Box>

                {/* ── RIGHT/LEFT: ILLUSTRATION ── */}
                <Box sx={{
                  flex: "0 0 auto",
                  width: { xs: "100%", md: 300 },
                  background: "rgba(0,0,0,0.3)",
                  borderRadius: "14px",
                  border: `1px solid ${service.borderColor}`,
                  p: 2,
                  position: "relative", zIndex: 1,
                }}>
                  {service.illustration}
                </Box>
              </Box>
            </MotionBox>
          ))}
        </Box>

        {/* ── BOTTOM GLOBAL CTA ── */}
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          sx={{
            mt: { xs: 10, md: 14 },
            textAlign: "center",
            background: "linear-gradient(135deg, rgba(41,121,255,0.12), rgba(0,200,83,0.06))",
            border: "1px solid rgba(41,121,255,0.2)",
            borderRadius: "20px",
            p: { xs: 5, md: 8 },
            maxWidth: 700,
            mx: "auto",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box sx={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse at center, rgba(41,121,255,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}/>

          <Typography variant="h5" sx={{
            fontWeight: 900, color: "#fff", mb: 1.5,
            fontSize: { xs: "1.4rem", md: "1.8rem" },
          }}>
            Pas sûr de ce dont vous avez besoin ?
          </Typography>
          <Typography sx={{
            color: "rgba(255,255,255,0.5)", mb: 4, fontSize: "1rem",
          }}>
            Notre expert vous rappelle gratuitement et vous conseille la solution adaptée à votre situation.
          </Typography>

          <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
            <MotionButton
              onClick={() => navigate("/contact")}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              endIcon={<ArrowForwardIcon />}
              sx={{
                background: "linear-gradient(135deg, #2979FF, #1565C0)",
                color: "#fff", fontWeight: 700,
                px: 4, py: 1.5, borderRadius: "12px",
                textTransform: "none", fontSize: "1rem",
                boxShadow: "0 4px 24px rgba(41,121,255,0.4)",
                "&:hover": { boxShadow: "0 6px 32px rgba(41,121,255,0.6)" },
              }}
            >
              Nous contacter
            </MotionButton>
            <MotionButton
              component="a"
              href="tel:+33XXXXXXXXX"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              sx={{
                background: "rgba(255,255,255,0.06)",
                color: "#fff", fontWeight: 700,
                px: 4, py: 1.5, borderRadius: "12px",
                textTransform: "none", fontSize: "1rem",
                border: "1px solid rgba(255,255,255,0.15)",
                "&:hover": { background: "rgba(255,255,255,0.1)" },
              }}
            >
              📞 Appel gratuit
            </MotionButton>
          </Box>
        </MotionBox>

      </Box>
    </Box>
  );
}