import jwt, {
  Secret,
  SignOptions,
} from "jsonwebtoken";

import { Role } from "@prisma/client";
import { env } from "../config/env";

export interface JwtPayload {
  id: string;
  role: Role;
}

const JWT_SECRET: Secret =
  env.JWT_SECRET;

const JWT_EXPIRES_IN: SignOptions["expiresIn"] =
  env.JWT_EXPIRES_IN as SignOptions["expiresIn"];

export function generateToken(
  payload: JwtPayload
): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
}

export function verifyToken(
  token: string
): JwtPayload {
  return jwt.verify(
    token,
    JWT_SECRET
  ) as JwtPayload;
}