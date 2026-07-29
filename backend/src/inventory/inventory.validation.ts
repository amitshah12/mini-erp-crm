import { z } from "zod";
import { MovementType } from "@prisma/client";

export const stockMovementSchema = z.object({
    productId: z.string().cuid("Invalid product ID"),

    quantity: z
        .coerce.number()
        .int("Quantity must be an integer")
        .positive("Quantity must be greater than 0"),

    reason: z
        .string()
        .trim()
        .min(3, "Reason must be at least 3 characters")
        .max(255, "Reason cannot exceed 255 characters"),
});

export const stockHistorySchema = z.object({
    page: z.coerce.number().int().positive().default(1),

    limit: z.coerce.number().int().positive().max(100).default(10),

    productId: z.string().cuid().optional(),

    movement: z.nativeEnum(MovementType).optional(),
});

export type StockMovementInput = z.infer<typeof stockMovementSchema>;
export type StockHistoryInput = z.infer<typeof stockHistorySchema>;