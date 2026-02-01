const DEFAULT_CLIENT = "marriel";

/**
 * Resolve the active client slug.
 *
 * Design principles:
 * - This file is PURE and dumb.
 * - It does NOT know about BUSINESS_BY_CLIENT or THEME_BY_CLIENT.
 * - The caller provides the list of available client slugs.
 * - Fail-closed: always return a valid, wired client.
 */
export function resolveClientSlug(
  availableClients: readonly string[],
  fallback: string = DEFAULT_CLIENT,
): string {
  if (availableClients.length === 0) return fallback;

  const envClientRaw = (import.meta.env.VITE_CLIENT as string | undefined)?.trim();
  const envClient = envClientRaw?.toLowerCase();

  if (envClient && availableClients.includes(envClient)) return envClient;

  if (availableClients.includes(fallback)) return fallback;

  return availableClients[0];
}
