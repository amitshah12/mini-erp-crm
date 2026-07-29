import { MovementType } from "@prisma/client";
import { prisma } from "../config/prisma";
import { ApiError } from "../utils/ApiError";
import inventoryRepository from "./inventory.repository";
import {
  StockHistoryInput,
  StockMovementInput,
} from "./inventory.validation";

class InventoryService {
  async stockIn(
    data: StockMovementInput,
    createdById: string
  ) {
    const product = await inventoryRepository.findProductById(data.productId);

    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    return prisma.$transaction(async (tx) => {
      const updatedProduct =
        await inventoryRepository.updateProductStock(
          tx,
          product.id,
          product.currentStock + data.quantity
        );

      await inventoryRepository.createStockLog(tx, {
        productId: product.id,
        quantity: data.quantity,
        movement: MovementType.IN,
        reason: data.reason,
        createdById,
      });

      return updatedProduct;
    });
  }

  async stockOut(
    data: StockMovementInput,
    createdById: string
  ) {
    const product = await inventoryRepository.findProductById(data.productId);

    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    if (product.currentStock < data.quantity) {
      throw new ApiError(400, "Insufficient stock");
    }

    return prisma.$transaction(async (tx) => {
      const updatedProduct =
        await inventoryRepository.updateProductStock(
          tx,
          product.id,
          product.currentStock - data.quantity
        );

      await inventoryRepository.createStockLog(tx, {
        productId: product.id,
        quantity: data.quantity,
        movement: MovementType.OUT,
        reason: data.reason,
        createdById,
      });

      return updatedProduct;
    });
  }

  async getStockHistory(query: StockHistoryInput) {
    const { page, limit, productId, movement } = query;

    return inventoryRepository.getStockHistory(
      page,
      limit,
      productId,
      movement
    );
  }
}

export default new InventoryService();