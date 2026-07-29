import dashboardRepository from "./dashboard.repository";

class DashboardService {
  async getSummary() {
    return dashboardRepository.getSummary();
  }

  async getLowStockProducts() {
    return dashboardRepository.getLowStockProducts();
  }

  async getRecentChallans() {
    return dashboardRepository.getRecentChallans();
  }

  async getInventoryStats() {
    return dashboardRepository.getInventoryStats();
  }
}

export default new DashboardService();