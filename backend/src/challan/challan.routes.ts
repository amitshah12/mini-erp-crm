import { Router } from "express";
import { ChallanController } from "./challan.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";
import { validate } from "../middleware/validate.middleware";
import { createChallanSchema } from "./challan.validation";

const router = Router();
const controller = new ChallanController();

router.post(
  "/",
  authenticate,
  authorize("ADMIN", "SALES"),
  validate(createChallanSchema),
  controller.create
);

router.get(
  "/",
  authenticate,
  authorize("ADMIN", "SALES"),
  controller.findAll
);

router.get(
  "/:id",
  authenticate,
  authorize("ADMIN", "SALES"),
  controller.findById
);

router.patch(
  "/:id/status",
  authenticate,
  authorize("ADMIN"),
  controller.cancel
);

export default router;