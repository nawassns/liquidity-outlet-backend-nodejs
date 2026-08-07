const mongoose = require('mongoose');

// Slot — bookable time windows per outlet/day. e.g. "12:00-14:00" with capacity.
const slotSchema = new mongoose.Schema({
  outletId: { type: mongoose.Schema.Types.ObjectId, ref: 'Outlet', required: true, index: true },
  name: { type: String, required: true, trim: true },        // e.g. "Lunch", "Happy Hour"
  startTime: { type: String, required: true },               // "12:00"
  endTime: { type: String, required: true },                 // "14:00"
  daysOfWeek: [{ type: String, enum: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] }],
  maxBookings: { type: Number, default: 10 },
  description: { type: String, default: null },
  isActive: { type: Boolean, default: true },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },

  // === SQL parity fields (mirrors MySQL table `slots`) ===
  sqlId: { type: Number, index: true, sparse: true },
  shop_id: { type: Number, default: 0 },
  start_time: { type: String, default: '' },
  end_time: { type: String, default: '' },
  comment: { type: String, default: '' },
  is_active: { type: Number, default: 0 },
  is_deleted: { type: Number, default: 0 },

}, { timestamps: true });

module.exports = mongoose.model('Slot', slotSchema);
