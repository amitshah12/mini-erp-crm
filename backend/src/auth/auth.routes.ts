import { Router } from "express";

import { AuthController } from "./auth.controller";

import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = Router();

const controller = new AuthController();

router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/me", authenticate, controller.me);

router.get(
  "/admin",
  authenticate,
  authorize("ADMIN"),
  controller.adminOnly
);

export default router;