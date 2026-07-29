import { Request, Response } from "express";
import { ApiResponse } from "../utils/ApiResponse";
import { CustomerService } from "./customer.service";
import { createCustomerSchema } from "./customer.validation";

export class CustomerController {
  private service = new CustomerService();

  create = async (req: Request, res: Response) => {
    const data = createCustomerSchema.parse(req.body);

    const customer = await this.service.create(data);

    return res.status(201).json(
      ApiResponse.success(
        "Customer created successfully",
        customer
      )
    );
  };
}