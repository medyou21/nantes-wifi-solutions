import { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Paper,
  Alert,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

const MotionBox = motion.create(Box);
const MotionButton = motion.create(Button as any);

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
};

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const login = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await API.post("/admin/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/admin/dashboard");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Erreur login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #000 0%, #0A1628 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      {/* Glow */}
      <Box
        sx={{
          position: "absolute",
          width: 600,
          height: 500,
          background:
            "radial-gradient(ellipse, rgba(41,121,255,0.15) 0%, transparent 70%)",
        }}
      />

      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        sx={{
          width: 380,
          p: 4,
          borderRadius: 4,
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Typography
          variant="h5"
          sx={{ color: "#fff", fontWeight: 800, mb: 3, textAlign: "center" }}
        >
          Admin Login
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          fullWidth
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ ...inputSx, mb: 2 }}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={inputSx}
        />

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
          {loading ? <CircularProgress size={20} /> : "Se connecter"}
        </MotionButton>
      </MotionBox>
    </Box>
  );
}