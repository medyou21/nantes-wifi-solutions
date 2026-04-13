import { useState, useEffect, useCallback } from "react";
import API from "./../services/api";
import type { AxiosError } from "axios";

export type Contact = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  createdAt: string;
};

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    setError("");

    const controller = new AbortController(); // ✅ cleanup si unmount

    try {
      const res = await API.get("/admin/contacts", {
        signal: controller.signal,
      });
      setContacts(res.data);
    } catch (err) {
      const e = err as AxiosError;
      if (e.code !== "ERR_CANCELED") {
        setError("Impossible de charger les contacts.");
      }
    } finally {
      setLoading(false);
    }

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const cancel = fetchContacts();
    return () => {
      cancel.then((fn) => fn?.());
    };
  }, [fetchContacts]);

  return { contacts, loading, error, refetch: fetchContacts };
}