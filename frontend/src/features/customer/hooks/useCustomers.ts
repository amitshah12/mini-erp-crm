import { useQuery } from "@tanstack/react-query";
import { getCustomers } from "../api/customer.api";

export function useCustomers(
  page = 1,
  limit = 10
) {
  return useQuery({
    queryKey: ["customers", page, limit],
    queryFn: () => getCustomers(page, limit),
  });
}