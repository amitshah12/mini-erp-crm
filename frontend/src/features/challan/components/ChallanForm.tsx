import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";

import CustomerSelector from "./CustomerSelector";
import ProductSelector from "./ProductSelector";
import ChallanItemsTable, {
  type ChallanItemRow,
} from "./ChallanItemsTable";

import type { Customer } from "@/features/customer/types";
import type { Product } from "@/features/product/types";

import type {
  CreateChallanRequest,
} from "../types";

interface Props {
  customers: Customer[];

  products: Product[];

  isLoading?: boolean;

  onSubmit: (
    data: CreateChallanRequest
  ) => void;
}

interface FormValues {
  customerId: string;
}

export default function ChallanForm({
  customers,
  products,
  onSubmit,
  isLoading = false,
}: Props) {
  const {
    watch,
    setValue,
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      customerId: "",
    },
  });

  const customerId = watch("customerId");

  const [selectedProductId, setSelectedProductId] =
    useState("");

  const [items, setItems] = useState<
    ChallanItemRow[]
  >([]);

  const availableProducts = useMemo(() => {
    return products.filter(
      (product) =>
        !items.some(
          (item) =>
            item.productId === product.id
        )
    );
  }, [products, items]);

  useEffect(() => {
    if (!selectedProductId) return;

    const product = products.find(
      (p) => p.id === selectedProductId
    );

    if (!product) return;

    setItems((prev) => [
      ...prev,
      {
        productId: product.id,
        productName: product.name,
        sku: product.sku,
        quantity: 1,
        unitPrice: product.sellingPrice,
      },
    ]);

    setSelectedProductId("");
  }, [selectedProductId, products]);

  const updateQuantity = (
    productId: string,
    quantity: number
  ) => {
    setItems((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? {
              ...item,
              quantity:
                quantity < 1 ? 1 : quantity,
            }
          : item
      )
    );
  };

  const removeItem = (
    productId: string
  ) => {
    setItems((prev) =>
      prev.filter(
        (item) =>
          item.productId !== productId
      )
    );
  };

  const submit = () => {
    onSubmit({
      customerId,

      items: items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    });
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="space-y-6"
    >
      <CustomerSelector
        customers={customers}
        value={customerId}
        onChange={(value) =>
          setValue("customerId", value)
        }
      />

      <ProductSelector
        products={availableProducts}
        value={selectedProductId}
        onChange={setSelectedProductId}
      />

      <ChallanItemsTable
        items={items}
        onQuantityChange={
          updateQuantity
        }
        onRemove={removeItem}
      />

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={
            isLoading ||
            !customerId ||
            items.length === 0
          }
        >
          {isLoading
            ? "Creating..."
            : "Create Challan"}
        </Button>
      </div>
    </form>
  );
}