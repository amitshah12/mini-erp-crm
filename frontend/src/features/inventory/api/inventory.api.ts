import api from "@/api/axios";

import type {
  Product,
} from "@/features/product/types";

import type {
  MovementType,
  StockHistoryResponse,
} from "../types";

export interface StockMovementRequest {
  productId: string;
  quantity: number;
  reason: string;
}

export interface StockMovementResponse {
  success: boolean;
  message: string;
  data: Product;
}

export async function stockIn(
  payload: StockMovementRequest
): Promise<StockMovementResponse> {
  const { data } = await api.post(
    "/inventory/stock-in",
    payload
  );

  return data;
}

export async function stockOut(
  payload: StockMovementRequest
): Promise<StockMovementResponse> {
  const { data } = await api.post(
    "/inventory/stock-out",
    payload
  );

  return data;
}

export async function getStockHistory(
  page = 1,
  limit = 10,
  productId?: string,
  movement?: MovementType
): Promise<StockHistoryResponse> {
  const { data } = await api.get(
    "/inventory/history",
    {
      params: {
        page,
        limit,
        productId,
        movement,
      },
    }
  );

  return data;
}