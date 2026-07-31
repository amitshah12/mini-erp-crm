import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Customer } from "../types";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  customerSchema,
  type CustomerFormData,
} from "../customer.schema";

interface Props {
  onSubmit: (data: CustomerFormData) => void;
  isLoading?: boolean;
  initialValues?: Customer;
}

export default function CustomerForm({
  onSubmit,
  isLoading = false,
  initialValues,
}: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),

    defaultValues: {
      name: initialValues?.name ?? "",
      businessName: initialValues?.businessName ?? "",
      mobile: initialValues?.mobile ?? "",
      email: initialValues?.email ?? "",
      gstNumber: initialValues?.gstNumber ?? "",
      address: initialValues?.address ?? "",
      customerType: initialValues?.customerType ?? "WHOLESALE",
      status: initialValues?.status ?? "LEAD",
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-2 gap-4"
    >
      {/* Name */}

      <div>
        <label className="text-sm font-medium">
          Customer Name
        </label>

        <Input
          {...register("name")}
          placeholder="ABC Traders"
        />

        {errors.name && (
          <p className="text-sm text-red-500 mt-1">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Business */}

      <div>
        <label className="text-sm font-medium">
          Business Name
        </label>

        <Input
          {...register("businessName")}
          placeholder="ABC Traders Pvt Ltd"
        />

        {errors.businessName && (
          <p className="text-sm text-red-500 mt-1">
            {errors.businessName.message}
          </p>
        )}
      </div>

      {/* Mobile */}

      <div>
        <label className="text-sm font-medium">
          Mobile
        </label>

        <Input
          {...register("mobile")}
          placeholder="9876543210"
        />

        {errors.mobile && (
          <p className="text-sm text-red-500 mt-1">
            {errors.mobile.message}
          </p>
        )}
      </div>

      {/* Email */}

      <div>
        <label className="text-sm font-medium">
          Email
        </label>

        <Input
          {...register("email")}
          placeholder="abc@example.com"
        />

        {errors.email && (
          <p className="text-sm text-red-500 mt-1">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* GST */}

      <div>
        <label className="text-sm font-medium">
          GST Number
        </label>

        <Input
          {...register("gstNumber")}
        />

        {errors.gstNumber && (
          <p className="text-sm text-red-500 mt-1">
            {errors.gstNumber.message}
          </p>
        )}
      </div>

      {/* Address */}

      <div>
        <label className="text-sm font-medium">
          Address
        </label>

        <Input
          {...register("address")}
        />

        {errors.address && (
          <p className="text-sm text-red-500 mt-1">
            {errors.address.message}
          </p>
        )}
      </div>

      {/* Customer Type */}

      <div>
        <label className="text-sm font-medium">
          Customer Type
        </label>

        <Select
          value={watch("customerType")}
          onValueChange={(value) =>
            setValue(
              "customerType",
              value as "RETAIL" | "WHOLESALE"
            )
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="WHOLESALE">
              Wholesale
            </SelectItem>

            <SelectItem value="RETAIL">
              Retail
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Status */}

      <div>
        <label className="text-sm font-medium">
          Status
        </label>

        <Select
          value={watch("status")}
          onValueChange={(value) =>
            setValue(
              "status",
              value as
              | "LEAD"
              | "ACTIVE"
              | "INACTIVE"
            )
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="LEAD">
              Lead
            </SelectItem>

            <SelectItem value="ACTIVE">
              Active
            </SelectItem>

            <SelectItem value="INACTIVE">
              Inactive
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Button */}

      <div className="col-span-2 flex justify-end">
        <Button
          type="submit"
          disabled={isLoading}
        >
          {isLoading
            ? "Saving..."
            : "Save Customer"}
        </Button>
      </div>
    </form>
  );
}