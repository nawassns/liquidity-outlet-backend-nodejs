const mongoose = require('mongoose');
const { TableBooking, Table, Slot } = require('../models');

async function validateBookingReferences({ outletId, tableId, slotId, numberOfGuests }) {
  if (!mongoose.isValidObjectId(tableId)) {
    return { message: 'Please select a valid table.' };
  }

  const table = await Table.findOne({ _id: tableId, outletId, isActive: { $ne: false } });
  if (!table) {
    return { message: 'The selected table does not exist for this outlet.' };
  }

  if (Number(numberOfGuests) > Number(table.capacity)) {
    return { message: `This table allows a maximum of ${table.capacity} guests.` };
  }

  if (slotId) {
    if (!mongoose.isValidObjectId(slotId)) {
      return { message: 'Please select a valid booking slot.' };
    }

    const slot = await Slot.findOne({
      _id: slotId,
      outletId,
      isActive: { $ne: false },
      status: { $ne: 'Inactive' }
    });
    if (!slot) {
      return { message: 'The selected booking slot does not exist or is inactive.' };
    }
  }

  return null;
}

// GET /api/table-bookings
exports.list = async (req, res) => {
  const { page = 1, limit = 20, status, date, tableId, search } = req.query;
  const filter = { outletId: req.outletId };
  if (status) filter.status = status;
  if (tableId) filter.tableId = tableId;
  if (date) {
    const d = new Date(date);
    const next = new Date(d); next.setDate(d.getDate() + 1);
    filter.bookingDate = { $gte: d, $lt: next };
  }
  if (search) {
    filter.$or = [
      { customerName: { $regex: search, $options: 'i' } },
      { customerPhone: { $regex: search, $options: 'i' } }
    ];
  }
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const [items, total] = await Promise.all([
    TableBooking.find(filter).populate('tableId', 'tableNo tableName capacity area')
      .sort({ bookingDate: -1, startTime: -1 }).skip(skip).limit(parseInt(limit)),
    TableBooking.countDocuments(filter)
  ]);
  return res.json({ success: true, data: { bookings: items, total, page: +page, limit: +limit } });
};

// GET /api/table-bookings/ongoing — currently active bookings ("Ongoing Table Bookings")
exports.ongoing = async (req, res) => {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);
  const items = await TableBooking.find({
    outletId: req.outletId,
    status: { $in: ['Confirmed', 'CheckedIn', 'Pending'] },
    bookingDate: { $gte: today, $lt: tomorrow }
  })
    .populate('tableId', 'tableNo tableName capacity area')
    .sort({ startTime: 1 });
  return res.json({ success: true, data: items });
};

// POST /api/table-bookings
exports.create = async (req, res) => {
  try {
    const referenceError = await validateBookingReferences({
      outletId: req.outletId,
      tableId: req.body.tableId,
      slotId: req.body.slotId,
      numberOfGuests: req.body.numberOfGuests
    });
    if (referenceError) {
      return res.status(400).json({ success: false, ...referenceError });
    }

    const payload = { ...req.body, outletId: req.outletId };
    if (!payload.slotId) delete payload.slotId;

    const b = await TableBooking.create(payload);
    return res.status(201).json({ success: true, message: 'Booking created.', data: b });
  } catch (err) {
    const status = err.name === 'ValidationError' || err.name === 'CastError' ? 400 : 500;
    return res.status(status).json({
      success: false,
      message: status === 400 ? err.message : 'Could not create booking.',
      error: err.message
    });
  }
};

// GET /api/table-bookings/:id
exports.getOne = async (req, res) => {
  const b = await TableBooking.findOne({ _id: req.params.id, outletId: req.outletId })
    .populate('tableId').populate('slotId');
  if (!b) return res.status(404).json({ success: false, message: 'Booking not found.' });
  return res.json({ success: true, data: b });
};

// PUT /api/table-bookings/:id
exports.update = async (req, res) => {
  const b = await TableBooking.findOneAndUpdate(
    { _id: req.params.id, outletId: req.outletId }, req.body, { new: true, runValidators: true }
  );
  if (!b) return res.status(404).json({ success: false, message: 'Booking not found.' });
  return res.json({ success: true, message: 'Booking updated.', data: b });
};

// DELETE /api/table-bookings/:id
exports.remove = async (req, res) => {
  const b = await TableBooking.findOneAndDelete({ _id: req.params.id, outletId: req.outletId });
  if (!b) return res.status(404).json({ success: false, message: 'Booking not found.' });
  return res.json({ success: true, message: 'Booking deleted.' });
};

// PATCH /api/table-bookings/:id/status
exports.updateStatus = async (req, res) => {
  const valid = ['Pending', 'Confirmed', 'CheckedIn', 'Completed', 'Cancelled', 'NoShow'];
  if (!valid.includes(req.body.status)) {
    return res.status(400).json({ success: false, message: `Invalid status. Allowed: ${valid.join(', ')}` });
  }
  const update = { status: req.body.status };
  if (req.body.status === 'Cancelled' && req.body.cancellationReason) {
    update.cancellationReason = req.body.cancellationReason;
  }
  const b = await TableBooking.findOneAndUpdate(
    { _id: req.params.id, outletId: req.outletId }, update, { new: true }
  );
  if (!b) return res.status(404).json({ success: false, message: 'Booking not found.' });

  // Sync table.status when booking status changes
  if (b.tableId) {
    if (req.body.status === 'CheckedIn') await Table.findByIdAndUpdate(b.tableId, { status: 'Occupied' });
    if (['Completed', 'Cancelled', 'NoShow'].includes(req.body.status)) {
      await Table.findByIdAndUpdate(b.tableId, { status: 'Available' });
    }
  }
  return res.json({ success: true, message: 'Status updated.', data: b });
};
