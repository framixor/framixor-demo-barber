import type {
  ClientBusinessContract,
  ClientSlug,
  ClientThemeContract,
} from "./types";

/**
 * V1: file-based contracts.
 * Later you can swap this loader to fetch remote JSON, but the call sites don't change.
 *
 * IMPORTANT:
 * - Keep imports explicit (no dynamic import path tricks yet).
 * - Add new clients by adding new imports and mapping below.
 */

// --- Client: marriel (local json) ---
import marrielBusiness from "./clients/marriel/business.json";
import marrielTheme from "./clients/marriel/theme.json";

const BUSINESS_BY_CLIENT: Record<ClientSlug, ClientBusinessContract> = {
  marriel: marrielBusiness as ClientBusinessContract,
};

const THEME_BY_CLIENT: Record<ClientSlug, ClientThemeContract> = {
  marriel: marrielTheme as ClientThemeContract,
};

export function getClientBusiness(client: ClientSlug): ClientBusinessContract {
  const found = BUSINESS_BY_CLIENT[client];
  if (!found) {
    throw new Error(`Unknown client (business): ${client}`);
  }
  return found;
}

export function getClientTheme(client: ClientSlug): ClientThemeContract {
  const found = THEME_BY_CLIENT[client];
  if (!found) {
    throw new Error(`Unknown client (theme): ${client}`);
  }
  return found;
}

/**
 * Optional helper: list clients you have wired in code.
 */
export function listClients(): ClientSlug[] {
  return Object.keys(BUSINESS_BY_CLIENT);
}
