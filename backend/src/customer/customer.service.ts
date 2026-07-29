import { ApiError } from "../utils/ApiError";
import { CustomerRepository } from "./customer.repository";
import { CreateCustomerInput } from "./customer.validation";

export class CustomerService {
  private repository = new CustomerRepository();

  async create(data: CreateCustomerInput) {
    // Only check for duplicate email if email is provided
    if (data.email) {
      const existingCustomer = await this.repository.findByEmail(data.email);

      if (existingCustomer) {
        throw new ApiError(409, "Customer email already exists");
      }
    }

    return this.repository.create(data);
  }
}