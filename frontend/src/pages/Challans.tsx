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

import { useDebounce } from "@/hooks/useDebounce";

import ChallanTable from "@/features/challan/components/ChallanTable";
import CreateChallanDialog from "@/features/challan/components/CreateChallanDialog";
import CancelChallanDialog from "@/features/challan/components/CancelChallanDialog";
import ChallanDetailsDialog from "@/features/challan/components/ChallanDetailsDialog";

import { useChallans } from "@/features/challan/hooks/useChallans";

import type {
  Challan,
  ChallanStatus,
} from "@/features/challan/types";

export default function Challans() {
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search);

  const [status, setStatus] =
    useState<ChallanStatus>();

  const [createOpen, setCreateOpen] =
    useState(false);

  const [cancelOpen, setCancelOpen] =
    useState(false);

  const [detailsOpen, setDetailsOpen] =
    useState(false);

  const [selectedChallan, setSelectedChallan] =
    useState<Challan | null>(null);

  const {
    data,
    isLoading,
    isError,
  } = useChallans(
    page,
    10,
    debouncedSearch,
    undefined,
    status
  );

  const challans =
    data?.data.items ?? [];

  if (isLoading) {
    return (
      <LoadingState message="Loading challans..." />
    );
  }

  if (isError) {
    return (
      <ErrorState message="Failed to load challans." />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Challans
          </h1>

          <p className="text-muted-foreground">
            Manage delivery challans.
          </p>
        </div>

        <Button
          onClick={() => setCreateOpen(true)}
        >
          + New Challan
        </Button>
      </div>

      {/* Search + Status Filter */}

      <div className="flex flex-wrap items-center gap-4">
        <SearchInput
          value={search}
          placeholder="Search challans..."
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
                : (value as ChallanStatus)
            );
          }}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="ALL">
              All Status
            </SelectItem>

            <SelectItem value="DRAFT">
              Draft
            </SelectItem>

            <SelectItem value="CONFIRMED">
              Confirmed
            </SelectItem>

            <SelectItem value="CANCELLED">
              Cancelled
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Dialogs */}

      <CreateChallanDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
      />

      <CancelChallanDialog
        open={cancelOpen}
        onOpenChange={setCancelOpen}
        challan={selectedChallan}
      />

      <ChallanDetailsDialog
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        challan={selectedChallan}
      />

      {/* Table */}

      {challans.length === 0 ? (
        <EmptyState
          title="No challans found"
          description="Try changing your search or filters."
        />
      ) : (
        <ChallanTable
          challans={challans}
          onView={(challan) => {
            setSelectedChallan(challan);
            setDetailsOpen(true);
          }}
          onCancel={(challan) => {
            setSelectedChallan(challan);
            setCancelOpen(true);
          }}
        />
      )}

      {/* Pagination */}

      {challans.length > 0 && (
        <Pagination
          page={
            data?.data.pagination.page ??
            page
          }
          totalPages={
            data?.data.pagination.totalPages ??
            1
          }
          onPageChange={setPage}
        />
      )}
    </div>
  );
}