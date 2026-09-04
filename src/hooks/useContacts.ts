import { useState, useEffect, useCallback } from "react";
import API from "./../services/api";
import type { AxiosError } from "axios";

// ─────────────────────────────────────────────
// TYPE CONTACT (structure API backend)
// ─────────────────────────────────────────────
export type Contact = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  status?: "new" | "contacted" | "closed";
  createdAt: string;
};

// ─────────────────────────────────────────────
// HOOK CUSTOM : gestion contacts admin
// ─────────────────────────────────────────────
export function useContacts() {

  // liste des contacts récupérés API
  const [contacts, setContacts] = useState<Contact[]>([]);

  // état loading (UX admin dashboard)
  const [loading, setLoading] = useState(false);

  // gestion des erreurs API
  const [error, setError] = useState("");

  // ─────────────────────────────────────────────
  // FETCH CONTACTS (API CALL OPTIMISÉE)
  // useCallback pour éviter re-render inutile
  // ─────────────────────────────────────────────
  const fetchContacts = useCallback(async () => {

    setLoading(true);
    setError("");

    // AbortController = annulation requête si unmount
    const controller = new AbortController();

    try {
      // appel API backend admin
      const res = await API.get("/admin/contacts", {
        signal: controller.signal,
      });

      // stockage des données
      setContacts(res.data);

    } catch (err) {

      const e = err as AxiosError;

      // ignorer erreur si requête annulée volontairement
      if (e.code !== "ERR_CANCELED") {
        setError("Impossible de charger les contacts.");
      }

    } finally {
      setLoading(false);
    }

    // fonction cleanup (abort request)
    return () => controller.abort();

  }, []);

  // ─────────────────────────────────────────────
  // EFFECT : chargement automatique au mount
  // ─────────────────────────────────────────────
  useEffect(() => {

    // appel API
    const cancelPromise = fetchContacts();

    // cleanup du composant
    return () => {
      cancelPromise.then((fn) => fn?.());
    };

  }, [fetchContacts]);

  /** Met à jour le statut d'un contact via une route protégée par JWT. */
  const updateStatus = useCallback(async (
    id: string,
    status: "new" | "contacted" | "closed",
  ) => {
    const response = await API.patch(`/admin/contacts/${id}/status`, { status });
    setContacts((current) =>
      current.map((contact) => contact._id === id ? response.data : contact),
    );
  }, []);

  /** Supprime un contact, puis synchronise immédiatement l'interface. */
  const deleteContact = useCallback(async (id: string) => {
    await API.delete(`/admin/contacts/${id}`);
    setContacts((current) => current.filter((contact) => contact._id !== id));
  }, []);

  // ─────────────────────────────────────────────
  // RETURN HOOK (API propre réutilisable)
  // ─────────────────────────────────────────────
  return {
    contacts,   // data
    loading,    // état chargement
    error,      // message erreur
    refetch: fetchContacts, // reload manuel
    updateStatus,
    deleteContact,
  };
}
