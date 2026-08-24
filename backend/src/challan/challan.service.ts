import {
  ChallanStatus,
  MovementType,
} from "@prisma/client";
import { prisma } from "../config/prisma";
import { ApiError } from "../utils/ApiError";
import challanRepository from "./challan.repository";
import {
  CreateChallanInput,
  ListChallanInput,
} from "./challan.validation";

class ChallanService {
  private generateChallanNumber(): string {
    const now = new Date();

    const date =
      `${now.getFullYear()}` +
      `${String(now.getMonth() + 1).padStart(2, "0")}` +
      `${String(now.getDate()).padStart(2, "0")}`;

    const time =
      `${String(now.getHours()).padStart(2, "0")}` +
      `${String(now.getMinutes()).padStart(2, "0")}` +
      `${String(now.getSeconds()).padStart(2, "0")}`;

    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");

    return `CH-${date}-${time}-${random}`;
  }

  async create(
    data: CreateChallanInput,
    createdById: string
  ) {
    const customer = await challanRepository.findCustomerById(
      data.customerId
    );

    if (!customer) {
      throw new ApiError(404, "Customer not found");
    }

    const productIds = data.items.map((i) => i.productId);

    const products =
      await challanRepository.findProductsByIds(productIds);

    if (products.length !== productIds.length) {
      throw new ApiError(404, "One or more products not found");
    }

    const productMap = new Map(
      products.map((p) => [p.id, p])
    );

    let totalQuantity = 0;

    for (const item of data.items) {
      const product = productMap.get(item.productId)!;

      if (product.currentStock < item.quantity) {
        throw new ApiError(
          400,
          `Insufficient stock for ${product.name}`
        );
      }

      totalQuantity += item.quantity;
    }

    let challanNumber = this.generateChallanNumber();

    while (
      await challanRepository.findByChallanNumber(challanNumber)
    ) {
      challanNumber = this.generateChallanNumber();
    }

    return prisma.$transaction(async (tx) => {
      const challan =
        await challanRepository.createChallan(tx, {
          challanNumber,
          totalQuantity,
          status: ChallanStatus.CONFIRMED,
          customer: {
            connect: {
              id: data.customerId,
            },
          },
          createdBy: {
            connect: {
              id: createdById,
            },
          },
        });

      for (const item of data.items) {
        const product = productMap.get(item.productId)!;

        await challanRepository.createChallanItem(tx, {
          challanId: challan.id,
          productId: product.id,
          quantity: item.quantity,
          productName: product.name,
          sku: product.sku,
          unitPrice: product.sellingPrice,
        });

        await challanRepository.updateProductStock(
          tx,
          product.id,
          product.currentStock - item.quantity
        );

        await challanRepository.createStockLog(tx, {
          quantity: item.quantity,
          movement: MovementType.OUT,
          reason: `Challan ${challan.challanNumber}`,
          product: {
            connect: {
              id: product.id,
            },
          },
          createdBy: {
            connect: {
              id: createdById,
            },
          },
        });
      }

      return challan;
    });
  }

  async findAll(query: ListChallanInput) {
    return challanRepository.findAll(
      query.page,
      query.limit,
      query.search,
      query.customerId,
      query.status
    );
  }

  async findById(id: string) {
    const challan = await challanRepository.findById(id);

    if (!challan) {
      throw new ApiError(404, "Challan not found");
    }

    return challan;
  }

  async cancel(id: string, userId: string) {
    const challan =
      await challanRepository.findByIdWithItems(id);

    if (!challan) {
      throw new ApiError(404, "Challan not found");
    }

    if (challan.status === ChallanStatus.CANCELLED) {
      throw new ApiError(
        400,
        "Challan already cancelled"
      );
    }

    return prisma.$transaction(async (tx) => {
      for (const item of challan.items) {
        const product = (
          await challanRepository.findProductsByIds([
            item.productId,
          ])
        )[0];

        await challanRepository.updateProductStock(
          tx,
          product.id,
          product.currentStock + item.quantity
        );

        await challanRepository.createStockLog(tx, {
          quantity: item.quantity,
          movement: MovementType.IN,
          reason: `Cancelled Challan ${challan.challanNumber}`,
          product: {
            connect: {
              id: product.id,
            },
          },
          createdBy: {
            connect: {
              id: userId,
            },
          },
        });
      }

      return challanRepository.updateStatus(
        tx,
        challan.id,
        ChallanStatus.CANCELLED
      );
    });
  }
}

export default new ChallanService();