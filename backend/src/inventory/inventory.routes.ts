import { Router } from "express";
import { InventoryController } from "./inventory.controller";

import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";
import { validate } from "../middleware/validate.middleware";

import { stockMovementSchema } from "./inventory.validation";

const router = Router();
const controller = new InventoryController();

router.post(
  "/stock-in",
  authenticate,
  authorize("ADMIN", "SALES"),
  validate(stockMovementSchema),
  controller.stockIn
);

router.post(
  "/stock-out",
  authenticate,
  authorize("ADMIN", "SALES"),
  validate(stockMovementSchema),
  controller.stockOut
);

router.get(
  "/history",
  authenticate,
  authorize("ADMIN", "SALES"),
  controller.getStockHistory
);

export default router;