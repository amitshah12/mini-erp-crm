import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2, "Product name is required"),

  sku: z.string().min(2, "SKU is required"),

  barcode: z.string().optional(),

  category: z.enum([
    "ELECTRONICS",
    "GROCERY",
    "STATIONERY",
    "CLOTHING",
    "MEDICAL",
    "OTHER",
  ]),

  brand: z.string().min(2, "Brand is required"),

  unit: z.enum([
    "PIECE",
    "BOX",
    "KG",
    "LITER",
  ]),

  purchasePrice: z.coerce
    .number()
    .positive("Purchase price must be greater than 0"),

  sellingPrice: z.coerce
    .number()
    .positive("Selling price must be greater than 0"),

  currentStock: z.coerce
    .number()
    .min(0),

  minimumStock: z.coerce
    .number()
    .min(0),

  description: z.string().optional(),
});

export type ProductFormInput = z.input<typeof productSchema>;
export type ProductFormData = z.output<typeof productSchema>;