import { Router } from "express";
import { CustomerController } from "./customer.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = Router();
const controller = new CustomerController();

router.post(
  "/",
  authenticate,
  authorize("ADMIN", "SALES"),
  controller.create
);

export default router;