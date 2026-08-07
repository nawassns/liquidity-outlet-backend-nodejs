# Liquidity OUTLET Backend — Complete API Documentation

> **Project:** `liquidity-outlet-backend-nodejs` (Outlet Admin)
> **Base URL:** `http://localhost:8002/api`
> **Default Login (after seed):** `outlet@demo.com` / `outlet123`

---

## 🚀 How to test in Postman

### Step 1 — Run the seeder once (creates demo outlet)
In your project terminal:
```bash
node src/seeders/seed.js
```

### Step 2 — Login first
- Method: `POST`
- URL: `http://localhost:8002/api/auth/login`
- Headers: `Content-Type: application/json`
- Body (raw → JSON):
```json
{ "email": "outlet@demo.com", "password": "outlet123" }
```
- ✅ Copy `data.token` from the response.

### Step 3 — Use token for ALL other APIs
Add to every other request:
```
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json
```

> Tip: Save token as Postman environment variable `{{token}}` and use `Bearer {{token}}` everywhere.

---

# 📚 ALL ENDPOINTS

## 1️⃣ AUTH — `/api/auth`

### POST `/api/auth/login`
```json
{ "email": "outlet@demo.com", "password": "outlet123" }
```

### POST `/api/auth/register`
```json
{
  "name": "My New Bar",
  "email": "mybar@example.com",
  "password": "bar123pass",
  "phone": "9876543210",
  "address": "123 Main Street, City"
}
```

### GET `/api/auth/me` 🔒
*No body — returns logged-in outlet*

### PUT `/api/auth/change-password` 🔒
```json
{ "currentPassword": "outlet123", "newPassword": "newpass456" }
```

### POST `/api/auth/forgot-password`
```json
{ "email": "outlet@demo.com" }
```

### POST `/api/auth/logout` 🔒
*No body*

---

## 2️⃣ MY PROFILE / EDIT OUTLET — `/api/profile` 🔒

### GET `/api/profile/me`
*No body — returns full outlet profile with all KYC fields*

### PUT `/api/profile/me`
*This is the "Edit Outlet" form. Send only the fields you want to change.*
```json
{
  "name": "Casa Mezcal",
  "phone": "9876543210",
  "address": "123 Main Street, City",
  "city": "Mumbai",
  "state": "Maharashtra",
  "country": "India",
  "postalCode": "400001",
  "shopImage": "https://example.com/shop.jpg",
  "offerRate": 10,
  "offerText": "10% off on first order",
  "houseRules": "No outside food. Smart casual dress code.",
  "hstNo": "HST123456789",
  "hstImage": "https://example.com/hst.jpg",
  "businessIdProofNo": "BIZ123456",
  "businessIdProofImage": "https://example.com/biz-id.jpg",
  "ownerIdProofCard": "Aadhar 1234 5678 9012",
  "ownerIdProofImage": "https://example.com/owner-id.jpg",
  "openingTime": "11:00",
  "closingTime": "23:00",
  "logo": "https://example.com/logo.png",
  "description": "Premium tequila bar",
  "taxRate": 13
}
```

### PATCH `/api/profile/shop-status`
*Toggle Shop Open/Close (the green "Online" badge)*
```json
{ "isShopOpen": true }
```

---

## 3️⃣ DASHBOARD — `/api/dashboard` 🔒

### GET `/api/dashboard`
*No body — overview: total orders, total order amount, today's orders by status, total tips, received from Liquidity, paid to Liquidity, isShopOpen*

### GET `/api/dashboard/top-sold-items?limit=5`
*Query: `limit` (default 5)*

### GET `/api/dashboard/data-overview`
*No body — total orders, total sales amount, breakdown by Liquor / Food / Vault*

### GET `/api/dashboard/monthly-sales`
*No body — last 12 months sales for the chart*

---

## 4️⃣ EMPLOYEES — `/api/employees` 🔒

### GET `/api/employees?page=1&limit=20&status=&search=`
*Query params only*

### GET `/api/employees/:id`
*No body*

### POST `/api/employees`
```json
{
  "name": "John Doe",
  "email": "john@bar.com",
  "phone": "9999999999",
  "role": "Bartender",
  "salary": 25000,
  "joiningDate": "2026-02-01",
  "identityProofNo": "Aadhar 1234 5678 9012",
  "identityProofImage": "https://example.com/aadhar.jpg",
  "photo": "https://example.com/photo.jpg",
  "address": "Employee address here",
  "status": "Active"
}
```
> `role` examples: `Manager`, `Waiter`, `Bartender`, `Chef`, `Cashier`, `Staff`
> `status`: `Active`, `Inactive`

### PUT `/api/employees/:id`
```json
{ "name": "John Updated", "salary": 28000, "role": "Senior Bartender" }
```

