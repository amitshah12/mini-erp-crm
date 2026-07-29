import { NextFunction, Request, Response } from "express";
import dashboardService from "./dashboard.service";
import { ApiResponse } from "../utils/ApiResponse";

export class DashboardController {
  getSummary = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const summary = await dashboardService.getSummary();

      res.json(
        ApiResponse.success(
          "Dashboard summary fetched successfully",
          summary
        )
      );
    } catch (error) {
      next(error);
    }
  };

  getLowStockProducts = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const products =
        await dashboardService.getLowStockProducts();

      res.json(
        ApiResponse.success(
          "Low stock products fetched successfully",
          products
        )
      );
    } catch (error) {
      next(error);
    }
  };

  getRecentChallans = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const challans =
        await dashboardService.getRecentChallans();

      res.json(
        ApiResponse.success(
          "Recent challans fetched successfully",
          challans
        )
      );
    } catch (error) {
      next(error);
    }
  };

  getInventoryStats = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const stats =
        await dashboardService.getInventoryStats();

      res.json(
        ApiResponse.success(
          "Inventory statistics fetched successfully",
          stats
        )
      );
    } catch (error) {
      next(error);
    }
  };
}