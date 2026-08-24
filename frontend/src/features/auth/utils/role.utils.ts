import type { User } from "../types";

export type UserRole = User["role"];

export function hasRole(
  userRole: UserRole | undefined,
  allowedRoles: UserRole[]
) {
  if (!userRole) {
    return false;
  }

  return allowedRoles.includes(userRole);
}