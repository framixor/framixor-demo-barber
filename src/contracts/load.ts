import type {
  ClientBusinessContract,
  ClientSlug,
  ClientThemeContract,
  ThemePresetName,
} from "./types";

/**
 * V1: file-based contracts.
 * Later you can swap this loader to fetch remote JSON, but the call sites don't change.
 *
 * IMPORTANT:
 * - Imports are explicit (no dynamic paths).
 * - Business is client-owned.
 * - Theme is BOILERPLATE-owned (preset-based).
 */

// -----------------------------
// Clients (business contracts)
// -----------------------------
import marrielBusiness from "./clients/marriel/business.json";

// -----------------------------
// Theme presets (boilerplate-owned)
// -----------------------------
import candyPink from "./themes/candy-pink.json";
import clinicGreen from "./themes/clinic-green.json";
import forestEmerald from "./themes/forest-emerald.json";
import petroleumTeal from "./themes/petroleum-teal.json";
import premiumGold from "./themes/premium-gold.json";

// -----------------------------
// Wiring
// -----------------------------
const DEFAULT_CLIENT: ClientSlug = "marriel";
const DEFAULT_THEME_PRESET: ThemePresetName = "premium-gold";

const BUSINESS_BY_CLIENT: Record<ClientSlug, ClientBusinessContract> = {
  marriel: marrielBusiness as ClientBusinessContract,
};

const THEME_PRESET_BY_KEY: Record<ThemePresetName, ClientThemeContract> = {
  "premium-gold": premiumGold,
  "petroleum-teal": petroleumTeal,
  "forest-emerald": forestEmerald,
  "clinic-green": clinicGreen,
  "candy-pink": candyPink,
};

function resolveClientSlug(): ClientSlug {
  const raw = import.meta.env.VITE_CLIENT?.trim();
  if (raw && raw in BUSINESS_BY_CLIENT) {
    return raw as ClientSlug;
  }
  return DEFAULT_CLIENT;
}

/**
 * Resolve theme preset for a business contract.
 * Rule:
 * - business.themePreset selects a known preset
 * - fail-closed => DEFAULT_THEME_PRESET
 */
function resolveThemePreset(business: ClientBusinessContract): ThemePresetName {
  const forced = import.meta.env.VITE_THEME_PRESET?.trim();
  if (forced && forced in THEME_PRESET_BY_KEY) {
    return forced as ThemePresetName;
  }

  const preset = business.themePreset;
  if (preset && preset in THEME_PRESET_BY_KEY) {
    return preset;
  }

  return DEFAULT_THEME_PRESET;
}

export function getClientBusiness(client: ClientSlug): ClientBusinessContract {
  const found = BUSINESS_BY_CLIENT[client];
  if (!found) {
    throw new Error(`Unknown client (business): ${client}`);
  }
  return found;
}

/**
 * Theme is derived from a preset (not per-client JSON).
 * Enforces: client chooses from existing themes only.
 */
export function getClientTheme(client: ClientSlug): ClientThemeContract {
  const business = getClientBusiness(client);
  const presetKey = resolveThemePreset(business);
  return THEME_PRESET_BY_KEY[presetKey];
}

/**
 * Active helpers: resolve the client slug via env and return contracts.
 */
export function getActiveBusiness(): ClientBusinessContract {
  return getClientBusiness(resolveClientSlug());
}

export function getActiveTheme(): ClientThemeContract {
  return getClientTheme(resolveClientSlug());
}

/**
 * Optional helpers (useful for docs/admin later).
 */
export function listClients(): string[] {
  return Object.keys(BUSINESS_BY_CLIENT);
}

export function listThemePresets(): ThemePresetName[] {
  return Object.keys(THEME_PRESET_BY_KEY) as ThemePresetName[];
}