### PATCH `/api/employees/:id/status`
```json
{ "status": "Inactive" }
```

### DELETE `/api/employees/:id`
*No body*

---

## 5️⃣ MENU MANAGEMENT — `/api/menu` 🔒

### GET `/api/menu?page=1&limit=50&category=&type=&status=&isAvailable=&search=`
*Query params only*
> `type` filter: `Food` | `Drink`
> `isAvailable` filter: `true` | `false`

### GET `/api/menu/categories`
*No body — distinct list of categories used by this outlet*

### GET `/api/menu/:id`
*No body*

### POST `/api/menu`
```json
{
  "name": "Jack Daniel's Old No. 7",
  "category": "Whisky",
  "subCategory": "Tennessee",
  "description": "Iconic Tennessee whiskey",
  "image": "https://example.com/jd.png",
  "price": 350,
  "unit": "60ml",
  "type": "Drink",
  "vaultItemId": null,
  "isAvailable": true,
  "status": "Active"
}
```
> `type`: `Food` | `Drink`
> `unit` examples: `60ml`, `1 Plate`, `Glass`, `Bottle`, `750ml`, `1 Pint`

### PUT `/api/menu/:id`
```json
{ "price": 400, "isAvailable": true }
```

### PATCH `/api/menu/:id/availability`
*No body — toggles isAvailable on/off*

### DELETE `/api/menu/:id`
*No body*

---

## 6️⃣ STOCK MANAGEMENT — `/api/stock` 🔒

### GET `/api/stock/categories`
*No body — returns the 12 fixed PHP categories:*
```
["Whisky", "Beer", "Specialty Cocktails", "Vodka", "Gin", "Tequila",
 "Rum", "Wines & Sangria", "Beverage", "Liquor", "Non Alcoholic", "Bar Rail"]
```

### GET `/api/stock?page=1&limit=50&category=&subCategory=&productId=&keyword=&status=`
*Query params only — matches the PHP "Search Data" form (Sub Category, Product, Keyword)*

### GET `/api/stock/:id`
*No body*

### POST `/api/stock`
```json
{
  "menuItemId": null,
  "category": "Whisky",
  "subCategory": "Tennessee",
  "itemName": "Jack Daniel's 750ml",
  "lockPrice": 2500,
  "currentStock": 50,
  "highestPrice": 2800,
  "minimumPrice": 2300,
  "currentPrice": 2600,
  "unit": "Bottle",
  "lowStockAlert": 5,
  "status": "Active"
}
```

### PUT `/api/stock/:id` (update price / stock)
```json
{
  "lockPrice": 2600,
  "currentPrice": 2700,
  "currentStock": 45,
  "highestPrice": 2900,
  "minimumPrice": 2400
}
```

### POST `/api/stock/bulk-add` (BULK STOCK ADD button)
```json
{
  "items": [
    { "stockId": "STOCK_ID_1", "quantity": 10 },
    { "stockId": "STOCK_ID_2", "quantity": 5 }
  ],
  "reason": "New shipment received"
}
```

### POST `/api/stock/deduct` (STOCK DEDUCT button)
```json
{
  "stockId": "STOCK_ID_HERE",
  "quantity": 3,
  "reason": "Manual deduction — broken bottle"
}
```

### GET `/api/stock/movements?page=1&limit=50&stockId=&type=`
*Query params only — audit log of stock changes*
> `type` filter: `ADD`, `DEDUCT`, `BULK_ADD`, `BULK_DEDUCT`

### GET `/api/stock/export`
*No body — full list for CSV export (EXPORT DATA button)*

### DELETE `/api/stock/:id`
*No body*

---

## 7️⃣ TABLES — `/api/tables` 🔒

### GET `/api/tables?status=&area=&search=`
*Query params only*
> `status` filter: `Available`, `Occupied`, `Reserved`, `Cleaning`, `Maintenance`

### GET `/api/tables/status-overview`
*No body — counts per status (for the "Table Booking Status" page)*

### GET `/api/tables/:id`
*No body*

### POST `/api/tables`
```json
{
  "tableNo": "T1",
  "tableName": "Window 1",
  "capacity": 4,
  "area": "Main Hall",
  "description": "By the window with city view",
  "status": "Available",
  "isActive": true
}
```
> `area` examples: `Main Hall`, `Garden`, `VIP`, `Patio`
> `tableNo` is unique per outlet.

### PUT `/api/tables/:id`
```json
{ "capacity": 6, "tableName": "Window 1 - Premium", "area": "VIP" }
```

### PATCH `/api/tables/:id/status`
```json
{ "status": "Occupied" }
```

### DELETE `/api/tables/:id`
*No body*

---

## 8️⃣ SLOTS — `/api/slots` 🔒
*Bookable time windows like "Lunch", "Happy Hour", "Dinner"*

