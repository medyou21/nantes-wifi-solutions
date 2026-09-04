import { useCallback, useEffect, useState } from "react";
import { Box, Button, Checkbox, FormControlLabel, Stack, TextField, Typography } from "@mui/material";
import API from "../../services/api";

type Offer = {
  id: number;
  title: string;
  price: number;
  description: string;
  features: string[];
  highlighted: boolean;
  active: boolean;
  displayOrder: number;
  service: { slug: string; name: string };
  updatedAt: string;
};

type Draft = Omit<Offer, "id" | "service" | "updatedAt"> & { serviceSlug: string };

const emptyDraft: Draft = {
  title: "", price: 79, description: "", features: ["Diagnostic Wi-Fi"],
  highlighted: false, active: true, displayOrder: 0, serviceSlug: "diagnostic",
};

function toDraft(offer: Offer): Draft {
  return {
    title: offer.title,
    price: offer.price,
    description: offer.description,
    features: offer.features,
    highlighted: offer.highlighted,
    active: offer.active,
    displayOrder: offer.displayOrder,
    serviceSlug: offer.service.slug,
  };
}

type EditorProps = { initial: Draft; submitLabel: string; onSubmit: (draft: Draft) => Promise<void>; onDelete?: () => Promise<void> };

function OfferEditor({ initial, submitLabel, onSubmit, onDelete }: EditorProps) {
  const [draft, setDraft] = useState(initial);
  const [busy, setBusy] = useState(false);
  const set = <K extends keyof Draft,>(key: K, value: Draft[K]) => setDraft((current) => ({ ...current, [key]: value }));

  const submit = async () => {
    setBusy(true);
    try { await onSubmit(draft); } finally { setBusy(false); }
  };

  return (
    <Box sx={{ p: 2, borderRadius: 2, border: "1px solid rgba(255,255,255,.12)", bgcolor: "rgba(255,255,255,.04)" }}>
      <Stack direction={{ xs: "column", md: "row" }} spacing={2} flexWrap="wrap">
        <TextField label="Titre" value={draft.title} onChange={(e) => set("title", e.target.value)} />
        <TextField label="Prix (€)" type="number" value={draft.price} onChange={(e) => set("price", Number(e.target.value))} />
        <TextField label="Service (slug)" value={draft.serviceSlug} onChange={(e) => set("serviceSlug", e.target.value)} />
        <TextField label="Ordre" type="number" value={draft.displayOrder} onChange={(e) => set("displayOrder", Number(e.target.value))} />
      </Stack>
      <TextField fullWidth label="Description" value={draft.description} onChange={(e) => set("description", e.target.value)} sx={{ mt: 2 }} />
      <TextField fullWidth label="Fonctionnalités (séparées par des virgules)" value={draft.features.join(", ")} onChange={(e) => set("features", e.target.value.split(",").map((v) => v.trim()).filter(Boolean))} sx={{ mt: 2 }} />
      <Stack direction={{ xs: "column", sm: "row" }} alignItems="center" spacing={2} sx={{ mt: 1 }}>
        <FormControlLabel control={<Checkbox checked={draft.active} onChange={(e) => set("active", e.target.checked)} />} label="Visible" />
        <FormControlLabel control={<Checkbox checked={draft.highlighted} onChange={(e) => set("highlighted", e.target.checked)} />} label="Mise en avant" />
        <Button variant="contained" disabled={busy} onClick={submit}>{submitLabel}</Button>
        {onDelete && <Button color="error" disabled={busy} onClick={() => window.confirm("Supprimer cette offre ?") && onDelete()}>Supprimer</Button>}
      </Stack>
    </Box>
  );
}

/** Interface CRUD PostgreSQL : preuves CREATE, READ, UPDATE et DELETE pour le jury. */
export default function OffersManager() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [error, setError] = useState("");
  const load = useCallback(async () => {
    try { setOffers((await API.get<Offer[]>("/offers/admin")).data); setError(""); }
    catch { setError("Impossible de charger les offres."); }
  }, []);
  useEffect(() => { void load(); }, [load]);

  const create = async (draft: Draft) => { await API.post("/offers/admin", draft); await load(); };
  const update = async (id: number, draft: Draft) => { await API.put(`/offers/admin/${id}`, draft); await load(); };
  const remove = async (id: number) => { await API.delete(`/offers/admin/${id}`); await load(); };

  return (
    <Box component="section" sx={{ mt: 6, color: "#fff" }}>
      <Typography variant="h5" fontWeight={800} mb={2}>Gestion des offres PostgreSQL</Typography>
      {error && <Typography color="error" mb={2}>{error}</Typography>}
      <Stack spacing={2}>
        {offers.map((offer) => <OfferEditor key={`${offer.id}-${offer.updatedAt ?? ""}`} initial={toDraft(offer)} submitLabel="Enregistrer" onSubmit={(draft) => update(offer.id, draft)} onDelete={() => remove(offer.id)} />)}
      </Stack>
      <Typography variant="h6" fontWeight={700} mt={4} mb={2}>Ajouter une offre</Typography>
      <OfferEditor initial={emptyDraft} submitLabel="Créer" onSubmit={create} />
    </Box>
  );
}
