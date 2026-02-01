export type ClientSlug = string;

/**
 * Theme preset names owned by the boilerplate (V1).
 * Clients choose one of these (minimal variation rule).
 */
export type ThemePresetName =
  | "premium-gold"
  | "petroleum-teal"
  | "forest-emerald"
  | "clinic-green"
  | "candy-pink";

/**
 * Minimal semantic theme tokens (V1).
 * Keep this small. More tokens = more chaos.
 *
 * Values are expected to be HSL triplets like: "43 70% 51%"
 * (so Tailwind/shadcn patterns like hsl(var(--primary)) keep working).
 */
export type ThemePrimaryStyle = "solid" | "gradient";

/**
 * Canonical required tokens (V1).
 * Optional tokens exist only to support a small amount of controlled variation.
 */
export type ThemeTokens = {
  // Required semantic tokens
  bg: string;
  fg: string;

  primary: string;
  primaryFg: string;

  accent: string;
  muted: string;
  border: string;

  // Optional: gradient endpoints for primary button when primaryStyle="gradient"
  // If missing, runtime must fallback to `primary`.
  primaryFrom?: string;
  primaryTo?: string;
};

export interface ClientThemeContract {
  /**
   * Used for debugging/logging and future migrations.
   * Example: 1
   */
  version: number;

  /**
   * Determines how the primary CTA is rendered.
   * - solid: background = hsl(var(--primary))
   * - gradient: background = linear-gradient using primaryFrom/primaryTo (fallback to primary)
   */
  primaryStyle?: ThemePrimaryStyle;

  /**
   * Semantic tokens only.
   * Values should be HSL triplets (recommended).
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

    /**
     * Optional opening hours (V1).
     * Keeping it flexible: keys are the "labels" you want to show.
     */
    hours?: Record<string, string>;
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

  /**
   * Client chooses one preset owned by the boilerplate.
   * This is what ties business.json -> theme preset json.
   */
  themePreset: ThemePresetName;
}

// Canonical alias used by runtime hooks/components (V1).
export type BusinessContract = ClientBusinessContract;
