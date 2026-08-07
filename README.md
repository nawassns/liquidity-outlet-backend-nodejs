
## 🚀 Quick Start

```bash
# 1. Install dependencies
yarn install
# or
npm install

# 2. Edit .env if needed (PORT, MONGO_URL, JWT_SECRET)

# 3. Seed demo data (creates outlet@demo.com / outlet123, sample menu+stock+tables)
node src/seeders/seed.js

# 4. Start server
node src/server.js
# or for live reload
yarn dev
```

Server starts at **http://localhost:8002**.

---

## 🗂 Project Structure

```
liquidity-outlet-backend-nodejs/
├── src/
│   ├── config/
│   │   └── database.js              MongoDB connection
│   ├── controllers/                 (14 files — one per module)
│   │   ├── auth.controller.js
│   │   ├── profile.controller.js
│   │   ├── dashboard.controller.js
│   │   ├── report.controller.js
│   │   ├── employee.controller.js
│   │   ├── menu.controller.js
│   │   ├── stock.controller.js
│   │   ├── table.controller.js
│   │   ├── slot.controller.js
│   │   ├── tableBooking.controller.js
│   │   ├── tableOrder.controller.js
│   │   ├── transaction.controller.js
│   │   ├── ledger.controller.js
│   │   └── tip.controller.js
│   ├── middleware/
│   │   ├── auth.middleware.js       Outlet JWT auth (role: outlet_admin)
│   │   └── upload.middleware.js
│   ├── models/                      (15 files)
│   │   ├── Outlet.js
│   │   ├── Employee.js
│   │   ├── MenuItem.js
│   │   ├── Stock.js
│   │   ├── StockMovement.js
│   │   ├── Table.js
│   │   ├── Slot.js
│   │   ├── TableBooking.js
│   │   ├── OutletTransaction.js
│   │   ├── LedgerEntry.js
│   │   ├── Tip.js
│   │   ├── Commission.js
│   │   ├── Order.js                 (read-only — owned by admin project)
│   │   ├── User.js                  (read-only — owned by admin project)
│   │   ├── VaultItem.js             (read-only — owned by admin project)
│   │   └── index.js
│   ├── routes/                      (14 files — one per module)
│   ├── seeders/seed.js
│   └── server.js                    Entry point — port 8002
├── public/uploads/                  Static file uploads
├── package.json
└── .env
```

---

## 🌐 API Endpoints — Base URL: `http://localhost:8002/api`

### 🔐 Auth — `/api/auth`
| Method | Endpoint | Auth | PHP equivalent |
|--------|----------|------|---------------|
| POST | `/login` | No | `outlet/admins/login` |
| POST | `/register` | No | `outlet/admins/register` |
| POST | `/forgot-password` | No | Forgot password |
| GET | `/me` | Yes | — |
| PUT | `/change-password` | Yes | — |
| POST | `/logout` | Yes | — |

### 👤 My Profile — `/api/profile`
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/me` | Get full outlet profile |
| PUT | `/me` | Edit outlet — name, phone, address, **shopImage, offerRate, offerText, houseRules, hstNo, hstImage, businessIdProofNo, businessIdProofImage, ownerIdProofCard, ownerIdProofImage, openingTime, closingTime** |
| PATCH | `/shop-status` | Toggle Shop Open/Close (`{ isShopOpen: bool }`) |

### 📊 Dashboard — `/api/dashboard`
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Total Orders, Total Order Amount, Today's status counts, isShopOpen |
| GET | `/top-sold-items?limit=5` | Top sold menu items |
| GET | `/data-overview` | Sales total / liquor / food / vault breakdown |
| GET | `/monthly-sales` | Last 12 months for the chart |

### 📑 Reports — `/api/reports`
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/current-price-list?category=&keyword=` | **Single API for ALL categories** — returns `items[]` (flat) and `grouped{}` (by category for tabs). Each row: lockPrice, highestPrice, minimumPrice, currentPrice, currentStock |
| GET | `/daily` | Today's report |
| GET | `/date-wise?startDate&endDate` | Daily totals between dates |
| GET | `/category-wise-sales` | Sales grouped by category |
| GET | `/category-wise-stock` | Stock grouped by category |
| GET | `/item-wise-sales?category&startDate&endDate` | Per-item sales |
| GET | `/category-wise-compare?period1Start&period1End&period2Start&period2End` | Compare 2 periods by category |
| GET | `/liquor-wise-compare?…` | Liquor-only compare 2 periods |
| GET | `/orders?startDate&endDate&status` | Order list + summary |
| GET | `/tips?startDate&endDate` | Tips report |

