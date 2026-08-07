require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

const connectDB = require('./config/database');

// ============================================================
// OUTLET-ADMIN backend — companion to the super-admin backend.
// Runs on a SEPARATE port (default 8002).
// ============================================================

const authRoutes = require('./routes/auth.routes');
const profileRoutes = require('./routes/profile.routes');
const dashboardRoutes = require('./routes/dashboard.routes');
const reportRoutes = require('./routes/report.routes');
const employeeRoutes = require('./routes/employee.routes');
const menuRoutes = require('./routes/menu.routes');
const stockRoutes = require('./routes/stock.routes');
const tableRoutes = require('./routes/table.routes');
const slotRoutes = require('./routes/slot.routes');
const tableBookingRoutes = require('./routes/tableBooking.routes');
const tableOrderRoutes = require('./routes/tableOrder.routes');
const transactionRoutes = require('./routes/transaction.routes');
const ledgerRoutes = require('./routes/ledger.routes');
const tipRoutes = require('./routes/tip.routes');

const app = express();

// Security
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors());

// Body
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging
if (process.env.NODE_ENV !== 'test') app.use(morgan('dev'));

// Static uploads
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// Routes — all prefixed with /api
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/stock', stockRoutes);
app.use('/api/tables', tableRoutes);
app.use('/api/slots', slotRoutes);
app.use('/api/table-bookings', tableBookingRoutes);
app.use('/api/table-orders', tableOrderRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/ledger', ledgerRoutes);
app.use('/api/tips', tipRoutes);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({
    service: 'liquidity-outlet-backend',
    status: 'online',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Error handler
app.use((err, _req, res, _next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

const PORT = process.env.PORT || 8002;

connectDB().catch(console.error);

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`[OUTLET] Server running on port ${PORT}`);
    console.log(`[OUTLET] Environment: ${process.env.NODE_ENV}`);
  });
}

module.exports = app;