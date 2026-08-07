const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  outletId: { type: mongoose.Schema.Types.ObjectId, ref: 'Outlet', required: true, index: true },
  name: { type: String, required: true, trim: true },
  email: { type: String, default: null, lowercase: true, trim: true },
  phone: { type: String, default: null, trim: true },
  role: { type: String, default: 'Staff', trim: true }, // Manager, Waiter, Bartender, Chef, Cashier, Staff
  salary: { type: Number, default: 0 },
  joiningDate: { type: Date, default: Date.now },
  identityProofNo: { type: String, default: null },
  identityProofImage: { type: String, default: null },
  photo: { type: String, default: null },
  address: { type: String, default: null },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },

  // === SQL parity fields (mirrors MySQL table `outlet_users`) ===
  sqlId: { type: Number, index: true, sparse: true },
  shop_id: { type: Number, default: 0 },
  mobile: { type: String, default: '' },
  password: { type: String, default: '' },
  device_type: { type: Number, default: 0 },
  device_id: { type: String, default: '' },
  type: { type: Number, default: 0 },
  is_active: { type: Number, default: 0 },
  is_deleted: { type: Number, default: 0 },

}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);