### 👥 Employees — `/api/employees`
| Method | Endpoint |
|--------|----------|
| GET | `/?page&limit&status&search` |
| POST | `/` (name, email, phone, role, salary, joiningDate, identityProofNo, identityProofImage, photo, address) |
| GET | `/:id` |
| PUT | `/:id` |
| DELETE | `/:id` |
| PATCH | `/:id/status` |

### 🍔 Menu — `/api/menu`
| Method | Endpoint |
|--------|----------|
| GET | `/?category&type&status&isAvailable&search` |
| GET | `/categories` |
| POST | `/` (name, category, subCategory, description, image, price, unit, type, vaultItemId) |
| GET | `/:id` / PUT / DELETE |
| PATCH | `/:id/availability` |

### 📦 Stock — `/api/stock`
12 PHP categories: Whisky, Beer, Specialty Cocktails, Vodka, Gin, Tequila, Rum, Wines & Sangria, Beverage, Liquor, Non Alcoholic, Bar Rail.

| Method | Endpoint |
|--------|----------|
| GET | `/categories` |
| GET | `/?category&subCategory&productId&keyword&page&limit` |
| POST | `/` |
| POST | `/bulk-add` (BULK STOCK ADD button) |
| POST | `/deduct` (STOCK DEDUCT button) |
| GET | `/movements?stockId&type` audit log |
| GET | `/export` (EXPORT DATA button) |
| GET | `/:id` / PUT / DELETE |

### 🪑 Tables — `/api/tables`
| Method | Endpoint |
|--------|----------|
| GET | `/?status&area&search` |
| GET | `/status-overview` (Available / Occupied / Reserved counts) |
| POST | `/` (tableNo unique per outlet, capacity, area) |
| GET | `/:id` / PUT / DELETE |
| PATCH | `/:id/status` |

### ⏰ Slots — `/api/slots`
| Method | Endpoint |
|--------|----------|
| GET | `/?status&day` |
| POST | `/` (name, startTime, endTime, daysOfWeek[], maxBookings) |
| GET | `/:id` / PUT / DELETE |
| PATCH | `/:id/status` |

### 📅 Table Bookings — `/api/table-bookings`
| Method | Endpoint |
|--------|----------|
| GET | `/?status&date&tableId&search` |
| GET | `/ongoing` (today's active bookings) |
| POST | `/` |
| GET | `/:id` / PUT / DELETE |
| PATCH | `/:id/status` (Pending/Confirmed/CheckedIn/Completed/Cancelled/NoShow — auto-syncs Table status) |

### 🛎 Table Orders — `/api/table-orders`
| Method | Endpoint |
|--------|----------|
| GET | `/?tableId&status&date&page&limit` |

### 💰 Transactions — `/api/transactions` (Payment From Liquidity)
| Method | Endpoint |
|--------|----------|
| GET | `/` list + summary (CREDIT/DEBIT totals) |
| GET | `/:id` |

> Create/update/delete transactions belong to the SUPER-ADMIN backend project, since only super-admin records payments.

### 📒 Ledger — `/api/ledger`
| Method | Endpoint |
|--------|----------|
| GET | `/?entryType&startDate&endDate` (debit/credit/balance totals) |
| POST | `/` manual entry |
| GET | `/payment-receivable` (Payments Receivable page) |
| GET | `/commissions` (Order Commissions page) |
| GET | `/tips` (Tips By Customer page) |

### 💵 Tips — `/api/tips`
| Method | Endpoint |
|--------|----------|
| POST | `/` record a tip (orderId, employeeId, amount, paymentMode) |
| GET | `/:id` / PUT / DELETE |

---

## 🔑 Demo Credentials (after running seeder)
- Email: `outlet@demo.com`
- Password: `outlet123`

---

## 🔗 Relationship to Admin Project

| Item | Admin Project (port 8001) | Outlet Project (port 8002) |
|------|---------------------------|----------------------------|
| Login URL | `/api/auth/login` | `/api/auth/login` |
| JWT role | `super_admin` | `outlet_admin` |
| Manages | All outlets, all users, vault catalog, payments | One outlet's own data |
| Outlet model | Read/write basic fields | Read/write full fields incl. KYC + auth password |
| Order model | Read/write all orders | Read its own outlet's orders only |

Both projects use the **same MongoDB database** (`liquidity_db`), so seeded data
and schema changes are visible to both — but their HTTP APIs are completely
isolated.

---

