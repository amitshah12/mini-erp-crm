import { useState } from "react";

import { Button } from "@/components/ui/button";

import { useProducts } from "@/features/product/hooks/useProducts";
import type { Product } from "@/features/product/types";

import InventoryTable from "@/features/inventory/components/InventoryTable";
import StockInDialog from "@/features/inventory/components/StockInDialog";
import StockOutDialog from "@/features/inventory/components/StockOutDialog";

export default function Inventory() {
  const [stockInOpen, setStockInOpen] =
    useState(false);

  const [stockOutOpen, setStockOutOpen] =
    useState(false);

  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const { data, isLoading, isError } =
    useProducts();

  const handleStockIn = (
    product: Product
  ) => {
    setSelectedProduct(product);
    setStockInOpen(true);
  };

  const handleStockOut = (
    product: Product
  ) => {
    setSelectedProduct(product);
    setStockOutOpen(true);
  };

  if (isLoading) {
    return (
      <p>Loading inventory...</p>
    );
  }

  if (isError) {
    return (
      <p>
        Failed to load inventory.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Inventory
          </h1>

          <p className="text-muted-foreground">
            Manage product stock.
          </p>
        </div>

        <Button
          variant="outline"
          disabled
        >
          Stock History
        </Button>
      </div>

      <StockInDialog
        open={stockInOpen}
        onOpenChange={setStockInOpen}
        product={selectedProduct}
      />

      <StockOutDialog
        open={stockOutOpen}
        onOpenChange={setStockOutOpen}
        product={selectedProduct}
      />

      <InventoryTable
        products={data?.data.items ?? []}
        onStockIn={handleStockIn}
        onStockOut={handleStockOut}
      />
    </div>
  );
}