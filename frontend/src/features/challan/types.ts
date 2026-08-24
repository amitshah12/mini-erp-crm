import type { Customer } from "@/features/customer/types";
import type { Product } from "@/features/product/types";

export type ChallanStatus =
  | "DRAFT"
  | "CONFIRMED"
  | "CANCELLED";

export interface ChallanItem {
  id: string;

  productId: string;

  productName: string;

  sku: string;

  quantity: number;

  unitPrice: number;
}

export interface Challan {
  id: string;

  challanNumber: string;

  totalQuantity: number;

  status: ChallanStatus;

  createdAt: string;

  customer: Customer;

  createdBy: {
    id: string;
    name: string;
    email: string;
  };

  items: ChallanItem[];
}

export interface CreateChallanItem {
  productId: string;
  quantity: number;
}

export interface CreateChallanRequest {
  customerId: string;
  items: CreateChallanItem[];
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ChallansResponse {
  success: boolean;
  message: string;
  data: {
    items: Challan[];
    pagination: Pagination;
  };
}

export interface ChallanResponse {
  success: boolean;
  message: string;
  data: Challan;
}

export interface UpdateChallanStatusRequest {
  status: ChallanStatus;
}

export interface CustomerOption
  extends Pick<Customer, "id" | "name" | "businessName"> {}

export interface ProductOption
  extends Pick<
    Product,
    | "id"
    | "name"
    | "sku"
    | "sellingPrice"
    | "currentStock"
  > {}