### GET `/api/slots?status=&day=`
*Query params only*
> `day` filter: `Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Sat`, `Sun`
> `status`: `Active`, `Inactive`

### GET `/api/slots/:id`
*No body*

### POST `/api/slots`
```json
{
  "name": "Dinner",
  "startTime": "19:00",
  "endTime": "22:00",
  "daysOfWeek": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  "maxBookings": 30,
  "description": "Dinner slot",
  "isActive": true,
  "status": "Active"
}
```

### PUT `/api/slots/:id`
```json
{ "name": "Dinner Premium", "maxBookings": 40 }
```

### PATCH `/api/slots/:id/status`
```json
{ "status": "Inactive" }
```

### DELETE `/api/slots/:id`
*No body*

---

## 9️⃣ TABLE BOOKINGS — `/api/table-bookings` 🔒

### GET `/api/table-bookings?page=1&limit=20&status=&date=&tableId=&search=`
*Query params only*

### GET `/api/table-bookings/ongoing`
*No body — today's active bookings ("Ongoing Table Bookings" page)*

### GET `/api/table-bookings/:id`
*No body*

### POST `/api/table-bookings`
```json
{
  "tableId": "TABLE_ID_HERE",
  "slotId": "SLOT_ID_HERE",
  "customerName": "John Doe",
  "customerPhone": "9999999999",
  "customerEmail": "john@example.com",
  "bookingDate": "2026-02-15",
  "startTime": "19:30",
  "endTime": "21:30",
  "numberOfGuests": 4,
  "notes": "Birthday celebration — vegetarian",
  "status": "Confirmed"
}
```
> `status`: `Pending`, `Confirmed`, `CheckedIn`, `Completed`, `Cancelled`, `NoShow`

### PUT `/api/table-bookings/:id`
```json
{ "numberOfGuests": 6, "startTime": "20:00" }
```

### PATCH `/api/table-bookings/:id/status`
*Auto-syncs Table.status (CheckedIn → table becomes Occupied; Completed/Cancelled/NoShow → table becomes Available)*
```json
{ "status": "CheckedIn" }
```
For cancellation:
```json
{ "status": "Cancelled", "cancellationReason": "Customer called to cancel" }
```

### DELETE `/api/table-bookings/:id`
*No body*

---

## 🔟 TABLE ORDERS — `/api/table-orders` 🔒

### GET `/api/table-orders?tableId=&status=&date=&page=1&limit=20`
*Query params only — orders linked to a specific table*

---

## 1️⃣1️⃣ TRANSACTIONS (Payment From Liquidity) — `/api/transactions` 🔒

### GET `/api/transactions?page=1&limit=20&type=&status=&startDate=&endDate=`
*Query params only — returns transactions + summary `{ CREDIT, DEBIT }`*
> `type` filter: `CREDIT` (received from Liquidity) or `DEBIT` (paid to Liquidity)
> `status` filter: `Pending`, `Completed`, `Failed`

### GET `/api/transactions/:id`
*No body*

> ⚠️ Create / update / delete transactions live in the **admin project**, not here. Outlet admin can only VIEW their own transactions.

---

## 1️⃣2️⃣ LEDGER — `/api/ledger` 🔒

### GET `/api/ledger?page=1&limit=50&entryType=&startDate=&endDate=`
*Query params only — returns entries + totals `{ totalDebit, totalCredit, balance }`*
> `entryType`: `ORDER_REVENUE`, `COMMISSION`, `TIP`, `PAYOUT`, `RECEIVABLE`, `ADJUSTMENT`, `OTHER`

### POST `/api/ledger` (manual entry)
```json
{
  "entryDate": "2026-02-15",
  "entryType": "ADJUSTMENT",
  "debit": 0,
  "credit": 1500,
  "description": "Manual credit adjustment",
  "referenceType": "Manual",
  "referenceId": null,
  "status": "Cleared"
}
```
> `status`: `Pending`, `Cleared`, `Failed`

### GET `/api/ledger/payment-receivable`
*No body — Payments Receivable page (pending commissions + pending transactions)*

Response sample:
```json
{
  "success": true,
  "data": {
    "pendingCommissionsAmount": 5000,
    "pendingCommissionsCount": 12,
    "pendingTransactionsAmount": 8000,
    "pendingTransactionsCount": 2,
    "totalReceivable": 13000
  }
}
```

### GET `/api/ledger/commissions?page=1&limit=50&status=&startDate=&endDate=`
*Query params only — Order Commissions page*
> `status` filter: `Pending`, `Paid`, `Cancelled`

### GET `/api/ledger/tips?page=1&limit=50&startDate=&endDate=&employeeId=`
*Query params only — Tips listing*

---

