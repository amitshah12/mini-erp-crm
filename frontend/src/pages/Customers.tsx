import { useState } from "react";

import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Pagination from "@/components/common/Pagination";
import SearchInput from "@/components/common/SearchInput";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";
import EmptyState from "@/components/common/EmptyState";

import CustomerDialog from "@/features/customer/components/CustomerDialog";
import EditCustomerDialog from "@/features/customer/components/EditCustomerDialog";
import DeleteCustomerDialog from "@/features/customer/components/DeleteCustomerDialog";
import CustomerTable from "@/features/customer/components/CustomerTable";

import { useCustomers } from "@/features/customer/hooks/useCustomers";

import {
  useAuthStore,
} from "@/features/auth/store/auth.store";

import {
  hasRole,
} from "@/features/auth/utils/role.utils";

import { useDebounce } from "@/hooks/useDebounce";

import type {
  Customer,
} from "@/features/customer/types";

export default function Customers() {
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search);

  const [status, setStatus] = useState<
    "LEAD" | "ACTIVE" | "INACTIVE" | undefined
  >();

  const [customerType, setCustomerType] =
    useState<
      "RETAIL" | "WHOLESALE" | "DISTRIBUTOR" | undefined
    >();

  const [open, setOpen] = useState(false);

  const [editOpen, setEditOpen] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [selectedCustomer, setSelectedCustomer] =
    useState<Customer | null>(null);

  const user = useAuthStore(
    (state) => state.user
  );

  const canCreate = hasRole(
    user?.role,
    ["ADMIN", "SALES"]
  );

  const { data, isLoading, isError } =
    useCustomers(
      page,
      10,
      debouncedSearch,
      status,
      customerType
    );

  const handleEdit = (
    customer: Customer
  ) => {
    setSelectedCustomer(customer);
    setEditOpen(true);
  };

  const handleDelete = (
    customer: Customer
  ) => {
    setSelectedCustomer(customer);
    setDeleteOpen(true);
  };

  if (isLoading) {
    return (
      <LoadingState message="Loading customers..." />
    );
  }

  if (isError) {
    return (
      <ErrorState message="Failed to load customers." />
    );
  }

  if (
    data &&
    data.data.items.length === 0
  ) {
    return (
      <>
        <CustomerDialog
          open={open}
          onOpenChange={setOpen}
        />

        <EmptyState
          title="No Customers"
          description={
            canCreate
              ? "Start by adding your first customer."
              : "No customers found."
          }
          actionLabel={
            canCreate
              ? "Add Customer"
              : undefined
          }
          onAction={
            canCreate
              ? () => setOpen(true)
              : undefined
          }
        />
      </>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Customers
          </h1>

          <p className="text-muted-foreground">
            Manage all customers.
          </p>
        </div>

        {canCreate && (
          <Button
            onClick={() => setOpen(true)}
          >
            + Add Customer
          </Button>
        )}
      </div>

      {/* Search & Filters */}

      <div className="flex flex-wrap items-center gap-4">
        <SearchInput
          value={search}
          placeholder="Search customers..."
          onChange={(value) => {
            setPage(1);
            setSearch(value);
          }}
        />

        <Select
          value={status ?? "ALL"}
          onValueChange={(value) => {
            setPage(1);

            setStatus(
              value === "ALL"
                ? undefined
                : (value as
                    | "LEAD"
                    | "ACTIVE"
                    | "INACTIVE")
            );
          }}
        >
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="ALL">
              All Status
            </SelectItem>

            <SelectItem value="LEAD">
              Lead
            </SelectItem>

            <SelectItem value="ACTIVE">
              Active
            </SelectItem>

            <SelectItem value="INACTIVE">
              Inactive
            </SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={customerType ?? "ALL"}
          onValueChange={(value) => {
            setPage(1);

            setCustomerType(
              value === "ALL"
                ? undefined
                : (value as
                    | "RETAIL"
                    | "WHOLESALE"
                    | "DISTRIBUTOR")
            );
          }}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Customer Type" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="ALL">
              All Types
            </SelectItem>

            <SelectItem value="RETAIL">
              Retail
            </SelectItem>

            <SelectItem value="WHOLESALE">
              Wholesale
            </SelectItem>

            <SelectItem value="DISTRIBUTOR">
              Distributor
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Dialogs */}

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

      {/* Table */}

      <CustomerTable
        customers={data?.data.items ?? []}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Pagination */}

      <Pagination
        page={
          data?.data.pagination.page ?? page
        }
        totalPages={
          data?.data.pagination.totalPages ?? 1
        }
        onPageChange={setPage}
      />
    </div>
  );
}