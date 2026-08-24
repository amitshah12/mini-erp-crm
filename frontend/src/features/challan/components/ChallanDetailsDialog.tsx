import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type { Challan } from "../types";

interface ChallanDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  challan: Challan | null;
}

function formatStatus(status: string) {
  return (
    status.charAt(0) +
    status.slice(1).toLowerCase()
  );
}

export default function ChallanDetailsDialog({
  open,
  onOpenChange,
  challan,
}: ChallanDetailsDialogProps) {
  if (!challan) return null;

  const totalAmount = challan.items.reduce(
    (total, item) =>
      total + item.quantity * item.unitPrice,
    0
  );

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            Challan Details
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm text-muted-foreground">
              Challan Number
            </p>

            <p className="font-semibold">
              {challan.challanNumber}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Status
            </p>

            <p className="font-semibold">
              {formatStatus(challan.status)}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Customer
            </p>

            <p className="font-semibold">
              {challan.customer.name}
            </p>

            <p className="text-sm text-muted-foreground">
              {challan.customer.businessName}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Created By
            </p>

            <p className="font-semibold">
              {challan.createdBy.name}
            </p>

            <p className="text-sm text-muted-foreground">
              {challan.createdBy.email}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Created At
            </p>

            <p className="font-semibold">
              {new Date(
                challan.createdAt
              ).toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Total Quantity
            </p>

            <p className="font-semibold">
              {challan.totalQuantity}
            </p>
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="mb-4 font-semibold">
            Products
          </h3>

          <div className="overflow-x-auto rounded-md border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="p-3 text-left">
                    Product
                  </th>

                  <th className="p-3 text-left">
                    SKU
                  </th>

                  <th className="p-3 text-center">
                    Quantity
                  </th>

                  <th className="p-3 text-right">
                    Unit Price
                  </th>

                  <th className="p-3 text-right">
                    Total
                  </th>
                </tr>
              </thead>

              <tbody>
                {challan.items.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b"
                  >
                    <td className="p-3">
                      {item.productName}
                    </td>

                    <td className="p-3">
                      {item.sku}
                    </td>

                    <td className="p-3 text-center">
                      {item.quantity}
                    </td>

                    <td className="p-3 text-right">
                      ₹
                      {item.unitPrice.toFixed(2)}
                    </td>

                    <td className="p-3 text-right">
                      ₹
                      {(
                        item.quantity *
                        item.unitPrice
                      ).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex justify-end">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">
                Total Amount
              </p>

              <p className="text-xl font-bold">
                ₹
                {totalAmount.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}