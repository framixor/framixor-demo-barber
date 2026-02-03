// src/clients/assets.ts
import { getActiveClientSlug } from "@/contracts";

/**
 * Client Pack V1 (public-driven)
 *
 * All client assets MUST live under:
 *   public/clients/<slug>/assets/...
 *
 * This module is runtime-safe:
 * - no filesystem access
 * - no module-scope CLIENT constant (so env changes don't "stick" across HMR)
 * - deterministic paths (automation-friendly)
 */

export type ClientAssetPath = string;

export function clientAsset(path: string, clientSlug?: string): ClientAssetPath {
  const slug = (clientSlug ?? getActiveClientSlug()).trim();
  const safePath = path.replace(/^\/+/, ""); // prevent "//"
  return `/clients/${slug}/assets/${safePath}`;
}

export function getHeroImage(clientSlug?: string): ClientAssetPath {
  return clientAsset("hero.jpg", clientSlug);
}

/**
 * Portfolio gallery images:
 *   public/clients/<slug>/assets/gallery/01.jpg .. 06.jpg
 */
export function getPortfolioImages(
  count: number = 6,
  clientSlug?: string,
): ClientAssetPath[] {
  const safeCount = Number.isFinite(count) && count > 0 ? Math.floor(count) : 0;

  return Array.from({ length: safeCount }, (_, i) =>
    clientAsset(`gallery/${String(i + 1).padStart(2, "0")}.jpg`, clientSlug),
  );
}

/**
 * Team images (V1):
 *   public/clients/<slug>/assets/team/01.png
 *   public/clients/<slug>/assets/team/02.jpg
 *
 * NOTE:
 * We keep this deterministic for automation.
 * If you want to support more members later, we’ll evolve this to a contract-driven list.
 */
export function getTeamImages(clientSlug?: string): ClientAssetPath[] {
  return [
    clientAsset("team/01.png", clientSlug),
    clientAsset("team/02.jpg", clientSlug),
  ];
}

/**
 * Optional helper for SEO/OG later.
 * Your business.json may point to "/og.png" today, but for Client Pack V1
 * we’ll standardize: public/clients/<slug>/assets/og.png
 */
export function getOgImage(clientSlug?: string): ClientAssetPath {
  return clientAsset("og.png", clientSlug);
}

export function getFavicon(clientSlug?: string): ClientAssetPath {
  return clientAsset("favicon.png", clientSlug);
}
