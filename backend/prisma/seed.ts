import {
  PrismaClient,
  Role,
  CustomerType,
  CustomerStatus,
  ProductCategory,
  Unit,
} from "@prisma/client";

import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding...\n");

  // ----------------------------------------------------
  // Seed Users
  // ----------------------------------------------------

  const password = await bcrypt.hash("Password@123", 10);

  const admin = await prisma.user.upsert({
    where: {
      email: "admin@minierp.com",
    },
    update: {
      name: "System Administrator",
      password,
      role: Role.ADMIN,
    },
    create: {
      name: "System Administrator",
      email: "admin@minierp.com",
      password,
      role: Role.ADMIN,
    },
  });

  const sales = await prisma.user.upsert({
    where: {
      email: "sales@minierp.com",
    },
    update: {
      name: "Sales Executive",
      password,
      role: Role.SALES,
    },
    create: {
      name: "Sales Executive",
      email: "sales@minierp.com",
      password,
      role: Role.SALES,
    },
  });

  const warehouse = await prisma.user.upsert({
    where: {
      email: "warehouse@minierp.com",
    },
    update: {
      name: "Warehouse Manager",
      password,
      role: Role.WAREHOUSE,
    },
    create: {
      name: "Warehouse Manager",
      email: "warehouse@minierp.com",
      password,
      role: Role.WAREHOUSE,
    },
  });

  const accounts = await prisma.user.upsert({
    where: {
      email: "accounts@minierp.com",
    },
    update: {
      name: "Accounts Manager",
      password,
      role: Role.ACCOUNTS,
    },
    create: {
      name: "Accounts Manager",
      email: "accounts@minierp.com",
      password,
      role: Role.ACCOUNTS,
    },
  });

  console.log("✅ Users seeded");

  console.log({
    admin: admin.email,
    sales: sales.email,
    warehouse: warehouse.email,
    accounts: accounts.email,
  });

  // ----------------------------------------------------
  // Seed Customers
  // ----------------------------------------------------

  const customers = [
    {
      name: "Rahul Sharma",
      mobile: "9876543210",
      email: "rahul@example.com",
      businessName: "Sharma Electronics",
      gstNumber: "29ABCDE1234F1Z5",
      customerType: CustomerType.WHOLESALE,
      status: CustomerStatus.ACTIVE,
      address: "Bangalore",
    },
    {
      name: "Priya Verma",
      mobile: "9876543211",
      email: "priya@example.com",
      businessName: "Verma Retail",
      gstNumber: "27ABCDE1234F1Z6",
      customerType: CustomerType.RETAIL,
      status: CustomerStatus.ACTIVE,
      address: "Mumbai",
    },
    {
      name: "Amit Singh",
      mobile: "9876543212",
      email: "amit@example.com",
      businessName: "Singh Distributors",
      gstNumber: "07ABCDE1234F1Z7",
      customerType: CustomerType.DISTRIBUTOR,
      status: CustomerStatus.ACTIVE,
      address: "Delhi",
    },
    {
      name: "Neha Gupta",
      mobile: "9876543213",
      email: "neha@example.com",
      businessName: "Gupta Traders",
      gstNumber: null,
      customerType: CustomerType.WHOLESALE,
      status: CustomerStatus.LEAD,
      address: "Kolkata",
    },
    {
      name: "Rohan Mehta",
      mobile: "9876543214",
      email: "rohan@example.com",
      businessName: "Mehta Enterprises",
      gstNumber: "24ABCDE1234F1Z8",
      customerType: CustomerType.DISTRIBUTOR,
      status: CustomerStatus.ACTIVE,
      address: "Ahmedabad",
    },
    {
      name: "Sneha Joshi",
      mobile: "9876543215",
      email: "sneha@example.com",
      businessName: "Joshi Stores",
      gstNumber: null,
      customerType: CustomerType.RETAIL,
      status: CustomerStatus.ACTIVE,
      address: "Pune",
    },
    {
      name: "Vikas Patel",
      mobile: "9876543216",
      email: "vikas@example.com",
      businessName: "Patel Hardware",
      gstNumber: "24ABCDE1234F1Z9",
      customerType: CustomerType.WHOLESALE,
      status: CustomerStatus.ACTIVE,
      address: "Surat",
    },
    {
      name: "Anjali Kapoor",
      mobile: "9876543217",
      email: "anjali@example.com",
      businessName: "Kapoor Supplies",
      gstNumber: null,
      customerType: CustomerType.RETAIL,
      status: CustomerStatus.LEAD,
      address: "Chandigarh",
    },
    {
      name: "Karan Malhotra",
      mobile: "9876543218",
      email: "karan@example.com",
      businessName: "Malhotra Trading",
      gstNumber: "06ABCDE1234F1ZA",
      customerType: CustomerType.DISTRIBUTOR,
      status: CustomerStatus.ACTIVE,
      address: "Gurugram",
    },
    {
      name: "Pooja Nair",
      mobile: "9876543219",
      email: "pooja@example.com",
      businessName: "Nair Mart",
      gstNumber: null,
      customerType: CustomerType.RETAIL,
      status: CustomerStatus.ACTIVE,
      address: "Kochi",
    },
  ];

  for (const customer of customers) {
    await prisma.customer.upsert({
      where: {
        mobile: customer.mobile,
      },
      update: customer,
      create: customer,
    });
  }

  console.log("✅ Customers seeded");

  // ----------------------------------------------------
  // Seed Products
  // ----------------------------------------------------

  const products = [
    {
      sku: "LAP-001",
      name: "Laptop Pro",
      description: "High-performance business laptop",
      category: ProductCategory.ELECTRONICS,
      brand: "TechPro",
      unit: Unit.PIECE,
      purchasePrice: 50000,
      sellingPrice: 65000,
      currentStock: 10,
      minimumStock: 3,
    },
    {
      sku: "MON-001",
      name: "LED Monitor",
      description: "24-inch Full HD monitor",
      category: ProductCategory.ELECTRONICS,
      brand: "ViewTech",
      unit: Unit.PIECE,
      purchasePrice: 8000,
      sellingPrice: 12000,
      currentStock: 5,
      minimumStock: 2,
    },
    {
      sku: "KEY-001",
      name: "Wireless Keyboard",
      description: "Wireless office keyboard",
      category: ProductCategory.ELECTRONICS,
      brand: "KeyMaster",
      unit: Unit.PIECE,
      purchasePrice: 1500,
      sellingPrice: 2200,
      currentStock: 2,
      minimumStock: 5,
    },
    {
      sku: "PEN-001",
      name: "Ball Pen Pack",
      description: "Pack of 10 blue ball pens",
      category: ProductCategory.STATIONERY,
      brand: "WriteWell",
      unit: Unit.PIECE,
      purchasePrice: 100,
      sellingPrice: 150,
      currentStock: 50,
      minimumStock: 10,
    },
    {
      sku: "MED-001",
      name: "First Aid Kit",
      description: "Basic medical first aid kit",
      category: ProductCategory.MEDICAL,
      brand: "HealthSafe",
      unit: Unit.PIECE,
      purchasePrice: 500,
      sellingPrice: 750,
      currentStock: 3,
      minimumStock: 5,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: {
        sku: product.sku,
      },
      update: product,
      create: product,
    });
  }

  console.log("✅ Products seeded");

  console.log("\n🎉 Database seeding completed successfully.");

  console.log("\nTest Accounts:");
  console.log("ADMIN     : admin@minierp.com");
  console.log("SALES     : sales@minierp.com");
  console.log("WAREHOUSE : warehouse@minierp.com");
  console.log("ACCOUNTS  : accounts@minierp.com");
  console.log("Password  : Password@123\n");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error("❌ Database seeding failed:");
    console.error(error);

    await prisma.$disconnect();

    process.exit(1);
  });