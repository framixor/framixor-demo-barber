import { useMemo } from "react";
import { getActiveBusiness } from "./load";
import type { BusinessContract } from "./types";

export function useBusiness(): BusinessContract {
  return useMemo(() => getActiveBusiness(), []);
}
