// ─────────────────────────────────────────────
// IMPORTS
// ─────────────────────────────────────────────
import { useState, useMemo, useCallback } from "react";

import {
  Box,
  Typography,
  Button,
  Stack,
  TextField,
  MenuItem,
  Chip,
  InputAdornment,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import ContactsTable from "./ContactsTable";
import ContactDetailModal from "./ContactDetailModal";
import { useContacts } from "../../hooks/useContacts";

import type { Contact } from "../../hooks/useContacts";

/** Composant MUI Box enrichi des props d'animation Framer Motion. */
const MotionBox = motion(Box);

// ─────────────────────────────────────────────
// CONSTANTS — SERVICES
// ─────────────────────────────────────────────

/**
 * Correspondance clé normalisée → label affichable.
 * Utilisé pour transformer les valeurs brutes de la base
 * en libellés lisibles dans le tableau et l'export CSV.
 */
const SERVICE_MAP: Record<string, string> = {
  diagnostic:   "Diagnostic Wi-Fi",
  installation: "Installation Wi-Fi",
  securite:     "Sécurité",
  reseau:       "Réseau professionnel",
  maintenance:  "Maintenance",
};

/**
 * Couleur accent associée à chaque service.
 * Partagée entre les KPI cards et les Chips du filtre
 * pour garantir une cohérence visuelle globale.
 */
const SERVICE_COLORS: Record<string, string> = {
  diagnostic:   "#2979FF",
  installation: "#00C853",
  securite:     "#FF6D00",
  reseau:       "#AA00FF",
  maintenance:  "#00B8D4",
};

/**
 * Options du select "Type de service".
 * Séparées de SERVICE_MAP pour contrôler l'ordre d'affichage
 * et le libellé court affiché dans le filtre (vs. libellé long du tableau).
 */
const SERVICE_OPTIONS = [
  { value: "diagnostic",   label: "Diagnostic"  },
  { value: "installation", label: "Installation" },
  { value: "securite",     label: "Sécurité"    },
  { value: "reseau",       label: "Réseau pro"  },
  { value: "maintenance",  label: "Maintenance" },
];

// ─────────────────────────────────────────────
// UTILS
// ─────────────────────────────────────────────

/**
 * Normalise la valeur brute du champ `service` (telle que stockée en base)
 * vers une clé canonique correspondant aux entrées de SERVICE_MAP.
 *
 * Nécessaire car les données peuvent provenir de formulaires libres
 * ou d'anciennes versions de l'API avec des libellés différents.
 *
 * Stratégie : correspondance partielle insensible à la casse via `includes()`.
 * L'ordre des conditions importe — "professionnel" est testé après "reseau"
 * pour éviter des faux positifs.
 *
 * @param value - Valeur brute du service (ex: "Installation Wi-Fi", "install…")
 * @returns     Clé normalisée (ex: "installation") ou chaîne vide si absent
 */
const normalizeService = (value?: string): string => {
  if (!value) return "";

  const v = value.toLowerCase().trim();

  if (v.includes("diag"))                            return "diagnostic";
  if (v.includes("install"))                         return "installation";
  if (v.includes("secur"))                           return "securite";
  if (v.includes("reseau") || v.includes("professionnel")) return "reseau";
  if (v.includes("maint"))                           return "maintenance";

  // Aucune correspondance trouvée : retourne la valeur nettoyée telle quelle
  return v;
};

/**
 * Retourne le libellé lisible d'un service à partir de sa clé normalisée.
 * Repli sur la valeur brute si la clé est inconnue, ou "-" si absente.
 *
 * @param value - Clé normalisée (ex: "installation") ou valeur brute
 * @returns     Libellé affichable (ex: "Installation Wi-Fi") ou "-"
 */
const getServiceLabel = (value?: string): string =>
  value ? SERVICE_MAP[value] ?? value : "-";

// ─────────────────────────────────────────────
// SUB-COMPONENT : StatCard (KPI)
// ─────────────────────────────────────────────

/**
 * Carte KPI affichant une métrique chiffrée par service.
 *
 * Éléments visuels :
 *  - Valeur numérique large colorée selon le service.
 *  - Pourcentage du total en sous-titre.
 *  - Barre de progression horizontale en bas de carte
 *    dont la largeur reflète le ratio `value / total`.
 */
function StatCard({
  label,
  value,
  color,
  total,
}: {
  label: string;
  value: number;
  color: string;
  total: number;
}) {
  // Calcul du pourcentage — garde contre division par zéro si aucun contact
  const pct = total > 0 ? Math.round((value / total) * 100) : 0;

  return (
    <Box
      sx={{
        px: 3, py: 2.5,
        borderRadius: 3,
        minWidth: 160,
        flex: "1 1 150px",           // Flex-wrap responsive : s'adapte à la largeur disponible
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        position: "relative",
        overflow: "hidden",           // Nécessaire pour que la barre ne déborde pas
      }}
    >
      {/* Barre de progression en bas de carte — largeur = pct% */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0, left: 0,
          width: `${pct}%`,
          height: 3,
          background: color,
        }}
      />

      <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>
        {label}
      </Typography>

      {/* Valeur principale — grande et colorée pour une lecture immédiate */}
      <Typography sx={{ color, fontSize: 28, fontWeight: 800 }}>
        {value}
      </Typography>

      <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.25)" }}>
        {pct}% du total
      </Typography>
    </Box>
  );
}

