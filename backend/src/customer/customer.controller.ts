import { Request, Response } from "express";
import { ApiResponse } from "../utils/ApiResponse";
import { CustomerService } from "./customer.service";
import { listCustomersSchema } from "./customer.validation";
import { customerIdSchema } from "./customer.validation"

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

    return res.json(
      ApiResponse.success(
        "Customers fetched successfully",
        result
      )
    );
  };

  findById = async (req: Request, res: Response) => {
    const params = customerIdSchema.parse(req.params);

    const customer =
      await this.service.findById(params);

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
}