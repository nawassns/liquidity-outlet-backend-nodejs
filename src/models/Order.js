const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  outlet: { type: mongoose.Schema.Types.ObjectId, ref: 'Outlet', required: true, index: true },

  // NEW (added 2026-02): for outlet admin features
  tableId: { type: mongoose.Schema.Types.ObjectId, ref: 'Table', default: null, index: true },
  orderType: { type: String, enum: ['Liquor', 'Food', 'Vault', 'Mixed'], default: 'Mixed' },

  items: [{
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'VaultItem' },
    menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', default: null },
    name: String,
    category: String,
    quantity: Number,
    price: Number,
    total: Number
  }],
  subtotal: { type: Number, required: true },
  taxAmount: { type: Number, default: 0 },
  tipAmount: { type: Number, default: 0 },
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ['New Order', 'Accepted', 'Served', 'Cancelled', 'No Show', 'Delivered', 'Completed', 'Pending', 'Failed'],
    default: 'New Order'
  },
  paymentStatus: { type: String, enum: ['Pending', 'Paid', 'Refunded', 'Failed'], default: 'Pending' },
  paymentMethod: { type: String, enum: ['Wallet', 'Card', 'Cash', 'UPI'], default: 'Wallet' },
  customerDetails: { name: String, email: String, mobile: String },
  notes: { type: String, default: null },
  acceptedAt: { type: Date, default: null },
  servedAt: { type: Date, default: null },
  cancelledAt: { type: Date, default: null },
  cancellationReason: { type: String, default: null },

  // === SQL parity fields (mirrors MySQL table `orders`) ===
  sqlId: { type: Number, index: true, sparse: true },
  unique_id: { type: String, default: '' },
  device_id: { type: String, default: '' },
  email: { type: String, default: '' },
  mobile: { type: String, default: '' },
  someone_else_name: { type: String, default: '' },
  user_id: { type: Number, default: 0 },
  shop_id: { type: Number, default: 0 },
  amount: { type: Number, default: 0 },
  tax_amount: { type: Number, default: 0 },
  deduct_amount: { type: Number, default: 0 },
  total_amount: { type: Number, default: 0 },
  wallet_amount: { type: Number, default: 0 },
  online_amount: { type: Number, default: 0 },
  outlet_commission_rate: { type: Number, default: 0 },
  outlet_commission_amount: { type: Number, default: 0 },
  transaction_id: { type: String, default: '' },
  payment_type: { type: Number, default: 0 },
  tips: { type: Number, default: 0 },
  order_date: { type: String, default: '' },
  order_time: { type: String, default: '' },
  created_at: { type: Date, default: null },
  accept_time: { type: String, default: '' },
  ready_time: { type: String, default: '' },
  complete_time: { type: String, default: '' },
  abandone_time: { type: String, default: '' },
  is_abandone_count_start: { type: Number, default: 0 },
  is_order_abandoned: { type: Number, default: 0 },
  scanned_by: { type: Number, default: 0 },
  order_type: { type: Number, default: 0 },
  table_no: { type: String, default: '' },
  floor: { type: String, default: '' },
  served_by: { type: Number, default: 0 },
  is_ready: { type: Number, default: 0 },
  sqaure_order_id: { type: String, default: '' },
  cancellation_reason: { type: String, default: '' },
  deleted_by_user: { type: Number, default: 0 },
  is_active: { type: Number, default: 0 },
  is_deleted: { type: Number, default: 0 },

}, { timestamps: true });

// Generate unique order ID
orderSchema.pre('save', async function (next) {
  if (!this.orderId) {
    const count = await mongoose.model('Order').countDocuments();
    this.orderId = `#LIQ-${(count + 1).toString().padStart(6, '0')}`;
  }
  next();
});

// Convenience virtual so new controllers can use `outletId` interchangeably
orderSchema.virtual('outletId').get(function () { return this.outlet; });
orderSchema.virtual('userId').get(function () { return this.user; });

module.exports = mongoose.model('Order', orderSchema);
