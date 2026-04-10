import { Box, TextField, Typography, Button } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export default function Contact() {
  return (
    <Box
      sx={{
        background: "linear-gradient(180deg, #000000 0%, #0A1628 100%)",
        px: { xs: 3, md: 8 },
        py: { xs: 8, md: 12 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* GLOW décoratif */}
      <Box
        sx={{
          position: "absolute",
          width: 500,
          height: 500,
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
        sx={{ textAlign: "center", mb: 8, position: "relative", zIndex: 1 }}
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
            CONTACT
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
              Contactez-nous
            </Typography>
          </Box>
        </Box>
      </MotionBox>

      {/* FORMULAIRE */}
      <MotionBox
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        sx={{
          position: "relative",
          zIndex: 1,
          maxWidth: 540,
          mx: "auto",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "16px",
          p: { xs: 3, md: 5 },
          backdropFilter: "blur(10px)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
        }}
      >
        {[
          { label: "Nom", multiline: false, rows: 1 },
          { label: "Téléphone", multiline: false, rows: 1 },
          { label: "Message", multiline: true, rows: 4 },
        ].map((field, index) => (
          <TextField
            key={field.label}
            fullWidth
            label={field.label}
            multiline={field.multiline}
            rows={field.multiline ? field.rows : undefined}
            margin="normal"
            sx={{
              "& .MuiOutlinedInput-root": {
                color: "#fff",
                borderRadius: "8px",
                "& fieldset": {
                  borderColor: "rgba(255,255,255,0.15)",
                },
                "&:hover fieldset": {
                  borderColor: "rgba(25,118,210,0.6)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#1976d2",
                },
              },
              "& .MuiInputLabel-root": {
                color: "rgba(255,255,255,0.45)",
                "&.Mui-focused": {
                  color: "#1976d2",
                },
              },
            }}
          />
        ))}

        <Button
          fullWidth
          variant="contained"
          startIcon={<PhoneIcon />}
          sx={{
            mt: 3,
            py: 1.5,
            borderRadius: "40px",
            background: "linear-gradient(90deg, #1565C0 0%, #1976d2 100%)",
            color: "#fff",
            fontWeight: 700,
            fontSize: "0.95rem",
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
          Envoyer
        </Button>
      </MotionBox>
    </Box>
  );
}