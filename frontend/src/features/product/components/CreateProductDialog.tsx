import { useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import ProductForm from "./ProductForm";

import type { ProductFormData } from "../product.schema";
import { useCreateProduct } from "../hooks/useProductMutations";

interface CreateProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreateProductDialog({
  open,
  onOpenChange,
}: CreateProductDialogProps) {
  const createProduct = useCreateProduct();

  const handleSubmit = (data: ProductFormData) => {
    createProduct.mutate(data);
  };

  useEffect(() => {
    if (createProduct.isSuccess) {
      onOpenChange(false);
      createProduct.reset();
    }
  }, [
    createProduct.isSuccess,
    createProduct,
    onOpenChange,
  ]);

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
        </DialogHeader>

        <ProductForm
          onSubmit={handleSubmit}
          isLoading={createProduct.isPending}
        />
      </DialogContent>
    </Dialog>
  );
}