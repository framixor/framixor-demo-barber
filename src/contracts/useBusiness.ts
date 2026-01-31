import { useMemo } from "react";
import { getClientBusiness } from "./load";
import type { BusinessContract } from "./types";

export function useBusiness(client: string): BusinessContract {
  return useMemo(() => {
    return getClientBusiness(client);
  }, [client]);
}
