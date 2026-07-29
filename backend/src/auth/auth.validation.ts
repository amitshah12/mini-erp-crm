import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3),

  email: z.email(),

  password: z.string().min(6),

  role: z.enum([
    "ADMIN",
    "SALES",
    "WAREHOUSE",
    "ACCOUNTS",
  ]),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export type LoginInput = z.infer<typeof loginSchema>;