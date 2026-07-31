import {
  Boxes,
  FileText,
  Package,
  Users,
} from "lucide-react";

import StatCard from "@/features/dashboard/components/StatCard";
import { useDashboardSummary } from "@/features/dashboard/hooks/useDashboard";

export default function Dashboard() {
  const { data, isLoading } = useDashboardSummary();

  if (isLoading) {
    return <p>Loading dashboard...</p>;
  }

  const summary = data?.data;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-muted-foreground">
          Welcome back!
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Customers"
          value={summary?.totalCustomers ?? 0}
          icon={Users}
        />

        <StatCard
          title="Products"
          value={summary?.totalProducts ?? 0}
          icon={Package}
        />

        <StatCard
          title="Inventory"
          value={summary?.totalInventoryItems ?? 0}
          icon={Boxes}
        />

        <StatCard
          title="Challans"
          value={summary?.totalChallans ?? 0}
          icon={FileText}
        />
      </div>
    </div>
  );
}