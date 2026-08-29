import {
  Dialog, DialogContent, Box, Typography,
  IconButton, Chip, Divider, Stack,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import BuildIcon from "@mui/icons-material/Build";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import MessageIcon from "@mui/icons-material/Message";

// ─────────────────────────────────────────────
// TYPE CONTACT (structure API backend)
// ─────────────────────────────────────────────
type Contact = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  createdAt: string;
};

// ─────────────────────────────────────────────
// PROPS DU MODAL
// ─────────────────────────────────────────────
type Props = {
  contact: Contact | null; // contact sélectionné
  onClose: () => void;     // fermeture modal
};

// ─────────────────────────────────────────────
// COULEURS PAR SERVICE (UX VISUELLE ADMIN)
// ─────────────────────────────────────────────
const SERVICE_COLORS: Record<string, string> = {
  "Diagnostic Wi-Fi": "#2979FF",
  "Installation Wi-Fi": "#00C853",
  "Sécurité": "#FF6D00",
  "Réseau pro": "#AA00FF",
  "Maintenance": "#00B8D4",
};

// ─────────────────────────────────────────────
// COMPOSANT REUTILISABLE : LIGNE INFO
// ─────────────────────────────────────────────
function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>

      {/* ICÔNE */}
      <Box
        sx={{
          mt: 0.25,
          color: "rgba(255,255,255,0.35)",
          minWidth: 20,
          display: "flex",
          alignItems: "center",
        }}
      >
        {icon}
      </Box>

      {/* CONTENU TEXTE */}
      <Box sx={{ flex: 1 }}>

        {/* LABEL (petit titre champ) */}
        <Typography
          variant="caption"
          sx={{
            display: "block",
            color: "rgba(255,255,255,0.35)",
            fontSize: 11,
            mb: 0.25,
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          {label}
        </Typography>

        {/* VALEUR */}
        <Box sx={{ color: "#fff", fontSize: 14, wordBreak: "break-word" }}>
          {value}
        </Box>

      </Box>
    </Box>
  );
}

// ─────────────────────────────────────────────
// MODAL DETAIL CONTACT (ADMIN DASHBOARD)
// ─────────────────────────────────────────────
export default function ContactDetailModal({
  contact,
  onClose,
}: Props) {

  // si aucun contact sélectionné → ne rien afficher
  if (!contact) return null;

  // couleur dynamique selon service
  const serviceColor =
    contact.service ? SERVICE_COLORS[contact.service] ?? "#888" : "#888";

  // format date FR
  const formattedDate = new Date(contact.createdAt).toLocaleString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // initiales user (avatar fallback)
  const initials = contact.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <Dialog
      open={Boolean(contact)}
      onClose={onClose}
      maxWidth="sm"
      fullWidth

      // style modal SaaS dark admin
      slotProps={{
        paper: {
          sx: {
            background: "linear-gradient(160deg, #0d1b2e 0%, #0a1220 100%)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 4,
            boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
            overflow: "hidden",
          },
        },
      }}
    >
      <DialogContent sx={{ p: 0 }}>

        {/* ─────────────────────────────
            HEADER (IDENTITÉ CONTACT)
        ───────────────────────────── */}
        <Box
          sx={{
            position: "relative",
            px: 4,
            pt: 4,
            pb: 3,

            // fond gradient basé sur service
            background: `linear-gradient(135deg, ${serviceColor}22 0%, transparent 100%)`,

            borderBottom: `1px solid ${serviceColor}33`,
          }}
        >

          {/* bouton fermer modal */}
          <IconButton
            onClick={onClose}
            size="small"
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              color: "rgba(255,255,255,0.4)",
              "&:hover": {
                color: "#fff",
                background: "rgba(255,255,255,0.08)",
              },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>

          {/* bloc identité */}
          <Stack direction="row" spacing={2.5} alignItems="center">

            {/* avatar initiales */}
            <Box
              sx={{
                width: 52,
                height: 52,
                borderRadius: "14px",
                flexShrink: 0,

                background: `linear-gradient(135deg, ${serviceColor}66, ${serviceColor}33)`,

                border: `1px solid ${serviceColor}55`,

                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                fontWeight: 800,
                fontSize: 18,
                color: "#fff",
              }}
            >
              {initials}
            </Box>

            {/* nom + service */}
            <Box>
              <Typography sx={{ color: "#fff", fontWeight: 800, fontSize: 18 }}>
                {contact.name}
              </Typography>

              <Chip
                label={contact.service ?? "—"}
                size="small"
                sx={{
                  mt: 0.75,
                  background: `${serviceColor}22`,
                  border: `1px solid ${serviceColor}55`,
                  color: serviceColor,
                  fontWeight: 700,
                  fontSize: 11,
                  height: 20,
                }}
              />
            </Box>
          </Stack>
        </Box>

        {/* ─────────────────────────────
            INFOS CONTACT
        ───────────────────────────── */}
        <Box sx={{ px: 4, py: 3 }}>
          <Stack spacing={2.5}>

            {/* EMAIL */}
            <InfoRow
              icon={<EmailIcon sx={{ fontSize: 16 }} />}
              label="Email"
              value={
                <Box
                  component="a"
                  href={`mailto:${contact.email}`}
                  sx={{
                    color: "#2979FF",
                    textDecoration: "none",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  {contact.email}
                </Box>
              }
            />

            {/* TELEPHONE */}
            <InfoRow
              icon={<PhoneIcon sx={{ fontSize: 16 }} />}
              label="Téléphone"
              value={
                contact.phone ? (
                  <Box
                    component="a"
                    href={`tel:${contact.phone}`}
                    sx={{
                      color: "#00C853",
                      textDecoration: "none",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    {contact.phone}
                  </Box>
                ) : (
                  <Box sx={{ color: "rgba(255,255,255,0.25)" }}>
                    Non renseigné
                  </Box>
                )
              }
            />

            {/* SERVICE */}
            <InfoRow
              icon={<BuildIcon sx={{ fontSize: 16 }} />}
              label="Service"
              value={contact.service ?? "—"}
            />

            {/* DATE */}
            <InfoRow
              icon={<CalendarTodayIcon sx={{ fontSize: 16 }} />}
              label="Reçu le"
              value={formattedDate}
            />

            <Divider sx={{ borderColor: "rgba(255,255,255,0.06)" }} />

            {/* MESSAGE */}
            <InfoRow
              icon={<MessageIcon sx={{ fontSize: 16 }} />}
              label="Message"
              value={
                <Box
                  sx={{
                    color: "rgba(255,255,255,0.75)",
                    lineHeight: 1.7,
                    whiteSpace: "pre-wrap",

                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 2,
                    p: 1.5,
                  }}
                >
                  {contact.message}
                </Box>
              }
            />

          </Stack>
        </Box>

      </DialogContent>
    </Dialog>
  );
}