import { useState } from "react";

import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Pagination from "@/components/common/Pagination";
import SearchInput from "@/components/common/SearchInput";

import { useDebounce } from "@/hooks/useDebounce";

import CreateProductDialog from "@/features/product/components/CreateProductDialog";
import EditProductDialog from "@/features/product/components/EditProductDialog";
import DeleteProductDialog from "@/features/product/components/DeleteProductDialog";
import ProductTable from "@/features/product/components/ProductTable";

import { useProducts } from "@/features/product/hooks/useProducts";

import type {
  Product,
  ProductCategory,
} from "@/features/product/types";

export default function Products() {
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const debouncedSearch =
    useDebounce(search);

  const [category, setCategory] =
    useState<ProductCategory>();

  const [open, setOpen] = useState(false);

  const [editOpen, setEditOpen] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const {
    data,
    isLoading,
    isError,
  } = useProducts(
    page,
    10,
    debouncedSearch,
    category
  );

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

      <div className="flex flex-wrap gap-4 items-center">
        <SearchInput
          value={search}
          placeholder="Search products..."
          onChange={(value) => {
            setPage(1);
            setSearch(value);
          }}
        />

        <Select
          value={category ?? "ALL"}
          onValueChange={(value) => {
            setPage(1);

            setCategory(
              value === "ALL"
                ? undefined
                : (value as ProductCategory)
            );
          }}
        >
          <SelectTrigger className="w-52">
            <SelectValue placeholder="Category" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="ALL">
              All Categories
            </SelectItem>

            <SelectItem value="ELECTRONICS">
              Electronics
            </SelectItem>

            <SelectItem value="GROCERY">
              Grocery
            </SelectItem>

            <SelectItem value="STATIONERY">
              Stationery
            </SelectItem>

            <SelectItem value="CLOTHING">
              Clothing
            </SelectItem>

            <SelectItem value="MEDICAL">
              Medical
            </SelectItem>

            <SelectItem value="OTHER">
              Other
            </SelectItem>
          </SelectContent>
        </Select>
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

      <Pagination
        page={data?.data.pagination.page ?? page}
        totalPages={
          data?.data.pagination.totalPages ?? 1
        }
        onPageChange={setPage}
      />
    </div>
  );
}