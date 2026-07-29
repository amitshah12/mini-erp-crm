import { Request, Response } from "express";
import { ApiResponse } from "../utils/ApiResponse";
import { CustomerService } from "./customer.service";

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
}