import { useTheme } from "@/contracts/useTheme";
import { applyTheme } from "@/lib/applyTheme";
import { useEffect } from "react";

export function ThemeRuntime() {
  const theme = useTheme();

  useEffect(() => {
    // Apply theme
    applyTheme(theme.tokens);
    document.documentElement.setAttribute("data-theme-applied", "1");
  }, [theme.version, theme.tokens]);

  return null;
}
