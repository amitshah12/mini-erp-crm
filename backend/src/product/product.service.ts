import { ProductRepository } from "./product.repository";
import {
  CreateProductInput,
  UpdateProductInput,
} from "./product.validation";
import { ApiError } from "../utils/ApiError";
import { ProductCategory } from "@prisma/client";

export class ProductService {
  private repository = new ProductRepository();

  async create(data: CreateProductInput) {
    // Check duplicate SKU
    const existingSku = await this.repository.findBySku(data.sku);

    if (existingSku) {
      throw new ApiError(409, "Product with this SKU already exists");
    }

    // Check duplicate Barcode (if provided)
    if (data.barcode) {
      const existingBarcode = await this.repository.findByBarcode(
        data.barcode
      );

      if (existingBarcode) {
        throw new ApiError(409, "Product with this barcode already exists");
      }
    }

    return this.repository.create(data);
  }

  async findAll(
    page: number,
    limit: number,
    search?: string,
    category?: ProductCategory
  ) {
    return this.repository.findAll(
      page,
      limit,
      search,
      category
    );
  }

  async findById(id: string) {
    const product = await this.repository.findById(id);

    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    return product;
  }

  async update(id: string, data: UpdateProductInput) {
    const product = await this.repository.findById(id);

    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    // Check SKU uniqueness if changed
    if (data.sku && data.sku !== product.sku) {
      const existingSku = await this.repository.findBySku(data.sku);

      if (existingSku) {
        throw new ApiError(409, "Product with this SKU already exists");
      }
    }

    // Check Barcode uniqueness if changed
    if (
      data.barcode &&
      data.barcode !== product.barcode
    ) {
      const existingBarcode =
        await this.repository.findByBarcode(data.barcode);

      if (existingBarcode) {
        throw new ApiError(
          409,
          "Product with this barcode already exists"
        );
      }
    }

    return this.repository.update(id, data);
  }

  async softDelete(id: string) {
    const product = await this.repository.findById(id);

    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    await this.repository.softDelete(id);
  }
}