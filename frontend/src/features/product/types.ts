export type ProductCategory =
  | "ELECTRONICS"
  | "GROCERY"
  | "STATIONERY"
  | "CLOTHING"
  | "MEDICAL"
  | "OTHER";

export type Unit =
  | "PIECE"
  | "BOX"
  | "KG"
  | "LITER";

export interface Product {
  id: string;

  name: string;
  sku: string;
  barcode: string | null;

  category: ProductCategory;
  brand: string;

  unit: Unit;

  purchasePrice: number;
  sellingPrice: number;

  currentStock: number;
  minimumStock: number;

  description: string | null;

  isDeleted: boolean;

  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ProductsResponse {
  success: boolean;
  message: string;
  data: {
    items: Product[];
    pagination: Pagination;
  };
}