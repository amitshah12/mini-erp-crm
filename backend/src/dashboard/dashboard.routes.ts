import { Router } from "express";

import { DashboardController } from "./dashboard.controller";

import { authenticate } from "../middleware/auth.middleware";

import { authorize } from "../middleware/role.middleware";

const router = Router();

const controller = new DashboardController();

router.get(
  "/summary",
  authenticate,
  authorize(
    "ADMIN",
    "SALES",
    "WAREHOUSE",
    "ACCOUNTS"
  ),
  controller.getSummary
);

router.get(
  "/low-stock",
  authenticate,
  authorize(
    "ADMIN",
    "SALES",
    "WAREHOUSE",
    "ACCOUNTS"
  ),
  controller.getLowStockProducts
);

router.get(
  "/recent-challans",
  authenticate,
  authorize(
    "ADMIN",
    "SALES",
    "WAREHOUSE",
    "ACCOUNTS"
  ),
  controller.getRecentChallans
);

router.get(
  "/inventory-stats",
  authenticate,
  authorize(
    "ADMIN",
    "SALES",
    "WAREHOUSE",
    "ACCOUNTS"
  ),
  controller.getInventoryStats
);

export default router;