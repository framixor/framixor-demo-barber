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
  const envClient = (import.meta.env.VITE_CLIENT as string | undefined)?.trim();

  const chosen =
    envClient && availableClients.includes(envClient) ? envClient : fallback;

  return chosen;
}
