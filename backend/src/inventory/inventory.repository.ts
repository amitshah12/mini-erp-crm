import { Prisma, MovementType } from "@prisma/client";
import { prisma } from "../config/prisma";

class InventoryRepository {
  async findProductById(productId: string) {
    return prisma.product.findFirst({
      where: {
        id: productId,
        isDeleted: false,
      },
    });
  }

  async updateProductStock(
    tx: Prisma.TransactionClient,
    productId: string,
    currentStock: number
  ) {
    return tx.product.update({
      where: {
        id: productId,
      },
      data: {
        currentStock,
      },
    });
  }

  async createStockLog(
    tx: Prisma.TransactionClient,
    data: {
      productId: string;
      quantity: number;
      movement: MovementType;
      reason: string;
      createdById: string;
    }
  ) {
    return tx.stockLog.create({
      data,
    });
  }

  async getStockHistory(
    page: number,
    limit: number,
    productId?: string,
    movement?: MovementType
  ) {
    const where: Prisma.StockLogWhereInput = {};

    if (productId) where.productId = productId;

    if (movement) where.movement = movement;

    const [logs, total] = await prisma.$transaction([
      prisma.stockLog.findMany({
        where,
        include: {
          product: {
            select: {
              id: true,
              name: true,
              sku: true,
            },
          },
          createdBy: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.stockLog.count({ where }),
    ]);

    return { logs, total };
  }
}

export default new InventoryRepository();