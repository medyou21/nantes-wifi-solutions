import { useState, useMemo, useCallback } from "react";
import {
  Box, Typography, Button, TextField,
  MenuItem, CircularProgress, Alert, Stack, Chip,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ContactsTable from "./ContactsTable";
import ContactDetailModal from "./ContactDetailModal";
import { useContacts } from "../../hooks/useContacts";
import type { Contact } from "../../hooks/useContacts";

const MotionBox = motion.create(Box);
// ─────────────────────────────────────────────
// CONSTANTES
// ─────────────────────────────────────────────
const SERVICE_OPTIONS = [
  { value: "diagnostic",   label: "Diagnostic Wi-Fi" },
  { value: "installation", label: "Installation Wi-Fi" },
  { value: "securite",     label: "Sécurité" },
  { value: "reseau",       label: "Réseau pro" },
  { value: "maintenance",  label: "Maintenance" },
] as const;

const SERVICE_MAP = Object.fromEntries(
  SERVICE_OPTIONS.map((s) => [s.value, s.label])
) as Record<string, string>;

const SERVICE_COLORS: Record<string, string> = {
  diagnostic:   "#2979FF",
  installation: "#00C853",
  securite:     "#FF6D00",
  reseau:       "#AA00FF",
  maintenance:  "#00B8D4",
};

const getServiceLabel = (value?: string) =>
  value ? SERVICE_MAP[value] ?? value : "-";

// ─────────────────────────────────────────────
// STAT CARD
// ─────────────────────────────────────────────
function StatCard({
  label, value, color, total,
}: {
  label: string;
  value: number;
  color: string;
  total: number;
}) {
  const pct = total > 0 ? Math.round((value / total) * 100) : 0;

  return (
    <Box sx={{
      px: 3, py: 2.5, borderRadius: 3, minWidth: 160, flex: "1 1 150px",
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.08)",
      position: "relative", overflow: "hidden",
    }}>
      <Box sx={{
        position: "absolute", bottom: 0, left: 0,
        width: `${pct}%`, height: 3,
        background: color,
        borderRadius: "0 2px 0 0",
        transition: "width 0.6s ease",
      }} />
      <Typography
        variant="caption"
       
        sx={{ color: "rgba(255,255,255,0.4)", display:"block", mb: 0.5, textTransform: "uppercase", letterSpacing: 1 }}
      >
        {label}
      </Typography>
      <Typography sx={{ color, fontSize: 28, fontWeight: 800, lineHeight: 1 }}>
        {value}
      </Typography>
      {total > 0 && (
        <Typography
  variant="caption"
  sx={{
    display: "block",
    color: "rgba(255,255,255,0.2)",
    mt: 0.5,
  }}
>
          {pct}% du total
        </Typography>
      )}
    </Box>
  );
}

