export interface DashboardSummary {
  totalCustomers: number;
  totalProducts: number;
  totalChallans: number;
  totalInventoryItems: number;
}

export interface InventorySummary {
  stockIn: number;
  stockOut: number;
}

export interface LowStockProduct {
  id: string;
  name: string;
  sku: string;
  currentStock: number;
  minimumStock: number;
}

export interface RecentChallan {
  id: string;
  challanNumber: string;
  totalQuantity: number;
  status: string;
  createdAt: string;
  customer: {
    id: string;
    name: string;
  };
}

export interface DashboardData {
  summary: DashboardSummary;
  inventory: InventorySummary;
  lowStockProducts: LowStockProduct[];
  recentChallans: RecentChallan[];
}

export interface DashboardSummaryResponse {
  success: boolean;
  message: string;
  data: DashboardData;
}