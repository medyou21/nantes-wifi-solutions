import { TextField, MenuItem, Stack } from "@mui/material";
import { useEffect, useState } from "react";


// ─────────────────────────────────────────────
// TYPES PROPS
// ─────────────────────────────────────────────
type Props = {
  setSearch: (value: string) => void;
  setService: (value: string) => void;
};


// ─────────────────────────────────────────────
// SERVICES (SOURCE UNIQUE)
// ─────────────────────────────────────────────
const SERVICE_OPTIONS = [
  { value: "", label: "Tous" },
  { value: "diagnostic", label: "Diagnostic Wi-Fi" },
  { value: "installation", label: "Installation Wi-Fi" },
  { value: "securite", label: "Sécurité" },
  { value: "reseau", label: "Réseau professionnel" }, // ✅ FIX ICI
  { value: "maintenance", label: "Maintenance" },
];


// ─────────────────────────────────────────────
// COMPONENT FILTERS
// ─────────────────────────────────────────────
export default function Filters({ setSearch, setService }: Props) {

  // état local pour debounce search
  const [searchValue, setSearchValue] = useState("");

  // ─────────────────────────────
  // DEBOUNCE SEARCH (300ms)
  // ─────────────────────────────
  useEffect(() => {
    const t = setTimeout(() => {
      setSearch(searchValue);
    }, 300);

    return () => clearTimeout(t);
  }, [searchValue, setSearch]);


  return (
    <Stack direction="row" spacing={2} sx={{ mb: 2 }}>

      {/* ───────────── SEARCH ───────────── */}
      <TextField
        label="Recherche"
        size="small"
        fullWidth
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />


      {/* ───────────── SERVICE FILTER ───────────── */}
      <TextField
        select
        label="Service"
        size="small"
        fullWidth
        defaultValue=""
        onChange={(e) => setService(e.target.value)}
      >
        {SERVICE_OPTIONS.map((s) => (
          <MenuItem key={s.value} value={s.value}>
            {s.label}
          </MenuItem>
        ))}
      </TextField>

    </Stack>
  );
}