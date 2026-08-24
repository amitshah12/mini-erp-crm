import { useState } from "react";

import { Button } from "@/components/ui/button";

import Pagination from "@/components/common/Pagination";
import SearchInput from "@/components/common/SearchInput";

import { useDebounce } from "@/hooks/useDebounce";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import InventoryTable from "@/features/inventory/components/InventoryTable";
import StockInDialog from "@/features/inventory/components/StockInDialog";
import StockOutDialog from "@/features/inventory/components/StockOutDialog";
import StockHistoryTable from "@/features/inventory/components/StockHistoryTable";

import { useProducts } from "@/features/product/hooks/useProducts";
import { useStockHistory } from "@/features/inventory/hooks/useStockHistory";

import type {
  Product,
  ProductCategory,
} from "@/features/product/types";

import type {
  MovementType,
} from "@/features/inventory/types";

export default function Inventory() {
  // Inventory pagination
  const [page, setPage] = useState(1);

  // Inventory filters
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  const [category, setCategory] =
    useState<ProductCategory>();

  // Stock dialogs
  const [stockInOpen, setStockInOpen] =
    useState(false);

  const [stockOutOpen, setStockOutOpen] =
    useState(false);

  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  // Stock history view
  const [showStockHistory, setShowStockHistory] =
    useState(false);

  const [historyPage, setHistoryPage] =
    useState(1);

  const [movement, setMovement] =
    useState<MovementType>();

  // Products query
  const {
    data,
    isLoading,
    isError,
  } = useProducts(
    page,
    10,
    debouncedSearch,
    category
  );

  // Stock history query
  const {
    data: historyData,
    isLoading: isHistoryLoading,
    isError: isHistoryError,
  } = useStockHistory(
    historyPage,
    10,
    undefined,
    movement
  );

  const handleStockIn = (
    product: Product
  ) => {
    setSelectedProduct(product);
    setStockInOpen(true);
  };

  const handleStockOut = (
    product: Product
  ) => {
    setSelectedProduct(product);
    setStockOutOpen(true);
  };

  const handleToggleStockHistory = () => {
    setShowStockHistory(
      (previous) => !previous
    );

    setHistoryPage(1);
  };

  if (isLoading && !showStockHistory) {
    return (
      <p>Loading inventory...</p>
    );
  }

  if (isError && !showStockHistory) {
    return (
      <p>Failed to load inventory.</p>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {showStockHistory
              ? "Stock History"
              : "Inventory"}
          </h1>

          <p className="text-muted-foreground">
            {showStockHistory
              ? "View all stock movements."
              : "Manage product stock."}
          </p>
        </div>

        <Button
          variant="outline"
          onClick={handleToggleStockHistory}
        >
          {showStockHistory
            ? "Back to Inventory"
            : "Stock History"}
        </Button>
      </div>

      {/* STOCK HISTORY VIEW */}

      {showStockHistory ? (
        <div className="space-y-6">
          {/* Movement Filter */}

          <div className="flex items-center gap-4">
            <Select
              value={movement ?? "ALL"}
              onValueChange={(value) => {
                setHistoryPage(1);

                setMovement(
                  value === "ALL"
                    ? undefined
                    : (
                      value as MovementType
                    )
                );
              }}
            >
              <SelectTrigger className="w-52">
                <SelectValue placeholder="Movement" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="ALL">
                  All Movements
                </SelectItem>

                <SelectItem value="IN">
                  Stock In
                </SelectItem>

                <SelectItem value="OUT">
                  Stock Out
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* History Loading */}

          {isHistoryLoading ? (
            <p>
              Loading stock history...
            </p>
          ) : isHistoryError ? (
            <p>
              Failed to load stock history.
            </p>
          ) : (
            <>
              <StockHistoryTable
                items={
                  historyData?.data.items ?? []
                }
              />

              <Pagination
                page={
                  historyData?.data.pagination?.page ??
                  historyPage
                }
                totalPages={
                  historyData?.data.pagination?.totalPages ??
                  1
                }
                onPageChange={setHistoryPage}
              />
            </>
          )}
        </div>
      ) : (
        <>
          {/* INVENTORY FILTERS */}

          <div className="flex flex-wrap items-center gap-4">
            <SearchInput
              value={search}
              placeholder="Search inventory..."
              onChange={(value) => {
                setPage(1);
                setSearch(value);
              }}
            />

            <Select
              value={category ?? "ALL"}
              onValueChange={(value) => {
                setPage(1);

                setCategory(
                  value === "ALL"
                    ? undefined
                    : (
                      value as ProductCategory
                    )
                );
              }}
            >
              <SelectTrigger className="w-52">
                <SelectValue placeholder="Category" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="ALL">
                  All Categories
                </SelectItem>

                <SelectItem value="ELECTRONICS">
                  Electronics
                </SelectItem>

                <SelectItem value="GROCERY">
                  Grocery
                </SelectItem>

                <SelectItem value="STATIONERY">
                  Stationery
                </SelectItem>

                <SelectItem value="CLOTHING">
                  Clothing
                </SelectItem>

                <SelectItem value="MEDICAL">
                  Medical
                </SelectItem>

                <SelectItem value="OTHER">
                  Other
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Inventory Table */}

          <InventoryTable
            products={
              data?.data.items ?? []
            }
            onStockIn={handleStockIn}
            onStockOut={handleStockOut}
          />

          {/* Inventory Pagination */}

          <Pagination
            page={
              historyData?.data.pagination?.page ??
              historyPage
            }
            totalPages={
              historyData?.data.pagination?.totalPages ??
              1
            }
            onPageChange={setHistoryPage}
          />
        </>
      )}

      {/* Stock Dialogs */}

      <StockInDialog
        open={stockInOpen}
        onOpenChange={setStockInOpen}
        product={selectedProduct}
      />

      <StockOutDialog
        open={stockOutOpen}
        onOpenChange={setStockOutOpen}
        product={selectedProduct}
      />
    </div>
  );
}