import { Request, Response } from "express";
import { ApiResponse } from "../utils/ApiResponse";
import { CustomerService } from "./customer.service";
import { listCustomersSchema } from "./customer.validation";

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
}