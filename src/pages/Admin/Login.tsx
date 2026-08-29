// ─────────────────────────────────────────────
// IMPORTS
// ─────────────────────────────────────────────

// React state
import { useState } from "react";

// MUI UI components
import {
  Box,
  TextField,
  Typography,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";

// Animations Framer Motion
import { motion } from "framer-motion";

// API service (axios wrapper)
import API from "../../services/api";

// Navigation React Router
import { useNavigate } from "react-router-dom";


// ─────────────────────────────────────────────
// MOTION COMPONENTS (UI animée)
// ─────────────────────────────────────────────
const MotionBox = motion.create(Box);

// ⚠️ cast "any" utilisé car MUI Button + framer-motion typing conflict
const MotionButton = motion.create(Button as any);


// ─────────────────────────────────────────────
// STYLE INPUT (design glass SaaS)
// ─────────────────────────────────────────────
const inputSx = {
  "& .MuiOutlinedInput-root": {
    color: "#fff",
    borderRadius: "10px",
    background: "rgba(255,255,255,0.04)",

    // bordure par défaut
    "& fieldset": {
      borderColor: "rgba(255,255,255,0.12)",
    },

    // hover
    "&:hover fieldset": {
      borderColor: "rgba(41,121,255,0.5)",
    },

    // focus
    "&.Mui-focused fieldset": {
      borderColor: "#2979FF",
    },
  },

  // label style
  "& .MuiInputLabel-root": {
    color: "rgba(255,255,255,0.4)",

    "&.Mui-focused": {
      color: "#2979FF",
    },
  },
};


// ─────────────────────────────────────────────
// COMPONENT LOGIN ADMIN
// ─────────────────────────────────────────────
export default function AdminLogin() {

  // ───────────── FORM STATE ─────────────
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ───────────── UI STATE ─────────────
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();


  // ─────────────────────────────────────────────
  // LOGIN FUNCTION
  // ─────────────────────────────────────────────
  const login = async () => {

    setLoading(true);
    setError("");

    try {
      // appel API backend
      const res = await API.post("/admin/login", {
        email,
        password,
      });

      // stockage token JWT
      localStorage.setItem("token", res.data.token);

      // redirection dashboard
      navigate("/admin/dashboard");

    } catch (err: any) {

      // gestion erreur backend ou réseau
      setError(
        err?.response?.data?.message || "Erreur login"
      );

    } finally {
      setLoading(false);
    }
  };


  // ─────────────────────────────────────────────
  // RENDER UI
  // ─────────────────────────────────────────────
  return (
    <Box
      sx={{
        minHeight: "100vh",

        // fond dark SaaS
        background: "linear-gradient(180deg, #000 0%, #0A1628 100%)",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        position: "relative",
      }}
    >

      {/* Glow background (effet UI moderne) */}
      <Box
        sx={{
          position: "absolute",
          width: 600,
          height: 500,
          background:
            "radial-gradient(ellipse, rgba(41,121,255,0.15) 0%, transparent 70%)",
        }}
      />


      {/* ───────────── LOGIN CARD ───────────── */}
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}

        sx={{
          width: 380,
          p: 4,
          borderRadius: 4,

          // glassmorphism
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(10px)",
          zIndex: 2,
        }}
      >

        {/* TITLE */}
        <Typography
          variant="h5"
          sx={{
            color: "#fff",
            fontWeight: 800,
            mb: 3,
            textAlign: "center",
          }}
        >
          Admin Login
        </Typography>


        {/* ERROR MESSAGE */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}


        {/* EMAIL */}
        <TextField
          fullWidth
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ ...inputSx, mb: 2 }}
        />


        {/* PASSWORD */}
        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={inputSx}
        />


        {/* LOGIN BUTTON */}
        <MotionButton
          onClick={login}
          disabled={loading}

          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}

          fullWidth
          sx={{
            mt: 3,
            py: 1.5,
            background: "linear-gradient(135deg, #2979FF, #1565C0)",
            color: "#fff",
            fontWeight: 700,
            borderRadius: "12px",
            textTransform: "none",
          }}
        >
          {loading ? (
            <CircularProgress size={20} sx={{ color: "#fff" }} />
          ) : (
            "Se connecter"
          )}
        </MotionButton>

      </MotionBox>
    </Box>
  );
}