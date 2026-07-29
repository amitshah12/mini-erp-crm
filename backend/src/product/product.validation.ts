import { z } from "zod";
import { ProductCategory, Unit } from "@prisma/client";

export const createProductSchema = z.object({
  name: z.string().trim().min(2).max(100),

  sku: z.string().trim().min(2).max(50),

  barcode: z.string().trim().optional(),

  category: z.nativeEnum(ProductCategory),

  brand: z.string().trim().min(2).max(100),

  unit: z.nativeEnum(Unit),

  purchasePrice: z.number().positive(),

  sellingPrice: z.number().positive(),

  currentStock: z.number().int().min(0).default(0),

  minimumStock: z.number().int().min(0).default(0),

  description: z.string().trim().optional(),
});

export type CreateProductInput =
  z.infer<typeof createProductSchema>;

export const updateProductSchema = createProductSchema.partial();

export type UpdateProductInput =
  z.infer<typeof updateProductSchema>;

export const listProductsSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),

  limit: z.coerce.number().int().min(1).max(100).default(10),

  search: z.string().trim().optional(),

  category: z.nativeEnum(ProductCategory).optional(),
});

export type ListProductsInput =
  z.infer<typeof listProductsSchema>;

export const productIdSchema = z.object({
  id: z.string().min(1),
});

export type ProductIdInput =
  z.infer<typeof productIdSchema>;