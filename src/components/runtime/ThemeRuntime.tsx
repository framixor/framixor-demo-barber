import { useTheme } from "@/contracts/useTheme";
import { applyTheme } from "@/lib/applyTheme";
import { useEffect } from "react";

export function ThemeRuntime() {
  const theme = useTheme();

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return null;
}
