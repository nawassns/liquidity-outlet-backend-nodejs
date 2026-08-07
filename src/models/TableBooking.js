const mongoose = require('mongoose');

const tableBookingSchema = new mongoose.Schema({
  outletId: { type: mongoose.Schema.Types.ObjectId, ref: 'Outlet', required: true, index: true },
  tableId: { type: mongoose.Schema.Types.ObjectId, ref: 'Table', required: true, index: true },
  slotId: { type: mongoose.Schema.Types.ObjectId, ref: 'Slot', default: null },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  customerName: { type: String, required: true, trim: true },
  customerPhone: { type: String, required: true, trim: true },
  customerEmail: { type: String, default: null, lowercase: true, trim: true },
  bookingDate: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, default: null },
  numberOfGuests: { type: Number, required: true, min: 1 },
  notes: { type: String, default: null },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'CheckedIn', 'Completed', 'Cancelled', 'NoShow'],
    default: 'Pending'
  },
  cancellationReason: { type: String, default: null },

  // === SQL parity fields (mirrors MySQL table `table_bookings`) ===
  sqlId: { type: Number, index: true, sparse: true },
  table_id: { type: Number, default: 0 },
  shop_id: { type: Number, default: 0 },
  waiter_id: { type: Number, default: 0 },
  name: { type: String, default: '' },
  mobile: { type: String, default: '' },
  booking_date: { type: Date, default: null },
  booking_time: { type: String, default: '' },
  is_completed: { type: Number, default: 0 },
  is_active: { type: Number, default: 0 },
  is_deleted: { type: Number, default: 0 },

}, { timestamps: true });

tableBookingSchema.index({ outletId: 1, bookingDate: 1, status: 1 });

module.exports = mongoose.model('TableBooking', tableBookingSchema);
