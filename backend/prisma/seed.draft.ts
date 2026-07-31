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
    update: {},
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
    update: {},
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
    update: {},
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
    update: {},
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

  