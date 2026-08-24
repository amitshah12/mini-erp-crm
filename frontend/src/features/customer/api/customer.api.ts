import api from "@/api/axios";
import type { CustomersResponse } from "../types";
import type { Customer } from "../types";

export async function getCustomers(
  page = 1,
  limit = 10,
  search?: string,
  status?: "LEAD" | "ACTIVE" | "INACTIVE",
  customerType?: "RETAIL" | "WHOLESALE" | "DISTRIBUTOR"
): Promise<CustomersResponse> {
  const { data } = await api.get("/customers", {
    params: {
      page,
      limit,
      search,
      status,
      customerType,
    },
  });

  return data;
}

export interface CreateCustomerRequest {
  name: string;
  mobile: string;
  email: string;
  businessName: string;
  gstNumber: string;
  customerType: "RETAIL" | "WHOLESALE";
  status: "LEAD" | "ACTIVE" | "INACTIVE";
  address: string;
}

export interface CreateCustomerResponse {
  success: boolean;
  message: string;
  data: Customer;
}

export async function createCustomer(
  payload: CreateCustomerRequest
): Promise<CreateCustomerResponse> {
  const { data } = await api.post("/customers", payload);

  return data;
}

export interface UpdateCustomerRequest {
  name: string;
  mobile: string;
  email: string;
  businessName: string;
  gstNumber: string;
  customerType: "RETAIL" | "WHOLESALE";
  status: "LEAD" | "ACTIVE" | "INACTIVE";
  address: string;
}

export interface UpdateCustomerResponse {
  success: boolean;
  message: string;
  data: Customer;
}

export async function updateCustomer(
  id: string,
  payload: UpdateCustomerRequest
): Promise<UpdateCustomerResponse> {
  const { data } = await api.put(`/customers/${id}`, payload);

  return data;
}

export interface DeleteCustomerResponse {
  success: boolean;
  message: string;
}

export async function deleteCustomer(
  id: string
): Promise<DeleteCustomerResponse> {
  const { data } = await api.delete(`/customers/${id}`);

  return data;
}