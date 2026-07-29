import { prisma } from "../config/prisma";
import { CreateCustomerInput } from "./customer.validation";
import { Prisma } from "@prisma/client";
import { ListCustomersInput } from "./customer.validation";

export class CustomerRepository {
  async create(data: CreateCustomerInput) {
    return prisma.customer.create({
      data,
    });
  }

  async findByEmail(email: string) {
    return prisma.customer.findFirst({
      where: {
        email,
      },
    });
  }

  async findById(id: string) {
    return prisma.customer.findUnique({
      where: {
        id,
      },
    });
  }

  async findAll(filters: ListCustomersInput) {
    const {
      page,
      limit,
      search,
      status,
      customerType,
    } = filters;

    const where: Prisma.CustomerWhereInput = {};

    if (search) {
      where.OR = [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          businessName: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: search,
            mode: "insensitive",
          },
        },
      ];
    }

    if (status) {
      where.status = status;
    }

    if (customerType) {
      where.customerType = customerType;
    }

    const [customers, total] =
      await prisma.$transaction([
        prisma.customer.findMany({
          where,
          skip: (page - 1) * limit,
          take: limit,
          orderBy: {
            createdAt: "desc",
          },
        }),

        prisma.customer.count({
          where,
        }),
      ]);

    return {
      customers,
      total,
    };
  }
}