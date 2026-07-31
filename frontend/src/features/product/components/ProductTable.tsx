import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

import type { Product } from "../types";

interface ProductTableProps {
    products: Product[];
    onEdit: (product: Product) => void;
    onDelete: (product: Product) => void;
}

export default function ProductTable({
    products,
    onEdit,
    onDelete,
}: ProductTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>SKU</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Brand</TableHead>
                    <TableHead className="text-right">
                        Purchase
                    </TableHead>
                    <TableHead className="text-right">
                        Selling
                    </TableHead>
                    <TableHead className="text-center">
                        Stock
                    </TableHead>
                    <TableHead className="text-right">
                        Actions
                    </TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {products.length === 0 ? (
                    <TableRow>
                        <TableCell
                            colSpan={8}
                            className="text-center"
                        >
                            No products found.
                        </TableCell>
                    </TableRow>
                ) : (
                    products.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell className="font-medium">
                                {product.sku}
                            </TableCell>

                            <TableCell>
                                {product.name}
                            </TableCell>

                            <TableCell>
                                {product.category}
                            </TableCell>

                            <TableCell>
                                {product.brand}
                            </TableCell>

                            <TableCell className="text-right">
                                ₹{product.purchasePrice.toFixed(2)}
                            </TableCell>

                            <TableCell className="text-right">
                                ₹{product.sellingPrice.toFixed(2)}
                            </TableCell>

                            <TableCell className="text-center">
                                {product.currentStock}
                            </TableCell>

                            <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => onEdit(product)}
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </Button>

                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => onDelete(product)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    );
}