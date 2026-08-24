import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { Product } from "@/features/product/types";

interface ProductSelectorProps {
  products: Product[];

  value?: string;

  onChange: (productId: string) => void;

  disabled?: boolean;
}

export default function ProductSelector({
  products,
  value,
  onChange,
  disabled = false,
}: ProductSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">
        Product
      </label>

      <Select
        value={value}
        onValueChange={(value) => {
          if (value) {
            onChange(value);
          }
        }}
        disabled={disabled}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select product" />
        </SelectTrigger>

        <SelectContent>
          {products.map((product) => (
            <SelectItem
              key={product.id}
              value={product.id}
            >
              <div className="flex w-full items-center justify-between gap-4">
                <div className="flex flex-col">
                  <span className="font-medium">
                    {product.name}
                  </span>

                  <span className="text-xs text-muted-foreground">
                    SKU: {product.sku}
                  </span>
                </div>

                <div className="text-right text-xs text-muted-foreground">
                  <div>
                    Stock: {product.currentStock}
                  </div>

                  <div>
                    ₹{product.sellingPrice}
                  </div>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}