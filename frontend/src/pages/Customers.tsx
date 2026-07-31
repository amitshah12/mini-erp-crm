import { useState } from "react";

import { Button } from "@/components/ui/button";

import CustomerDialog from "@/features/customer/components/CustomerDialog";
import EditCustomerDialog from "@/features/customer/components/EditCustomerDialog";
import CustomerTable from "@/features/customer/components/CustomerTable";

import { useCustomers } from "@/features/customer/hooks/useCustomers";
import type { Customer } from "@/features/customer/types";
import DeleteCustomerDialog from "@/features/customer/components/DeleteCustomerDialog";

export default function Customers() {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedCustomer, setSelectedCustomer] =
    useState<Customer | null>(null);

  const { data, isLoading, isError } = useCustomers();

  const handleEdit = (customer: Customer) => {
    setSelectedCustomer(customer);
    setEditOpen(true);
  };

  const handleDelete = (customer: Customer) => {
    setSelectedCustomer(customer);
    setDeleteOpen(true);
  };

  if (isLoading) {
    return <p>Loading customers...</p>;
  }

  if (isError) {
    return <p>Failed to load customers.</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Customers
          </h1>

          <p className="text-muted-foreground">
            Manage all customers.
          </p>
        </div>

        <Button onClick={() => setOpen(true)}>
          + Add Customer
        </Button>
      </div>

      <CustomerDialog
        open={open}
        onOpenChange={setOpen}
      />

      <EditCustomerDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        customer={selectedCustomer}
      />

      <DeleteCustomerDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        customer={selectedCustomer}
      />

      <CustomerTable
        customers={data?.data.items ?? []}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      
    </div>
  );
}