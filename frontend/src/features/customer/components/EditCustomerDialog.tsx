import { useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import CustomerForm from "./CustomerForm";

import type { Customer } from "../types";
import type { CustomerFormData } from "../customer.schema";
import { useUpdateCustomer } from "../hooks/useCustomerMutations";

interface EditCustomerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customer: Customer | null;
}

export default function EditCustomerDialog({
  open,
  onOpenChange,
  customer,
}: EditCustomerDialogProps) {
  const updateCustomer = useUpdateCustomer();

  const handleSubmit = (data: CustomerFormData) => {
    if (!customer) return;

    updateCustomer.mutate({
      id: customer.id,
      payload: data,
    });
  };

  useEffect(() => {
    if (updateCustomer.isSuccess) {
      onOpenChange(false);
      updateCustomer.reset();
    }
  }, [
    updateCustomer.isSuccess,
    updateCustomer,
    onOpenChange,
  ]);

  if (!customer) return null;

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Edit Customer</DialogTitle>
        </DialogHeader>

        <CustomerForm
          initialValues={customer}
          onSubmit={handleSubmit}
          isLoading={updateCustomer.isPending}
        />
      </DialogContent>
    </Dialog>
  );
}