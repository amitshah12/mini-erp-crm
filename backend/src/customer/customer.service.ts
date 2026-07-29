import { ApiError } from "../utils/ApiError";
import { CustomerRepository } from "./customer.repository";
import { CreateCustomerInput } from "./customer.validation";
import { ListCustomersInput } from "./customer.validation";
import { CustomerIdInput } from "./customer.validation";
import { UpdateCustomerInput } from "./customer.validation";

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

  async findAll(filters: ListCustomersInput) {
    return this.repository.findAll(filters);
  }

  async findById({ id }: CustomerIdInput) {
    const customer = await this.repository.findById(id);

    if (!customer) {
      throw new ApiError(404, "Customer not found");
    }

    return customer;
  }

  async update(
    id: string,
    data: UpdateCustomerInput
  ) {
    const customer = await this.repository.findById(id);

    if (!customer) {
      throw new ApiError(404, "Customer not found");
    }

    if (data.email && data.email !== customer.email) {
      const existing = await this.repository.findByEmail(data.email);

      if (existing) {
        throw new ApiError(
          409,
          "Customer with this email already exists"
        );
      }
    }

    return this.repository.update(id, data);
  }
}

