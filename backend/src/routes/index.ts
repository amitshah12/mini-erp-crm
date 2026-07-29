import { Router } from "express";

import authRoutes from "../auth/auth.routes";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Mini ERP CRM API v1",
  });
});

router.use("/auth", authRoutes);

export default router;