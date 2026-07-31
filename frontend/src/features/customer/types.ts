export type CustomerType = "RETAIL" | "WHOLESALE";

export type CustomerStatus = "LEAD" | "ACTIVE" | "INACTIVE";

export interface Customer {
  id: string;
  name: string;
  mobile: string;
  email: string;
  businessName: string;
  gstNumber: string;
  customerType: CustomerType;
  status: CustomerStatus;
  address: string;
  followUpDate: string | null;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface CustomersResponse {
  success: boolean;
  message: string;
  data: {
    items: Customer[];
    pagination: Pagination;
  };
}