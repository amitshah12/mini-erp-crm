import type { Product } from "@/features/product/types";

export type MovementType = "IN" | "OUT";

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

export interface StockHistoryItem {
  id: string;

  quantity: number;
  movement: MovementType;
  reason: string;

  createdAt: string;

  product: {
    id: string;
    name: string;
    sku: string;
  };

  createdBy: {
    id: string;
    name: string;
    email: string;
  };
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface StockHistoryResponse {
  success: boolean;
  message: string;
  data: {
    items: StockHistoryItem[];
    pagination: Pagination;
  };
}