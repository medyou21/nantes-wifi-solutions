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
// TYPES
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

type Props = {
  contact: Contact | null;
  onClose: () => void;
};

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────
const SERVICE_COLORS: Record<string, string> = {
  "Diagnostic Wi-Fi":   "#2979FF",
  "Installation Wi-Fi": "#00C853",
  "Sécurité":           "#FF6D00",
  "Réseau pro":         "#AA00FF",
  "Maintenance":        "#00B8D4",
};

// ─────────────────────────────────────────────
// INFO ROW
// ─────────────────────────────────────────────
function InfoRow({
  icon, label, value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
      <Box sx={{
        mt: 0.25,
        color: "rgba(255,255,255,0.35)",
        display: "flex",
        alignItems: "center",
        minWidth: 20,
      }}>
        {icon}
      </Box>
      <Box sx={{ flex: 1 }}>
        {/* ✅ variant="caption" → rend un <span>, pas un <p> */}
        <Typography
  variant="caption"
  sx={{
    display: "block",   // ✅ dans sx
    color: "rgba(255,255,255,0.35)",
    fontSize: 11, mb: 0.25,
    textTransform: "uppercase",
    letterSpacing: 1,
  }}
>
          {label}
        </Typography>
        {/* ✅ Box neutre → accepte n'importe quel enfant sans conflit HTML */}
        <Box sx={{ color: "#fff", fontSize: 14, wordBreak: "break-word" }}>
          {value}
        </Box>
      </Box>
    </Box>
  );
}

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────
export default function ContactDetailModal({ contact, onClose }: Props) {
  if (!contact) return null;

  const serviceColor = contact.service
    ? SERVICE_COLORS[contact.service] ?? "#888"
    : "#888";

  const formattedDate = new Date(contact.createdAt).toLocaleString("fr-FR", {
    day: "2-digit", month: "long", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });

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

        {/* ── Header ──────────────────────────── */}
        <Box sx={{
          position: "relative",
          px: 4, pt: 4, pb: 3,
          background: `linear-gradient(135deg, ${serviceColor}22 0%, transparent 100%)`,
          borderBottom: `1px solid ${serviceColor}33`,
        }}>
          <IconButton
            onClick={onClose}
            size="small"
            sx={{
              position: "absolute", top: 16, right: 16,
              color: "rgba(255,255,255,0.4)",
              "&:hover": { color: "#fff", background: "rgba(255,255,255,0.08)" },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>

          <Stack direction="row" spacing={2.5} sx={{ alignItems: "center" }}>
            <Box sx={{
              width: 52, height: 52, borderRadius: "14px", flexShrink: 0,
              background: `linear-gradient(135deg, ${serviceColor}66, ${serviceColor}33)`,
              border: `1px solid ${serviceColor}55`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 800, fontSize: 18, color: "#fff",
            }}>
              {initials}
            </Box>
            <Box>
              <Typography sx={{
                color: "#fff", fontWeight: 800, fontSize: 18, lineHeight: 1.2,
              }}>
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
                  fontWeight: 700, fontSize: 11, height: 20,
                }}
              />
            </Box>
          </Stack>
        </Box>

        {/* ── Infos ───────────────────────────── */}
        <Box sx={{ px: 4, py: 3 }}>
          <Stack spacing={2.5}>

            <InfoRow
              icon={<EmailIcon sx={{ fontSize: 16 }} />}
              label="Email"
              value={
                <Box
                  component="a"
                  href={`mailto:${contact.email}`}
                  sx={{
                    color: "#2979FF", textDecoration: "none", fontSize: 14,
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  {contact.email}
                </Box>
              }
            />

            <InfoRow
              icon={<PhoneIcon sx={{ fontSize: 16 }} />}
              label="Téléphone"
              value={
                contact.phone ? (
                  <Box
                    component="a"
                    href={`tel:${contact.phone}`}
                    sx={{
                      color: "#00C853", textDecoration: "none", fontSize: 14,
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    {contact.phone}
                  </Box>
                ) : (
                  <Box sx={{ color: "rgba(255,255,255,0.25)", fontSize: 14 }}>
                    Non renseigné
                  </Box>
                )
              }
            />

            <InfoRow
              icon={<BuildIcon sx={{ fontSize: 16 }} />}
              label="Service demandé"
              value={
                <Box sx={{ fontSize: 14, color: "#fff" }}>
                  {contact.service ?? "—"}
                </Box>
              }
            />

            <InfoRow
              icon={<CalendarTodayIcon sx={{ fontSize: 16 }} />}
              label="Reçu le"
              value={
                <Box sx={{ fontSize: 14, color: "#fff" }}>
                  {formattedDate}
                </Box>
              }
            />

            <Divider sx={{ borderColor: "rgba(255,255,255,0.06)" }} />

            <InfoRow
              icon={<MessageIcon sx={{ fontSize: 16 }} />}
              label="Message"
              value={
                // ✅ Box au lieu de Typography → pas de <p> imbriqué
                <Box sx={{
                  color: "rgba(255,255,255,0.75)",
                  fontSize: 14,
                  lineHeight: 1.7,
                  whiteSpace: "pre-wrap",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 2,
                  p: 1.5,
                  mt: 0.5,
                }}>
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