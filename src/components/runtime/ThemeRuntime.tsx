import { useTheme } from "@/contracts/useTheme";
import { applyTheme } from "@/lib/applyTheme";
import { useEffect } from "react";

export function ThemeRuntime() {
  const theme = useTheme();

  const tokens = theme.tokens;
  const primaryStyle = theme.primaryStyle;

  useEffect(() => {
    applyTheme(tokens, { primaryStyle });
  }, [tokens, primaryStyle]);

  return null;
}
