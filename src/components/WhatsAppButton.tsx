import { Fab, Tooltip } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

/** CTA flottant demandé au cahier des charges, masqué si aucun numéro n'est configuré. */
export default function WhatsAppButton() {
  const configured = import.meta.env.VITE_WHATSAPP_NUMBER || import.meta.env.VITE_PHONE;
  const number = configured?.replace(/\D/g, "");
  if (!number) return null;

  const message = encodeURIComponent("Bonjour, je souhaite obtenir un devis Wi-Fi gratuit.");
  return (
    <Tooltip title="Demander un devis sur WhatsApp" placement="left">
      <Fab
        component="a"
        href={`https://wa.me/${number}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contacter Nantes WiFi Solutions sur WhatsApp"
        sx={{ position: "fixed", right: 22, bottom: 22, zIndex: 1300, bgcolor: "#25D366", color: "#fff", "&:hover": { bgcolor: "#1DA851" } }}
      >
        <WhatsAppIcon />
      </Fab>
    </Tooltip>
  );
}
