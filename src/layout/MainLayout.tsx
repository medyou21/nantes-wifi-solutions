import { Box } from "@mui/material";
import Home from "../pages/Home";

// ─────────────────────────────────────────────
// LAYOUT PRINCIPAL
// ─────────────────────────────────────────────
// Ce composant sert de wrapper global pour la page Home
// (peut évoluer ensuite en layout avec Navbar/Footer)
export default function MainLayout() {

  return (
    // ─────────────────────────────────────────────
    // CONTAINER GLOBAL
    // ─────────────────────────────────────────────
    <Box
      sx={{
        width: "100%",        // prend toute la largeur écran
        overflowX: "hidden",  // évite scroll horizontal (UX clean)
      }}
    >

      {/* PAGE PRINCIPALE */}
      <Home />

    </Box>
  );
}