import type { ThemeTokens } from "@/contracts/types";

export const THEME_CSS_VAR_PREFIX = "--fx";

/**
 * Applies theme tokens as CSS variables to :root.
 * Fail-closed: throws only for invalid input shape; caller decides fallback.
 */
export function applyTheme(
  tokens: ThemeTokens,
  root: HTMLElement = document.documentElement,
) {
  for (const [key, value] of Object.entries(tokens)) {
    // Example: --fx-bg, --fx-primary, etc.
    root.style.setProperty(`${THEME_CSS_VAR_PREFIX}-${key}`, value);
  }
}
