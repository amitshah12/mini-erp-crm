-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'SALES', 'WAREHOUSE', 'ACCOUNTS');

-- CreateEnum
CREATE TYPE "CustomerType" AS ENUM ('RETAIL', 'WHOLESALE', 'DISTRIBUTOR');

-- CreateEnum
CREATE TYPE "CustomerStatus" AS ENUM ('LEAD', 'ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "MovementType" AS ENUM ('IN', 'OUT');

-- CreateEnum
CREATE TYPE "ChallanStatus" AS ENUM ('DRAFT', 'CONFIRMED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ProductCategory" AS ENUM ('ELECTRONICS', 'GROCERY', 'STATIONERY', 'CLOTHING', 'MEDICAL', 'OTHER');

-- CreateEnum
CREATE TYPE "Unit" AS ENUM ('PIECE', 'BOX', 'KG', 'LITER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "email" TEXT,
    "businessName" TEXT NOT NULL,
    "gstNumber" TEXT,
    "customerType" "CustomerType" NOT NULL,
    "status" "CustomerStatus" NOT NULL,
    "address" TEXT NOT NULL,
    "followUpDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "barcode" TEXT,
    "category" "ProductCategory" NOT NULL,
    "brand" TEXT NOT NULL,
    "unit" "Unit" NOT NULL,
    "purchasePrice" DOUBLE PRECISION NOT NULL,
    "sellingPrice" DOUBLE PRECISION NOT NULL,
    "currentStock" INTEGER NOT NULL DEFAULT 0,
    "minimumStock" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerNote" (
    "id" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CustomerNote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StockLog" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "movement" "MovementType" NOT NULL,
    "reason" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "productId" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,

    CONSTRAINT "StockLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Challan" (
    "id" TEXT NOT NULL,
    "challanNumber" TEXT NOT NULL,
    "totalQuantity" INTEGER NOT NULL,
    "status" "ChallanStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customerId" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,

    CONSTRAINT "Challan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChallanItem" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "productName" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "productId" TEXT NOT NULL,
    "challanId" TEXT NOT NULL,

    CONSTRAINT "ChallanItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Product_sku_key" ON "Product"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "Product_barcode_key" ON "Product"("barcode");

-- CreateIndex
CREATE UNIQUE INDEX "Challan_challanNumber_key" ON "Challan"("challanNumber");

-- AddForeignKey
ALTER TABLE "CustomerNote" ADD CONSTRAINT "CustomerNote_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockLog" ADD CONSTRAINT "StockLog_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockLog" ADD CONSTRAINT "StockLog_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Challan" ADD CONSTRAINT "Challan_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Challan" ADD CONSTRAINT "Challan_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChallanItem" ADD CONSTRAINT "ChallanItem_challanId_fkey" FOREIGN KEY ("challanId") REFERENCES "Challan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChallanItem" ADD CONSTRAINT "ChallanItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
