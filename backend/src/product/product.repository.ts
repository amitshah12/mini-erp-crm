import { PrismaClient, Prisma, ProductCategory } from "@prisma/client";

const prisma = new PrismaClient();

export class ProductRepository {
  async create(data: Prisma.ProductCreateInput) {
    return prisma.product.create({
      data,
    });
  }

  async findById(id: string) {
    return prisma.product.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });
  }

  async findBySku(sku: string) {
    return prisma.product.findUnique({
      where: {
        sku,
      },
    });
  }

  async findByBarcode(barcode: string) {
    return prisma.product.findFirst({
      where: {
        barcode,
      },
    });
  }

  async findAll(
    page: number,
    limit: number,
    search?: string,
    category?: ProductCategory
  ) {
    const where: Prisma.ProductWhereInput = {
      isDeleted: false,
    };

    if (search) {
      where.OR = [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          sku: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          brand: {
            contains: search,
            mode: "insensitive",
          },
        },
      ];
    }

    if (category) {
      where.category = category;
    }

    const [products, total] = await prisma.$transaction([
      prisma.product.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.product.count({
        where,
      }),
    ]);

    return { products, total };
  }

  async update(id: string, data: Prisma.ProductUpdateInput) {
    return prisma.product.update({
      where: {
        id,
      },
      data,
    });
  }

  async softDelete(id: string) {
    return prisma.product.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
      },
    });
  }
}