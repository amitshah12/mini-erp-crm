import { useQuery } from "@tanstack/react-query";

import { getChallans } from "../api/challan.api";

import type { ChallanStatus } from "../types";

export function useChallans(
  page = 1,
  limit = 10,
  search = "",
  customerId?: string,
  status?: ChallanStatus
) {
  return useQuery({
    queryKey: [
      "challans",
      page,
      limit,
      search,
      customerId,
      status,
    ],

    queryFn: () =>
      getChallans(
        page,
        limit,
        search,
        customerId,
        status
      ),
  });
}