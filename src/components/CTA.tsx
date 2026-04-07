import { Box, Typography, Button } from "@mui/material";

const CTA = () => {
  return (
    <Box textAlign="center" py={6}>
      <Typography variant="h5" gutterBottom>
        Besoin d’un Wi-Fi rapide à Nantes ?
      </Typography>

      <Button variant="contained" color="primary">
        📞 06 12 34 56 78
      </Button>
    </Box>
  );
};

export default CTA;