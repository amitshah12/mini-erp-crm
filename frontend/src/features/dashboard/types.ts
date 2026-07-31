export interface DashboardSummary {
  totalCustomers: number;
  totalProducts: number;
  totalChallans: number;
  totalInventoryItems: number;
}

export interface DashboardSummaryResponse {
  success: boolean;
  message: string;
  data: DashboardSummary;
}