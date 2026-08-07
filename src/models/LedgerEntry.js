const mongoose = require('mongoose');

// Ledger — accounting entries per outlet. Used by "View Ledger".
const ledgerEntrySchema = new mongoose.Schema({
  outletId: { type: mongoose.Schema.Types.ObjectId, ref: 'Outlet', required: true, index: true },
  entryDate: { type: Date, default: Date.now, index: true },
  entryType: {
    type: String,
    enum: ['ORDER_REVENUE', 'COMMISSION', 'TIP', 'PAYOUT', 'RECEIVABLE', 'ADJUSTMENT', 'OTHER'],
    required: true
  },
  debit: { type: Number, default: 0 },
  credit: { type: Number, default: 0 },
  balance: { type: Number, default: 0 },
  description: { type: String, default: null },
  referenceType: { type: String, default: null },        // 'Order', 'Tip', 'Payment'
  referenceId: { type: mongoose.Schema.Types.ObjectId, default: null },
  status: { type: String, enum: ['Pending', 'Cleared', 'Failed'], default: 'Cleared' },

  // === SQL parity fields (mirrors MySQL table `outlet_ledger`) ===
  sqlId: { type: Number, index: true, sparse: true },
  order_id: { type: String, default: '' },
  shop_id: { type: Number, default: 0 },
  amount: { type: Number, default: 0 },
  note: { type: String, default: '' },
  created_at: { type: Date, default: null },
  is_active: { type: Number, default: 0 },
  is_deleted: { type: Number, default: 0 },

}, { timestamps: true });

module.exports = mongoose.model('LedgerEntry', ledgerEntrySchema);
