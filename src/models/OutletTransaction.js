const mongoose = require('mongoose');

// OutletTransaction — money flow between Liquidity (super admin) and an outlet.
// Used by "Payment From Liquidity" page.
const outletTransactionSchema = new mongoose.Schema({
  outletId: { type: mongoose.Schema.Types.ObjectId, ref: 'Outlet', required: true, index: true },
  transactionType: {
    type: String,
    enum: ['CREDIT', 'DEBIT'],   // Liquidity paid outlet (CREDIT to outlet) / outlet paid Liquidity
    required: true
  },
  amount: { type: Number, required: true, min: 0 },
  paymentMode: { type: String, enum: ['BankTransfer', 'Cash', 'Cheque', 'UPI', 'Other'], default: 'BankTransfer' },
  referenceNo: { type: String, default: null },
  description: { type: String, default: null },
  paidOn: { type: Date, default: Date.now },
  proofImage: { type: String, default: null },
  status: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Completed' },
  performedByAdminId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', default: null },

  // === SQL parity fields (mirrors MySQL table `outlet_transactions`) ===
  sqlId: { type: Number, index: true, sparse: true },
  shop_id: { type: Number, default: 0 },
  payment_type: { type: Number, default: 0 },
  bank_name: { type: String, default: '' },
  payment_details: { type: String, default: '' },
  created_at: { type: Date, default: null },
  is_active: { type: Number, default: 0 },
  is_deleted: { type: Number, default: 0 },

}, { timestamps: true });

module.exports = mongoose.model('OutletTransaction', outletTransactionSchema);
