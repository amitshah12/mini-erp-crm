```markdown
# Mini ERP & CRM

A full-stack **Enterprise Resource Planning (ERP) and Customer Relationship Management (CRM)** application designed to manage customers, products, inventory, and sales challans with secure authentication and role-based access control.

The application is built using **React, TypeScript, Node.js, Express, Prisma, PostgreSQL, JWT, and Nginx**, and is deployed on **AWS EC2** with **Neon PostgreSQL** as the production database.

---

## 🚀 Live Demo

**Live Application:**  
http://65.2.81.78

> The application is currently deployed using an AWS EC2 public IP. HTTPS/domain configuration is intentionally not included in the current deployment.

---

## 📂 Repository

**GitHub:**  
https://github.com/amitshah12/mini-erp-crm

---

## ✨ Features

### 🔐 Authentication & Authorization

- JWT-based authentication
- Secure login system
- Role-Based Access Control (RBAC)
- Protected frontend routes
- Protected backend API routes
- Automatic handling of expired/invalid JWT tokens
- Role-specific navigation and access

### 👥 Customer Management

- Create customers
- View customers
- Update customers
- Delete customers
- Search customers
- Filter customers by status
- Filter customers by customer type
- Pagination
- Form validation

### 📦 Product Management

- Create products
- View products
- Update products
- Delete products
- Search products
- Filter products by category
- Pagination
- Product SKU and barcode support
- Purchase and selling price management
- Minimum stock configuration
- Current stock tracking

### 📊 Inventory Management

- Track current product stock
- Stock-in operations
- Stock-out operations
- Inventory history
- Low-stock identification
- Minimum stock threshold
- Stock adjustment reasons:
  - Purchase
  - Sale
  - Damage
  - Return
  - Manual

### 🧾 Challan Management

- Create sales challans
- Add multiple products to challans
- Customer association
- Automatic stock deduction
- Stock availability validation
- Prevents challans when available stock is insufficient
- Automatic unique challan number generation
- Challan status management
- Challan cancellation
- Automatic stock restoration after cancellation
- Inventory history generated for challan operations

### 📈 Dashboard

The dashboard provides an overview of:

- Total customers
- Total products
- Total challans
- Total inventory items
- Stock-in statistics
- Stock-out statistics
- Low-stock products
- Recent challans

### 🛡️ Role-Based Access

The application supports four roles:

| Role | Access |
|------|--------|
| **ADMIN** | Full system access |
| **SALES** | Dashboard, Customers, Products, Inventory, Challans |
| **ACCOUNTS** | Challans |
| **WAREHOUSE** | Restricted access |

Frontend routes and backend APIs both enforce role-based permissions.

---

# 🏗️ System Architecture

```text
                         Internet
                            │
                            ▼
                   ┌─────────────────┐
                   │   AWS EC2       │
                   │ Ubuntu 24.04    │
                   │                 │
                   │    Nginx :80    │
                   └────────┬────────┘
                            │
                ┌───────────┴───────────┐
                │                       │
                ▼                       ▼
        React Frontend              /api/*
        Static Files                   │
                │                       ▼
                │              Node.js + Express
                │                   :5000
                │                       │
                │                       ▼
                │                    Prisma
                │                       │
                │                       ▼
                │                Neon PostgreSQL
                │
                └──────────── Browser
```

### Production Flow

```text
Browser
   │
   │ http://65.2.81.78
   ▼
Nginx
   │
   ├── /              → React Production Build
   │
   └── /api/*         → Express Backend
                            │
                            ▼
                       Prisma ORM
                            │
                            ▼
                     Neon PostgreSQL
```

---

# 🛠️ Tech Stack

## Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- shadcn/ui
- React Query
- Zustand
- React Hook Form
- Zod
- Axios
- React Router

## Backend

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT
- bcrypt
- Zod
- CORS

## Database

- PostgreSQL
- Neon PostgreSQL

## DevOps / Deployment

- AWS EC2
- Ubuntu 24.04 LTS
- Nginx
- PM2
- Git / GitHub

---

# 📁 Project Structure

```text
mini-erp-crm/
│
├── backend/
│   ├── prisma/
│   │   ├── migrations/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   │
│   ├── src/
│   │   ├── auth/
│   │   ├── challan/
│   │   ├── config/
│   │   ├── customer/
│   │   ├── dashboard/
│   │   ├── docs/
│   │   ├── inventory/
│   │   ├── middleware/
│   │   ├── product/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── app.ts
│   │   └── server.ts
│   │
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   ├── challan/
│   │   │   ├── customer/
│   │   │   ├── dashboard/
│   │   │   ├── inventory/
│   │   │   └── product/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   ├── .env.example
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── .gitignore
└── README.md
```

---

# 🔑 Authentication

The application uses **JWT-based authentication**.

After successful login:

```text
User
  │
  ▼
Login API
  │
  ▼
Credentials Validation
  │
  ▼
JWT Token
  │
  ▼
Zustand Auth Store
  │
  ▼
Protected Routes
```

The frontend Axios instance automatically attaches the JWT token to authenticated API requests.

```http
Authorization: Bearer <JWT_TOKEN>
```

The backend validates the token using JWT middleware before allowing access to protected resources.

---

# 👤 Roles & Permissions

## ADMIN

Full access to the application.

```text
Dashboard
Customers
Products
Inventory
Challans
```

Can also perform administrative operations such as cancelling challans.

---

## SALES

Access to:

```text
Dashboard
Customers
Products
Inventory
Challans
```

Sales users can create and manage sales-related operations according to backend permissions.

---

## ACCOUNTS

Access to:

```text
Challans
```

Accounts users can view challan-related information.

---

## WAREHOUSE

Warehouse users are restricted from the currently available application modules.

The frontend displays a restricted-access experience rather than exposing unauthorized modules.

---

# 📦 Inventory & Stock Management

The application maintains stock directly on the `Product` entity.

```text
Product
 ├── currentStock
 └── minimumStock
```

Inventory operations update the product's current stock.

### Stock In

```text
Stock In
   │
   ▼
Increase Product.currentStock
   │
   ▼
Create Inventory History
```

### Stock Out

```text
Stock Out
   │
   ▼
Validate Available Stock
   │
   ▼
Decrease Product.currentStock
   │
   ▼
Create Inventory History
```

---

# 🧾 Challan Workflow

Creating a challan follows this flow:

```text
Create Challan
      │
      ▼
Validate Customer
      │
      ▼
Validate Products
      │
      ▼
Check Available Stock
      │
      ├── Insufficient → Reject
      │
      ▼
Generate Challan Number
      │
      ▼
Create Challan
      │
      ▼
Decrease Product Stock
      │
      ▼
Create Stock-Out History
```

### Challan Cancellation

When a confirmed challan is cancelled:

```text
Cancel Challan
      │
      ▼
Restore Product Stock
      │
      ▼
Create Stock-In History
      │
      ▼
Update Challan Status
```

This ensures stock remains synchronized with challan operations.

---

# 📊 Dashboard

The dashboard aggregates important business information through dedicated backend endpoints.

### Dashboard API

```http
GET /api/dashboard/summary
GET /api/dashboard/low-stock
GET /api/dashboard/recent-challans
GET /api/dashboard/inventory-stats
```

---

# 🔌 API Overview

## Authentication

```http
POST /api/auth/login
```

## Customers

Customer APIs provide CRUD operations and customer listing functionality.

## Products

Product APIs provide CRUD operations, search, filtering, and product management.

## Inventory

```http
POST /api/inventory/stock-in
POST /api/inventory/stock-out
GET  /api/inventory/history
```

## Challans

```http
POST   /api/challans
GET    /api/challans
GET    /api/challans/:id
PATCH  /api/challans/:id/status
```

## Dashboard

```http
GET /api/dashboard/summary
GET /api/dashboard/low-stock
GET /api/dashboard/recent-challans
GET /api/dashboard/inventory-stats
```

---

# ⚙️ Environment Variables

## Backend

Create:

```text
backend/.env
```

Example:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require

PORT=5000

NODE_ENV=development

JWT_SECRET=replace_with_a_secure_random_secret_at_least_32_characters

JWT_EXPIRES_IN=7d

FRONTEND_URL=http://localhost:5173
```

> Never commit `.env` files or secrets to GitHub.

---

## Frontend

Create the appropriate environment file.

For local development:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

For the current production deployment:

```env
VITE_API_BASE_URL=/api
```

Using `/api` in production allows Nginx to route API requests to the backend while the frontend and backend remain on the same origin.

---

# 🚀 Local Development

## 1. Clone the repository

```bash
git clone https://github.com/amitshah12/mini-erp-crm.git
```

```bash
cd mini-erp-crm
```

---

# Backend Setup

Navigate to the backend:

```bash
cd backend
```

Install dependencies:

```bash
npm ci
```

Generate Prisma Client:

```bash
npx prisma generate
```

Apply migrations:

```bash
npx prisma migrate dev
```

Seed the database:

```bash
npm run seed
```

Start the backend in development mode:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

---

# Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm ci
```

Start the development server:

```bash
npm run dev
```

The frontend will normally run on:

```text
http://localhost:5173
```

---

# 🏭 Production Build

## Backend

```bash
cd backend
npm run build
```

Start the compiled backend:

```bash
npm start
```

---

## Frontend

```bash
cd frontend
npm run build
```

The production build is generated inside:

```text
frontend/dist/
```

---

# ☁️ AWS Deployment

The application is deployed on an AWS EC2 instance using:

```text
AWS EC2
Ubuntu 24.04
Node.js
Nginx
PM2
Neon PostgreSQL
```

### Backend Process

The Express backend runs under PM2:

```bash
pm2 start dist/server.js --name mini-erp-crm-api
```

Save the PM2 process list:

```bash
pm2 save
```

PM2 provides process persistence and automatically restarts the backend if required.

---

# 🌐 Nginx Configuration

Nginx serves the React application and reverse-proxies API requests.

Conceptually:

```nginx
location /api/ {
    proxy_pass http://127.0.0.1:5000;
}

location / {
    try_files $uri $uri/ /index.html;
}
```

This allows:

```text
http://65.2.81.78/
```

to serve the React application while:

```text
http://65.2.81.78/api/
```

is forwarded to Express.

---

# 🗄️ Database

The production application uses **PostgreSQL hosted on Neon**.

Prisma is used as the ORM.

Production migrations are applied using:

```bash
npx prisma migrate deploy
```

Development migrations use:

```bash
npx prisma migrate dev
```

---

# 🔒 Security

The project implements several security mechanisms:

- JWT authentication
- Password hashing
- Role-Based Access Control
- Protected API routes
- Protected frontend routes
- Environment-based configuration
- Secrets excluded from Git
- Backend running privately on port `5000`
- Nginx exposed publicly on port `80`
- AWS Security Group restricting SSH access
- CORS origin validation

The backend port `5000` is **not publicly exposed** through the AWS Security Group. External API requests go through Nginx.

---

# 🧪 Testing & Verification

The production deployment was verified through:

### Frontend

```text
GET /
```

Response:

```text
HTTP/1.1 200 OK
```

### API

```text
GET /api/
```

Response:

```json
{
  "success": true,
  "message": "Mini ERP CRM API v1"
}
```

### Authentication

Production login was successfully tested.

### RBAC

The following roles were tested:

```text
ADMIN
SALES
ACCOUNTS
WAREHOUSE
```

### Application Modules

The following modules were tested after deployment:

```text
Dashboard
Customers
Products
Inventory
Challans
Authentication
Role-based access
```

---

# 📌 Current Deployment

| Component | Technology |
|---|---|
| Frontend | React + TypeScript + Vite |
| Backend | Node.js + Express |
| ORM | Prisma |
| Database | Neon PostgreSQL |
| Authentication | JWT |
| UI | Tailwind CSS + shadcn/ui |
| State Management | Zustand + React Query |
| Server | AWS EC2 |
| OS | Ubuntu 24.04 LTS |
| Reverse Proxy | Nginx |
| Process Manager | PM2 |
| Source Control | Git + GitHub |

---

# 🎯 Project Objectives

The project was built to demonstrate practical implementation of:

- Full-stack web development
- REST API development
- Database design
- ORM-based data access
- Authentication
- Authorization
- RBAC
- Inventory management
- Transaction-based business workflows
- Form validation
- API state management
- Production deployment
- Linux server administration
- Nginx reverse proxy configuration
- Process management with PM2
- Cloud deployment using AWS
- PostgreSQL deployment using Neon

---

# 🔮 Future Improvements

Potential future enhancements include:

- HTTPS / SSL
- Custom domain
- Invoice generation
- PDF challan generation
- Advanced reporting
- Sales analytics
- Inventory transaction audit logs
- Product image management
- Email notifications
- Advanced dashboard charts
- Automated backups
- Automated CI/CD deployment
- Docker-based deployment
- More granular permissions
- Multi-company support

---

# 👨‍💻 Author

**Amit Shah**

B.Tech – Computer Science & Engineering  
KIIT University

### GitHub

https://github.com/amitshah12

---

# 📄 License

This project is intended for educational, portfolio, and demonstration purposes.
```