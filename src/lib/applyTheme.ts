type ThemeTokens = Record<string, string>;

function normalizeHslTriplet(value: string) {
  const v = value.trim();
  const m = v.match(/^hsl\(\s*([^)]+)\s*\)$/i);
  return m ? m[1].trim() : v;
}

/**
 * Apply theme tokens to CSS variables on :root (documentElement).
 *
 * Canonical: writes to --fx-* (Framixor V1).
 * Values expected: HSL triplets like "210 20% 98%".
 */
export function applyTheme(tokens: ThemeTokens) {
  const root = document.documentElement;

  const t = Object.fromEntries(
    Object.entries(tokens).map(([k, v]) => [k, normalizeHslTriplet(String(v))]),
  );

  // 1) Canonical: set Framixor V1 vars
  for (const [key, value] of Object.entries(t)) {
    root.style.setProperty(`--fx-${key}`, value);
  }

  // 2) Compatibility (optional but helpful while transitioning)
  const aliasMap: Record<string, string[]> = {
    bg: ["background"],
    fg: ["foreground"],
    primary: ["primary"],
    primaryFg: ["primary-foreground"],
    accent: ["accent"],
    muted: ["muted"],
    border: ["border"],
  };

  for (const [from, tos] of Object.entries(aliasMap)) {
    const value = t[from];
    if (!value) continue;
    for (const to of tos) {
      root.style.setProperty(`--${to}`, value);
    }
  }
}
