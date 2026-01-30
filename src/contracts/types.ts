export type ClientSlug = string;

/**
 * Minimal semantic theme tokens (V1).
 * Keep this small. More tokens = more chaos.
 */
export type ThemeTokenKey =
  | "bg"
  | "fg"
  | "primary"
  | "primaryFg"
  | "accent"
  | "muted"
  | "border";

export type ThemeTokens = Record<ThemeTokenKey, string>;

export interface ClientThemeContract {
  /**
   * Used for debugging/logging and future migrations.
   * Example: "1.0"
   */
  version: string;

  /**
   * Semantic tokens only.
   * Values should be valid CSS color values (recommended: hsl(...) or #hex).
   */
  tokens: ThemeTokens;
}

/**
 * Business/SEO contract (V1).
 * Keep this stable. It will drive meta + visible content.
 */
export interface ClientBusinessContract {
  version: string;

  business: {
    legalName: string;
    displayName: string;
    tagline?: string;

    /**
     * City/State is enough for now; full address stays optional until you finalize.
     */
    address?: {
      line1?: string;
      line2?: string;
      city: string;
      region: string; // state/province
      postalCode?: string;
      country: string;
    };

    contact: {
      phone?: string; // human format ok (we can sanitize later)
      whatsapp?: string; // E.164 digits only recommended, but not required here
      email?: string;
      instagram?: string; // handle without @ OR full URL (we can normalize later)
    };

    links?: {
      website?: string;
      maps?: string; // google maps url
      booking?: string; // future: movyra or other
    };
  };

  seo: {
    title: string;
    description: string;
    locale: "en" | "pt-BR";

    /**
     * Domain is useful for canonical and OG.
     * Example: "marrielbarber.com"
     */
    domain?: string;

    /**
     * Absolute URL to OG image (preferred), or relative path ("/og.png").
     */
    ogImage?: string;
  };
}
