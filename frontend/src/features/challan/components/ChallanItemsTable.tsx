import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Trash2 } from "lucide-react";

export interface ChallanItemRow {
  productId: string;

  productName: string;

  sku: string;

  quantity: number;

  unitPrice: number;
}

interface ChallanItemsTableProps {
  items: ChallanItemRow[];

  onQuantityChange: (
    productId: string,
    quantity: number
  ) => void;

  onRemove: (productId: string) => void;
}

export default function ChallanItemsTable({
  items,
  onQuantityChange,
  onRemove,
}: ChallanItemsTableProps) {
  const totalQuantity = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>

            <TableHead>SKU</TableHead>

            <TableHead className="w-32">
              Quantity
            </TableHead>

            <TableHead>
              Unit Price
            </TableHead>

            <TableHead>
              Total
            </TableHead>

            <TableHead className="text-right">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {items.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center"
              >
                No products added.
              </TableCell>
            </TableRow>
          ) : (
            items.map((item) => (
              <TableRow
                key={item.productId}
              >
                <TableCell className="font-medium">
                  {item.productName}
                </TableCell>

                <TableCell>
                  {item.sku}
                </TableCell>

                <TableCell>
                  <Input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      onQuantityChange(
                        item.productId,
                        Number(e.target.value)
                      )
                    }
                  />
                </TableCell>

                <TableCell>
                  ₹
                  {item.unitPrice.toFixed(2)}
                </TableCell>

                <TableCell>
                  ₹
                  {(
                    item.quantity *
                    item.unitPrice
                  ).toFixed(2)}
                </TableCell>

                <TableCell className="text-right">
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() =>
                      onRemove(
                        item.productId
                      )
                    }
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {items.length > 0 && (
        <div className="flex justify-end">
          <div className="rounded-lg border px-4 py-3">
            <div className="text-sm text-muted-foreground">
              Total Quantity
            </div>

            <div className="text-xl font-bold">
              {totalQuantity}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}