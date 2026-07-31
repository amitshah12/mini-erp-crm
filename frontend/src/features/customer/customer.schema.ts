import { z } from "zod";

export const customerSchema = z.object({
  name: z.string().min(3, "Name is required and Name must be at least 3 characters"),

  mobile: z
    .string()
    .regex(/^[0-9]{10}$/, "Mobile number must be 10 digits"),

  email: z.string().email("Invalid email address"),

  businessName: z.string().min(2, "Business name is required"),

  gstNumber: z.string().min(5, "GST Number is required"),

  customerType: z.enum(["RETAIL", "WHOLESALE"]),

  status: z.enum(["LEAD", "ACTIVE", "INACTIVE"]),

  address: z.string().min(2, "Address is required"),
});

export type CustomerFormData = z.infer<typeof customerSchema>;