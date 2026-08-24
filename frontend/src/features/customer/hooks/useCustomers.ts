import { useQuery } from "@tanstack/react-query";

import { getCustomers } from "../api/customer.api";

export function useCustomers(
  page = 1,
  limit = 10,
  search = "",
  status?: "LEAD" | "ACTIVE" | "INACTIVE",
  customerType?: "RETAIL" | "WHOLESALE" | "DISTRIBUTOR"
) {
  return useQuery({
    queryKey: [
      "customers",
      page,
      limit,
      search,
      status,
      customerType,
    ],

    queryFn: () =>
      getCustomers(
        page,
        limit,
        search,
        status,
        customerType
      ),
  });
}