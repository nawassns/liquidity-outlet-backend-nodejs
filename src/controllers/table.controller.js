const { Table } = require('../models');

// GET /api/tables
exports.list = async (req, res) => {
  const { status, area, search } = req.query;
  const filter = { outletId: req.outletId };
  if (status) filter.status = status;
  if (area) filter.area = area;
  if (search) {
    filter.$or = [
      { tableNo: { $regex: search, $options: 'i' } },
      { tableName: { $regex: search, $options: 'i' } }
    ];
  }
  const items = await Table.find(filter).sort({ tableNo: 1 });
  return res.json({ success: true, data: items });
};

// POST /api/tables
exports.create = async (req, res) => {
  try {
    const t = await Table.create({ ...req.body, outletId: req.outletId });
    return res.status(201).json({ success: true, message: 'Table created.', data: t });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ success: false, message: 'Table number already exists.' });
    }
    return res.status(500).json({ success: false, message: 'Create failed.', error: err.message });
  }
};

// GET /api/tables/:id
exports.getOne = async (req, res) => {
  const t = await Table.findOne({ _id: req.params.id, outletId: req.outletId });
  if (!t) return res.status(404).json({ success: false, message: 'Table not found.' });
  return res.json({ success: true, data: t });
};

// PUT /api/tables/:id
exports.update = async (req, res) => {
  const t = await Table.findOneAndUpdate(
    { _id: req.params.id, outletId: req.outletId }, req.body, { new: true, runValidators: true }
  );
  if (!t) return res.status(404).json({ success: false, message: 'Table not found.' });
  return res.json({ success: true, message: 'Table updated.', data: t });
};

// DELETE /api/tables/:id
exports.remove = async (req, res) => {
  const t = await Table.findOneAndDelete({ _id: req.params.id, outletId: req.outletId });
  if (!t) return res.status(404).json({ success: false, message: 'Table not found.' });
  return res.json({ success: true, message: 'Table deleted.' });
};

// PATCH /api/tables/:id/status
exports.updateStatus = async (req, res) => {
  const valid = ['Available', 'Occupied', 'Reserved', 'Cleaning', 'Maintenance'];
  if (!valid.includes(req.body.status)) {
    return res.status(400).json({ success: false, message: `Invalid status. Allowed: ${valid.join(', ')}` });
  }
  const t = await Table.findOneAndUpdate(
    { _id: req.params.id, outletId: req.outletId }, { status: req.body.status }, { new: true }
  );
  if (!t) return res.status(404).json({ success: false, message: 'Table not found.' });
  return res.json({ success: true, message: 'Status updated.', data: t });
};

// GET /api/tables/status-overview — overview counts for "Table Booking Status" page
exports.statusOverview = async (req, res) => {
  const counts = await Table.aggregate([
    { $match: { outletId: req.outletId } },
    { $group: { _id: '$status', count: { $sum: 1 } } }
  ]);
  const out = { Available: 0, Occupied: 0, Reserved: 0, Cleaning: 0, Maintenance: 0 };
  counts.forEach((c) => { out[c._id] = c.count; });
  out.total = await Table.countDocuments({ outletId: req.outletId });
  return res.json({ success: true, data: out });
};
