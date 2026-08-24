import type { RecentChallan } from "../types";

interface RecentChallansCardProps {
  challans: RecentChallan[];
}

export default function RecentChallansCard({
  challans,
}: RecentChallansCardProps) {
  return (
    <div className="rounded-xl border p-6">
      <h2 className="mb-4 text-xl font-semibold">
        Recent Challans
      </h2>

      {challans.length === 0 ? (
        <p className="text-muted-foreground">
          No recent challans.
        </p>
      ) : (
        <div className="space-y-3">
          {challans.map(
            (challan: RecentChallan) => (
              <div
                key={challan.id}
                className="flex items-center justify-between border-b pb-2 last:border-0"
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
          )}
        </div>
      )}
    </div>
  );
}