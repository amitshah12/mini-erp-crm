import { Router } from "express";
import { CustomerController } from "./customer.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";
import { validate } from "../middleware/validate.middleware";
import { createCustomerSchema } from "./customer.validation";

const router = Router();
const controller = new CustomerController();

router.post(
  "/",
  authenticate,
  authorize("ADMIN", "SALES"),
  validate(createCustomerSchema),
  controller.create
);

export default router;