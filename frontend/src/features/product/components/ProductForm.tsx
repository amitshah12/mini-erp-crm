import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import type { Product } from "../types";

import {
    productSchema,
    type ProductFormInput,
    type ProductFormData,
} from "../product.schema";

interface Props {
    onSubmit: (data: ProductFormData) => void;
    isLoading?: boolean;
    initialValues?: Product;
}

export default function ProductForm({
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
    } = useForm<ProductFormInput, unknown, ProductFormData>({
        resolver: zodResolver(productSchema),

        defaultValues: {
            name: initialValues?.name ?? "",
            sku: initialValues?.sku ?? "",
            barcode: initialValues?.barcode ?? "",
            category: initialValues?.category ?? "OTHER",
            brand: initialValues?.brand ?? "",
            unit: initialValues?.unit ?? "PIECE",
            purchasePrice: initialValues?.purchasePrice ?? 0,
            sellingPrice: initialValues?.sellingPrice ?? 0,
            currentStock: initialValues?.currentStock ?? 0,
            minimumStock: initialValues?.minimumStock ?? 0,
            description: initialValues?.description ?? "",
        },
    });

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-4"
        >
            <div>
                <label className="text-sm font-medium">
                    Product Name
                </label>

                <Input
                    {...register("name")}
                    placeholder="Product name"
                />

                {errors.name && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.name.message}
                    </p>
                )}
            </div>

            <div>
                <label className="text-sm font-medium">
                    SKU
                </label>

                <Input
                    {...register("sku")}
                    placeholder="SKU"
                />

                {errors.sku && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.sku.message}
                    </p>
                )}
            </div>

            <div>
                <label className="text-sm font-medium">
                    Barcode
                </label>

                <Input
                    {...register("barcode")}
                    placeholder="Barcode"
                />

                {errors.barcode && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.barcode.message}
                    </p>
                )}
            </div>

            <div>
                <label className="text-sm font-medium">
                    Brand
                </label>

                <Input
                    {...register("brand")}
                    placeholder="Brand"
                />

                {errors.brand && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.brand.message}
                    </p>
                )}
            </div>

            <div>
                <label className="text-sm font-medium">
                    Category
                </label>

                <Select
                    value={watch("category")}
                    onValueChange={(value) =>
                        setValue("category", value as ProductFormData["category"])
                    }
                >
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
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

            <div>
                <label className="text-sm font-medium">
                    Unit
                </label>

                <Select
                    value={watch("unit")}
                    onValueChange={(value) =>
                        setValue("unit", value as ProductFormData["unit"])
                    }
                >
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="PIECE">
                            Piece
                        </SelectItem>

                        <SelectItem value="BOX">
                            Box
                        </SelectItem>

                        <SelectItem value="KG">
                            Kilogram
                        </SelectItem>

                        <SelectItem value="LITER">
                            Liter
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div>
                <label className="text-sm font-medium">
                    Purchase Price
                </label>

                <Input
                    type="number"
                    step="0.01"
                    {...register("purchasePrice")}
                />

                {errors.purchasePrice && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.purchasePrice.message}
                    </p>
                )}
            </div>

            <div>
                <label className="text-sm font-medium">
                    Selling Price
                </label>

                <Input
                    type="number"
                    step="0.01"
                    {...register("sellingPrice")}
                />

                {errors.sellingPrice && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.sellingPrice.message}
                    </p>
                )}
            </div>

            <div>
                <label className="text-sm font-medium">
                    Current Stock
                </label>

                <Input
                    type="number"
                    {...register("currentStock")}
                />

                {errors.currentStock && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.currentStock.message}
                    </p>
                )}
            </div>

            <div>
                <label className="text-sm font-medium">
                    Minimum Stock
                </label>

                <Input
                    type="number"
                    {...register("minimumStock")}
                />

                {errors.minimumStock && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.minimumStock.message}
                    </p>
                )}
            </div>

            <div className="col-span-2">
                <label className="text-sm font-medium">
                    Description
                </label>

                <Input
                    {...register("description")}
                    placeholder="Description"
                />

                {errors.description && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.description.message}
                    </p>
                )}
            </div>

            <div className="col-span-2 flex justify-end">
                <Button
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading
                        ? "Saving..."
                        : "Save Product"}
                </Button>
            </div>
        </form>
    );
}
