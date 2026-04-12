import {
  Box,
  TextField,
  Typography,
  Button,
  MenuItem,
  Alert,
  CircularProgress,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const MotionBox = motion(Box);
const MotionButton = motion(Button as any);

const services = [
  "Diagnostic Wi-Fi",
  "Installation Wi-Fi",
  "Sécurité & Surveillance",
  "Réseau professionnel",
  "Autre",
];

const inputSx = {
  "& .MuiOutlinedInput-root": {
    color: "#fff",
    borderRadius: "10px",
    background: "rgba(255,255,255,0.04)",
    "& fieldset": { borderColor: "rgba(255,255,255,0.12)" },
    "&:hover fieldset": { borderColor: "rgba(41,121,255,0.5)" },
    "&.Mui-focused fieldset": { borderColor: "#2979FF" },
  },
  "& .MuiInputLabel-root": {
    color: "rgba(255,255,255,0.4)",
    "&.Mui-focused": { color: "#2979FF" },
  },
  "& .MuiSelect-icon": { color: "rgba(255,255,255,0.4)" },
};

const infoItems = [
  { icon: <PhoneIcon sx={{ fontSize: 20 }} />, label: "Téléphone", value: "+33 X XX XX XX XX", href: "tel:+33XXXXXXXXX" },
  { icon: <EmailIcon sx={{ fontSize: 20 }} />, label: "Email", value: "contact@nantes-wifi.fr", href: "mailto:contact@nantes-wifi.fr" },
  { icon: <LocationOnIcon sx={{ fontSize: 20 }} />, label: "Zone d'intervention", value: "Nantes & agglomération", href: undefined },
  { icon: <AccessTimeIcon sx={{ fontSize: 20 }} />, label: "Disponibilité", value: "Lun–Sam · 8h–19h", href: undefined },
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export default function Contact() {
  const [form, setForm] = useState<FormData>({
    name: "", email: "", phone: "", service: "", message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      setError("Veuillez remplir au moins le nom, l'email et le message.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Erreur lors de l'envoi. Réessayez.");
      setSuccess(true);
      setForm({ name: "", email: "", phone: "", service: "", message: "" });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(180deg, #000000 0%, #0A1628 100%)",
        minHeight: "100vh",
        px: { xs: 2, md: 8 },
        py: { xs: 8, md: 12 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow */}
      <Box sx={{
        position: "absolute", width: 600, height: 500,
        background: "radial-gradient(ellipse, rgba(0,80,255,0.08) 0%, transparent 70%)",
        top: "10%", left: "50%", transform: "translateX(-50%)", pointerEvents: "none",
      }}/>

      <Box sx={{ position: "relative", zIndex: 1, maxWidth: 1100, mx: "auto" }}>

        {/* ── HEADER ── */}
        <MotionBox
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          sx={{ textAlign: "center", mb: { xs: 6, md: 10 } }}
        >
          <Box sx={{
            display: "inline-block", px: 3, py: 0.75, borderRadius: "20px",
            background: "#fff", border: "1px solid #e0e0e0",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)", mb: 2.5,
          }}>
            <Typography variant="overline" sx={{
              color: "#1565C0", fontWeight: 700, letterSpacing: 3, fontSize: "0.7rem",
            }}>
              CONTACT
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
                Parlons de votre projet Wi-Fi
              </Typography>
            </Box>
          </Box>
          <Typography sx={{ color: "rgba(255,255,255,0.4)", fontSize: "1rem", maxWidth: 480, mx: "auto" }}>
            Réponse garantie sous 2h. Devis gratuit, sans engagement.
          </Typography>
        </MotionBox>

        {/* ── LAYOUT 2 colonnes ── */}
        <Box sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 5,
          alignItems: "flex-start",
        }}>

          {/* ── COL GAUCHE : Infos ── */}
          <MotionBox
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            sx={{ flex: "0 0 auto", width: { xs: "100%", md: 300 } }}
          >
            {/* Info cards */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 4 }}>
              {infoItems.map((item) => (
                <Box
                  key={item.label}
                  component={item.href ? "a" : "div"}
                  href={item.href}
                  sx={{
                    display: "flex", alignItems: "center", gap: 2,
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "12px", p: 2,
                    textDecoration: "none",
                    transition: "all 0.2s",
                    cursor: item.href ? "pointer" : "default",
                    "&:hover": item.href ? {
                      background: "rgba(41,121,255,0.1)",
                      borderColor: "rgba(41,121,255,0.3)",
                    } : {},
                  }}
                >
                  <Box sx={{
                    width: 40, height: 40, borderRadius: "10px",
                    background: "rgba(41,121,255,0.15)",
                    border: "1px solid rgba(41,121,255,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#2979FF", flexShrink: 0,
                  }}>
                    {item.icon}
                  </Box>
                  <Box>
                    <Typography sx={{ color: "rgba(255,255,255,0.35)", fontSize: "0.7rem", fontWeight: 600, mb: 0.2 }}>
                      {item.label}
                    </Typography>
                    <Typography sx={{ color: "#fff", fontSize: "0.85rem", fontWeight: 600 }}>
                      {item.value}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>

            {/* Promesse */}
            <Box sx={{
              background: "linear-gradient(135deg, rgba(41,121,255,0.1), rgba(0,200,83,0.06))",
              border: "1px solid rgba(41,121,255,0.2)",
              borderRadius: "12px", p: 3,
            }}>
              <Typography sx={{ color: "#2979FF", fontWeight: 700, fontSize: "0.8rem", mb: 1.5, letterSpacing: 1 }}>
                NOTRE ENGAGEMENT
              </Typography>
              {[
                "Réponse sous 2h",
                "Devis gratuit & sans engagement",
                "Intervention rapide à Nantes",
                "Satisfaction garantie",
              ].map((item) => (
                <Box key={item} sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.75 }}>
                  <CheckCircleIcon sx={{ fontSize: 15, color: "#00C853" }} />
                  <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: "0.82rem" }}>
                    {item}
                  </Typography>
                </Box>
              ))}
            </Box>
          </MotionBox>

          {/* ── COL DROITE : Formulaire ── */}
          <MotionBox
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            sx={{
              flex: 1,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "20px",
              p: { xs: 3, md: 5 },
              backdropFilter: "blur(10px)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
            }}
          >
            <AnimatePresence mode="wait">
              {success ? (
                <MotionBox
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  sx={{ textAlign: "center", py: 6 }}
                >
                  <CheckCircleIcon sx={{ fontSize: 64, color: "#00C853", mb: 2 }} />
                  <Typography variant="h6" sx={{ color: "#fff", fontWeight: 800, mb: 1 }}>
                    Message envoyé !
                  </Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.5)", mb: 3 }}>
                    Nous vous répondrons dans les 2 heures.
                  </Typography>
                  <Button
                    onClick={() => setSuccess(false)}
                    sx={{
                      color: "#2979FF", border: "1px solid rgba(41,121,255,0.3)",
                      borderRadius: "10px", textTransform: "none", fontWeight: 700,
                      "&:hover": { background: "rgba(41,121,255,0.1)" },
                    }}
                  >
                    Envoyer un autre message
                  </Button>
                </MotionBox>
              ) : (
                <MotionBox key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", mb: 3, fontWeight: 600, letterSpacing: 1 }}>
                    VOTRE DEMANDE
                  </Typography>

                  {/* Ligne Nom + Email */}
                  <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
                    <TextField
                      fullWidth name="name" label="Nom complet *"
                      value={form.name} onChange={handleChange}
                      margin="none" sx={inputSx}
                    />
                    <TextField
                      fullWidth name="email" label="Email *" type="email"
                      value={form.email} onChange={handleChange}
                      margin="none" sx={inputSx}
                    />
                  </Box>

                  {/* Ligne Téléphone + Service */}
                  <Box sx={{ display: "flex", gap: 2, mt: 2, flexDirection: { xs: "column", sm: "row" } }}>
                    <TextField
                      fullWidth name="phone" label="Téléphone"
                      value={form.phone} onChange={handleChange}
                      margin="none" sx={inputSx}
                    />
                    <TextField
                      fullWidth select name="service" label="Type de service"
                      value={form.service} onChange={handleChange}
                      margin="none" sx={inputSx}
                      SelectProps={{
                        MenuProps: {
                          PaperProps: {
                            sx: {
                              background: "#0D1B2A",
                              border: "1px solid rgba(255,255,255,0.1)",
                              "& .MuiMenuItem-root": {
                                color: "rgba(255,255,255,0.75)",
                                "&:hover": { background: "rgba(41,121,255,0.15)" },
                                "&.Mui-selected": { background: "rgba(41,121,255,0.2)" },
                              },
                            },
                          },
                        },
                      }}
                    >
                      {services.map((s) => (
                        <MenuItem key={s} value={s}>{s}</MenuItem>
                      ))}
                    </TextField>
                  </Box>

                  {/* Message */}
                  <TextField
                    fullWidth name="message" label="Message *"
                    multiline rows={5} value={form.message}
                    onChange={handleChange}
                    margin="none"
                    sx={{ ...inputSx, mt: 2 }}
                  />

                  {/* Error */}
                  {error && (
                    <Alert severity="error" sx={{
                      mt: 2, background: "rgba(255,80,80,0.1)",
                      border: "1px solid rgba(255,80,80,0.3)",
                      color: "#ff6b6b",
                      "& .MuiAlert-icon": { color: "#ff6b6b" },
                    }}>
                      {error}
                    </Alert>
                  )}

                  {/* Submit */}
                  <MotionButton
                    onClick={handleSubmit}
                    disabled={loading}
                    whileHover={!loading ? { scale: 1.02 } : {}}
                    whileTap={!loading ? { scale: 0.98 } : {}}
                    fullWidth
                    endIcon={loading ? <CircularProgress size={18} sx={{ color: "#fff" }} /> : <SendIcon />}
                    sx={{
                      mt: 3, py: 1.6,
                      background: loading
                        ? "rgba(41,121,255,0.4)"
                        : "linear-gradient(135deg, #2979FF, #1565C0)",
                      color: "#fff", fontWeight: 700, fontSize: "1rem",
                      borderRadius: "12px", textTransform: "none",
                      boxShadow: "0 8px 24px rgba(41,121,255,0.4)",
                      "&:hover": { boxShadow: "0 12px 32px rgba(41,121,255,0.6)" },
                      "&.Mui-disabled": { color: "rgba(255,255,255,0.5)" },
                    }}
                  >
                    {loading ? "Envoi en cours..." : "Envoyer ma demande"}
                  </MotionButton>

                  <Typography sx={{ color: "rgba(255,255,255,0.25)", fontSize: "0.75rem", textAlign: "center", mt: 2 }}>
                    * Champs obligatoires · Vos données restent confidentielles
                  </Typography>
                </MotionBox>
              )}
            </AnimatePresence>
          </MotionBox>
        </Box>
      </Box>
    </Box>
  );
}