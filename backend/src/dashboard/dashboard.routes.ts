import { Router } from "express";
import { DashboardController } from "./dashboard.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = Router();
const controller = new DashboardController();

router.get(
  "/summary",
  authenticate,
  authorize("ADMIN", "SALES"),
  controller.getSummary
);

router.get(
  "/low-stock",
  authenticate,
  authorize("ADMIN", "SALES"),
  controller.getLowStockProducts
);

router.get(
  "/recent-challans",
  authenticate,
  authorize("ADMIN", "SALES"),
  controller.getRecentChallans
);

router.get(
  "/inventory-stats",
  authenticate,
  authorize("ADMIN", "SALES"),
  controller.getInventoryStats
);

export default router;