import type { ThemePrimaryStyle, ThemeTokens } from "@/contracts/types";

/**
 * Apply semantic theme tokens as CSS variables.
 *
 * Rules:
 * - tokens are HSL triplets (e.g. "43 70% 51%") to support `hsl(var(--primary))`.
 * - primaryStyle controls whether the primary CTA is solid or gradient.
 * - primaryFrom/primaryTo are optional; fallback to `primary`.
 */
export function applyTheme(
  tokens: ThemeTokens,
  opts?: { primaryStyle?: ThemePrimaryStyle },
) {
  const root = document.documentElement;

  // shadcn-compatible vars (canonical)
  root.style.setProperty("--background", tokens.bg);
  root.style.setProperty("--foreground", tokens.fg);

  root.style.setProperty("--primary", tokens.primary);
  root.style.setProperty("--primary-foreground", tokens.primaryFg);

  root.style.setProperty("--accent", tokens.accent);
  root.style.setProperty("--muted", tokens.muted);
  root.style.setProperty("--border", tokens.border);

  // Framixor extensions: primary style + endpoints
  const style: ThemePrimaryStyle = opts?.primaryStyle ?? "solid";
  root.setAttribute("data-fx-primary-style", style);

  const from = tokens.primaryFrom ?? tokens.primary;
  const to = tokens.primaryTo ?? tokens.primary;

  root.style.setProperty("--fx-primary-from", from);
  root.style.setProperty("--fx-primary-to", to);
}
