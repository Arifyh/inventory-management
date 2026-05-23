# IKONIK Architecture - Inventory Management System & Material Catalog

An inventory management and material catalog system designed specifically for **IKONIK Architecture** (Building Materials Store). 

The application supports three levels of access (Roles): **Admin**, **Staff**, and **Visitor (Public)**.

---

## 🏛️ Tech Stack

### Frontend

- **Framework & Build Tool:** React (v19) & Vite
- **Styling:** Tailwind CSS (v4)
- **Icons:** Lucide React
- **HTTP Client:** Axios
- **Routing:** React Router DOM (v7)

### Backend

- **Runtime & Framework:** Node.js & Express.js
- **Database ORM:** Prisma ORM
- **Database Engine:** MySQL
- **Authentication:** JSON Web Token (JWT) & bcrypt
- **File Upload:** Multer (local storage for material product images)

---

## 👥 Roles & Main Features

| Feature / Module                    | Admin | Staff |    Visitor (Public)    |
| :---------------------------------- | :---: | :---: | :--------------------: |
| **View Public Catalog**             |  ✅   |  ✅   | ✅ (No Login Required) |
| **View Material Details**           |  ✅   |  ✅   | ✅ (No Login Required) |
| **Inquiry via WhatsApp**            |  ✅   |  ✅   | ✅ (No Login Required) |
| **Dashboard & Statistics**          |  ✅   |  ✅   |           ❌           |
| **Log Stock Transactions (In/Out)** |  ✅   |  ✅   |           ❌           |
| **View Stock Transaction History**  |  ✅   |  ✅   |           ❌           |
| **CRUD Products & Upload Photos**   |  ✅   |  ❌   |           ❌           |
| **CRUD Material Categories**        |  ✅   |  ❌   |           ❌           |
| **CRUD Suppliers**                  |  ✅   |  ❌   |           ❌           |
| **Publish / Unpublish Products**    |  ✅   |  ❌   |           ❌           |
| **Manage Users & Roles**            |  ✅   |  ❌   |           ❌           |
| **Activity Audit Logs**             |  ✅   |  ❌   |           ❌           |

---

## 📂 Project Directory Structure

```text
sistem-inventory/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma        # Database schema definitions (User, Product, Transaction, etc.)
│   ├── public/uploads/          # Uploaded product images directory
│   ├── src/
│   │   ├── controllers/         # Request handling & database query logic
│   │   ├── middlewares/         # Middlewares for Authentication (JWT) & Uploads (Multer)
│   │   ├── routes/              # Express API route endpoints
│   │   ├── utils/               # Prisma connection & utility utilities
│   │   └── index.js             # Express server entry point
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/          # Global UI components (Sidebar, Topbar)
│   │   ├── hooks/               # Global custom React hooks
│   │   ├── pages/
│   │   │   ├── auth/            # Admin & Staff Login page
│   │   │   ├── dashboard/       # Core management console panels
│   │   │   └── public/          # Public Visitor Catalog screen
│   │   ├── App.jsx              # React Router client routes
│   │   ├── index.css            # Global CSS setup
│   │   └── main.jsx             # React entry point
│   └── package.json
├── package.json                 # Workspace concurrent scripts configuration
└── README.md                    # Project documentation
```

---

## 🛠️ Installation & Configuration

### 1. Prerequisites

Ensure you have the following installed:

- Node.js (v18 or higher)
- MySQL database server
- Git

### 2. Clone the Repository

```bash
git clone https://github.com/Arifyh/system-inventory.git
cd system-inventory
```

### 3. Configure the Backend (`backend/`)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create a `.env` file in the `backend/` directory:
   ```env
   PORT=5000
   DATABASE_URL="mysql://root:your_mysql_password@localhost:3306/db_ikonik_inventory"
   JWT_SECRET="your_jwt_secret_key_here"
   ```
3. Install backend dependencies:
   ```bash
   npm install
   ```
4. Run Prisma database migrations to create the tables automatically:
   ```bash
   npx prisma db push
   ```
   _(Optional)_ If you require initial seeds, register or insert seed files accordingly to set up the default Administrator user.

### 4. Configure the Frontend (`frontend/`)

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```

---

## 🚀 Running the Project in Development Mode

You can run both the backend server and the frontend client concurrently from the **root directory** of the project using the configured npm scripts:

1. Return to the root folder:
   ```bash
   cd ..
   ```
2. Spin up the dev environments:
   ```bash
   npm run dev
   ```
   _This command will run:_
   - Backend API Server at: `http://localhost:5000`
   - Frontend Vite Client at: `http://localhost:5173`

Open your web browser and navigate to `http://localhost:5173/` to view the public catalog page. For staff and admin capabilities, navigate to `http://localhost:5173/login`.

---

## 🔌 Essential API Endpoints

### Public Endpoints (No Authentication Required)

- **`GET /api/products/public`** : Returns all active and published products (`isPublished: true`).
- **`GET /api/products/public/:id`** : Returns details of a specific public product by its ID.
- **`GET /api/categories/public`** : Returns a list of categories for filter dropdowns.

### Authentication

- **`POST /api/auth/login`** : Log in Admin or Staff users, returning a JWT token.

### Private Management Endpoints (Requires Bearer JWT Token)

- **`GET /api/products`** : Returns all products (including unpublished drafts) for inventory tracking.
- **`POST /api/products`** : Creates a new material product (Admin only).
- **`POST /api/transactions`** : Records a stock movement mutator, e.g., incoming (`IN`) or outgoing (`OUT`) (Admin & Staff).
- **`GET /api/dashboard/stats`** : Returns KPI metrics summary, chart history, logs, and low-stock alerts.

---

## 📲 WhatsApp Redirection Integration

When a public visitor clicks the **"Tanya WA"** or **"Hubungi WA"** buttons, they are redirected to Ikonik Architecture's WhatsApp contact:

- **Automated Message Format:**

  ```text
  Halo Toko Material, saya ingin bertanya tentang produk berikut:

  *[Product Name]*
  SKU: [SKU Code]
  Category: [Category]
  Price: Rp [Price] / [Unit]
  Status: [Tersedia/Habis]

  Apakah produk ini ready untuk dipesan?
  ```
