import { Request, Response } from "express";
import { ProductService } from "./product.service";
import {
    createProductSchema,
    listProductsSchema,
    productIdSchema,
    updateProductSchema,
} from "./product.validation";
import { ApiResponse } from "../utils/ApiResponse";

export class ProductController {
    private service = new ProductService();

    create = async (req: Request, res: Response) => {
        const data = createProductSchema.parse(req.body);

        const product = await this.service.create(data);

        return res.status(201).json(
            ApiResponse.success(
                "Product created successfully",
                product
            )
        );
    };

    findAll = async (req: Request, res: Response) => {
        const filters = listProductsSchema.parse(req.query);

        const result = await this.service.findAll(
            filters.page,
            filters.limit,
            filters.search,
            filters.category
        );

        const totalPages = Math.ceil(
            result.total / filters.limit
        );

        return res.json(
            ApiResponse.success(
                "Products fetched successfully",
                {
                    items: result.products,
                    pagination: {
                        page: filters.page,
                        limit: filters.limit,
                        total: result.total,
                        totalPages,
                    },
                }
            )
        );
    };

    findById = async (req: Request, res: Response) => {
        const { id } = productIdSchema.parse(req.params);

        const product = await this.service.findById(id);

        return res.json(
            ApiResponse.success(
                "Product fetched successfully",
                product
            )
        );
    };

    update = async (req: Request, res: Response) => {
        const { id } = productIdSchema.parse(req.params);

        const data = updateProductSchema.parse(req.body);

        const product = await this.service.update(id, data);

        return res.json(
            ApiResponse.success(
                "Product updated successfully",
                product
            )
        );
    };

    softDelete = async (req: Request, res: Response) => {
        const { id } = productIdSchema.parse(req.params);

        await this.service.softDelete(id);

        return res.json(
            ApiResponse.success(
                "Product deleted successfully"
            )
        );
    };
}