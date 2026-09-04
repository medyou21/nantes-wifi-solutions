import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Button, Chip, MenuItem, Select, Stack } from "@mui/material";
import type { Contact } from "../../hooks/useContacts";

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

const formatDate = (value: any) => {
  if (!value) return "-";
  const d = new Date(value);
  if (isNaN(d.getTime())) return "-";
  return d.toLocaleString("fr-FR", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
};

// ─────────────────────────────────────────────
// PROPS
// ─────────────────────────────────────────────
type Props = {
  contacts: Contact[];
  onRowClick: (contact: Contact) => void;
  onStatusChange: (id: string, status: "new" | "contacted" | "closed") => void;
  onDelete: (id: string) => void;
};

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────
export default function ContactsTable({ contacts, onRowClick, onStatusChange, onDelete }: Props) {
  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Nom",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1.2,
    },
    {
      field: "phone",
      headerName: "Téléphone",
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <span>{params.value || "—"}</span>
      ),
    },
    {
      field: "service",
      headerName: "Service",
      flex: 1,
      renderCell: (params: GridRenderCellParams) => {
        const color = SERVICE_COLORS[params.value] ?? "#888";
        return (
          <Chip
            label={params.value || "—"}
            size="small"
            sx={{
              background: `${color}22`,
              border: `1px solid ${color}44`,
              color,
              fontWeight: 700,
              fontSize: 11,
              height: 22,
            }}
          />
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Date",
      flex: 1,
      valueFormatter: (value: any) => formatDate(value),
    },
    {
      field: "status",
      headerName: "Statut",
      flex: 1,
      sortable: false,
      renderCell: (params: GridRenderCellParams<Contact>) => (
        <Select
          size="small"
          value={params.row.status ?? "new"}
          onClick={(event) => event.stopPropagation()}
          onChange={(event) => onStatusChange(
            params.row._id,
            event.target.value as "new" | "contacted" | "closed",
          )}
          sx={{ minWidth: 120, height: 32 }}
        >
          <MenuItem value="new">Nouveau</MenuItem>
          <MenuItem value="contacted">Contacté</MenuItem>
          <MenuItem value="closed">Clôturé</MenuItem>
        </Select>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 115,
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams<Contact>) => (
        <Stack direction="row">
          <Button
            color="error"
            size="small"
            onClick={(event) => {
              event.stopPropagation();
              if (window.confirm("Supprimer définitivement ce contact ?")) {
                onDelete(params.row._id);
              }
            }}
          >
            Supprimer
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <DataGrid
      rows={contacts}
      columns={columns}
      getRowId={(row) => row._id}
      onRowClick={(params) => onRowClick(params.row)}
      pageSizeOptions={[10, 25, 50]}
      initialState={{
        pagination: { paginationModel: { pageSize: 10, page: 0 } },
      }}
      sx={{
        border: "none",
        "& .MuiDataGrid-row": {
          cursor: "pointer",
          borderRadius: "10px !important",
          border: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(255,255,255,0.02)",
          marginBottom: "6px",
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
        "& .MuiDataGrid-columnSeparator": {
          display: "none",
        },
        "& .MuiDataGrid-virtualScroller": {
          mt: "4px !important",
        },
        "& .MuiDataGrid-footerContainer": {
          borderTop: "1px solid rgba(255,255,255,0.06)",
          mt: 1,
        },
        "& .MuiDataGrid-root": {
          border: "none !important",
        },
      }}
    />
  );
}
