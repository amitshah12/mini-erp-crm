import { useEffect } from "react";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import type { Product } from "@/features/product/types";

import { useStockIn } from "../hooks/useInventoryMutations";

import type { StockMovementRequest } from "../types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
}

export default function StockInDialog({
  open,
  onOpenChange,
  product,
}: Props) {
  const stockIn = useStockIn();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<StockMovementRequest>({
    defaultValues: {
      productId: product?.id ?? "",
      quantity: 1,
      reason: "",
    },
  });

  useEffect(() => {
    if (product) {
      reset({
        productId: product.id,
        quantity: 1,
        reason: "",
      });
    }
  }, [product, reset]);

  useEffect(() => {
    if (stockIn.isSuccess) {
      stockIn.reset();
      onOpenChange(false);
    }
  }, [stockIn.isSuccess, stockIn.reset, onOpenChange]);

  if (!product) return null;

  const onSubmit = (data: StockMovementRequest) => {
    stockIn.mutate({
      ...data,
      productId: product.id,
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Stock In
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-1">
          <p className="font-medium">
            {product.name}
          </p>

          <p className="text-sm text-muted-foreground">
            Current Stock:{" "}
            {product.currentStock}
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div>
            <label className="text-sm font-medium">
              Quantity
            </label>

            <Input
              type="number"
              min={1}
              {...register("quantity", {
                valueAsNumber: true,
              })}
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              Reason
            </label>

            <Input
              {...register("reason")}
              placeholder="Purchase, Return..."
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={stockIn.isPending}
          >
            {stockIn.isPending
              ? "Updating..."
              : "Add Stock"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}