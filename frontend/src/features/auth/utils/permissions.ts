import type { User } from "../types";

export type UserRole = User["role"];

export function hasRole(
  user: User | null,
  ...roles: UserRole[]
) {
  if (!user) {
    return false;
  }

  return roles.includes(user.role);
}

export function canAccessDashboard(
  user: User | null
) {
  return hasRole(user, "ADMIN", "SALES");
}

export function canAccessCustomers(
  user: User | null
) {
  return hasRole(user, "ADMIN", "SALES");
}

export function canAccessProducts(
  user: User | null
) {
  return hasRole(user, "ADMIN", "SALES");
}

export function canAccessInventory(
  user: User | null
) {
  return hasRole(user, "ADMIN", "SALES");
}

export function canAccessChallans(
  user: User | null
) {
  return hasRole(
    user,
    "ADMIN",
    "SALES",
    "ACCOUNTS"
  );
}

export function canCreateChallan(
  user: User | null
) {
  return hasRole(user, "ADMIN", "SALES");
}

export function canCancelChallan(
  user: User | null
) {
  return hasRole(user, "ADMIN");
}

export function canEditCustomer(
  user: User | null
) {
  return hasRole(user, "ADMIN", "SALES");
}

export function canDeleteCustomer(
  user: User | null
) {
  return hasRole(user, "ADMIN");
}

export function canEditProduct(
  user: User | null
) {
  return hasRole(user, "ADMIN", "SALES");
}

export function canDeleteProduct(
  user: User | null
) {
  return hasRole(user, "ADMIN");
}