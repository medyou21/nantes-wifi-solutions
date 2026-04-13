// Filters.tsx
import { TextField, MenuItem } from "@mui/material";

export default function Filters({ setFilter }: any) {
  return (
    <>
      <TextField
        label="Recherche"
        onChange={(e) => setFilter(e.target.value)}
      />

      <TextField
        select
        label="Service"
        onChange={(e) => setFilter(e.target.value)}
      >
        <MenuItem value="">Tous</MenuItem>
        <MenuItem value="diagnostic">Diagnostic</MenuItem>
        <MenuItem value="installation">Installation</MenuItem>
      </TextField>
    </>
  );
}