import { Box, Typography, Button } from "@mui/material";

export default function Hero() {
  return (
    <Box
      sx={{
        height: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        background: "linear-gradient(to right, #0A1F44, #007BFF)",
        color: "white",
        px: 2,
      }}
    >
      <Box>
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          Wi-Fi lent à Nantes ?
        </Typography>

        <Typography variant="h6" sx={{ mt: 2 }}>
          Diagnostic et optimisation rapide
        </Typography>

        <Button
          variant="contained"
          color="secondary"
          sx={{ mt: 4, px: 4, py: 1.5 }}
        >
          Obtenir un devis gratuit
        </Button>
      </Box>
    </Box>
  );
}