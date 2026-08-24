import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { Customer } from "@/features/customer/types";

interface CustomerSelectorProps {
  customers: Customer[];

  value?: string;

  onChange: (customerId: string) => void;

  disabled?: boolean;
}

export default function CustomerSelector({
  customers,
  value,
  onChange,
  disabled = false,
}: CustomerSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">
        Customer
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
          <SelectValue placeholder="Select customer" />
        </SelectTrigger>

        <SelectContent>
          {customers.map((customer) => (
            <SelectItem
              key={customer.id}
              value={customer.id}
            >
              {customer.businessName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}