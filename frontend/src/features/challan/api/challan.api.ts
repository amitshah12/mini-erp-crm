import api from "@/api/axios";

import type {
  Challan,
  ChallanResponse,
  ChallansResponse,
  ChallanStatus,
  CreateChallanRequest,
  UpdateChallanStatusRequest,
} from "../types";

export async function getChallans(
  page = 1,
  limit = 10,
  search = "",
  customerId?: string,
  status?: ChallanStatus
): Promise<ChallansResponse> {
  const { data } = await api.get("/challans", {
    params: {
      page,
      limit,
      search: search || undefined,
      customerId,
      status,
    },
  });

  return data;
}

export async function getChallanById(
  id: string
): Promise<ChallanResponse> {
  const { data } = await api.get(
    `/challans/${id}`
  );

  return data;
}

export interface CreateChallanResponse {
  success: boolean;
  message: string;
  data: Challan;
}

export async function createChallan(
  payload: CreateChallanRequest
): Promise<CreateChallanResponse> {
  const { data } = await api.post(
    "/challans",
    payload
  );

  return data;
}

export interface CancelChallanResponse {
  success: boolean;
  message: string;
  data: Challan;
}

export async function cancelChallan(
  id: string,
  payload: UpdateChallanStatusRequest
): Promise<CancelChallanResponse> {
  const { data } = await api.patch(
    `/challans/${id}/status`,
    payload
  );

  return data;
}