// ─────────────────────────────────────────────
// DASHBOARD
// ─────────────────────────────────────────────
export default function Dashboard() {
  const { contacts, loading, error, refetch } = useContacts();
  const [filter, setFilter]                   = useState("");
  const [service, setService]                 = useState("");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const navigate = useNavigate();

  // ── Stats ──────────────────────────────────
  const stats = useMemo(() => ({
    total:        contacts.length,
    installation: contacts.filter((c) => c.service === "installation").length,
    diagnostic:   contacts.filter((c) => c.service === "diagnostic").length,
    securite:     contacts.filter((c) => c.service === "securite").length,
    maintenance:  contacts.filter((c) => c.service === "maintenance").length,
  }), [contacts]);

  // ── Filtre ─────────────────────────────────
  const filtered = useMemo(() =>
    contacts.filter((c) => {
      const q = filter.toLowerCase();
      return (
        (c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)) &&
        (service ? c.service === service : true)
      );
    }),
  [contacts, filter, service]);

  // ── Export CSV ─────────────────────────────
  const exportCSV = useCallback(() => {
    const header = "Nom,Email,Téléphone,Service,Date";
    const rows = filtered.map((c) =>
      [
        `"${c.name}"`,
        c.email,
        c.phone ?? "",
        getServiceLabel(c.service),
        new Date(c.createdAt).toLocaleDateString("fr-FR"),
      ].join(",")
    );
    const blob = new Blob([[header, ...rows].join("\n")], { type: "text/csv;charset=utf-8;" });
    const a = Object.assign(document.createElement("a"), {
      href: URL.createObjectURL(blob),
      download: `contacts_${new Date().toISOString().slice(0, 10)}.csv`,
    });
    a.click();
    URL.revokeObjectURL(a.href);
  }, [filtered]);

  // ── Row click ──────────────────────────────
  const handleRowClick = useCallback((row: any) => {
    const original = contacts.find((c) => c._id === row._id);
    if (original) setSelectedContact({ ...original, service: row.service });
  }, [contacts]);

  // ── Logout ─────────────────────────────────
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  }, [navigate]);

  // ─────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────
  return (
    <Box sx={{
      minHeight: "100vh",
      background: "linear-gradient(180deg,#000 0%,#0A1628 100%)",
      px: { xs: 2, md: 6 },
      py: 5,
    }}>

      {/* ── Header ──────────────────────────── */}
      <MotionBox
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        sx={{
          display: "flex", justifyContent: "space-between",
          alignItems: "flex-start", mb: 5, flexWrap: "wrap", gap: 2,
        }}
      >
        <Box>
          <Typography sx={{ color: "#fff", fontWeight: 800, fontSize: { xs: 22, md: 28 }, lineHeight: 1.2 }}>
            📊 Admin Dashboard
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "rgba(255,255,255,0.35)", mt: 0.5 }}
          >
            {loading
              ? "Chargement…"
              : `${stats.total} lead${stats.total > 1 ? "s" : ""} enregistré${stats.total > 1 ? "s" : ""}`
            }
          </Typography>
        </Box>