// ─────────────────────────────────────────────
// MAIN COMPONENT : Dashboard
// ─────────────────────────────────────────────

/**
 * Interface d'administration des contacts/leads.
 *
 * Fonctionnalités :
 *  - Récupération des contacts via le hook `useContacts` (fetch + refetch).
 *  - Normalisation des services pour homogénéiser les données brutes de l'API.
 *  - KPI cards par service avec barres de progression proportionnelles.
 *  - Filtres combinés : recherche textuelle (nom/email) + filtre par service.
 *  - Export CSV de la sélection filtrée courante.
 *  - Ouverture d'une modale de détail au clic sur une ligne du tableau.
 *  - Déconnexion avec suppression du token JWT et redirection vers /admin/login.
 *
 * Optimisations :
 *  - `useMemo` sur la normalisation, les stats et les contacts filtrés
 *    pour éviter des recalculs inutiles à chaque rendu.
 *  - `useCallback` sur les handlers stables (rowClick, exportCSV)
 *    pour ne pas recréer les fonctions à chaque rendu.
 */
export default function Dashboard() {
  const { contacts, loading, refetch } = useContacts();

  // ── State local ───────────────────────────────────────────────────
  const [filter, setFilter]                   = useState("");           // Recherche texte libre
  const [service, setService]                 = useState("");           // Filtre service actif
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null); // Contact ouvert en modale

  const navigate = useNavigate();

  // ── Normalisation des données ─────────────────────────────────────
  /**
   * Transforme les services bruts de l'API en clés canoniques.
   * Mémoïsé : ne se recalcule que si `contacts` change.
   */
  const normalizedContacts = useMemo(
    () => contacts.map((c) => ({ ...c, service: normalizeService(c.service) })),
    [contacts]
  );

  // ── Calcul des KPIs ───────────────────────────────────────────────
  /**
   * Agrège les compteurs par service depuis les contacts normalisés.
   * Mémoïsé pour éviter 6 `.filter()` à chaque rendu.
   */
  const stats = useMemo(
    () => ({
      total:        normalizedContacts.length,
      installation: normalizedContacts.filter((c) => c.service === "installation").length,
      diagnostic:   normalizedContacts.filter((c) => c.service === "diagnostic").length,
      securite:     normalizedContacts.filter((c) => c.service === "securite").length,
      reseau:       normalizedContacts.filter((c) => c.service === "reseau").length,
      maintenance:  normalizedContacts.filter((c) => c.service === "maintenance").length,
    }),
    [normalizedContacts]
  );

  // ── Filtrage combiné ──────────────────────────────────────────────
  /**
   * Applique simultanément la recherche textuelle et le filtre service.
   * Les deux conditions sont cumulatives (ET logique).
   * Mémoïsé : se recalcule uniquement si les contacts, le texte ou le service changent.
   */
  const filtered = useMemo(
    () =>
      normalizedContacts.filter((c) => {
        const q = filter.toLowerCase();
        const matchesText = c.name?.toLowerCase().includes(q) || c.email?.toLowerCase().includes(q);
        const matchesService = service ? c.service === service : true;
        return matchesText && matchesService;
      }),
    [normalizedContacts, filter, service]
  );

  // ── Handlers ──────────────────────────────────────────────────────

  /** Ouvre la modale de détail pour le contact cliqué dans le tableau. */
  const handleRowClick = useCallback((row: Contact) => {
    setSelectedContact(row);
  }, []);

  /**
   * Génère et télécharge un fichier CSV depuis les contacts filtrés.
   *
   * Construit manuellement la chaîne CSV (header + lignes), crée un Blob,
   * génère une URL objet et déclenche le téléchargement via un <a> temporaire.
   * Seuls les contacts actuellement visibles (filtrés) sont exportés.
   */
  const exportCSV = useCallback(() => {
    const header = "Nom,Email,Téléphone,Service,Date";

    const rows = filtered.map((c) =>
      [
        `"${c.name}"`,                                          // Guillemets pour échapper les virgules dans les noms
        c.email,
        c.phone ?? "",
        getServiceLabel(c.service),
        new Date(c.createdAt).toLocaleDateString("fr-FR"),
      ].join(",")
    );

    const blob = new Blob([[header, ...rows].join("\n"), ], {
      type: "text/csv;charset=utf-8;",
    });

    // Crée un lien temporaire invisible, le clique programmatiquement, puis le libère
    const a = Object.assign(document.createElement("a"), {
      href: URL.createObjectURL(blob),
      download: "contacts.csv",
    });
    a.click();
  }, [filtered]);

  /** Supprime le JWT du localStorage et redirige vers la page de connexion. */
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  // ── Rendu ─────────────────────────────────────────────────────────
  return (
    <Box sx={{
      minHeight: "100vh",
      background: "linear-gradient(180deg,#000 0%,#0A1628 100%)",
      px: 4, py: 5,
    }}>

      {/* ── HEADER ─────────────────────────────────────────────────── */}
      <MotionBox>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 5 }}>
          <Box>
            <Typography sx={{ color: "#fff", fontSize: 28, fontWeight: 800 }}>
              📊 Admin Dashboard
            </Typography>
            {/* Affiche un indicateur de chargement ou le nombre total de contacts */}
            <Typography sx={{ color: "rgba(255,255,255,0.4)" }}>
              {loading ? "Chargement..." : `${stats.total} contacts`}
            </Typography>
          </Box>

          <Stack direction="row" spacing={2}>
            <Button onClick={refetch}>Refresh</Button>      {/* Recharge les contacts depuis l'API */}
            <Button onClick={exportCSV}>Export CSV</Button> {/* Exporte la sélection filtrée */}
            <Button onClick={logout} color="error">Logout</Button>
          </Stack>
        </Box>
      </MotionBox>

      {/* ── KPI CARDS ──────────────────────────────────────────────── */}
      {/* Une carte par service + une carte "Total" — flex-wrap pour le responsive */}
      <Stack direction="row" spacing={2} sx={{ mb: 4, flexWrap: "wrap" }}>
        <StatCard label="Total"        value={stats.total}        color="#fff"                       total={stats.total} />
        <StatCard label="Installation" value={stats.installation} color={SERVICE_COLORS.installation} total={stats.total} />
        <StatCard label="Diagnostic"   value={stats.diagnostic}   color={SERVICE_COLORS.diagnostic}   total={stats.total} />
        <StatCard label="Sécurité"     value={stats.securite}     color={SERVICE_COLORS.securite}     total={stats.total} />
        <StatCard label="Réseau"       value={stats.reseau}       color={SERVICE_COLORS.reseau}       total={stats.total} />
        <StatCard label="Maintenance"  value={stats.maintenance}  color={SERVICE_COLORS.maintenance}  total={stats.total} />
      </Stack>

      {/* ── BARRE DE FILTRES ───────────────────────────────────────── */}
      <MotionBox
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        sx={{
          display: "flex", gap: 2, mb: 3,
          flexWrap: "wrap", alignItems: "center",
          p: 2, borderRadius: 3,
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(10px)",
        }}
      >
        {/* Recherche textuelle — filtre sur nom ET email simultanément */}
        <TextField
          placeholder="Rechercher nom ou email..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "rgba(255,255,255,0.4)" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            width: 340,
            "& .MuiOutlinedInput-root": {
              background: "rgba(255,255,255,0.06)",
              borderRadius: 2, color: "#EAF0FF",
              "& fieldset": { borderColor: "rgba(255,255,255,0.12)" },
              "&:hover fieldset": { borderColor: "rgba(255,255,255,0.25)" },
              "&.Mui-focused fieldset": {
                borderColor: "#2979FF",
                boxShadow: "0 0 0 2px rgba(41,121,255,0.15)",
              },
            },
            "& input": { color: "#EAF0FF" },
            "& input::placeholder": { color: "rgba(234,240,255,0.35)" },
          }}
        />

        {/* Filtre par service — valeur vide = "Tous les services" (pas de filtre actif) */}
        <TextField
          select
          value={service}
          onChange={(e) => setService(e.target.value)}
          size="small"
          sx={{
            width: 230,
            "& .MuiOutlinedInput-root": {
              background: "rgba(255,255,255,0.06)",
              borderRadius: 2, color: "#EAF0FF",
              "& fieldset": { borderColor: "rgba(255,255,255,0.12)" },
              "&:hover fieldset": { borderColor: "rgba(255,255,255,0.25)" },
              "&.Mui-focused fieldset": {
                borderColor: "#00C853",
                boxShadow: "0 0 0 2px rgba(0,200,83,0.15)",
              },
            },
            "& .MuiSelect-icon": { color: "rgba(255,255,255,0.4)" },
          }}
        >
          {/* Option de réinitialisation du filtre service */}
          <MenuItem value="">Tous les services</MenuItem>

          {/* Chaque option affiche un Chip coloré avec la couleur du service */}
          {SERVICE_OPTIONS.map((s) => (
            <MenuItem key={s.value} value={s.value}>
              <Chip
                size="small"
                label={s.label}
                sx={{
                  background: `${SERVICE_COLORS[s.value]}22`, // Fond très transparent (alpha 0x22)
                  border: `1px solid ${SERVICE_COLORS[s.value]}44`,
                  color: SERVICE_COLORS[s.value],
                  fontWeight: 700,
                }}
              />
            </MenuItem>
          ))}
        </TextField>

        {/* Compteur de résultats — mis à jour en temps réel avec les filtres actifs */}
        <Typography sx={{ color: "rgba(255,255,255,0.3)", ml: "auto" }}>
          {filtered.length} résultat(s)
        </Typography>
      </MotionBox>

      {/* ── TABLEAU ────────────────────────────────────────────────── */}
      {/*
       * Les services sont re-traduits en libellés lisibles via `getServiceLabel`
       * juste avant de passer au tableau — les données internes restent normalisées.
       * Séparation claire : logique de normalisation interne / affichage externe.
       */}
      <ContactsTable
        contacts={filtered.map((c) => ({ ...c, service: getServiceLabel(c.service) }))}
        onRowClick={handleRowClick}
      />

      {/* ── MODALE DE DÉTAIL ───────────────────────────────────────── */}
      {/* `selectedContact = null` ferme la modale sans détruire le composant */}
      <ContactDetailModal
        contact={selectedContact}
        onClose={() => setSelectedContact(null)}
      />
    </Box>
  );
}