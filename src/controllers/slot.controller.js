const { Slot } = require('../models');

// GET /api/slots
exports.list = async (req, res) => {
  const { status, day } = req.query;
  const filter = { outletId: req.outletId };
  if (status) filter.status = status;
  if (day) filter.daysOfWeek = day;
  const items = await Slot.find(filter).sort({ startTime: 1 });
  return res.json({ success: true, data: items });
};

// POST /api/slots
exports.create = async (req, res) => {
  try {
    const s = await Slot.create({ ...req.body, outletId: req.outletId });
    return res.status(201).json({ success: true, message: 'Slot created.', data: s });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Create failed.', error: err.message });
  }
};

// GET /api/slots/:id
exports.getOne = async (req, res) => {
  const s = await Slot.findOne({ _id: req.params.id, outletId: req.outletId });
  if (!s) return res.status(404).json({ success: false, message: 'Slot not found.' });
  return res.json({ success: true, data: s });
};

// PUT /api/slots/:id
exports.update = async (req, res) => {
  const s = await Slot.findOneAndUpdate(
    { _id: req.params.id, outletId: req.outletId }, req.body, { new: true, runValidators: true }
  );
  if (!s) return res.status(404).json({ success: false, message: 'Slot not found.' });
  return res.json({ success: true, message: 'Slot updated.', data: s });
};

// DELETE /api/slots/:id
exports.remove = async (req, res) => {
  const s = await Slot.findOneAndDelete({ _id: req.params.id, outletId: req.outletId });
  if (!s) return res.status(404).json({ success: false, message: 'Slot not found.' });
  return res.json({ success: true, message: 'Slot deleted.' });
};

// PATCH /api/slots/:id/status
exports.updateStatus = async (req, res) => {
  if (!['Active', 'Inactive'].includes(req.body.status)) {
    return res.status(400).json({ success: false, message: 'Invalid status.' });
  }
  const s = await Slot.findOneAndUpdate(
    { _id: req.params.id, outletId: req.outletId }, { status: req.body.status }, { new: true }
  );
  if (!s) return res.status(404).json({ success: false, message: 'Slot not found.' });
  return res.json({ success: true, message: 'Status updated.', data: s });
};
