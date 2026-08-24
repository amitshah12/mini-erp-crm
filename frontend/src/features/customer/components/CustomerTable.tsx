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
  Pencil,
  Trash2,
} from "lucide-react";

import { useAuthStore } from "@/features/auth/store/auth.store";
import { hasRole } from "@/features/auth/utils/role.utils";

import type { Customer } from "../types";

import CustomerStatusBadge from "./CustomerStatusBadge";

interface CustomerTableProps {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
}

export default function CustomerTable({
  customers,
  onEdit,
  onDelete,
}: CustomerTableProps) {
  const user = useAuthStore(
    (state) => state.user
  );

  const canEdit = hasRole(
    user?.role,
    ["ADMIN", "SALES"]
  );

  const canDelete = hasRole(
    user?.role,
    ["ADMIN"]
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>

          <TableHead>Business</TableHead>

          <TableHead>Mobile</TableHead>

          <TableHead>Type</TableHead>

          <TableHead>Status</TableHead>

          <TableHead className="text-right">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {customers.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={6}
              className="text-center"
            >
              No customers found.
            </TableCell>
          </TableRow>
        ) : (
          customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell className="font-medium">
                {customer.name}
              </TableCell>

              <TableCell>
                {customer.businessName}
              </TableCell>

              <TableCell>
                {customer.mobile}
              </TableCell>

              <TableCell>
                {customer.customerType}
              </TableCell>

              <TableCell>
                <CustomerStatusBadge
                  status={customer.status}
                />
              </TableCell>

              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  {canEdit && (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        onEdit(customer)
                      }
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  )}

                  {canDelete && (
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() =>
                        onDelete(customer)
                      }
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}