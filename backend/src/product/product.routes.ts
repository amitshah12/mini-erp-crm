import { Router } from "express";

import { ProductController } from "./product.controller";

import { authenticate } from "../middleware/auth.middleware";

import { authorize } from "../middleware/role.middleware";

const router = Router();

const controller = new ProductController();

// Create product

router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  controller.create
);

// List products

router.get(
  "/",
  authenticate,
  authorize("ADMIN", "SALES", "WAREHOUSE"),
  controller.findAll
);

// Get product by ID

router.get(
  "/:id",
  authenticate,
  authorize("ADMIN", "SALES", "WAREHOUSE"),
  controller.findById
);

// Update product details

router.put(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  controller.update
);

// Soft delete product

router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  controller.softDelete
);

export default router;