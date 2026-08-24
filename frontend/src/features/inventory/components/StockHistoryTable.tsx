import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { StockHistoryItem } from "../types";

interface StockHistoryTableProps {
  items: StockHistoryItem[];
}

export default function StockHistoryTable({
  items,
}: StockHistoryTableProps) {
  return (
    <div className="overflow-x-auto rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>

            <TableHead>Product</TableHead>

            <TableHead>SKU</TableHead>

            <TableHead>Movement</TableHead>

            <TableHead className="text-center">
              Quantity
            </TableHead>

            <TableHead>Reason</TableHead>

            <TableHead>Created By</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {items.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center"
              >
                No stock history found.
              </TableCell>
            </TableRow>
          ) : (
            items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  {new Date(
                    item.createdAt
                  ).toLocaleString()}
                </TableCell>

                <TableCell className="font-medium">
                  {item.product.name}
                </TableCell>

                <TableCell>
                  {item.product.sku}
                </TableCell>

                <TableCell>
                  <span
                    className={
                      item.movement === "IN"
                        ? "font-semibold text-green-600"
                        : "font-semibold text-red-600"
                    }
                  >
                    {item.movement === "IN"
                      ? "Stock In"
                      : "Stock Out"}
                  </span>
                </TableCell>

                <TableCell className="text-center font-medium">
                  {item.quantity}
                </TableCell>

                <TableCell>
                  {item.reason || "-"}
                </TableCell>

                <TableCell>
                  {item.createdBy.name}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}