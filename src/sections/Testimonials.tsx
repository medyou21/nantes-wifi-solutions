import { Box, Card, CardContent, Rating, Stack, Typography } from "@mui/material";

const testimonials = [
  { name: "Sophie, Nantes", text: "Le diagnostic a identifié les zones mortes et le Wi-Fi couvre enfin toute la maison." },
  { name: "Karim, Rezé", text: "Installation claire et rapide, avec un réseau invité sécurisé pour notre commerce." },
  { name: "Claire, Saint-Herblain", text: "Conseils précis, tarif annoncé respecté et connexion beaucoup plus stable." },
];

/** Preuve sociale prévue par le cahier des charges. Les avis sont des exemples éditoriaux à remplacer par des avis vérifiés. */
export default function Testimonials() {
  return (
    <Box component="section" aria-labelledby="testimonials-title" sx={{ bgcolor: "#071224", px: { xs: 2, md: 8 }, py: 8 }}>
      <Typography id="testimonials-title" variant="h4" align="center" sx={{ color: "#fff", fontWeight: 800, mb: 1 }}>Ils nous font confiance</Typography>
      <Typography align="center" sx={{ color: "rgba(255,255,255,.65)", mb: 4 }}>Des interventions locales, expliquées simplement.</Typography>
      <Stack direction={{ xs: "column", md: "row" }} spacing={3} justifyContent="center">
        {testimonials.map((item) => (
          <Card key={item.name} sx={{ maxWidth: 360, flex: 1, bgcolor: "rgba(255,255,255,.06)", color: "#fff", border: "1px solid rgba(255,255,255,.1)" }}>
            <CardContent>
              <Rating value={5} readOnly aria-label="5 étoiles sur 5" sx={{ mb: 2 }} />
              <Typography component="blockquote" sx={{ lineHeight: 1.7, mb: 2 }}>« {item.text} »</Typography>
              <Typography sx={{ color: "#64B5F6", fontWeight: 700 }}>{item.name}</Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
      <Typography align="center" variant="caption" display="block" sx={{ color: "rgba(255,255,255,.4)", mt: 3 }}>Exemples de retours clients - à remplacer par des avis authentifiés avant mise en production.</Typography>
    </Box>
  );
}