## 1️⃣3️⃣ TIPS — `/api/tips` 🔒

### POST `/api/tips`
```json
{
  "orderId": "ORDER_ID_HERE",
  "userId": "USER_ID_HERE",
  "customerName": "John Doe",
  "employeeId": "EMPLOYEE_ID_HERE",
  "amount": 200,
  "paymentMode": "Cash",
  "notes": "Great service",
  "tipDate": "2026-02-15",
  "status": "Recorded"
}
```
> `paymentMode`: `Cash`, `Card`, `UPI`, `Wallet`, `Other`
> `status`: `Recorded`, `Paid`, `Cancelled`

### GET `/api/tips/:id`
*No body*

### PUT `/api/tips/:id`
```json
{ "amount": 250, "status": "Paid" }
```

### DELETE `/api/tips/:id`
*No body*

---

## 1️⃣4️⃣ REPORTS — `/api/reports` 🔒
*All 10 reports from PHP Report Management menu*

### ⭐ GET `/api/reports/current-price-list?category=&subCategory=&keyword=`
**Single API for ALL categories.** Returns:
- `items[]` — flat list (for table view)
- `grouped{}` — grouped by category (for tab view: Whisky, Beer, Vodka, etc.)
- `categories[]` — list of categories present

Each row has: `lockPrice, highestPrice, minimumPrice, currentPrice, currentStock, name, image, unit`.

To filter by tab:
```
GET /api/reports/current-price-list?category=Whisky
GET /api/reports/current-price-list?category=Beer
GET /api/reports/current-price-list?category=Vodka
```

To search:
```
GET /api/reports/current-price-list?category=Whisky&keyword=jack
```

### GET `/api/reports/daily`
*No body — today's order breakdown by status + summary*

### GET `/api/reports/date-wise?startDate=2026-01-01&endDate=2026-02-15`
*Required query params*

### GET `/api/reports/category-wise-sales`
*No body — sales grouped by item category*

### GET `/api/reports/category-wise-stock`
*No body — stock grouped by category (totalItems, totalStock, avgPrice)*

### GET `/api/reports/item-wise-sales?category=&startDate=&endDate=`
*All optional query params*

### GET `/api/reports/category-wise-compare?period1Start=&period1End=&period2Start=&period2End=`
**All 4 dates required.**
Example:
```
?period1Start=2026-01-01&period1End=2026-01-31&period2Start=2026-02-01&period2End=2026-02-28
```

### GET `/api/reports/liquor-wise-compare?period1Start=&period1End=&period2Start=&period2End=`
*Same as above but limited to liquor categories only*

### GET `/api/reports/orders?startDate=&endDate=&status=`
*All optional query params*

### GET `/api/reports/tips?startDate=&endDate=`
*All optional query params*

---

## 🩺 Health check — no auth needed
### GET `/api/health`
*No body*

---

# 📋 Postman Quick-Start

### Environment Variables
| Variable | Initial Value |
|---|---|
| `baseUrl` | `http://localhost:8002/api` |
| `token` | *(leave blank — auto-filled after login)* |

### Login request (saves token automatically)
1. **Method**: `POST`
2. **URL**: `{{baseUrl}}/auth/login`
3. **Body** (raw JSON):
```json
{ "email": "outlet@demo.com", "password": "outlet123" }
```
4. **Tests tab**: paste this script to auto-save the token:
```js
const data = pm.response.json();
if (data.success && data.data.token) {
  pm.environment.set("token", data.data.token);
  console.log("Token saved!");
}
```
5. Click **Send**. Token saved. ✅

### All other requests
- **Headers**:
  - `Authorization`: `Bearer {{token}}`
  - `Content-Type`: `application/json`
- **Body**: see relevant section above.

---

# 🎯 Common test flow

```
1. POST /api/auth/login                  → token saved
2. GET  /api/profile/me                  → see your outlet
3. PATCH /api/profile/shop-status        → toggle shop open
4. POST /api/employees                   → add a bartender
5. POST /api/menu                        → add a Whisky item
6. POST /api/stock                       → add stock for the item
7. POST /api/stock/bulk-add              → bulk-add 10 more bottles
8. POST /api/tables                      → add Table T1
9. POST /api/slots                       → add Dinner slot
10. POST /api/table-bookings             → make a reservation
11. PATCH /api/table-bookings/:id/status → CheckedIn (table auto-occupied)
12. POST /api/tips                       → record customer tip
13. GET  /api/reports/current-price-list → see all categories
14. GET  /api/reports/current-price-list?category=Whisky → only Whisky
15. GET  /api/dashboard                  → see overall stats
16. GET  /api/ledger/payment-receivable  → see pending payments
```

🔒 = needs `Authorization: Bearer <token>` header.
⭐ = star endpoint (the unified Current Price List).
---

