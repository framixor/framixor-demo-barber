import { getActiveTheme } from "@/contracts/load";

export function useTheme() {
  const theme = getActiveTheme();

  return theme;
}
