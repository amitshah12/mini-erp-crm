import { CustomerStatus, CustomerType } from "@prisma/client";
import { z } from "zod";

export const createCustomerSchema = z.object({
    name: z.string().trim().min(3).max(100),

    mobile: z.string().trim().min(7).max(20),

    email: z.email().optional(),

    businessName: z.string().trim().min(2).max(100),

    gstNumber: z.string().trim().optional(),

    customerType: z.nativeEnum(CustomerType),

    status: z
        .nativeEnum(CustomerStatus)
        .default(CustomerStatus.LEAD),

    address: z.string().trim().min(5).max(255),

    followUpDate: z.coerce.date().optional(),
});

export type CreateCustomerInput = z.infer<
    typeof createCustomerSchema
>;

export const listCustomersSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),

  limit: z.coerce.number().int().min(1).max(100).default(10),

  search: z.string().trim().optional(),

  status: z.nativeEnum(CustomerStatus).optional(),

  customerType: z.nativeEnum(CustomerType).optional(),
});

export type ListCustomersInput =
  z.infer<typeof listCustomersSchema>;