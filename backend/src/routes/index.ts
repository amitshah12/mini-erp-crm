import { Router } from "express";

import authRoutes from "../auth/auth.routes";
import customerRoutes from "../customer/customer.routes";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Mini ERP CRM API v1",
  });
});

router.use("/auth", authRoutes);
router.use("/customers", customerRoutes);

export default router;