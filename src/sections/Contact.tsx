import { Box, TextField, Button, Typography } from "@mui/material";

export default function Contact() {
  return (
    <Box sx={{ p: 5 }}>
      <Typography variant="h4" sx={{ textAlign: "center", mb: 3 }}>
        Contactez-nous
      </Typography>

      <Box sx={{ maxWidth: 500, mx: "auto" }}>
        <TextField fullWidth label="Nom" margin="normal" />
        <TextField fullWidth label="Téléphone" margin="normal" />
        <TextField
          fullWidth
          label="Message"
          multiline
          rows={4}
          margin="normal"
        />

        <Button variant="contained" fullWidth sx={{ mt: 2 }}>
          Envoyer
        </Button>
      </Box>
    </Box>
  );
}