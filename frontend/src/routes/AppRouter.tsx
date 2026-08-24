import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import DashboardLayout from "@/components/layout/DashboardLayout";

import LoadingState from "@/components/common/LoadingState";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import RoleRoute from "./RoleRoute";

const LoginPage = lazy(
  () => import("@/features/auth/pages/LoginPage")
);

const Unauthorized = lazy(
  () => import("@/pages/Unauthorized")
);

const Dashboard = lazy(
  () => import("@/pages/Dashboard")
);

const Customers = lazy(
  () => import("@/pages/Customers")
);

const Products = lazy(
  () => import("@/pages/Products")
);

const Inventory = lazy(
  () => import("@/pages/Inventory")
);

const Challans = lazy(
  () => import("@/pages/Challans")
);

const NoModules = lazy(
  () => import("@/pages/NoModules")
);

export default function AppRouter() {
  return (
    <Suspense
      fallback={
        <LoadingState message="Loading page..." />
      }
    >
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoute />}>
          <Route
            path="/login"
            element={<LoginPage />}
          />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          {/* Unauthorized page */}
          <Route
            path="/unauthorized"
            element={<Unauthorized />}
          />

          <Route
            path="/no-modules"
            element={<NoModules />}
          />

          {/* Application Layout */}
          <Route element={<DashboardLayout />}>
            {/* ADMIN and SALES */}
            <Route
              element={
                <RoleRoute
                  allowedRoles={[
                    "ADMIN",
                    "SALES",
                  ]}
                />
              }
            >
              <Route
                path="/"
                element={<Dashboard />}
              />

              <Route
                path="/customers"
                element={<Customers />}
              />

              <Route
                path="/products"
                element={<Products />}
              />

              <Route
                path="/inventory"
                element={<Inventory />}
              />
            </Route>

            {/* ADMIN, SALES and ACCOUNTS */}
            <Route
              element={
                <RoleRoute
                  allowedRoles={[
                    "ADMIN",
                    "SALES",
                    "ACCOUNTS",
                  ]}
                />
              }
            >
              <Route
                path="/challans"
                element={<Challans />}
              />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}