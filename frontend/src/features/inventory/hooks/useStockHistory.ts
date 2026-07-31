import { useQuery } from "@tanstack/react-query";

import { getStockHistory } from "../api/inventory.api";
import type { MovementType } from "../types";

export function useStockHistory(
  page = 1,
  limit = 10,
  productId?: string,
  movement?: MovementType
) {
  return useQuery({
    queryKey: [
      "stock-history",
      page,
      limit,
      productId,
      movement,
    ],

    queryFn: () =>
      getStockHistory(
        page,
        limit,
        productId,
        movement
      ),
  });
}