import { getActiveClientSlug } from "@/contracts";

/**
 * Client asset path helper.
 * Convention:
 *   public/clients/<slug>/assets/<path>
 *
 * Example:
 *   clientAsset("hero.jpg")
 *   -> /clients/marriel/assets/hero.jpg
 */
export function clientAsset(path: string): string {
  const client = getActiveClientSlug();
  return `/clients/${client}/assets/${path}`;
}

export function getPortfolioImages(count = 6): string[] {
  return Array.from({ length: count }, (_, i) =>
    clientAsset(`gallery/${String(i + 1).padStart(2, "0")}.jpg`),
  );
}

export function getTeamImages(): readonly [string, string] {
  return [clientAsset("team/01.png"), clientAsset("team/02.jpg")] as const;
}
