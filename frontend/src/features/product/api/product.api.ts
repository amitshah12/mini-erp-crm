import api from "@/api/axios";
import type { Product, ProductsResponse } from "../types";

export async function getProducts(
  page = 1,
  limit = 10,
  search?: string,
  category?:
    | "ELECTRONICS"
    | "GROCERY"
    | "STATIONERY"
    | "CLOTHING"
    | "MEDICAL"
    | "OTHER"
): Promise<ProductsResponse> {
  const { data } = await api.get("/products", {
    params: {
      page,
      limit,
      search,
      category,
    },
  });

  return data;
}

export interface CreateProductRequest {
  name: string;
  sku: string;
  barcode?: string;

  category:
  | "ELECTRONICS"
  | "GROCERY"
  | "STATIONERY"
  | "CLOTHING"
  | "MEDICAL"
  | "OTHER";

  brand: string;

  unit:
  | "PIECE"
  | "BOX"
  | "KG"
  | "LITER";

  purchasePrice: number;
  sellingPrice: number;

  currentStock: number;
  minimumStock: number;

  description?: string;
}

export interface CreateProductResponse {
  success: boolean;
  message: string;
  data: Product;
}

export async function createProduct(
  payload: CreateProductRequest
): Promise<CreateProductResponse> {
  const { data } = await api.post("/products", payload);

  return data;
}

export interface UpdateProductRequest
  extends Partial<CreateProductRequest> { }

export interface UpdateProductResponse {
  success: boolean;
  message: string;
  data: Product;
}

export async function updateProduct(
  id: string,
  payload: UpdateProductRequest
): Promise<UpdateProductResponse> {
  const { data } = await api.put(
    `/products/${id}`,
    payload
  );

  return data;
}

export interface DeleteProductResponse {
  success: boolean;
  message: string;
}

export async function deleteProduct(
  id: string
): Promise<DeleteProductResponse> {
  const { data } = await api.delete(
    `/products/${id}`
  );

  return data;
}