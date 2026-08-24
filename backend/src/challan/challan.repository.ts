import {
    ChallanStatus,
    Prisma,
} from "@prisma/client";
import { prisma } from "../config/prisma";

class ChallanRepository {
    async findCustomerById(customerId: string) {
        return prisma.customer.findFirst({
            where: {
                id: customerId,
                isDeleted: false,
            },
        });
    }

    async findProductsByIds(productIds: string[]) {
        return prisma.product.findMany({
            where: {
                id: {
                    in: productIds,
                },
                isDeleted: false,
            },
        });
    }

    async createChallan(
        tx: Prisma.TransactionClient,
        data: Prisma.ChallanCreateInput
    ) {
        return tx.challan.create({
            data,
        });
    }

    async createChallanItem(
        tx: Prisma.TransactionClient,
        data: Prisma.ChallanItemUncheckedCreateInput
    ) {
        return tx.challanItem.create({
            data,
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
        data: Prisma.StockLogCreateInput
    ) {
        return tx.stockLog.create({
            data,
        });
    }

    async findAll(
        page: number,
        limit: number,
        search?: string,
        customerId?: string,
        status?: ChallanStatus
    ) {
        const where: Prisma.ChallanWhereInput = {};

        if (search) {
            where.OR = [
                {
                    challanNumber: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
                {
                    customer: {
                        name: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                },
            ];
        }

        if (customerId) {
            where.customerId = customerId;
        }

        if (status) {
            where.status = status;
        }

        const [challans, total] = await prisma.$transaction([
            prisma.challan.findMany({
                where,
                include: {
                    customer: true,
                    createdBy: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                    items: true,
                },
                orderBy: {
                    createdAt: "desc",
                },
                skip: (page - 1) * limit,
                take: limit,
            }),

            prisma.challan.count({
                where,
            }),
        ]);

        return {
            challans,
            total,
        };
    }

    async findById(id: string) {
        return prisma.challan.findUnique({
            where: {
                id,
            },
            include: {
                customer: true,
                createdBy: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                items: true,
            },
        });
    }

    async updateStatus(
        tx: Prisma.TransactionClient,
        id: string,
        status: ChallanStatus
    ) {
        return tx.challan.update({
            where: {
                id,
            },
            data: {
                status,
            },
        });
    }

    async findByChallanNumber(challanNumber: string) {
        return prisma.challan.findUnique({
            where: {
                challanNumber,
            },
        });
    }

    async findByIdWithItems(id: string) {
        return prisma.challan.findUnique({
            where: {
                id,
            },
            include: {
                items: true,
            },
        });
    }

}

export default new ChallanRepository();