import { useQuery } from "@tanstack/react-query";

import { getProducts } from "../api/product.api";

export function useProducts(
  page = 1,
  limit = 10
) {
  return useQuery({
    queryKey: ["products", page, limit],

    queryFn: () => getProducts(page, limit),
  });
}