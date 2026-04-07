
import {Grid, Box, Typography } from "@mui/material";
import PricingCard from "../components/PricingCard";

export default function Pricing() {
  return (
    <Box sx={{ p: 5, backgroundColor: "#f5f7fa" }}>
      <Typography
        variant="h4"
        sx={{ textAlign: "center", mb: 4 }}
      >
        Nos offres
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <PricingCard
            title="Basic"
            price="79€"
            features={["Diagnostic Wi-Fi", "Optimisation"]}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <PricingCard
            title="Confort"
            price="199€"
            features={["Diagnostic", "Installation", "Support"]}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <PricingCard
            title="Pro"
            price="499€"
            features={["Réseau complet", "Sécurité", "Monitoring"]}
          />
        </Grid>
      </Grid>
    </Box>
  );
}