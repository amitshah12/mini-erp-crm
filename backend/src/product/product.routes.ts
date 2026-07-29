 import { Router } from "express";
import { ProductController } from "./product.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = Router();
const controller = new ProductController();

router.post(
  "/",
  authenticate,
  authorize("ADMIN", "SALES"),
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

router.put(
  "/:id",
  authenticate,
  authorize("ADMIN", "SALES"),
  controller.update
);

router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  controller.softDelete
);

export default router;