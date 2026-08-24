import { Router } from "express";

import { CustomerController } from "./customer.controller";

import { authenticate } from "../middleware/auth.middleware";

import { authorize } from "../middleware/role.middleware";

import { validate } from "../middleware/validate.middleware";

import {
  createCustomerSchema,
  updateCustomerSchema,
} from "./customer.validation";

const router = Router();

const controller = new CustomerController();

// List customers

router.get(
  "/",
  authenticate,
  authorize("ADMIN", "SALES", "ACCOUNTS"),
  controller.findAll
);

// Get customer by ID

router.get(
  "/:id",
  authenticate,
  authorize("ADMIN", "SALES", "ACCOUNTS"),
  controller.findById
);

// Create customer

router.post(
  "/",
  authenticate,
  authorize("ADMIN", "SALES"),
  validate(createCustomerSchema),
  controller.create
);

// Update customer

router.put(
  "/:id",
  authenticate,
  authorize("ADMIN", "SALES"),
  validate(updateCustomerSchema),
  controller.update
);

// Soft delete customer

router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  controller.softDelete
);

export default router;