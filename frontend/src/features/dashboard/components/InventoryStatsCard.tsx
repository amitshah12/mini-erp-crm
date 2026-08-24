import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { InventorySummary } from "../types";

interface InventoryStatsCardProps {
  inventory: InventorySummary;
}

export default function InventoryStatsCard({
  inventory,
}: InventoryStatsCardProps) {
  const chartData = [
    {
      name: "Stock In",
      quantity: inventory.stockIn,
    },
    {
      name: "Stock Out",
      quantity: inventory.stockOut,
    },
  ];

  return (
    <div className="rounded-xl border bg-background p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">
          Inventory Movement
        </h2>

        <p className="text-sm text-muted-foreground">
          Overview of stock movement across the system.
        </p>
      </div>

      <div className="h-[280px] w-full">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart
            data={chartData}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 10,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              allowDecimals={false}
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              cursor={{ opacity: 0.1 }}
            />

            <Bar
              dataKey="quantity"
              name="Quantity"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="rounded-lg border p-3">
          <p className="text-sm text-muted-foreground">
            Total Stock In
          </p>

          <p className="mt-1 text-xl font-semibold">
            {inventory.stockIn}
          </p>
        </div>

        <div className="rounded-lg border p-3">
          <p className="text-sm text-muted-foreground">
            Total Stock Out
          </p>

          <p className="mt-1 text-xl font-semibold">
            {inventory.stockOut}
          </p>
        </div>
      </div>
    </div>
  );
}