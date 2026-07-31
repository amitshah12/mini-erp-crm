import { Request, Response } from "express";
import { ApiResponse } from "../utils/ApiResponse";
import { CustomerService } from "./customer.service";
import {
  customerIdSchema,
  listCustomersSchema,
} from "./customer.validation";

export class CustomerController {
  private service = new CustomerService();

  create = async (req: Request, res: Response) => {
    const customer = await this.service.create(req.body);

    return res.status(201).json(
      ApiResponse.success(
        "Customer created successfully",
        customer
      )
    );
  };

  findAll = async (req: Request, res: Response) => {
    const filters = listCustomersSchema.parse(req.query);

    const result = await this.service.findAll(filters);

    const totalPages = Math.ceil(
      result.total / filters.limit
    );

    return res.json(
      ApiResponse.success(
        "Customers fetched successfully",
        {
          items: result.customers,
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
    const params = customerIdSchema.parse(req.params);

    const customer = await this.service.findById(params);

    return res.json(
      ApiResponse.success(
        "Customer fetched successfully",
        customer
      )
    );
  };

  update = async (req: Request, res: Response) => {
    const { id } = customerIdSchema.parse(req.params);

    const updatedCustomer = await this.service.update(
      id,
      req.body
    );

    return res.json(
      ApiResponse.success(
        "Customer updated successfully",
        updatedCustomer
      )
    );
  };

  softDelete = async (req: Request, res: Response) => {
    const { id } = customerIdSchema.parse(req.params);

    await this.service.softDelete(id);

    return res.json(
      ApiResponse.success(
        "Customer deleted successfully"
      )
    );
  };
}