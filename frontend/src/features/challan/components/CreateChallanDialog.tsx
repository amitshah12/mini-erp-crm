import { useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import ChallanForm from "./ChallanForm";

import { useCustomers } from "@/features/customer/hooks/useCustomers";
import { useProducts } from "@/features/product/hooks/useProducts";

import { useCreateChallan } from "../hooks/useChallanMutations";
import type { CreateChallanRequest } from "../types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreateChallanDialog({
  open,
  onOpenChange,
}: Props) {
  const { data: customerData } = useCustomers();

  const { data: productData } = useProducts();

  const createChallan = useCreateChallan();

  const handleSubmit = (
    data: CreateChallanRequest
  ) => {
    createChallan.mutate(data);
  };

  useEffect(() => {
    if (createChallan.isSuccess) {
      onOpenChange(false);
      createChallan.reset();
    }
  }, [
    createChallan.isSuccess,
    createChallan,
    onOpenChange,
  ]);

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-5xl">
        <DialogHeader>
          <DialogTitle>
            Create Challan
          </DialogTitle>
        </DialogHeader>

        <ChallanForm
          customers={
            customerData?.data.items ?? []
          }
          products={
            productData?.data.items ?? []
          }
          onSubmit={handleSubmit}
          isLoading={createChallan.isPending}
        />
      </DialogContent>
    </Dialog>
  );
}