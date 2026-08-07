const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
  outletId: { type: mongoose.Schema.Types.ObjectId, ref: 'Outlet', required: true, index: true },
  tableNo: { type: String, required: true, trim: true },   // e.g. "T1", "VIP-3"
  tableName: { type: String, default: null, trim: true },
  capacity: { type: Number, required: true, min: 1 },
  area: { type: String, default: 'Main Hall' },             // e.g. Main Hall, Garden, VIP, Patio
  description: { type: String, default: null },
  status: {
    type: String,
    enum: ['Available', 'Occupied', 'Reserved', 'Cleaning', 'Maintenance'],
    default: 'Available'
  },
  isActive: { type: Boolean, default: true },

  // === SQL parity fields (mirrors MySQL table `tables`) ===
  sqlId: { type: Number, index: true, sparse: true },
  shop_id: { type: Number, default: 0 },
  title: { type: String, default: '' },
  is_active: { type: Number, default: 0 },
  is_deleted: { type: Number, default: 0 },

}, { timestamps: true });

tableSchema.index({ outletId: 1, tableNo: 1 }, { unique: true });

module.exports = mongoose.model('Table', tableSchema);