<Stack direction="row" spacing={1.5} sx={{ flexWrap: "wrap" }}>          {[
            { label: "↻ Actualiser", onClick: refetch,   color: "#2979FF" },
            { label: "⬇ Export CSV", onClick: exportCSV, color: "#00C853" },
            { label: "Déconnexion",  onClick: logout,     color: "#ff6b6b" },
          ].map(({ label, onClick, color }) => (
            <Button key={label} onClick={onClick} sx={{
              background: `${color}18`,
              border: `1px solid ${color}44`,
              color,
              textTransform: "none",
              borderRadius: 2,
              fontSize: 13,
              px: 2,
              "&:hover": { background: `${color}30` },
            }}>
              {label}
            </Button>
          ))}
        </Stack>
      </MotionBox>

      {/* ── Stats ───────────────────────────── */}
      <MotionBox
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Stack direction="row" spacing={2} sx={{ mb: 4, flexWrap: "wrap", gap: "16px !important" }}>
          <StatCard label="Total leads"  value={stats.total}        color="#fff"    total={stats.total} />
          <StatCard label="Installation" value={stats.installation} color="#00C853" total={stats.total} />
          <StatCard label="Diagnostic"   value={stats.diagnostic}   color="#2979FF" total={stats.total} />
          <StatCard label="Sécurité"     value={stats.securite}     color="#FF6D00" total={stats.total} />
          <StatCard label="Maintenance"  value={stats.maintenance}  color="#00B8D4" total={stats.total} />
        </Stack>
      </MotionBox>

      {/* ── Filtres ─────────────────────────── */}
      <MotionBox
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap", alignItems: "center" }}
      >
        <TextField
          placeholder="Rechercher par nom ou email…"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          size="small"
          sx={{
            width: 300,
            "& .MuiOutlinedInput-root": {
              background: "rgba(255,255,255,0.04)",
              borderRadius: 2,
              color: "#fff",
              "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
              "&:hover fieldset": { borderColor: "rgba(255,255,255,0.2)" },
              "&.Mui-focused fieldset": { borderColor: "#2979FF" },
            },
            "& input::placeholder": { color: "rgba(255,255,255,0.25)", fontSize: 13 },
          }}
        />

        <TextField
          select
          value={service}
          onChange={(e) => setService(e.target.value)}
          size="small"
           slotProps={{
    select: {
      displayEmpty: true,
    },
  }}
          sx={{
            width: 210,
            "& .MuiOutlinedInput-root": {
              background: "rgba(255,255,255,0.04)",
              borderRadius: 2,
              color: "#fff",
              "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
              "&:hover fieldset": { borderColor: "rgba(255,255,255,0.2)" },
              "&.Mui-focused fieldset": { borderColor: "#2979FF" },
            },
            "& .MuiSelect-icon": { color: "rgba(255,255,255,0.3)" },
          }}
        >
          <MenuItem value="">
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.4)" }}>
              Tous les services
            </Typography>
          </MenuItem>
          {SERVICE_OPTIONS.map((s) => (
            <MenuItem key={s.value} value={s.value}>
              <Chip
                size="small"
                label={s.label}
                sx={{
                  background: `${SERVICE_COLORS[s.value]}22`,
                  border: `1px solid ${SERVICE_COLORS[s.value]}44`,
                  color: SERVICE_COLORS[s.value],
                  fontWeight: 700, fontSize: 11, height: 20,
                }}
              />
            </MenuItem>
          ))}
        </TextField>

        {(filter || service) && (
          <Button
            onClick={() => { setFilter(""); setService(""); }}
            size="small"
            sx={{
              color: "rgba(255,255,255,0.3)",
              textTransform: "none", fontSize: 12,
              "&:hover": { color: "#fff" },
            }}
          >
            ✕ Réinitialiser
          </Button>
        )}

        <Typography
          variant="caption"
          sx={{ color: "rgba(255,255,255,0.2)", ml: "auto" }}
        >
          {filtered.length} résultat{filtered.length > 1 ? "s" : ""}
        </Typography>
      </MotionBox>

      {/* ── Erreur ──────────────────────────── */}
      {error && (
        <Alert
          severity="error"
          sx={{
            mb: 2,
            background: "rgba(255,80,80,0.1)",
            color: "#ff6b6b",
            border: "1px solid rgba(255,80,80,0.2)",
          }}
        >
          {error}
        </Alert>
      )}

      {/* ── Table avec effet carte ───────────── */}
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        sx={{
          borderRadius: 3,
          p: 2,
          minHeight: 300,
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.07)",
          "& .MuiDataGrid-row": {
            borderRadius: "10px !important",
            border: "1px solid rgba(255,255,255,0.06)",
            background: "rgba(255,255,255,0.02)",
            marginBottom: "6px",
            cursor: "pointer",
            transition: "all 0.2s ease !important",
            "&:hover": {
              background: "rgba(41,121,255,0.08) !important",
              border: "1px solid rgba(41,121,255,0.25) !important",
              transform: "translateY(-1px)",
              boxShadow: "0 4px 20px rgba(41,121,255,0.12)",
            },
          },
          "& .MuiDataGrid-row.Mui-selected": {
            background: "rgba(41,121,255,0.1) !important",
            border: "1px solid rgba(41,121,255,0.3) !important",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none !important",
            display: "flex",
            alignItems: "center",
          },
          "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": {
            outline: "none !important",
          },
          "& .MuiDataGrid-columnHeaders": {
            borderBottom: "1px solid rgba(255,255,255,0.06) !important",
            background: "transparent",
          },
          "& .MuiDataGrid-columnHeader": {
            fontSize: 11,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: 1,
          },
          "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within": {
            outline: "none !important",
          },
          "& .MuiDataGrid-columnSeparator": { display: "none" },
          "& .MuiDataGrid-virtualScroller": { mt: "4px !important" },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "1px solid rgba(255,255,255,0.06)",
            mt: 1,
          },
          "& .MuiDataGrid-root": { border: "none !important" },
        }}
      >
        {loading ? (
          <Box sx={{
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            py: 8, gap: 2,
          }}>
            <CircularProgress size={36} sx={{ color: "#2979FF" }} />
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.2)" }}>
              Chargement des contacts…
            </Typography>
          </Box>
        ) : filtered.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography sx={{ fontSize: 36, mb: 1 }}>🔍</Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.4)", fontWeight: 600, mb: 0.5 }}>
              Aucun contact trouvé
            </Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.2)" }}>
              {filter || service
                ? "Essayez de modifier vos filtres"
                : "Aucune donnée disponible"
              }
            </Typography>
          </Box>
        ) : (
          <ContactsTable
            contacts={filtered.map((c) => ({
              ...c,
              service: getServiceLabel(c.service),
            }))}
            onRowClick={handleRowClick}
          />
        )}
      </MotionBox>

      {/* ── Modal détail ────────────────────── */}
      <ContactDetailModal
        contact={selectedContact}
        onClose={() => setSelectedContact(null)}
      />
    </Box>
  );
}