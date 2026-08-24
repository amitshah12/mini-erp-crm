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
  Eye,
  Ban,
} from "lucide-react";

import type {
  Challan,
} from "../types";

interface ChallanTableProps {
  challans: Challan[];

  onView: (challan: Challan) => void;

  onCancel: (challan: Challan) => void;
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString();
}

export default function ChallanTable({
  challans,
  onView,
  onCancel,
}: ChallanTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            Challan No.
          </TableHead>

          <TableHead>
            Customer
          </TableHead>

          <TableHead>
            Quantity
          </TableHead>

          <TableHead>
            Status
          </TableHead>

          <TableHead>
            Date
          </TableHead>

          <TableHead className="text-right">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {challans.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={6}
              className="text-center"
            >
              No challans found.
            </TableCell>
          </TableRow>
        ) : (
          challans.map((challan) => (
            <TableRow key={challan.id}>
              <TableCell className="font-medium">
                {challan.challanNumber}
              </TableCell>

              <TableCell>
                {challan.customer.businessName}
              </TableCell>

              <TableCell>
                {challan.totalQuantity}
              </TableCell>

              <TableCell>
                {challan.status}
              </TableCell>

              <TableCell>
                {formatDate(
                  challan.createdAt
                )}
              </TableCell>

              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      onView(challan)
                    }
                  >
                    <Eye className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="destructive"
                    size="icon"
                    disabled={
                      challan.status ===
                      "CANCELLED"
                    }
                    onClick={() =>
                      onCancel(challan)
                    }
                  >
                    <Ban className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}