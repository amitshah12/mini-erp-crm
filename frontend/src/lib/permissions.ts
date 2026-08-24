import type { User } from "@/features/auth/types";

export function hasRole(
  user: User | null,
  ...roles: User["role"][]
) {
  if (!user) {
    return false;
  }

  return roles.includes(user.role);
}

export function canManageCustomers(
  user: User | null
) {
  return hasRole(user, "ADMIN", "SALES");
}

export function canDeleteCustomers(
  user: User | null
) {
  return hasRole(user, "ADMIN");
}

export function canManageProducts(
  user: User | null
) {
  return hasRole(user, "ADMIN", "SALES");
}

export function canDeleteProducts(
  user: User | null
) {
  return hasRole(user, "ADMIN");
}

export function canManageInventory(
  user: User | null
) {
  return hasRole(user, "ADMIN", "SALES");
}

export function canManageChallans(
  user: User | null
) {
  return hasRole(user, "ADMIN", "SALES");
}

export function canCancelChallans(
  user: User | null
) {
  return hasRole(user, "ADMIN");
}