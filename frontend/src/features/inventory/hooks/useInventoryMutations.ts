import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import {
  stockIn,
  stockOut,
} from "../api/inventory.api";

export function useStockIn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: stockIn,

    onSuccess: (response) => {
      toast.success(response.message);

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      queryClient.invalidateQueries({
        queryKey: ["stock-history"],
      });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ??
          "Failed to add stock."
      );
    },
  });
}

export function useStockOut() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: stockOut,

    onSuccess: (response) => {
      toast.success(response.message);

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      queryClient.invalidateQueries({
        queryKey: ["stock-history"],
      });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ??
          "Failed to remove stock."
      );
    },
  });
}