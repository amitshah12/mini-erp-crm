import { useState } from "react";

import { Button } from "@/components/ui/button";

import CreateProductDialog from "@/features/product/components/CreateProductDialog";
import EditProductDialog from "@/features/product/components/EditProductDialog";
import DeleteProductDialog from "@/features/product/components/DeleteProductDialog";
import ProductTable from "@/features/product/components/ProductTable";

import { useProducts } from "@/features/product/hooks/useProducts";

import type { Product } from "@/features/product/types";

export default function Products() {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const { data, isLoading, isError } =
    useProducts();

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setEditOpen(true);
  };

  const handleDelete = (product: Product) => {
    setSelectedProduct(product);
    setDeleteOpen(true);
  };

  if (isLoading) {
    return <p>Loading products...</p>;
  }

  if (isError) {
    return <p>Failed to load products.</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Products
          </h1>

          <p className="text-muted-foreground">
            Manage all products.
          </p>
        </div>

        <Button onClick={() => setOpen(true)}>
          + Add Product
        </Button>
      </div>

      <CreateProductDialog
        open={open}
        onOpenChange={setOpen}
      />

      <EditProductDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        product={selectedProduct}
      />

      <DeleteProductDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        product={selectedProduct}
      />

      <ProductTable
        products={data?.data.items ?? []}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}