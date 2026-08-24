import type { LowStockProduct } from "../types";

interface LowStockCardProps {
  products: LowStockProduct[];
}

export default function LowStockCard({
  products,
}: LowStockCardProps) {
  return (
    <div className="rounded-xl border p-6">
      <h2 className="mb-4 text-xl font-semibold">
        Low Stock Products
      </h2>

      {products.length === 0 ? (
        <p className="text-muted-foreground">
          No low stock products.
        </p>
      ) : (
        <div className="space-y-3">
          {products.map(
            (product: LowStockProduct) => (
              <div
                key={product.id}
                className="flex items-center justify-between border-b pb-2 last:border-0"
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
          )}
        </div>
      )}
    </div>
  );
}