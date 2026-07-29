import { Router } from "express";

import authRoutes from "../auth/auth.routes";
import customerRoutes from "../customer/customer.routes";
import productRoutes from "../product/product.routes";
import inventoryRoutes from "../inventory/inventory.routes";
import challanRoutes from "../challan/challan.routes";
import dashboardRoutes from "../dashboard/dashboard.routes";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Mini ERP CRM API v1",
  });
});

router.use("/auth", authRoutes);
router.use("/customers", customerRoutes);
router.use("/products", productRoutes);
router.use("/inventory", inventoryRoutes);
router.use("/challans", challanRoutes);
router.use("/dashboard", dashboardRoutes);

export default router;