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