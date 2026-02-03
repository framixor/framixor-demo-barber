import { listClients } from "./load";
import type { ClientSlug } from "./types";

export function resolveClientSlug(fallback: ClientSlug = "marriel" as ClientSlug) {
  const raw = import.meta.env.VITE_CLIENT;
  const candidate = typeof raw === "string" ? raw.trim() : "";

  // listClients() must always be safe; but we harden here anyway.
  const availableClients = listClients?.() ?? [];

  if (!Array.isArray(availableClients) || availableClients.length === 0) {
    return fallback;
  }

  if (!candidate) return fallback;

  // Accept only known slugs
  return (availableClients as string[]).includes(candidate) ? (candidate as ClientSlug) : fallback;
}
