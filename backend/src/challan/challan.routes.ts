import { Router } from "express";

import { ChallanController } from "./challan.controller";

import { authenticate } from "../middleware/auth.middleware";

import { authorize } from "../middleware/role.middleware";

import { validate } from "../middleware/validate.middleware";

import { createChallanSchema } from "./challan.validation";

const router = Router();

const controller = new ChallanController();

// Create challan

router.post(
  "/",
  authenticate,
  authorize("ADMIN", "SALES"),
  validate(createChallanSchema),
  controller.create
);

// List challans

router.get(
  "/",
  authenticate,
  authorize("ADMIN", "SALES", "ACCOUNTS"),
  controller.findAll
);

// Get challan by ID

router.get(
  "/:id",
  authenticate,
  authorize("ADMIN", "SALES", "ACCOUNTS"),
  controller.findById
);

// Cancel challan

router.patch(
  "/:id/status",
  authenticate,
  authorize("ADMIN"),
  controller.cancel
);

export default router;