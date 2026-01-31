import { useTheme } from "@/contracts/useTheme";
import { useEffect } from "react";
import { applyTheme } from "../../lib/applyTheme";

export function ThemeRuntime() {
  const theme = useTheme();

  useEffect(() => {
    applyTheme(theme.tokens);
  }, [theme]);

  return null;
}
