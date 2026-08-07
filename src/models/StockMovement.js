const mongoose = require('mongoose');

const stockMovementSchema = new mongoose.Schema({
  outletId: { type: mongoose.Schema.Types.ObjectId, ref: 'Outlet', required: true, index: true },
  stockId: { type: mongoose.Schema.Types.ObjectId, ref: 'Stock', required: true, index: true },
  type: { type: String, enum: ['ADD', 'DEDUCT', 'BULK_ADD', 'BULK_DEDUCT'], required: true },
  quantity: { type: Number, required: true },
  beforeQty: { type: Number, default: 0 },
  afterQty: { type: Number, default: 0 },
  reason: { type: String, default: null },
  performedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Outlet', default: null },

  // === SQL parity fields (mirrors MySQL table `stock_logs`) ===
  sqlId: { type: Number, index: true, sparse: true },
  shop_id: { type: Number, default: 0 },
  product_id: { type: Number, default: 0 },
  count: { type: Number, default: 0 },
  comment: { type: String, default: '' },
  order_id: { type: String, default: '' },
  created_at: { type: Date, default: null },

}, { timestamps: true });

module.exports = mongoose.model('StockMovement', stockMovementSchema);
