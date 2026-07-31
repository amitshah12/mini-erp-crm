import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

import {
  ArrowDown,
  ArrowUp,
} from "lucide-react";

import type { Product } from "@/features/product/types";

interface InventoryTableProps {
  products: Product[];

  onStockIn: (product: Product) => void;

  onStockOut: (product: Product) => void;
}

function formatCategory(category: string) {
  return (
    category.charAt(0) +
    category.slice(1).toLowerCase()
  );
}

function formatUnit(unit: string) {
  return (
    unit.charAt(0) +
    unit.slice(1).toLowerCase()
  );
}

function getStockStatus(
  current: number,
  minimum: number
) {
  if (current === 0) {
    return {
      label: "Out of Stock",
      className:
        "text-red-600 font-semibold",
    };
  }

  if (current <= minimum) {
    return {
      label: "Low Stock",
      className:
        "text-orange-600 font-semibold",
    };
  }

  return {
    label: "Healthy",
    className:
      "text-green-600 font-semibold",
  };
}

export default function InventoryTable({
  products,
  onStockIn,
  onStockOut,
}: InventoryTableProps) {
  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>SKU</TableHead>

            <TableHead>Product</TableHead>

            <TableHead>Category</TableHead>

            <TableHead>Unit</TableHead>

            <TableHead className="text-center">
              Current
            </TableHead>

            <TableHead className="text-center">
              Minimum
            </TableHead>

            <TableHead>Status</TableHead>

            <TableHead className="text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={8}
                className="text-center"
              >
                No products found.
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => {
              const status = getStockStatus(
                product.currentStock,
                product.minimumStock
              );

              return (
                <TableRow key={product.id}>
                  <TableCell>
                    {product.sku}
                  </TableCell>

                  <TableCell className="font-medium">
                    {product.name}
                  </TableCell>

                  <TableCell>
                    {formatCategory(
                      product.category
                    )}
                  </TableCell>

                  <TableCell>
                    {formatUnit(product.unit)}
                  </TableCell>

                  <TableCell className="text-center">
                    {product.currentStock}
                  </TableCell>

                  <TableCell className="text-center">
                    {product.minimumStock}
                  </TableCell>

                  <TableCell>
                    <span
                      className={
                        status.className
                      }
                    >
                      {status.label}
                    </span>
                  </TableCell>

                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <Button
                        size="icon"
                        onClick={() =>
                          onStockIn(product)
                        }
                      >
                        <ArrowDown className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          onStockOut(product)
                        }
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}