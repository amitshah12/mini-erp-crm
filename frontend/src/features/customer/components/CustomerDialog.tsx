import { useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import CustomerForm from "./CustomerForm";

import { type CustomerFormData } from "../customer.schema";
import { useCreateCustomer } from "../hooks/useCustomerMutations";

interface CustomerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CustomerDialog({
  open,
  onOpenChange,
}: CustomerDialogProps) {
  const createCustomer = useCreateCustomer();

  const handleSubmit = (data: CustomerFormData) => {
    createCustomer.mutate(data);
  };

  useEffect(() => {
    if (createCustomer.isSuccess) {
      onOpenChange(false);
      createCustomer.reset();
    }
  }, [
    createCustomer.isSuccess,
    createCustomer,
    onOpenChange,
  ]);

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            Add Customer
          </DialogTitle>
        </DialogHeader>

        <CustomerForm
          onSubmit={handleSubmit}
          isLoading={createCustomer.isPending}
        />
      </DialogContent>
    </Dialog>
  );
}