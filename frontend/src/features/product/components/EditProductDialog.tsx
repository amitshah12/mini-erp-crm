import { useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import ProductForm from "./ProductForm";

import type { Product } from "../types";
import type { ProductFormData } from "../product.schema";

import { useUpdateProduct } from "../hooks/useProductMutations";

interface EditProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
}

export default function EditProductDialog({
  open,
  onOpenChange,
  product,
}: EditProductDialogProps) {
  const updateProduct = useUpdateProduct();

  const handleSubmit = (data: ProductFormData) => {
    if (!product) return;

    updateProduct.mutate({
      id: product.id,
      payload: data,
    });
  };

  useEffect(() => {
    if (updateProduct.isSuccess) {
      onOpenChange(false);
      updateProduct.reset();
    }
  }, [
    updateProduct.isSuccess,
    updateProduct,
    onOpenChange,
  ]);

  if (!product) return null;

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>

        <ProductForm
          initialValues={product}
          onSubmit={handleSubmit}
          isLoading={updateProduct.isPending}
        />
      </DialogContent>
    </Dialog>
  );
}