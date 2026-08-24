import { useQuery } from "@tanstack/react-query";

import { getProducts } from "../api/product.api";

export function useProducts(
  page = 1,
  limit = 10,
  search = "",
  category?:
    | "ELECTRONICS"
    | "GROCERY"
    | "STATIONERY"
    | "CLOTHING"
    | "MEDICAL"
    | "OTHER"
) {
  return useQuery({
    queryKey: [
      "products",
      page,
      limit,
      search,
      category,
    ],

    queryFn: () =>
      getProducts(
        page,
        limit,
        search,
        category
      ),
  });
}