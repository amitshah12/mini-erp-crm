import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { Role } from "@prisma/client";

export interface JwtPayload {
  id: string;
  role: Role;
}

const JWT_SECRET: Secret =
  process.env.JWT_SECRET || "mini-erp-crm-super-secret-key";

const JWT_EXPIRES_IN: SignOptions["expiresIn"] =
  (process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"]) || "7d";

export function generateToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}