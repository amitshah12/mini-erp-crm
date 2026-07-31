import api from "@/api/axios";
import type { DashboardSummaryResponse } from "../types";

export const getDashboardSummary = async (): Promise<DashboardSummaryResponse> => {
  const { data } = await api.get("/dashboard/summary");

  return data;
};