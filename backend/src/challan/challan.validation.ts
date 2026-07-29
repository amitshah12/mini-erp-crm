import { ChallanStatus } from "@prisma/client";
import { z } from "zod";

export const createChallanSchema = z.object({
  customerId: z.string().cuid("Invalid customer ID"),

  items: z
    .array(
      z.object({
        productId: z.string().cuid("Invalid product ID"),

        quantity: z.coerce
          .number()
          .int()
          .positive("Quantity must be greater than 0"),
      })
    )
    .min(1, "At least one product is required"),
});

export const updateChallanStatusSchema = z.object({
  status: z.nativeEnum(ChallanStatus),
});

export const listChallanSchema = z.object({
  page: z.coerce.number().int().positive().default(1),

  limit: z.coerce.number().int().positive().max(100).default(10),

  customerId: z.string().cuid().optional(),

  status: z.nativeEnum(ChallanStatus).optional(),
});

export type CreateChallanInput = z.infer<typeof createChallanSchema>;
export type UpdateChallanStatusInput = z.infer<
  typeof updateChallanStatusSchema
>;
export type ListChallanInput = z.infer<typeof listChallanSchema>;

export const challanIdParamSchema = z.object({
  id: z.string().cuid("Invalid challan ID"),
});