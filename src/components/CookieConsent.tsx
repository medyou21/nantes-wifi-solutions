import { useEffect, useState } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import {
  GOOGLE_CONSENT_STORAGE_KEY,
  updateGoogleConsent,
} from "../seo/GoogleAnalytics";

type ConsentChoice = "granted" | "denied";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(localStorage.getItem(GOOGLE_CONSENT_STORAGE_KEY) === null);
  }, []);

  const saveChoice = (choice: ConsentChoice) => {
    localStorage.setItem(GOOGLE_CONSENT_STORAGE_KEY, choice);
    updateGoogleConsent(choice === "granted");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <Paper
      role="dialog"
      aria-live="polite"
      aria-label="Préférences de confidentialité"
      elevation={12}
      sx={{
        position: "fixed",
        zIndex: 1600,
        left: { xs: 12, md: 24 },
        right: { xs: 12, md: "auto" },
        bottom: { xs: 12, md: 24 },
        width: { md: 460 },
        maxWidth: "calc(100vw - 24px)",
        p: 2.5,
        borderRadius: 3,
        color: "#fff",
        background: "#0A1628",
        border: "1px solid rgba(255,255,255,0.16)",
      }}
    >
      <Typography variant="h6" component="h2" fontWeight={800}>
        Vos préférences de confidentialité
      </Typography>
      <Typography sx={{ mt: 1, color: "rgba(255,255,255,0.72)", lineHeight: 1.6 }}>
        Avec votre accord, nous utilisons Google Analytics et Google Ads pour
        mesurer les visites et améliorer nos campagnes. Vous pouvez refuser sans
        perdre l’accès au site.
      </Typography>
      <Box sx={{ display: "flex", gap: 1.5, mt: 2.5, flexWrap: "wrap" }}>
        <Button
          variant="contained"
          onClick={() => saveChoice("granted")}
          sx={{ textTransform: "none", fontWeight: 700 }}
        >
          Tout accepter
        </Button>
        <Button
          variant="outlined"
          onClick={() => saveChoice("denied")}
          sx={{
            textTransform: "none",
            color: "#fff",
            borderColor: "rgba(255,255,255,0.45)",
          }}
        >
          Refuser
        </Button>
        <Button
          href="/confidentialite"
          sx={{ textTransform: "none", color: "rgba(255,255,255,0.75)" }}
        >
          En savoir plus
        </Button>
      </Box>
    </Paper>
  );
}
