import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { applyThemeTokens, getClientTheme } from "./contracts";

try {
  const theme = getClientTheme("marriel");
  applyThemeTokens(theme.tokens);
} catch {
  // Fail-closed: keep current CSS defaults (no visual change).
}

createRoot(document.getElementById("root")!).render(<App />);
