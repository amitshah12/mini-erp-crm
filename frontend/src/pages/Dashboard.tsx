import {
  Boxes,
  FileText,
  Package,
  Users,
} from "lucide-react";

import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";

import StatCard from "@/features/dashboard/components/StatCard";
import InventoryStatsCard from "@/features/dashboard/components/InventoryStatsCard";

import { useDashboardSummary } from "@/features/dashboard/hooks/useDashboard";

export default function Dashboard() {
  const {
    data,
    isLoading,
    isError,
  } = useDashboardSummary();

  if (isLoading) {
    return (
      <LoadingState message="Loading dashboard..." />
    );
  }

  if (isError) {
    return (
      <ErrorState message="Failed to load dashboard." />
    );
  }

  const dashboard = data?.data;

  return (
    <div className="space-y-8">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-muted-foreground">
          Overview of your business operations.
        </p>
      </div>

      {/* Summary Cards */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Customers"
          value={
            dashboard?.summary.totalCustomers ?? 0
          }
          icon={Users}
        />

        <StatCard
          title="Products"
          value={
            dashboard?.summary.totalProducts ?? 0
          }
          icon={Package}
        />

        <StatCard
          title="Inventory"
          value={
            dashboard?.summary.totalInventoryItems ?? 0
          }
          icon={Boxes}
        />

        <StatCard
          title="Challans"
          value={
            dashboard?.summary.totalChallans ?? 0
          }
          icon={FileText}
        />
      </div>

      {/* Inventory + Low Stock */}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Inventory Chart */}

        <InventoryStatsCard
          inventory={
            dashboard?.inventory ?? {
              stockIn: 0,
              stockOut: 0,
            }
          }
        />

        {/* Low Stock */}

        <div className="rounded-xl border bg-background p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">
              Low Stock Products
            </h2>

            <p className="text-sm text-muted-foreground">
              Products that have reached their minimum stock level.
            </p>
          </div>

          <div className="space-y-3">
            {dashboard?.lowStockProducts?.length ? (
              dashboard.lowStockProducts.map(
                (product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div>
                      <p className="font-medium">
                        {product.name}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        {product.sku}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold text-red-600">
                        {product.currentStock}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        Minimum: {product.minimumStock}
                      </p>
                    </div>
                  </div>
                )
              )
            ) : (
              <p className="py-8 text-center text-muted-foreground">
                No low stock products.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Recent Challans */}

      <div className="rounded-xl border bg-background p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">
            Recent Challans
          </h2>

          <p className="text-sm text-muted-foreground">
            Latest delivery challans created in the system.
          </p>
        </div>

        <div className="space-y-3">
          {dashboard?.recentChallans?.length ? (
            dashboard.recentChallans.map(
              (challan) => (
                <div
                  key={challan.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <p className="font-medium">
                      {challan.challanNumber}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      {challan.customer.name}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {challan.status}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {challan.totalQuantity} items
                    </p>
                  </div>
                </div>
              )
            )
          ) : (
            <p className="py-8 text-center text-muted-foreground">
              No recent challans.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}