import { prisma } from "../config/prisma";
import { CreateCustomerInput } from "./customer.validation";

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
}