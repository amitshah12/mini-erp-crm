import { MovementType } from "@prisma/client";
import { prisma } from "../config/prisma";

class DashboardRepository {
  async getSummary() {
    const [
      totalCustomers,
      totalProducts,
      totalChallans,
      totalInventoryItems,
      stockIn,
      stockOut,
      products,
      recentChallans,
    ] = await prisma.$transaction([
      prisma.customer.count({
        where: {
          isDeleted: false,
        },
      }),

      prisma.product.count({
        where: {
          isDeleted: false,
        },
      }),

      prisma.challan.count(),

      prisma.product.aggregate({
        where: {
          isDeleted: false,
        },
        _sum: {
          currentStock: true,
        },
      }),

      prisma.stockLog.aggregate({
        where: {
          movement: MovementType.IN,
        },
        _sum: {
          quantity: true,
        },
      }),

      prisma.stockLog.aggregate({
        where: {
          movement: MovementType.OUT,
        },
        _sum: {
          quantity: true,
        },
      }),

      prisma.product.findMany({
        where: {
          isDeleted: false,
        },
        select: {
          id: true,
          name: true,
          sku: true,
          currentStock: true,
          minimumStock: true,
        },
        orderBy: {
          currentStock: "asc",
        },
      }),

      prisma.challan.findMany({
        take: 5,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          customer: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      }),
    ]);

    const lowStockProducts = products
      .filter(
        (product) =>
          product.currentStock <=
          product.minimumStock
      )
      .slice(0, 5);

    return {
      summary: {
        totalCustomers,
        totalProducts,
        totalChallans,
        totalInventoryItems:
          totalInventoryItems._sum.currentStock ?? 0,
      },

      inventory: {
        stockIn:
          stockIn._sum.quantity ?? 0,

        stockOut:
          stockOut._sum.quantity ?? 0,
      },

      lowStockProducts,

      recentChallans,
    };
  }

  async getLowStockProducts() {
    const products = await prisma.product.findMany({
      where: {
        isDeleted: false,
      },
      select: {
        id: true,
        name: true,
        sku: true,
        currentStock: true,
        minimumStock: true,
      },
      orderBy: {
        currentStock: "asc",
      },
    });

    return products.filter(
      (product) =>
        product.currentStock <=
        product.minimumStock
    );
  }

  async getRecentChallans(limit = 5) {
    return prisma.challan.findMany({
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        customer: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async getInventoryStats() {
    const [stockIn, stockOut] =
      await prisma.$transaction([
        prisma.stockLog.aggregate({
          where: {
            movement: MovementType.IN,
          },
          _sum: {
            quantity: true,
          },
        }),

        prisma.stockLog.aggregate({
          where: {
            movement: MovementType.OUT,
          },
          _sum: {
            quantity: true,
          },
        }),
      ]);

    return {
      stockIn:
        stockIn._sum.quantity ?? 0,

      stockOut:
        stockOut._sum.quantity ?? 0,
    };
  }
}

export default new DashboardRepository();