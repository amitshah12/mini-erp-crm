import { Router } from "express";

import { InventoryController } from "./inventory.controller";

import { authenticate } from "../middleware/auth.middleware";

import { authorize } from "../middleware/role.middleware";

import { validate } from "../middleware/validate.middleware";

import { stockMovementSchema } from "./inventory.validation";

const router = Router();

const controller = new InventoryController();

// Stock In

router.post(
  "/stock-in",
  authenticate,
  authorize("ADMIN", "WAREHOUSE"),
  validate(stockMovementSchema),
  controller.stockIn
);

// Stock Out

router.post(
  "/stock-out",
  authenticate,
  authorize("ADMIN", "WAREHOUSE"),
  validate(stockMovementSchema),
  controller.stockOut
);

// Stock History

router.get(
  "/history",
  authenticate,
  authorize("ADMIN", "WAREHOUSE", "ACCOUNTS"),
  controller.getStockHistory
);

export default router;