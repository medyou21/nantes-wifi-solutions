//import Grid from "@mui/material/Grid2"; // <-- important
import {Grid, Box, Typography } from "@mui/material";
import ServiceCard from "../components/ServiceCard";

export default function Services() {
  return (
    <Box sx={{ p: 5 }}>
      <Typography variant="h4" sx={{ textAlign: "center", mb: 4 }}>
        Des solutions Wi-Fi adaptées
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <ServiceCard
            title="Diagnostic Wi-Fi"
            description="Analyse complète de votre réseau"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <ServiceCard
            title="Installation Wi-Fi"
            description="Mise en place optimale"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <ServiceCard
            title="Sécurité & Surveillance"
            description="Protection de votre réseau"
          />
        </Grid>
      </Grid>
    </Box>
  );
}